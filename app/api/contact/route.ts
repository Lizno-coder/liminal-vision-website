import { NextRequest, NextResponse } from 'next/server';

export const runtime = 'edge';

export async function POST(request: NextRequest) {
  console.log('[API] Contact form submitted');
  
  try {
    const body = await request.json();
    console.log('[API] Received data:', JSON.stringify(body, null, 2));
    
    const { name, email, message, agbAccepted } = body;

    if (!name || !email || !message) {
      console.log('[API] Validation failed');
      return NextResponse.json(
        { error: 'Name, E-Mail und Nachricht sind erforderlich' },
        { status: 400 }
      );
    }

    if (!agbAccepted) {
      console.log('[API] AGB not accepted');
      return NextResponse.json(
        { error: 'AGBs müssen akzeptiert werden' },
        { status: 400 }
      );
    }

    // Simuliere erfolgreiche Speicherung
    const inquiryId = `inq-${Date.now()}`;
    console.log('[API] Success:', inquiryId);

    return NextResponse.json({ 
      success: true, 
      inquiryId,
      message: 'Anfrage erfolgreich gespeichert'
    });

  } catch (error: any) {
    console.error('[API] Error:', error.message);
    return NextResponse.json(
      { error: 'Serverfehler', details: error.message },
      { status: 500 }
    );
  }
}

export async function GET() {
  return NextResponse.json({ status: 'ok', time: new Date().toISOString() });
}
