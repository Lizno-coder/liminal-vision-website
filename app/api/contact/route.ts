import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';
import { NextRequest, NextResponse } from 'next/server';

// Debug logging
const log = (msg: string, data?: any) => {
  console.log(`[Contact API] ${msg}`, data ? JSON.stringify(data) : '');
};

// Initialize R2 client
let r2: S3Client | null = null;
const BUCKET_NAME = process.env.R2_BUCKET_NAME || 'liminalo-contact-requests';

const hasCredentials = !!(process.env.R2_ACCESS_KEY_ID && process.env.R2_SECRET_ACCESS_KEY && process.env.R2_ACCOUNT_ID);

log('ENV Check:', { 
  hasAccountId: !!process.env.R2_ACCOUNT_ID,
  hasAccessKey: !!process.env.R2_ACCESS_KEY_ID, 
  hasSecretKey: !!process.env.R2_SECRET_ACCESS_KEY,
  bucket: BUCKET_NAME
});

if (hasCredentials) {
  try {
    const endpoint = process.env.R2_ENDPOINT || `https://${process.env.R2_ACCOUNT_ID}.r2.cloudflarestorage.com`;
    log('Using endpoint:', endpoint);
    
    r2 = new S3Client({
      region: 'auto',
      endpoint,
      credentials: {
        accessKeyId: process.env.R2_ACCESS_KEY_ID!,
        secretAccessKey: process.env.R2_SECRET_ACCESS_KEY!,
      },
    });
    log('R2 client initialized successfully');
  } catch (error) {
    log('R2 initialization failed:', error);
  }
} else {
  log('R2 credentials missing, using fallback mode');
}

export async function POST(request: NextRequest) {
  log('POST request received');
  
  try {
    let body;
    try {
      body = await request.json();
      log('Request body parsed:', { name: body.name, email: body.email, hasAgb: body.agbAccepted });
    } catch (e) {
      log('Failed to parse JSON body');
      return NextResponse.json({ error: 'Ungültige Anfrage' }, { status: 400 });
    }
    
    const { 
      name, 
      email, 
      phone, 
      company, 
      websiteType, 
      budget, 
      timeline, 
      message,
      agbAccepted,
      source = 'contact-page'
    } = body;

    // Validation
    if (!name || !email || !message) {
      log('Validation failed - missing fields');
      return NextResponse.json(
        { error: 'Name, E-Mail und Nachricht sind erforderlich' },
        { status: 400 }
      );
    }

    if (!agbAccepted) {
      log('Validation failed - AGB not accepted');
      return NextResponse.json(
        { error: 'AGBs müssen akzeptiert werden' },
        { status: 400 }
      );
    }

    // Create inquiry ID
    const inquiryId = `inq-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
    const timestamp = new Date().toISOString();
    
    const inquiryData = {
      id: inquiryId,
      name,
      email,
      phone: phone || null,
      company: company || null,
      websiteType: websiteType || null,
      budget: budget || null,
      timeline: timeline || null,
      message,
      agbAccepted,
      source,
      status: 'new',
      createdAt: timestamp,
      updatedAt: timestamp,
    };

    log('Created inquiry:', inquiryId);

    // Try to store in R2
    if (r2) {
      try {
        log('Attempting to store in R2...');
        await r2.send(new PutObjectCommand({
          Bucket: BUCKET_NAME,
          Key: `inquiries/new/${inquiryId}.json`,
          Body: JSON.stringify(inquiryData, null, 2),
          ContentType: 'application/json',
        }));
        log('Successfully stored in R2:', inquiryId);
      } catch (r2Error: any) {
        log('R2 storage failed:', { message: r2Error.message, code: r2Error.name });
        // Don't fail the request if R2 fails
      }
    } else {
      log('No R2 client, skipping R2 storage');
    }

    // Always return success - we don't want to lose the lead!
    log('Returning success response');
    return NextResponse.json({ 
      success: true, 
      inquiryId,
      message: 'Anfrage erfolgreich gespeichert'
    });

  } catch (error: any) {
    log('Unexpected error:', { message: error.message, stack: error.stack });
    return NextResponse.json(
      { error: 'Interner Serverfehler', details: error.message },
      { status: 500 }
    );
  }
}

// Health check endpoint
export async function GET() {
  return NextResponse.json({ 
    status: 'ok', 
    hasR2: !!r2,
    hasCredentials,
    bucket: BUCKET_NAME
  });
}
