import { NextResponse } from 'next/server'
import { Resend } from 'resend'
import { supabase } from '@/lib/supabase'

const resend = new Resend(process.env.RESEND_API_KEY)

export async function POST(request: Request) {
    try {
        const { name, email, subject, message } = await request.json()

        // 1. Save to Supabase (CRM)
        const { error: dbError } = await supabase
            .from('messages')
            .insert([{ name, email, subject, message, status: 'unread' }])

        if (dbError) {
            console.error('Database error:', dbError)
            return NextResponse.json({ error: 'Failed to save message' }, { status: 500 })
        }

        // 2. Send email notification via Resend
        const { error: emailError } = await resend.emails.send({
            from: 'Natalie Me <onboarding@resend.dev>', // You should update this to your verified domain later
            to: process.env.ADMIN_EMAIL!,
            subject: `New Contact Message: ${subject}`,
            html: `
                <h2>New Message from Natalie_Me Contact Form</h2>
                <p><strong>Name:</strong> ${name}</p>
                <p><strong>Email:</strong> ${email}</p>
                <p><strong>Subject:</strong> ${subject}</p>
                <p><strong>Message:</strong></p>
                <p>${message}</p>
            `,
        })

        if (emailError) {
            console.error('Email error:', emailError)
            // We don't return 500 here because the message was saved to the DB at least
        }

        return NextResponse.json({ success: true })
    } catch (error) {
        console.error('API error:', error)
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
    }
}
