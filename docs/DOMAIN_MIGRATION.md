# Domain Migration Guide: msonsite.github.io/dcqbikes → dcqbikes.be

## ⚠️ IMPORTANT: Do NOT execute these steps until you're ready to migrate!

This document contains instructions for migrating the website from `msonsite.github.io/dcqbikes` to `dcqbikes.be`.

---

## Files to Update

### 1. `index.html`
Update all URLs in the `<head>` section:
- **Line ~11**: `og:url` meta tag
- **Line ~14**: `og:image` meta tag  
- **Line ~15**: `og:image:secure_url` meta tag
- **Line ~22**: `twitter:url` meta tag
- **Line ~25**: `twitter:image` meta tag
- **Line ~32**: `canonical` link
- **Line ~33**: `sitemap` link

**Find and Replace:**
- Find: `https://msonsite.github.io/dcqbikes`
- Replace: `https://dcqbikes.be`

### 2. `robots.txt`
- **Line 5**: Update sitemap URL

### 3. `sitemap.xml`
- Update all `<loc>` tags (4 locations):
  - Homepage
  - Privacy Policy
  - Terms and Conditions
  - Cookie Policy

### 4. Create `CNAME` file
Create a new file named `CNAME` in the root directory with:
```
dcqbikes.be
```

---

## DNS Configuration

After updating the files, configure DNS with your domain registrar:

### Option 1: A Records (Recommended)
Add the following A records pointing to GitHub Pages IPs:
```
185.199.108.153
185.199.109.153
185.199.110.153
185.199.111.153
```

### Option 2: CNAME Record
Add a CNAME record:
```
dcqbikes.be → msonsite.github.io
```

---

## GitHub Pages Settings

1. Go to your GitHub repository settings
2. Navigate to **Pages** section
3. Under **Custom domain**, enter: `dcqbikes.be`
4. Check **Enforce HTTPS** (recommended)

---

## Verification Checklist

- [ ] All URLs updated in `index.html`
- [ ] `robots.txt` updated
- [ ] `sitemap.xml` updated
- [ ] `CNAME` file created
- [ ] DNS records configured
- [ ] GitHub Pages custom domain configured
- [ ] SSL certificate active (may take a few minutes)
- [ ] Test website loads at `https://dcqbikes.be`
- [ ] All internal links work correctly
- [ ] Submit updated sitemap to Google Search Console

---

## Notes

- DNS propagation can take 24-48 hours
- SSL certificate activation usually takes a few minutes after DNS is configured
- Keep the old domain accessible during migration for testing
- Update any external links or bookmarks pointing to the old domain

