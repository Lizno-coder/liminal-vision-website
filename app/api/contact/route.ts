import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';
import { NextRequest, NextResponse } from 'next/server';

// R2 Client nur erstellen wenn Credentials vorhanden
let r2: S3Client | null = null;
let BUCKET_NAME: string = process.env.R2_BUCKET_NAME || 'liminalo-contact-requests';

try {
  if (process.env.R2_ACCESS_KEY_ID && process.env.R2_SECRET_ACCESS_KEY) {
    r2 = new S3Client({
      region: 'auto',
      endpoint: process.env.R2_ENDPOINT || `https://${process.env.R2_ACCOUNT_ID}.r2.cloudflarestorage.com`,
      credentials: {
        accessKeyId: process.env.R2_ACCESS_KEY_ID,
        secretAccessKey: process.env.R2_SECRET_ACCESS_KEY,
      },
    });
  }
} catch (error) {
  console.warn('[Contact API] R2 not configured:', error);
}

// In-Memory Speicher als Fallback (wird bei Server-Neustart gelöscht)
const inquiries: any[] = [];

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
      timeline, 
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

    // Versuche in R2 zu speichern
    if (r2) {
      try {
        await r2.send(new PutObjectCommand({
          Bucket: BUCKET_NAME,
          Key: `inquiries/new/${inquiryId}.json`,
          Body: JSON.stringify(inquiryData, null, 2),
          ContentType: 'application/json',
        }));
        console.log(`[Contact API] Stored in R2: ${inquiryId}`);
      } catch (r2Error) {
        console.error('[Contact API] R2 Error:', r2Error);
        // Fallback zu In-Memory
        inquiries.push(inquiryData);
        console.log(`[Contact API] Stored in memory: ${inquiryId}`);
      }
    } else {
      // Kein R2 konfiguriert - speichere in Memory
      inquiries.push(inquiryData);
      console.log(`[Contact API] Stored in memory (no R2): ${inquiryId}`);
    }

    return NextResponse.json({ 
      success: true, 
      inquiryId,
      message: 'Anfrage erfolgreich gespeichert'
    });

  } catch (error) {
    console.error('[Contact API] Error:', error);
    return NextResponse.json(
      { error: 'Interner Serverfehler' },
      { status: 500 }
    );
  }
}
