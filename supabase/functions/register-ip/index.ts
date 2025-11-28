import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

// Story Protocol API endpoints (correct URLs from official docs)
const STORY_API_PROD = "https://api.storyapis.com";
const STORY_API_STAGING = "https://staging-api.storyprotocol.net";

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { 
      ipName, 
      ipType, 
      description, 
      mediaUrl,
      environment = 'staging' // default to staging/testnet
    } = await req.json();

    // Validate required fields
    if (!ipName || !ipType) {
      return new Response(
        JSON.stringify({ error: 'Missing required fields: ipName and ipType are required' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Get the appropriate API key and endpoint
    const apiKey = environment === 'production' 
      ? Deno.env.get('STORY_PROTOCOL_API_KEY_PROD')
      : Deno.env.get('STORY_PROTOCOL_API_KEY_STAGING');
    
    const apiEndpoint = environment === 'production' 
      ? STORY_API_PROD 
      : STORY_API_STAGING;

    if (!apiKey) {
      console.error(`Story Protocol API key not configured for ${environment}`);
      return new Response(
        JSON.stringify({ error: 'API key not configured' }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    console.log(`Registering IP on Story Protocol (${environment})...`, { ipName, ipType });

    // Register IP on Story Protocol
    const response = await fetch(`${apiEndpoint}/api/v1/assets`, {
      method: 'POST',
      headers: {
        'X-API-Key': apiKey,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: ipName,
        type: ipType,
        description: description || '',
        mediaUrl: mediaUrl || '',
        metadata: {
          registeredAt: new Date().toISOString(),
          platform: 'Reality Forge'
        }
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('Story Protocol API error:', response.status, errorText);
      return new Response(
        JSON.stringify({ 
          error: 'Failed to register IP on Story Protocol',
          details: errorText 
        }),
        { status: response.status, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const data = await response.json();
    console.log('IP registered successfully:', data);

    return new Response(
      JSON.stringify({ 
        success: true, 
        data,
        message: `IP "${ipName}" successfully registered on Story Protocol (${environment})` 
      }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );

  } catch (error) {
    console.error('Error in register-ip function:', error);
    return new Response(
      JSON.stringify({ 
        error: error instanceof Error ? error.message : 'Unknown error occurred' 
      }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});
