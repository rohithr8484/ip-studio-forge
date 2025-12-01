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

    console.log("Starting chat request with ABV gateway");
    console.log("ABV API Key exists:", !!ABV_API_KEY);
    console.log("Messages count:", messages.length);

    const requestBody = {
      provider: "openai",
      model: "gpt-4o-mini",
      messages: [
        { 
          role: "system", 
          content: "You are a helpful AI assistant for Surra, a platform for registering intellectual property on Story Protocol. Help users understand IP registration, music rights, AI training data, and blockchain-based content management." 
        },
        ...messages,
      ],
      stream: true,
    };

    console.log("Request body:", JSON.stringify(requestBody, null, 2));

    const response = await fetch("https://app.abv.dev/api/v1/gateway/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${ABV_API_KEY}`,
        "Content-Type": "application/json",
        "X-ABV-Region": "us",
      },
      body: JSON.stringify(requestBody),
    });

    console.log("ABV Response status:", response.status);
    console.log("ABV Response headers:", JSON.stringify(Object.fromEntries(response.headers.entries())));

    if (!response.ok) {
      const errorText = await response.text();
      console.error("ABV gateway error - Status:", response.status);
      console.error("ABV gateway error - Body:", errorText);
      
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
          error: "AI gateway error", 
          details: errorText,
          status: response.status 
        }),
        {
          status: 500,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        }
      );
    }

    return new Response(response.body, {
      headers: { ...corsHeaders, "Content-Type": "text/event-stream" },
    });
  } catch (e) {
    console.error("chat-abv error:", e);
    return new Response(
      JSON.stringify({ error: e instanceof Error ? e.message : "Unknown error" }),
      {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );
  }
});
