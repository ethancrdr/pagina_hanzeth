import { google } from 'googleapis';

export type LeadRow = [
  timestamp: string,
  name: string,
  email: string,
  whatsapp: string,
  country: string,
  profile: string,
  priority: string,
  timePerWeek: string,
  interest: string,
];

function isConfigured(): boolean {
  return Boolean(
    process.env.GOOGLE_SHEETS_PRIVATE_KEY &&
      process.env.GOOGLE_SHEETS_CLIENT_EMAIL &&
      process.env.GOOGLE_SHEETS_SHEET_ID,
  );
}

export async function appendLeadRow(row: LeadRow): Promise<void> {
  if (!isConfigured()) {
    throw new Error('Google Sheets credentials are not configured');
  }

  const privateKey = process.env.GOOGLE_SHEETS_PRIVATE_KEY!.replace(/\\n/g, '\n');
  const clientEmail = process.env.GOOGLE_SHEETS_CLIENT_EMAIL!;
  const sheetId = process.env.GOOGLE_SHEETS_SHEET_ID!;

  const auth = new google.auth.JWT({
    email: clientEmail,
    key: privateKey,
    scopes: ['https://www.googleapis.com/auth/spreadsheets'],
  });

  const sheets = google.sheets({ version: 'v4', auth });
  await sheets.spreadsheets.values.append({
    spreadsheetId: sheetId,
    range: 'A1',
    valueInputOption: 'USER_ENTERED',
    requestBody: { values: [row] },
  });
}

export const sheetsReady = isConfigured;
