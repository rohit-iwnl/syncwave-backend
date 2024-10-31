// Follow this setup guide to integrate the Deno language server with your editor:
// https://deno.land/manual/getting_started/setup_your_environment
// This enables autocomplete, go to definition, etc.

// Setup type definitions for built-in Supabase Runtime APIs
import "jsr:@supabase/functions-js/edge-runtime.d.ts"

interface SupabaseProfile {
  id: string;
  email: string;
  phone: string | null;
  last_sign_in_at: string | null;
  created_at: string;
  updated_at: string;
  deleted_at: string | null;
}

interface WebhookPayload {
  type: 'INSERT' | 'UPDATE' | 'DELETE';
  record: SupabaseProfile;
  old_record?: SupabaseProfile;
}

Deno.serve(async (req) => {
  try {
    // Get secrets
    const API_URL = Deno.env.get('API_URL');
    const SUPABASE_SERVICE_ROLE_KEY = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY');

    if (!API_URL || !SUPABASE_SERVICE_ROLE_KEY) {
      throw new Error('Missing required environment variables');
    }

    const payload: WebhookPayload = await req.json();
    const { type, record } = payload;

    const response = await fetch(API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${SUPABASE_SERVICE_ROLE_KEY}`,
      },
      body: JSON.stringify({
        type,
        record: {
          id: record.id,
          email: record.email,
          phone: record.phone || null,
          last_sign_in_at: record.last_sign_in_at,
          created_at: record.created_at,
          updated_at: record.updated_at,
          deleted_at: record.deleted_at || null
        }
      })
    });

    if (!response.ok) {
      throw new Error(`API responded with status: ${response.status}`);
    }

    const result = await response.json();

    return new Response(
      JSON.stringify({
        success: true,
        message: `Profile ${type.toLowerCase()}d successfully`,
        result
      }),
      { 
        headers: { "Content-Type": "application/json" },
        status: 200
      }
    );

  } catch (error) {
    console.error('Error processing webhook:', error);
    
    return new Response(
      JSON.stringify({
        success: false,
        error: error instanceof Error ? error.message : String(error)
      }),
      { 
        headers: { "Content-Type": "application/json" },
        status: 500
      }
    );
  }
});

/* To invoke locally:

  1. Run `supabase start` (see: https://supabase.com/docs/reference/cli/supabase-start)
  2. Make an HTTP request:

  curl -i --location --request POST 'http://127.0.0.1:54321/functions/v1/sync-profiles' \
    --header 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZS1kZW1vIiwicm9sZSI6ImFub24iLCJleHAiOjE5ODM4MTI5OTZ9.CRXP1A7WOeoJeXxjNni43kdQwgnWNReilDMblYTn_I0' \
    --header 'Content-Type: application/json' \
    --data '{"name":"Functions"}'

*/
