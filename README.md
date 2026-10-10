# Harshavardhan Babu Dasari | Portfolio

A React portfolio adapted from a Netflix-inspired reference repository. It uses Vite, Tailwind CSS 4, GSAP with ScrollTrigger, and Framer Motion.

## Run locally

```sh
npm ci
npm run dev
```

Create a production build with `npm run build`; check code style with `npm run lint`.

## Update portfolio content

- Profile choices and section order: `src/components/ProfileChooser.jsx` and `src/App.jsx`
- Hero identity and portrait: `src/components/Hero.jsx`
- Biography and education: `src/components/About.jsx`
- Expertise and skills: `src/components/Expertise.jsx` and `src/components/Skills.jsx`
- Project cards: `src/components/Projects.jsx`
- Work experience and dates: `src/components/Experience.jsx`
- Contact details and footer links: `src/components/Contact.jsx` and `src/components/Footer.jsx`

Update the project cards with verified project information and links.

## Google Sheets contact form

The form receiver source is in `google-apps-script/Code.gs`.

To connect it:

1. Open the spreadsheet and choose **Extensions → Apps Script**.
2. Copy `google-apps-script/Code.gs` into the Apps Script editor and save.
3. Deploy it as a **Web app** and authorize the requested spreadsheet access.
4. Copy the deployed web app URL ending in `/exec` into `.env.local`:

```env
VITE_GOOGLE_SHEETS_WEB_APP_URL=https://script.google.com/macros/s/YOUR_DEPLOYMENT_ID/exec
```

5. Restart the Vite development server.

Do not put Google API keys or spreadsheet credentials in frontend code.