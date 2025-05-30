# Hall X Sports League Registration Portal 🏆

[**▶️ Live demo**](https://script.google.com/macros/s/AKfycbxap9RGq0zCTT4nz2GLxZ_qJjrpbXWnMq6h-9v_YVdUIUmcs4NG0Wz_BoT-LDzOFQ_TuA/exec)

*A no-frills Google Apps Script that lets any hostel or dorm kick-start a multi-sport league in a couple of clicks.*

---

## 📋 What’s inside

| File | Purpose |
|------|---------|
| **Code.gs**   | Server-side Apps Script – handles form auto-fill, writes to Google Sheets, builds the “Registered Teams” feed |
| **form.html** | Complete front-end (team + individual registration forms, splash screen, live roster) |
| **css.html**  | Colourful responsive theme |

> **Just copy each file into Tools → **Extensions ▸ **Apps Script**, swap the spreadsheet URL, and deploy as a “Web app”. No CLI, no build step.

---

## ✨ Features

* **Type-ahead auto-fill** – start typing a name, the script fills roll # & room # straight from your resident sheet  
* **Captain-only team creation** – ensures players belong to the same hall and prevents duplicate squads  
* **Individual sign-ups** – latecomers can register solo; captains can draft them if they need subs  
* **Live “Registered Teams” board** – committee sees rosters grow in real time  
* **One codebase, many sports** – duplicate the project, change a few labels, and you’ve got badminton or chess registration ready to go ✓

---

## 🏟 Hall X Sports League at a glance

* **10 sports** played across weekends: cricket, football, volleyball, basketball, badminton, table-tennis, kabaddi, chess, carrom, gym events  
* **Block-wise championship** – every win = 10 pts, runner-up = 7, third = 5. Highest total crowns the *Ultimate Block Champion*.  
* **WhatsApp hubs for every sport** – captains coordinate fixtures; admins broadcast rules & updates  
  * Football 👉 `https://chat.whatsapp.com/Cc1rRpfLh4D65IXFznj9G9`  
  * Volleyball 👉 `https://chat.whatsapp.com/H4F99znbDQoEOLpRqfWent`  
  * _(see `Hall X Sports League Rules.pdf` for the full list)_  

> More than 500 residents joined across Blocks A/B/C in 2024-25, registering **37 teams** and **120+ individual free agents** – all without a single spreadsheet typo.

---

## 🚀 Quick start (5 minutes)

1. **Make / open a Google Sheet** to hold resident data & registrations.  
2. **Extensions → Apps Script** – create three files: `Code.gs`, `form.html`, `css.html` – copy-paste from this repo.  
3. In **Code.gs** change  
   ```js
   const spreadsheetUrl = 'https://docs.google.com/spreadsheets/d/…';
to the URL of **your** Sheet.  
4. Adjust sheet names (`sheet1`, `sheet2`, …) or hall numbers as needed.  
5. **Deploy → Web app**  
   - **Execute as:** *Me*  
   - **Who has access:** *Anyone*  

   Copy the web-app URL and share it with residents—done! 🎉  
6. You can see a working version here:  
👉 **[Live demo](https://script.google.com/macros/s/AKfycbxap9RGq0zCTT4nz2GLxZ_qJjrpbXWnMq6h-9v_YVdUIUmcs4NG0Wz_BoT-LDzOFQ_TuA/exec)**
### 🏏 Using it for another sport

- Duplicate the Apps Script project.  
- Swap the header text & fee inside `form.html`.  
- (Optional) Drop the new PDF rulebook into the repo so future secretaries have it.

## 📸 Screenshots
<p align="center">
  <img src="https://github.com/user-attachments/assets/27ca841d-e3c7-403d-9605-aa149019032c" width="90%" />
  <img src="https://github.com/user-attachments/assets/7eb76ea9-dd3e-44e3-b179-b0fdc57de4d4" width="90%" />
  <img src="https://github.com/user-attachments/assets/da4f0e5c-f92f-4bc4-a589-1fbfae7c9078" width="90%" />
  <img src="https://github.com/user-attachments/assets/ae2be7d0-e80e-41d9-89f0-f1756ce6d2ab" width="90%" />
</p>


## 📄 License

MIT — fork it, tweak it, share it.  
Credit appreciated: **Suresh Ragireddy, Sports Secretary Hall X (2024-25)**.

[![Live demo](https://img.shields.io/badge/Live-Demo-brightgreen?logo=googlechrome&logoColor=white)](https://script.google.com/macros/s/AKfycbxap9RGq0zCTT4nz2GLxZ_qJjrpbXWnMq6h-9v_YVdUIUmcs4NG0Wz_BoT-LDzOFQ_TuA/exec)
