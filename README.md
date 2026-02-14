# SoCal Bradley Electric Website

A minimal, professional website for SoCal Bradley Electric - a licensed and bonded electrical contractor serving San Diego County.

## Features

- **Responsive Design**: Works seamlessly on desktop, tablet, and mobile devices
- **Progressive Disclosure**: Service details expand/collapse for clean information presentation
- **One-Page Layout**: Smooth scrolling between sections with clear visual delineation
- **Contact Form**: Ready to integrate with form services
- **SEO Friendly**: Proper meta tags and semantic HTML
- **Accessibility**: ARIA labels and keyboard navigation support

## Technology Stack

- Pure HTML5, CSS3, and vanilla JavaScript
- No dependencies or frameworks
- Optimized for GitHub Pages hosting

## Files Structure

```
.
├── index.html              # Main HTML file
├── styles.css              # All styling
├── script.js               # Interactive features
├── logo-placeholder.svg    # Temporary logo (replace with actual logo)
└── README.md              # This file
```

## Setup Instructions for GitHub Pages

### Step 1: Create GitHub Repository

1. Go to [GitHub](https://github.com) and create a new account specifically for the business (if desired)
2. Create a new repository named `socalbradleyelectric.github.io` (or any name you prefer)
3. Initialize it as public

### Step 2: Upload Files

1. Click "uploading an existing file" or use Git commands
2. Upload all files from this project:
   - `index.html`
   - `styles.css`
   - `script.js`
   - `logo-placeholder.svg`
   - `README.md`

### Step 3: Enable GitHub Pages

1. Go to repository Settings
2. Scroll down to "Pages" section (left sidebar)
3. Under "Source", select "Deploy from a branch"
4. Select branch: `main` (or `master`)
5. Select folder: `/ (root)`
6. Click Save

The site will be live at: `https://[username].github.io/[repository-name]`

### Step 4: Add Custom Domain

Once you meet with the client and get their domain information:

1. In GitHub repository, go to Settings > Pages
2. Under "Custom domain", enter: `socalbradleyelectric.com`
3. Click Save
4. GitHub will create a `CNAME` file in your repository

**Then configure the domain registrar:**

1. Log into where they registered the domain (GoDaddy, Namecheap, etc.)
2. Go to DNS settings
3. Add these DNS records:

   **For apex domain (socalbradleyelectric.com):**
   ```
   Type: A
   Name: @
   Value: 185.199.108.153
   
   Type: A
   Name: @
   Value: 185.199.109.153
   
   Type: A
   Name: @
   Value: 185.199.110.153
   
   Type: A
   Name: @
   Value: 185.199.111.153
   ```

   **For www subdomain:**
   ```
   Type: CNAME
   Name: www
   Value: [username].github.io
   ```

4. Wait 24-48 hours for DNS propagation (usually faster)
5. Return to GitHub Pages settings and check "Enforce HTTPS"

## Customization Guide

### Replace Logo

1. Replace `logo-placeholder.svg` with the actual logo files
2. Supported formats: SVG (preferred), PNG, JPG
3. Recommended dimensions: 200x60px or similar aspect ratio
4. Update the `<img>` tag in `index.html` if changing filename

### Update Contact Form

The form currently uses a simulated submission. To make it functional:

**Option 1: Formspree (Easiest)**
1. Sign up at [Formspree.io](https://formspree.io)
2. Create a new form
3. Replace the form submission in `script.js`:

```javascript
// In contactForm.addEventListener('submit', ...)
const response = await fetch('https://formspree.io/f/YOUR_FORM_ID', {
    method: 'POST',
    body: formData,
    headers: {
        'Accept': 'application/json'
    }
});
```

**Option 2: Netlify Forms**
1. If you switch to Netlify hosting instead of GitHub Pages
2. Add `netlify` attribute to the form tag:
```html
<form id="contactForm" class="contact-form" netlify>
```

**Option 3: Google Forms**
1. Create a Google Form
2. Get the form action URL
3. Update the form to submit to Google

### Update Content

- **Phone Number**: Search for `619-333-6470` and replace all instances
- **License Number**: Search for `1131979` and replace
- **Instagram Handle**: Update `@socalbradleyelectric` links
- **Service List**: Edit the service categories in the "Services Section" of `index.html`

### Color Customization

Colors are defined in CSS variables at the top of `styles.css`:

```css
:root {
    --navy: #1a1f35;
    --gold: #f39c12;
    /* etc. */
}
```

Change these values to update the entire site's color scheme.

## Testing Locally

To test the website on your computer before uploading:

1. Simply open `index.html` in a web browser
2. Or use a local server:
   ```bash
   # Python 3
   python -m http.server 8000
   
   # Python 2
   python -m SimpleHTTPServer 8000
   ```
3. Visit `http://localhost:8000` in your browser

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## Performance

- Minimal external dependencies
- Optimized images (replace placeholder with optimized logo)
- CSS and JavaScript are minified-ready
- Fast load times (<1 second on good connections)

## Accessibility

- Semantic HTML5 elements
- ARIA labels for interactive elements
- Keyboard navigation support
- Screen reader friendly
- Color contrast meets WCAG AA standards

## SEO

- Meta descriptions included
- Semantic heading structure (H1-H5)
- Alt text for images (add when logo is replaced)
- Mobile-friendly (Google ranking factor)
- Fast loading (Google ranking factor)

## Future Enhancements

Consider adding:
- Google Analytics for traffic tracking
- Google Business integration
- Customer testimonials section
- Photo gallery of completed projects
- Blog section for electrical tips
- Service area map

## License

© 2024 SoCal Bradley Electric. All rights reserved.

## Support

For technical support with the website, contact the developer.
For business inquiries, call 619-333-6470.

---

**Note**: Remember to replace the logo placeholder and configure the contact form before going live!
