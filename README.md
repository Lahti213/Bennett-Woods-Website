# Bennett Woods Neighborhood Website

A professional, welcoming website for the Bennett Woods neighborhood in Smyrna, GA.

## What’s Included

- **Home Page** - Welcoming hero section with call-to-action
- **About Section** - Key features and benefits of living in Bennett Woods
- **Photo Gallery** - Placeholder for neighborhood photos (ready to add your images)
- **Community News** - Announcements section (easily editable)
- **Local Services** - Directory of recommended service providers
- **Contact Form** - For prospective residents and general inquiries
- **Responsive Design** - Works perfectly on phones, tablets, and computers

## How to Get This Online

### Option 1: GitHub Pages (FREE - Recommended)

This is the easiest and most cost-effective option for a neighborhood website.

1. **Create a GitHub account** (if you don’t have one)
- Go to https://github.com
- Sign up for free
1. **Create a new repository**
- Click the “+” in the top right, select “New repository”
- Name it: `bennett-woods` (or any name you prefer)
- Make it Public
- Click “Create repository”
1. **Upload your files**
- Click “uploading an existing file”
- Drag and drop the `index.html` file
- Click “Commit changes”
1. **Enable GitHub Pages**
- Go to repository Settings
- Scroll to “Pages” section
- Under “Source”, select “main” branch
- Click Save
- Your site will be live at: `https://yourusername.github.io/bennett-woods/`
1. **Optional: Add a custom domain**
- Buy a domain (e.g., bennettwoodssmyrna.com) from Namecheap, Google Domains, etc. (~$12/year)
- In GitHub Pages settings, add your custom domain
- Update DNS settings at your domain registrar (instructions provided by GitHub)

### Option 2: Netlify (FREE)

1. Go to https://netlify.com and sign up
1. Drag and drop your website folder into Netlify
1. Get instant URL like `bennett-woods.netlify.app`
1. Can add custom domain for free

### Option 3: Traditional Web Hosting ($3-10/month)

Services like Bluehost, HostGator, or SiteGround:

- Includes domain name
- cPanel for easy file management
- Email addresses (contact@bennettwoodssmyrna.com)
- Upload files via FTP or file manager

## Customizing Your Website

### Adding Photos

Replace the placeholder gallery items with real images:

1. Add your photos to the same folder as index.html
1. In the HTML, replace gallery items like this:

```html
<!-- Replace this: -->
<div class="gallery-item">📸 Street Views</div>

<!-- With this: -->
<div class="gallery-item">
    <img src="street-view.jpg" alt="Bennett Woods street view" style="width: 100%; height: 100%; object-fit: cover;">
</div>
```

### Updating Announcements

Find the `<section id="announcements">` in the HTML and add/edit announcement items:

```html
<div class="announcement-item">
    <div class="announcement-date">Month Day, Year</div>
    <h3>Your Announcement Title</h3>
    <p>Your announcement text here.</p>
</div>
```

### Changing Colors

Near the top of the HTML file, you’ll find color variables:

```css
:root {
    --primary-color: #2d5a3d;      /* Dark green */
    --secondary-color: #6b9575;    /* Medium green */
    --accent-color: #e8b44a;       /* Gold */
}
```

Change these hex codes to your preferred colors.

### Adding Local Services

Find the `<section id="services">` and add service items:

```html
<div class="service-item">
    <h4>🔨 Your Service Category</h4>
    <p>Description and contact info</p>
</div>
```

### Making the Contact Form Actually Work

The form currently shows a success message but doesn’t send emails. To make it functional:

**Option A: Use a Form Service (Easiest)**

- Formspree (free tier): https://formspree.io
- Add your email, get a form endpoint
- Update the form action attribute

**Option B: Use Netlify Forms (if using Netlify)**

- Add `netlify` attribute to your form
- Emails sent automatically

**Option C: Use Google Forms**

- Create a Google Form
- Link to it from your contact section

## Maintenance Tips

1. **Update announcements regularly** - Keep content fresh
1. **Add photos** - Visual content attracts more interest
1. **Monitor the contact form** - Respond to inquiries promptly
1. **Share on social media** - Link to your website from Facebook groups, Nextdoor, etc.
1. **SEO** - The site is already optimized with meta descriptions, but adding a blog section with local content helps

## Support

Need help? The site is built with standard HTML/CSS, so any web developer can help you customize it further.

## Next Steps

1. Download the index.html file
1. Choose a hosting option from above
1. Upload and launch!
1. Share the URL with neighbors and on local platforms

Good luck with your Bennett Woods website!
