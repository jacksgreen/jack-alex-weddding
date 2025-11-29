import type { VercelRequest, VercelResponse } from '@vercel/node';

interface RSVPSubmission {
  firstName: string;
  lastName: string;
  email: string;
  attending: string;
  timestamp?: string;
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
    const { firstName, lastName, email, attending } = req.body as RSVPSubmission;

    // Validate input
    if (!firstName || !lastName || !email || !attending) {
      return res.status(400).json({
        error: 'Missing required fields',
        required: ['firstName', 'lastName', 'email', 'attending']
      });
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({
        error: 'Invalid email format'
      });
    }

    // Add timestamp
    const submission: RSVPSubmission = {
      firstName: firstName.trim(),
      lastName: lastName.trim(),
      email: email.trim().toLowerCase(),
      attending: attending.trim(),
      timestamp: new Date().toISOString()
    };

    // TODO: Add Airtable or Google Sheets integration here
    // For now, just log the submission
    console.log('RSVP Submission:', submission);

    // Placeholder response - replace with actual API call
    // Example for future integration:
    //
    // Airtable:
    // const response = await fetch(`https://api.airtable.com/v0/${baseId}/${tableName}`, {
    //   method: 'POST',
    //   headers: {
    //     'Authorization': `Bearer ${process.env.AIRTABLE_API_KEY}`,
    //     'Content-Type': 'application/json'
    //   },
    //   body: JSON.stringify({ fields: submission })
    // });
    //
    // Google Sheets:
    // const auth = new google.auth.GoogleAuth({
    //   credentials: JSON.parse(process.env.GOOGLE_CREDENTIALS),
    //   scopes: ['https://www.googleapis.com/auth/spreadsheets']
    // });
    // const sheets = google.sheets({ version: 'v4', auth });
    // await sheets.spreadsheets.values.append({
    //   spreadsheetId: process.env.SHEET_ID,
    //   range: 'Sheet1!A:C',
    //   valueInputOption: 'USER_ENTERED',
    //   requestBody: { values: [[submission.name, submission.attending, submission.timestamp]] }
    // });

    return res.status(200).json({
      success: true,
      message: 'RSVP submitted successfully',
      data: submission
    });

  } catch (error) {
    console.error('Error processing RSVP:', error);
    return res.status(500).json({
      error: 'Internal server error',
      message: error instanceof Error ? error.message : 'Unknown error'
    });
  }
}
