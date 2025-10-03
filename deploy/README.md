Deployment notes for performance improvements

1) Enable text compression (Gzip/Brotli)
- Nginx: see nginx.conf.example in this folder
- Apache: place apache.htaccess rules at your site root
- Most static hosts (Netlify/Vercel) enable Brotli by default

2) Serve over HTTP/2 or HTTP/3
- TLS + HTTP/2/3 reduces latency for multiplexed requests

3) Cache policy for static assets
- Add far-future caching for CSS/JS/fonts/images (with content hashing if possible)

4) Avoid redirects on the document request
- Ensure the homepage URL doesn’t redirect

