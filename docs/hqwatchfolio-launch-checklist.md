# HQWatchfolio Launch Checklist

This project is already configured for the public site URL:

- `https://hqwatchfolio.com`

The application code is ready, but the public launch still depends on external account access for GitHub, Vercel, and Namecheap.

## Current External Status

- Current GitHub remote still points to:
  - `https://github.com/collprosolutions-oss/contractor-timecard`
- Desired GitHub repo slug:
  - `https://github.com/collprosolutions-oss/hqwatchfolio`
- GitHub org repo creation from this environment is currently blocked by permissions.
- Vercel deployment from this environment is currently blocked until the Vercel account is authenticated.

## 1. GitHub

Create or rename the repository so the slug is:

- `collprosolutions-oss/hqwatchfolio`

If you create a new repository manually, update the local remote:

```bash
git remote set-url origin https://github.com/collprosolutions-oss/hqwatchfolio.git
git push -u origin cursor/homewatcher-foundation-924b
```

If you rename the existing repository in GitHub instead, GitHub will usually redirect the old URL, but it is still best to update `origin` to the new slug.

## 2. Vercel

In Vercel:

1. Import the GitHub repository `collprosolutions-oss/hqwatchfolio`
2. Set the production environment variable:

```bash
NEXT_PUBLIC_SITE_URL=https://hqwatchfolio.com
```

3. Add both domains:
   - `hqwatchfolio.com`
   - `www.hqwatchfolio.com`
4. Set `hqwatchfolio.com` as the primary production domain

## 3. Namecheap DNS

At Namecheap, add:

- `A` record
  - Host: `@`
  - Value: `76.76.21.21`
- `CNAME` record
  - Host: `www`
  - Value: `cname.vercel-dns-0.com`

Important:

- If Vercel shows a different project-specific value, use the value shown by Vercel instead of the generic one above.

## 4. Branding Files

These files now drive the branding:

- `public/brand-logo.svg`
- `public/brand-icon.svg`
- `app/icon.svg`

If you want to replace the current logo with an exact exported asset later, overwrite those files with your final versions.

## 5. Verification

After DNS propagates:

1. Open `https://hqwatchfolio.com`
2. Confirm the landing page loads
3. Confirm the brand logo appears in:
   - homepage hero
   - header
   - browser tab/app icon
4. Confirm these routes load:
   - `/`
   - `/admin`
   - `/clients`
   - `/properties`
   - `/portal/prop-seabrook`
   - `/subcontractors`

## Recommended Order

1. Fix GitHub repo slug
2. Import repo into Vercel
3. Add Vercel env var
4. Add Vercel domains
5. Update Namecheap DNS
6. Wait for DNS propagation
7. Verify production
