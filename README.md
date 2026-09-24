# niloy-ahashan.github.io

Source for [niloy-ahashan.github.io](https://niloy-ahashan.github.io), the personal/academic site of Ahashan Habib Niloy. Built with [Jekyll](https://jekyllrb.com/) on the [Academic Pages](https://academicpages.github.io/) theme and deployed via GitHub Pages.

## Structure

- `_pages/` - homepage, education, research, publications, and teaching pages
- `_education/`, `_research/`, `_publications/`, `_teaching/` - content collections rendered on their respective pages (one file per degree, research position, paper, or role)
- `_data/navigation.yml` - top navigation links
- `_config.yml` - site-wide settings (author info, social links, etc.)
- `files/` - downloadable files (e.g. CV PDF)
- `images/` - site images, favicons, and profile photo

## Running locally

```bash
bundle install
bundle exec jekyll serve -l -H localhost
```

Then open `http://localhost:4000`.
