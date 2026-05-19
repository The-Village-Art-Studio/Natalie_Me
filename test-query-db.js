const { createClient } = require('@supabase/supabase-js');
const fs = require('fs');

// Parse .env manually
let supabaseUrl = '';
let supabaseAnonKey = '';
try {
  const envContent = fs.readFileSync('.env', 'utf8');
  const lines = envContent.split('\n');
  for (const line of lines) {
    if (line.startsWith('NEXT_PUBLIC_SUPABASE_URL=')) {
      supabaseUrl = line.split('=')[1].trim();
    }
    if (line.startsWith('NEXT_PUBLIC_SUPABASE_ANON_KEY=')) {
      supabaseAnonKey = line.split('=')[1].trim();
    }
  }
} catch (e) {
  console.error("Error reading .env", e);
}

const supabase = createClient(supabaseUrl, supabaseAnonKey);

async function test() {
  console.log("Supabase URL:", supabaseUrl);
  
  const { data: artworks, error: artworksError } = await supabase.from('artworks').select('*');
  console.log("Artworks count:", artworks ? artworks.length : 0);
  if (artworksError) console.error("Artworks error:", artworksError);
  else console.log("Artworks sample:", artworks && artworks[0]);

  const { data: events, error: eventsError } = await supabase.from('events').select('*');
  console.log("Events count:", events ? events.length : 0);
  if (eventsError) console.error("Events error:", eventsError);
  else console.log("Events sample:", events && events[0]);

  const { data: bio, error: bioError } = await supabase.from('bio').select('*');
  console.log("Bio sample:", bio);
  if (bioError) console.error("Bio error:", bioError);
}

test();
