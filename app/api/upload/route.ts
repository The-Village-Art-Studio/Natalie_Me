import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'
import sharp from 'sharp'

// Use service role key to bypass RLS for storage uploads
const supabaseAdmin = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

export async function POST(request: NextRequest) {
    try {
        const formData = await request.formData()
        const file = formData.get('file') as File
        const bucket = formData.get('bucket') as string
        let path = formData.get('path') as string

        if (!file || !bucket || !path) {
            return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
        }

        const bytes = await file.arrayBuffer()
        const buffer = Buffer.from(bytes)

        // Convert to WebP
        const webpBuffer = await sharp(buffer)
            .webp({ quality: 80 })
            .toBuffer()

        // Ensure path has .webp extension
        const pathParts = path.split('.')
        pathParts[pathParts.length - 1] = 'webp'
        path = pathParts.join('.')

        const { error: uploadError } = await supabaseAdmin.storage
            .from(bucket)
            .upload(path, webpBuffer, {
                contentType: 'image/webp',
                upsert: true
            })

        if (uploadError) {
            console.error('Upload error:', uploadError)
            return NextResponse.json({ error: uploadError.message }, { status: 500 })
        }

        const { data: { publicUrl } } = supabaseAdmin.storage
            .from(bucket)
            .getPublicUrl(path)

        return NextResponse.json({ publicUrl })
    } catch (error: any) {
        console.error('Upload API error:', error)
        return NextResponse.json({ error: error.message }, { status: 500 })
    }
}
