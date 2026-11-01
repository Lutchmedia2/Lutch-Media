# Stripe setup (Cloudflare Worker, free tier)

GitHub Pages is static, so Stripe needs a tiny server to create Checkout sessions. Your secret key lives only here.

1. Create a Stripe account, then copy your **secret key** (use the `sk_test_...` key first) from Dashboard > Developers > API keys.
2. Create a Cloudflare account > Workers & Pages > Create Worker. Paste in `stripe-worker.js` and deploy.
3. In the Worker's Settings > Variables, add:
   - `STRIPE_SECRET_KEY` (encrypt it) = your secret key
   - `SITE_URL` = your live site URL, no trailing slash (e.g. https://yourname.github.io/lutch-website)
   - `ALLOWED_ORIGIN` = the site origin (e.g. https://yourname.github.io)
4. Copy the Worker URL into `CHECKOUT_URL` at the top of `scripts/book.js`.
5. Test with card 4242 4242 4242 4242, any future date, any CVC. Then swap in the live key.
6. For Apple Pay: Stripe Dashboard > Settings > Payment methods > Apple Pay > add and verify your domain.

Note: the amount is calculated in the browser, so a determined user could alter it. For a booking deposit flow that is usually acceptable; to lock it down, port the price table to the Worker and recompute there.
