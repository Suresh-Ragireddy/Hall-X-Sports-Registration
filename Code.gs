function doGet() {
  const html = HtmlService.createTemplateFromFile('form')
    .evaluate()
    .setTitle('Football Registration')
    .setSandboxMode(HtmlService.SandboxMode.IFRAME);
    
  const css = HtmlService.createHtmlOutputFromFile('css').getContent();
  return html.setContent(`<style>${css}</style>${html.getContent()}`);
}

/**
 * Get names for the given hall.
 * For hall "10", returns names from Sheet2; for hall "11" from Sheet3; for hall "14" from Sheet4.
 * Each sheet is assumed to have 4 columns: Name, Roll Number, Room Number, Hall.
 * Only rows matching the requested hall are returned as an array of [Name, Roll Number, Room Number].
 */
function getNamesForHall(hall) {
  const spreadsheetUrl = 'https://docs.google.com/spreadsheets/d/1Y2v8G4G6jR_tyH672UoWsownXT6fCLPnTLWihnD_RBI/edit';
  const spreadsheet = SpreadsheetApp.openByUrl(spreadsheetUrl);
  let sheet;
  if (hall === "10") {
    sheet = spreadsheet.getSheetByName("sheet2");
  } else if (hall === "11") {
    sheet = spreadsheet.getSheetByName("sheet3");
  } else if (hall === "14") {
    sheet = spreadsheet.getSheetByName("sheet4");
  } else {
    throw new Error("Invalid hall selection: " + hall);
  }
  if (!sheet) {
    throw new Error("Sheet not found for hall " + hall);
  }
  const data = sheet.getRange(2, 1, sheet.getLastRow() - 1, 4).getValues();
  // Filter rows to ensure the Hall column (index 3) matches the selected hall.
  const filtered = data.filter(row => row[3] == hall);
  // Return only [Name, Roll Number, Room Number]
  return filtered.map(row => [row[0], row[1], row[2]]);
}

/**
 * Save team registration data.
 * Expected header row in Sheet1:
 * ['Team Name', 'Hall', 'Name', 'Roll Number', 'Room Number', 'WhatsApp Number', 'Email ID', 'Role', 'Timestamp']
 */
function saveData(teamName, hall, captainDetails, playersDetails) {
  const spreadsheetUrl = 'https://docs.google.com/spreadsheets/d/1Y2v8G4G6jR_tyH672UoWsownXT6fCLPnTLWihnD_RBI/edit';
  const spreadsheet = SpreadsheetApp.openByUrl(spreadsheetUrl);
  const sheet1 = spreadsheet.getSheetByName('sheet1');
  if (!sheet1) {
    throw new Error('Sheet1 not found!');
  }
  
  const expectedHeader = ['Team Name', 'Hall', 'Name', 'Roll Number', 'Room Number', 'WhatsApp Number', 'Email ID', 'Role', 'Timestamp'];
  let headerMismatch = false;
  
  if (sheet1.getLastRow() === 0) {
    headerMismatch = true;
  } else {
    const headerValues = sheet1.getRange(1, 1, 1, expectedHeader.length).getValues()[0];
    if (headerValues.length !== expectedHeader.length) {
      headerMismatch = true;
    } else {
      for (let i = 0; i < expectedHeader.length; i++) {
        if (headerValues[i] !== expectedHeader[i]) {
          headerMismatch = true;
          break;
        }
      }
    }
  }
  
  if (headerMismatch) {
    sheet1.clear();
    sheet1.appendRow(expectedHeader);
  }
  
  // Save captain's details.
  sheet1.appendRow([
    teamName,
    hall,
    captainDetails[0],
    captainDetails[1],
    captainDetails[2],
    captainDetails[3],
    captainDetails[4],
    'Captain',
    new Date()
  ]);
  
  // Save each player's details.
  playersDetails.forEach(function(player) {
    sheet1.appendRow([
      teamName,
      hall,
      player[0],
      player[1],
      player[2],
      '',
      '',
      'Player',
      new Date()
    ]);
  });
}

/**
 * Get registered teams from Sheet1 by grouping rows based on Team Name.
 * For each team, extract the hall (from column 2), the captain’s name (row where Role === "Captain", column 3),
 * and an array of player names (from rows where Role === "Player", column 3).
 */
function getRegisteredTeams() {
  try {
    const spreadsheetUrl = 'https://docs.google.com/spreadsheets/d/1Y2v8G4G6jR_tyH672UoWsownXT6fCLPnTLWihnD_RBI/edit';
    const spreadsheet = SpreadsheetApp.openByUrl(spreadsheetUrl);
    const sheet1 = spreadsheet.getSheetByName('sheet1');
    if (!sheet1) {
      throw new Error('Sheet1 not found!');
    }
    const data = sheet1.getDataRange().getValues();
    if (data.length < 2) return [];
    
    const teamsMap = {};
    // Skip header row (index 0)
    for (let i = 1; i < data.length; i++) {
      const row = data[i];
      const teamName = row[0];
      const hall = row[1];
      if (!teamName) continue;
      if (!teamsMap[teamName]) {
        teamsMap[teamName] = { hall: hall, captain: null, players: [] };
      }
      const role = row[7];
      if (role === "Captain") {
        teamsMap[teamName].captain = row[2]; // Captain's name (column 3)
      } else if (role === "Player") {
        teamsMap[teamName].players.push(row[2]); // Player's name (column 3)
      }
    }
    
    const teams = [];
    for (const t in teamsMap) {
      teams.push({
        teamName: t,
        hall: teamsMap[t].hall,
        captainName: teamsMap[t].captain,
        players: teamsMap[t].players
      });
    }
    return teams;
  } catch (e) {
    Logger.log("Error in getRegisteredTeams: " + e);
    return [];
  }
}

/**
 * Save individual registration data.
 * The individual registration is stored in a separate sheet named "individual" with header:
 * ['Name', 'Roll Number', 'Room Number', 'Hall', 'WhatsApp Number', 'Email ID', 'Timestamp']
 */
function saveIndividualData(details) {
  const spreadsheetUrl = 'https://docs.google.com/spreadsheets/d/1Y2v8G4G6jR_tyH672UoWsownXT6fCLPnTLWihnD_RBI/edit';
  const spreadsheet = SpreadsheetApp.openByUrl(spreadsheetUrl);
  let sheet = spreadsheet.getSheetByName('individual');
  if (!sheet) {
    sheet = spreadsheet.insertSheet('individual');
    sheet.appendRow(['Name', 'Roll Number', 'Room Number', 'Hall', 'WhatsApp Number', 'Email ID', 'Timestamp']);
  }
  sheet.appendRow([
    details[0], // Name
    details[1], // Roll Number
    details[2], // Room Number
    details[3], // Hall
    details[4], // WhatsApp Number
    details[5], // Email ID
    new Date()
  ]);
}

/**
 * Get individual registrations from the "individual" sheet.
 */
function getIndividualRegistrations() {
  const spreadsheetUrl = 'https://docs.google.com/spreadsheets/d/1Y2v8G4G6jR_tyH672UoWsownXT6fCLPnTLWihnD_RBI/edit';
  const spreadsheet = SpreadsheetApp.openByUrl(spreadsheetUrl);
  const sheet = spreadsheet.getSheetByName('individual');
  if (!sheet) {
    return [];
  }
  const data = sheet.getDataRange().getValues();
  if (data.length < 2) return [];
  let individuals = [];
  for (let i = 1; i < data.length; i++) {
    let row = data[i];
    individuals.push({
      name: row[0],
      roll: row[1],
      room: row[2],
      hall: row[3],
      whatsapp: row[4],
      email: row[5],
      timestamp: row[6]
    });
  }
  return individuals;
}
