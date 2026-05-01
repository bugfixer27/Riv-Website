# The Quad Review

Static GitHub Pages site for Riverdale Country School science press releases.

## Pages

- `index.html` - issue homepage and press release index
- `ai-lunar-south-pole.html` - Brielle's lunar south pole press release
- `super-plants.html` - Florian's updated dune and marram grass press release

## Assets

Figure images live in `assets/images/` and are referenced with relative paths so they work on GitHub Pages. The original PDFs are intentionally not included because their headers contain student full names. The website uses first names and class years only.

## GitHub Pages

The site is ready to publish from the repository root. If the repository URL changes, update the absolute URLs in:

- `<link rel="canonical">` tags in each HTML file
- Open Graph image and URL meta tags
- `sitemap.xml`

No build step is required.
