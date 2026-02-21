import type { VercelRequest, VercelResponse } from '@vercel/node';
import cuid from 'cuid';

interface SongSuggestion {
  name: string;
  song: string;
}

export default async function handler(
  req: VercelRequest,
  res: VercelResponse
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { name, song } = req.body as SongSuggestion;

    if (!song || typeof song !== 'string' || !song.trim()) {
      return res.status(400).json({ error: 'Missing required field: song' });
    }
    if (!name || typeof name !== 'string' || !name.trim()) {
      return res.status(400).json({ error: 'Missing required field: name' });
    }

    const Id = cuid();
    const timestamp = new Date().toISOString();

    const AIRTABLE_BASE_ID = process.env.AIRTABLE_BASE_ID;
    const AIRTABLE_SONGS_TABLE_ID = process.env.AIRTABLE_SONGS_TABLE_ID;
    const AIRTABLE_TOKEN = process.env.AIRTABLE_TOKEN;
    if (!AIRTABLE_BASE_ID || !AIRTABLE_SONGS_TABLE_ID || !AIRTABLE_TOKEN) {
      return res.status(500).json({ error: 'Airtable environment variables not configured.' });
    }

    const url = `https://api.airtable.com/v0/${AIRTABLE_BASE_ID}/${AIRTABLE_SONGS_TABLE_ID}`;
    const headers = {
      'Authorization': `Bearer ${AIRTABLE_TOKEN}`,
      'Content-Type': 'application/json'
    };
    const fields = {
      Id,
      name: name.trim(),
      song: song.trim(),
      timestamp,
    };

    const response = await fetch(url, {
      method: 'POST',
      headers,
      body: JSON.stringify({ fields })
    });
    const airtableResult = await response.json();
    console.log('Airtable song suggestion response:', airtableResult);

    if (!response.ok) {
      return res.status(502).json({ error: 'Airtable error', airtable: airtableResult });
    }

    return res.status(200).json({ success: true, data: airtableResult });
  } catch (error) {
    console.error('Song suggestion error:', error);
    return res.status(500).json({ error: 'Internal server error', message: error instanceof Error ? error.message : 'Unknown error' });
  }
}
