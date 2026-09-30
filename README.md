# niloy-ahashan.github.io

Source for [niloy-ahashan.github.io](https://niloy-ahashan.github.io), the personal/academic site of Ahashan Habib Niloy. Built with [Jekyll](https://jekyllrb.com/), based on the [Academic Pages](https://academicpages.github.io/) theme with a custom card-based design, and deployed with GitHub Pages from the `master` branch.

## Structure

**Content**

- `_pages/` - the homepage (`about.html`), `education.html`, `research.html`, `publications.html`, `teaching.html`, and the `404.html` page
- `_education/`, `_research/`, `_publications/`, `_teaching/` - one Markdown file per degree, research position, paper, or teaching role, shown as cards on the matching page
- `_config.yml` - site-wide settings: sidebar profile (name, bio lines, links), analytics, and the share image
- `_data/navigation.yml` - top menu links
- `files/` - downloadable files (the CV PDF linked by the homepage "Download CV" button)

**Images**

- `images/niloy.png` - profile photo; `images/favicon*`, `apple-touch-icon-180x180.png`, `manifest.json` - browser tab icons
- `images/share-card.png` - preview image shown when the site link is shared (set as `og_image` in `_config.yml`)
- `images/logos/` - institution and publisher logos used on the cards
- `images/campus/` - campus photos shown when hovering over cards
- `images/fun/` - the Champions League ball and FC Barcelona crest on the homepage

**Design**

- `_layouts/` - `default` (page shell), `archive` (all main pages), `publication` (single paper pages), `compress`
- `_includes/` - sidebar, header, footer, SEO tags, and the card templates (`teaching-card.html`, `research-card.html`, `review-card.html`)
- `_sass/layout/` - styles; the site's own design lives in `_education.scss` (cards and pages), `_profile.scss` (sidebar), `_brand.scss` (header name, menu, homepage photo), and `_theme-toggle.scss` (light/dark theme)
- `assets/js/` - `theme.js` (light/dark toggle), `nav.js` (menu effects, external links in new tabs, sidebar on phones), `cards.js` (card animations, abstracts, copy citation), `main.min.js` (theme scripts)

## Adding content

Copy an existing file in the right folder, rename it, and edit its fields:

- **Degree** - `_education/` (`title`, `school`, `school_url`, `period`, `location`, optional `gpa`, `status: current|graduated`, `logo`, `photo`)
- **Research position** - `_research/` (`research_group: graduate|undergraduate|review` decides the section; reviewer entries use `order`)
- **Paper** - `_publications/` (`category: manuscripts|conferences`, `venue_short`, `publisher_logo`, `authors`, `abstract`, `citation`, `paperurl`)
- **Teaching role** - `_teaching/` (`role_group: ta|lecturer`, `period`, `courses`, optional `current: true`, `status`, `title_url`)

Logos go in `images/logos/` and campus photos in `images/campus/`. Newer entries appear first, sorted by `date`.

## Analytics

Visits are counted with [GoatCounter](https://www.goatcounter.com/) (no cookies). The dashboard is at https://niloy.goatcounter.com. It is turned on by `analytics.goatcounter_code` in `_config.yml`; leave it empty to turn it off.

## Running locally

```bash
bundle install
bundle exec jekyll serve -l -H localhost
```

Then open `http://localhost:4000`.

## Publishing

Push to `master`; GitHub Pages rebuilds the site in a minute or two. The repository must stay **public** for GitHub Pages to serve the site on a free account.
