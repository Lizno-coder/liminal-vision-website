import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';
import { NextRequest, NextResponse } from 'next/server';

const r2 = new S3Client({
  region: 'auto',
  endpoint: process.env.R2_ENDPOINT || `https://${process.env.R2_ACCOUNT_ID}.r2.cloudflarestorage.com`,
  credentials: {
    accessKeyId: process.env.R2_ACCESS_KEY_ID!,
    secretAccessKey: process.env.R2_SECRET_ACCESS_KEY!,
  },
});

const BUCKET_NAME = process.env.R2_BUCKET_NAME || 'liminalo-contact-requests';

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
      source = 'contact-page'
    } = body;

    // Validation
    if (!name || !email || !message) {
      return NextResponse.json(
        { error: 'Name, E-Mail und Nachricht sind erforderlich' },
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
      source,
      status: 'new',
      createdAt: timestamp,
      updatedAt: timestamp,
    };

    // Store in R2 under inquiries/new/
    await r2.send(new PutObjectCommand({
      Bucket: BUCKET_NAME,
      Key: `inquiries/new/${inquiryId}.json`,
      Body: JSON.stringify(inquiryData, null, 2),
      ContentType: 'application/json',
    }));

    console.log(`[Contact API] New inquiry stored: ${inquiryId}`);

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
