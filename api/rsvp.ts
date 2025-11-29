import type { VercelRequest, VercelResponse } from '@vercel/node';
import cuid from 'cuid';

interface RSVPSubmission {
  attendingFriday: boolean;
  attendingWedding: boolean;
  email: string;
  guestCount: number;
  name: string;
  notes?: string;
}

export default async function handler(
  req: VercelRequest,
  res: VercelResponse
) {
  // Only allow POST requests
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { attendingFriday, attendingWedding, email, guestCount, name, notes } = req.body as RSVPSubmission;

    // Validate input
    if (typeof attendingFriday !== 'boolean' || typeof attendingWedding !== 'boolean' || !email || !guestCount || !name) {
      return res.status(400).json({ error: 'Missing required fields', required: ['attendingFriday','attendingWedding','email','guestCount','name'] });
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({
        error: 'Invalid email format'
      });
    }

    const Id = cuid();
    const timestamp = new Date().toISOString();

    const AIRTABLE_BASE_ID = process.env.AIRTABLE_BASE_ID;
    const AIRTABLE_TABLE_ID = process.env.AIRTABLE_TABLE_ID;
    const AIRTABLE_TOKEN = process.env.AIRTABLE_TOKEN;
    if (!AIRTABLE_BASE_ID || !AIRTABLE_TABLE_ID || !AIRTABLE_TOKEN) {
      return res.status(500).json({ error: 'Airtable environment variables not configured.' });
    }
    const url = `https://api.airtable.com/v0/${AIRTABLE_BASE_ID}/${AIRTABLE_TABLE_ID}`;
    const headers = {
      'Authorization': `Bearer ${AIRTABLE_TOKEN}`,
      'Content-Type': 'application/json'
    };
    const fields = {
      Id,
      attendingFriday,
      attendingWedding,
      email,
      guestCount,
      name,
      notes,
      timestamp,
    };
    const response = await fetch(url, {
      method: 'POST',
      headers,
      body: JSON.stringify({ fields })
    });
    const airtableResult = await response.json();
    console.log('Airtable response:', airtableResult);
    if (!response.ok) {
      return res.status(502).json({ error: 'Airtable error', airtable: airtableResult });
    }
    return res.status(200).json({ success: true, data: airtableResult });

  } catch (error) {
    console.error('RSVP/Airtable error:', error);
    return res.status(500).json({ error: 'Internal server error', message: error instanceof Error ? error.message : 'Unknown error' });
  }
}
