LUTCH MEDIA WEBSITE - HANDOVER
==============================
Files (each is one self-contained HTML page: CSS + JS inline, no build step)
- index.html        Home: hero, services, OUR WORK (vertical carousel + photography), about, contact
- book.html         Production calculator / booking
- our-work.html     Standalone vertical videos + photography preview (optional, same content as home #work)
- photography.html  Full photo gallery (optional)

MENU (same on every page): Our services | Work | Contact | Book now  (+ EN / Kreol toggle)
- Our services -> index.html#services
- Work         -> index.html#work
- Contact      -> index.html#contact
- Book now     -> book.html
Change these to the real Squarespace URLs when uploading.

Fonts: Google Fonts (Cormorant Garamond, Inter), loaded from the web.

STILL TO DO / PLACEHOLDERS
1. Photos/videos: all imagery is CSS colour-gradient placeholders. Replace with real images.
2. Hero background: animated grain + light leaks in code. A real video can replace it.
3. Prices on book.html are placeholders (see FILM / PHOTO arrays and RATE in the script).
4. PAYMENTS: card / Apple Pay are NOT live. book.html has a CHECKOUT_URL constant at the top
   of its script; it needs a backend endpoint that creates a Stripe Checkout session
   (Stripe adds Apple Pay) and redirects. Until then the button emails the quote to hello@lutchmedia.com.
5. Phone number, Instagram/TikTok/Vimeo links are placeholders.
6. Kreol translations were written by an AI: have a native speaker check them.
