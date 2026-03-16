import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';

let resend: Resend | null = null;
function getResend() {
  if (!resend && process.env.RESEND_API_KEY) {
    resend = new Resend(process.env.RESEND_API_KEY);
  }
  return resend;
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    const { 
      name, 
      email, 
      phone, 
      company, 
      websiteType, 
      budget, 
      message,
      agbAccepted,
      source = 'contact-page'
    } = body;

    // Validation
    if (!name || !email || !message) {
      return NextResponse.json(
        { error: 'Name, E-Mail und Nachricht sind erforderlich' },
        { status: 400 }
      );
    }

    if (!agbAccepted) {
      return NextResponse.json(
        { error: 'AGBs müssen akzeptiert werden' },
        { status: 400 }
      );
    }

    // Create inquiry ID
    const inquiryId = `inq-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
    
    const websiteTypeLabels: Record<string, string> = {
      business: 'Unternehmenswebsite',
      shop: 'Onlineshop / E-Commerce',
      restaurant: 'Restaurant / Gastronomie',
      hotel: 'Hotel / Unterkunft',
      medical: 'Arztpraxis / Klinik',
      law: 'Anwaltskanzlei',
      realestate: 'Immobilien',
      construction: 'Bau / Handwerk',
      automotive: 'Autohaus / Werkstatt',
      beauty: 'Beauty / Kosmetik / Friseur',
      fitness: 'Fitness / Studio / Yoga',
      event: 'Event / Hochzeit',
      portfolio: 'Portfolio / Persönliche Website',
      blog: 'Blog / Magazin',
      landing: 'Landing Page',
      redesign: 'Website-Relaunch',
      other: 'Sonstiges',
    };
    const websiteTypeLabel = websiteTypeLabels[websiteType as string] || websiteType || 'Nicht angegeben';

    // Send Email
    const resendClient = getResend();
    if (resendClient) {
      try {
        await resendClient.emails.send({
          from: 'Liminalo <noreply@liminalo.com>',
          to: ['business@liminalo.com'],
          subject: `Neue Anfrage von ${name}`,
          html: `
            <h2>Neue Kontaktanfrage</h2>
            <p><strong>ID:</strong> ${inquiryId}</p>
            <hr>
            <p><strong>Name:</strong> ${name}</p>
            <p><strong>E-Mail:</strong> ${email}</p>
            <p><strong>Telefon:</strong> ${phone || 'Nicht angegeben'}</p>
            <p><strong>Unternehmen:</strong> ${company || 'Nicht angegeben'}</p>
            <p><strong>Website-Art:</strong> ${websiteTypeLabel}</p>
            <p><strong>Budget:</strong> ${budget ? budget + ' €' : 'Nicht angegeben'}</p>
            <p><strong>Quelle:</strong> ${source}</p>
            <hr>
            <p><strong>Nachricht:</strong></p>
            <p>${message.replace(/\n/g, '<br>')}</p>
            <hr>
            <p><small>AGBs akzeptiert: Ja</small></p>
          `,
        });
        console.log('[Contact API] Email sent');
      } catch (emailError) {
        console.error('[Contact API] Email failed:', emailError);
      }
    }

    return NextResponse.json({ 
      success: true, 
      inquiryId,
      message: 'Anfrage erfolgreich gesendet'
    });

  } catch (error: any) {
    console.error('[Contact API] Error:', error);
    return NextResponse.json(
      { error: 'Serverfehler', details: error.message },
      { status: 500 }
    );
  }
}

export async function GET() {
  return NextResponse.json({ 
    status: 'ok', 
    hasEmail: !!process.env.RESEND_API_KEY,
    time: new Date().toISOString() 
  });
}
