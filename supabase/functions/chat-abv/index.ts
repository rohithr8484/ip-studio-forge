import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { messages } = await req.json();
    const ABV_API_KEY = Deno.env.get("ABV_API_KEY");
    
    if (!ABV_API_KEY) {
      throw new Error("ABV_API_KEY is not configured");
    }

    console.log("Starting chat request with ABV API");

    const allMessages = [
      { 
        role: "system", 
        content: "You are a helpful AI assistant for Surra, a platform for registering intellectual property on Story Protocol. Help users understand IP registration, music rights, AI training data, and blockchain-based content management." 
      },
      ...messages,
    ];

    // Try ABV gateway endpoint (based on SDK structure)
    const response = await fetch("https://app.abv.dev/gateway/openai/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${ABV_API_KEY}`,
        "Content-Type": "application/json",
        "x-abv-region": "us",
      },
      body: JSON.stringify({
        model: "gpt-4o-mini",
        messages: allMessages,
        stream: true,
      }),
    });

    console.log("ABV Response status:", response.status);
    console.log("ABV Response headers:", JSON.stringify(Object.fromEntries(response.headers.entries())));

    if (!response.ok) {
      const errorText = await response.text();
      console.error("ABV API error - Status:", response.status);
      console.error("ABV API error - Body:", errorText);
      
      if (response.status === 429) {
        return new Response(
          JSON.stringify({ error: "Rate limits exceeded, please try again later." }),
          {
            status: 429,
            headers: { ...corsHeaders, "Content-Type": "application/json" },
          }
        );
      }
      if (response.status === 402) {
        return new Response(
          JSON.stringify({ error: "Payment required, please add funds to your ABV account." }),
          {
            status: 402,
            headers: { ...corsHeaders, "Content-Type": "application/json" },
          }
        );
      }
      
      return new Response(
        JSON.stringify({ 
          error: "ABV API error", 
          details: errorText,
          status: response.status 
        }),
        {
          status: response.status,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        }
      );
    }

    // Return the stream
    return new Response(response.body, {
      headers: { 
        ...corsHeaders, 
        "Content-Type": "text/event-stream",
        "Cache-Control": "no-cache",
        "Connection": "keep-alive"
      },
    });

  } catch (e) {
    console.error("chat-abv error:", e);
    console.error("Error stack:", e instanceof Error ? e.stack : "No stack");
    return new Response(
      JSON.stringify({ 
        error: e instanceof Error ? e.message : "Unknown error",
        details: e instanceof Error ? e.stack : undefined
      }),
      {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );
  }
});
