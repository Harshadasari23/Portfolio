const SPREADSHEET_ID = '1ppeMApvrKPMoj7PnuIFXtV2gIsJIN4JcO1iCG1cV1ek';

function doPost(event) {
  const lock = LockService.getScriptLock();
  lock.waitLock(10000);

  try {
    const data = JSON.parse(event.postData.contents || '{}');
    const firstName = cleanCell(data.firstName, 100);
    const lastName = cleanCell(data.lastName, 100);
    const email = cleanCell(data.email, 254);
    const message = cleanCell(data.message, 10000);

    if (!firstName || !lastName || !email || !message) {
      throw new Error('First name, last name, email, and message are required.');
    }

    const sheet = SpreadsheetApp.openById(SPREADSHEET_ID).getSheets()[0];
    if (sheet.getLastRow() === 0) {
      sheet.appendRow(['Received At', 'First Name', 'Last Name', 'Email', 'Message', 'Source']);
    }

    sheet.appendRow([
      new Date(),
      firstName,
      lastName,
      email,
      message,
      cleanCell(data.source || 'Portfolio contact form', 100)
    ]);

    return ContentService
      .createTextOutput(JSON.stringify({ ok: true }))
      .setMimeType(ContentService.MimeType.JSON);
  } finally {
    lock.releaseLock();
  }
}

function cleanCell(value, maxLength) {
  const text = String(value || '').trim().slice(0, maxLength);
  return text.replace(/^([=+\-@])/, "'$1");
}