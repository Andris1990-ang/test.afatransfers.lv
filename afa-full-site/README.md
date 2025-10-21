
# AFA Transfers — Full Site

Pages: Home, About, Fleet, Tours, Order, Contact
Languages: EN (default), LV, RU (toggle LV|RU|EN, no flags)
Deploy target: Vercel (static + serverless functions)

## Deploy (GitHub → Vercel)
1. Put files in repo **root** (`public/`, `api/`, `vercel.json`).
2. Vercel → Add New → Project → Import from GitHub
   - Framework: **Other**
   - If your code is in a subfolder, set **Root Directory** to that folder name.
3. Deploy.

## Environment Variables
### Email (choose one)
- Resend
  - `RESEND_API_KEY`
  - `RESEND_FROM` = `AFA Transfers <noreply@afatransfer.lv>`
  - `BOOKING_TO` = `amrtransfersgroup@gmail.com`
- or Gmail SMTP
  - `SMTP_HOST = smtp.gmail.com`
  - `SMTP_PORT = 465`
  - `SMTP_SECURE = true`
  - `SMTP_USER = amrtransfersgroup@gmail.com`
  - `SMTP_PASS = <Google App Password (16 chars)>`
  - `BOOKING_TO = amrtransfersgroup@gmail.com`

### Autocomplete (choose one)
- `MAPBOX_TOKEN` = `pk...`
- or `GOOGLE_PLACES_KEY` = `AIza...`

After setting ENV vars → Redeploy.

## Where to edit
- Texts / translations: `public/assets/js/i18n.json`
- Styles (header won't wrap): `public/assets/css/styles.css`
- Fleet images: replace files in `public/assets/images/fleet/`
- Tour images: replace files in `public/assets/images/tours/`
- Order form fields: `public/order.html`
- Email logic: `api/booking.js`
- Autocomplete: `api/places.js`, JS in `public/assets/js/order.js`
