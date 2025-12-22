import type { APIRoute } from 'astro';
import { Resend } from 'resend';

export const prerender = false;

export const POST: APIRoute = async ({ request }) => {
    // 1. Method check (already handled by export const POST but good for clarity)
    if (request.method !== 'POST') {
        return new Response(JSON.stringify({ error: 'Method not allowed' }), { status: 405 });
    }

    try {
        let data: Record<string, any> = {};
        const contentType = request.headers.get('content-type') || '';

        // 2. Robust Body Parsing
        if (contentType.includes('application/json')) {
            try {
                data = await request.json();
            } catch (e) {
                return new Response(JSON.stringify({ ok: false, error: 'Invalid JSON body' }), { status: 400 });
            }
        } else if (contentType.includes('multipart/form-data') || contentType.includes('application/x-www-form-urlencoded')) {
            const formData = await request.formData();
            data = Object.fromEntries(formData);
        } else {
            return new Response(JSON.stringify({ ok: false, error: 'Unsupported Content-Type' }), { status: 415 });
        }

        // 3. Honeypot Check (Spam Protection)
        if (data.confirm_email && data.confirm_email.toString().trim() !== '') {
            // Silently fail for bots - return success but do nothing
            return new Response(JSON.stringify({ ok: true }), { status: 200 });
        }

        // 4. Strict Validation
        const requiredFields = [
            'name', 'artistName', 'email', 'genre',
            'careerStage', 'currentChallenges', 'goals',
            'portfolio', 'whyNow', 'budget', 'timeline', 'commitment'
        ];

        const missingFields = requiredFields.filter(field => !data[field] || data[field].toString().trim() === '');

        if (missingFields.length > 0) {
            return new Response(JSON.stringify({
                ok: false,
                error: `Missing required fields: ${missingFields.join(', ')}`
            }), {
                status: 400,
                headers: { 'Content-Type': 'application/json' }
            });
        }

        const {
            name, artistName, email, phone, location, genre,
            careerStage, currentChallenges, goals,
            portfolio, whyNow, hearAbout,
            budget, timeline, commitment
        } = data;

        // 5. Send Email via Resend
        const resend = new Resend(import.meta.env.RESEND_API_KEY);
        const mentorshipToEmail = import.meta.env.MENTORSHIP_TO_EMAIL || 'Gregorydavidmusic@gmail.com';
        const fromEmail = import.meta.env.FROM_EMAIL || 'onboarding@resend.dev';

        const { error: sendError } = await resend.emails.send({
            from: fromEmail,
            to: mentorshipToEmail,
            subject: `Mentorship Intake: ${artistName} (${name})`,
            html: `
        <h1>New Artist Mentorship Application</h1>
        <p><strong>Submitted:</strong> ${new Date().toLocaleString()}</p>
        <hr />
        <h2>Basic Info</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Artist Name:</strong> ${artistName}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Phone:</strong> ${phone || 'N/A'}</p>
        <p><strong>Location:</strong> ${location || 'N/A'}</p>
        <p><strong>Genre:</strong> ${genre}</p>
        
        <h2>Career & Goals</h2>
        <p><strong>Stage:</strong> ${careerStage}</p>
        <p><strong>Challenges:</strong><br/>${currentChallenges?.replace(/\n/g, '<br/>')}</p>
        <p><strong>Goals (6-12mo):</strong><br/>${goals?.replace(/\n/g, '<br/>')}</p>
        
        <h2>Portfolio</h2>
        <p><strong>Links:</strong><br/>${portfolio?.replace(/\n/g, '<br/>')}</p>
        <p><strong>Why Now:</strong><br/>${whyNow?.replace(/\n/g, '<br/>')}</p>
        <p><strong>Source:</strong> ${hearAbout || 'N/A'}</p>
        
        <h2>Investment</h2>
        <p><strong>Budget Option:</strong> ${budget}</p>
        <p><strong>Timeline:</strong> ${timeline}</p>
        <p><strong>Commitment:</strong> ${commitment}</p>
        <hr />
        <p>Sent from Beach House Studios Website</p>
      `
        });

        if (sendError) {
            console.error('Resend Error:', sendError);
            return new Response(JSON.stringify({
                ok: false,
                error: 'Failed to send email. Please try again later.'
            }), {
                status: 500,
                headers: { 'Content-Type': 'application/json' }
            });
        }

        console.log(`[Mentorship] Email sent successfully to ${mentorshipToEmail} for applicant ${name} (${email})`);

        return new Response(JSON.stringify({ ok: true }), {
            status: 200,
            headers: { 'Content-Type': 'application/json' }
        });

    } catch (error) {
        console.error('API Error:', error);
        return new Response(JSON.stringify({
            ok: false,
            error: 'Internal Server Error'
        }), {
            status: 500,
            headers: { 'Content-Type': 'application/json' }
        });
    }
}
