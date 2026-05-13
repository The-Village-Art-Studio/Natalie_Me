const { createClient } = require('@supabase/supabase-js');
require('dotenv').config({ path: '.env' });

const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY);

async function test() {
  const { data, error } = await supabase.from('artworks').insert([{ title: 'test', preview_position_x: 50 }]);
  console.log("Error details:", JSON.stringify(error, null, 2));
}

test();
