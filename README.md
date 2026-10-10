# Harshavardhan Babu Dasari | Portfolio

A React portfolio adapted from the Netflix-inspired reference repository. It uses Vite, Tailwind CSS 4, GSAP with ScrollTrigger, and Framer Motion.

## Run locally

```sh
npm ci
npm run dev
```

Create a production build with `npm run build`; check code style with `npm run lint`.

## Update portfolio content

- Profile choices and section order: `src/components/ProfileChooser.jsx` and `src/App.jsx`
- Hero identity and portrait placeholder: `src/components/Hero.jsx`
- Biography and education: `src/components/About.jsx`
- Expertise and skills: `src/components/Expertise.jsx` and `src/components/Skills.jsx`
- Project cards: `src/components/Projects.jsx`
- Work experience and editable dates: `src/components/Experience.jsx`
- Contact details and footer links: `src/components/Contact.jsx` and `src/components/Footer.jsx`

The project card is an editable placeholder because no project details were present in the starting workspace. Replace it only with verified project information and links.

## Google Sheets contact form

The form receiver source is in `google-apps-script/Code.gs` and is configured for the spreadsheet supplied for this portfolio. To connect it:

1. Open the spreadsheet and choose **Extensions > Apps Script**.
2. Copy `google-apps-script/Code.gs` into the Apps Script editor and save.
3. Deploy it as a **Web app**, executing as your account and allowing access to anyone. Authorize the requested spreadsheet access.
4. Copy the deployed web app URL ending in `/exec` into `.env.local`:

```env
VITE_GOOGLE_SHEETS_WEB_APP_URL=https://script.google.com/macros/s/YOUR_DEPLOYMENT_ID/exec
```

5. Restart the Vite dev server. The public web app URL accepts form submissions and appends rows to the first sheet tab; do not put a Google API key or spreadsheet edit credentials in frontend code.