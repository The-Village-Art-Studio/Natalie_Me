const { createClient } = require('@supabase/supabase-js');
const fs = require('fs');

// Parse .env manually
let supabaseUrl = '';
let anonKey = '';
let serviceRoleKey = '';
try {
  const envContent = fs.readFileSync('.env', 'utf8');
  const lines = envContent.split('\n');
  for (const line of lines) {
    if (line.startsWith('NEXT_PUBLIC_SUPABASE_URL=')) supabaseUrl = line.split('=').slice(1).join('=').trim();
    if (line.startsWith('NEXT_PUBLIC_SUPABASE_ANON_KEY=')) anonKey = line.split('=').slice(1).join('=').trim();
    if (line.startsWith('SUPABASE_SERVICE_ROLE_KEY=')) serviceRoleKey = line.split('=').slice(1).join('=').trim();
  }
} catch (e) {
  console.error("Error reading .env", e);
}

// Test ANON key (what the upload API uses when service role is missing)
const anonClient = createClient(supabaseUrl, anonKey);

async function test() {
  console.log('=== Testing with ANON key ===');

  // List buckets
  const { data: buckets, error: bucketErr } = await anonClient.storage.listBuckets();
  console.log('Buckets:', buckets?.map(b => `${b.name} (public:${b.public})`), bucketErr?.message);

  // Try upload with anon key
  const testBuf = Buffer.from([0x47, 0x49, 0x46]); // minimal bytes
  const { error: e1 } = await anonClient.storage.from('gallery').upload('anon-test.webp', testBuf, { contentType: 'image/webp', upsert: true });
  console.log('Anon upload error:', e1?.message || 'SUCCESS');

  // Try upload to profile bucket
  const { error: e2 } = await anonClient.storage.from('profile').upload('anon-test.webp', testBuf, { contentType: 'image/webp', upsert: true });
  console.log('Anon upload to profile error:', e2?.message || 'SUCCESS');

  // Check what the original fileName pattern was (pure timestamp)
  const oldPath = `${Date.now()}.webp`;
  const newPath = `artwork-${Date.now()}.webp`;
  console.log('\nOld path format:', oldPath);
  console.log('New path format:', newPath);

  const { error: e3 } = await anonClient.storage.from('gallery').upload(oldPath, testBuf, { contentType: 'image/webp', upsert: true });
  console.log('Old-style path upload error:', e3?.message || 'SUCCESS');

  const { error: e4 } = await anonClient.storage.from('gallery').upload(newPath, testBuf, { contentType: 'image/webp', upsert: true });
  console.log('New-style path upload error:', e4?.message || 'SUCCESS');
}

test().catch(console.error);
