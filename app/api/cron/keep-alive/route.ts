import { NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'

export async function GET() {
    try {
        // Perform a simple query to keep the Supabase project active
        const { data, error } = await supabase.from('artworks').select('id').limit(1)

        if (error) {
            console.error('Keep-alive query error:', error)
            return NextResponse.json({ error: error.message }, { status: 500 })
        }

        return NextResponse.json({ 
            success: true, 
            message: 'Supabase keep-alive successful',
            timestamp: new Date().toISOString()
        })
    } catch (error) {
        console.error('Keep-alive error:', error)
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
    }
}
