# nodem

Static copy of [nodem.org](https://nodem.org/) (the NODEM Network website, originally a WordPress site), prepared for GitHub Pages. The original site is no longer being updated.

## /repo: the NODEM Digital Repository

`repo/` is a static copy of the NODEM Digital Repository (repo.nodem.org). The original is a PHP app that builds its pages with JavaScript and AJAX, so it was regenerated as plain pages:

- `repo/index.html`: all objects by year; `title.html`, `person.html` and `subject.html` browse by title, person and keyword.
- `repo/objects/N.html` and `repo/authors/N.html`: one page per object and per person, with abstract, keywords, files and images.
- `repo/search.html?q=...`: search, done in the browser against `repo/data/search.json`.
- `repo/uploads`, `repo/photoAuthor`, `repo/gfx`: the files and images the repository serves.

Differences from the live repository: no login, no image lightbox, no infinite scroll, no server-side search (search runs in the browser), and no shared URL state (browse uses normal links). Video thumbnails and some external links still point to their original sites. Two author photos (Edson, and an uploaded visitor guide PDF) are missing on the live site too; the author photo falls back to the default avatar.

## Local preview

From the repository root, run `python3 -m http.server 8000` to preview the static site locally.

## Publishing with GitHub Pages

1. Push this repository to GitHub.
2. In the repository, go to **Settings → Pages**.
3. Under **Build and deployment**, choose **Deploy from a branch**, select `main` and the `/ (root)` folder, then save.

The site is served from the repository root. All internal links are relative, so it also works from a project sub-path such as `https://<user>.github.io/nodem/`.

## What changed from the WordPress site

- No WordPress, no server-side code, no database: every page is plain HTML.
- Theme CSS, JavaScript and images are kept from the original theme (`wp-content/themes/leftside`), plus the uploaded images and PDFs under `wp-content/uploads`.
- The WordPress head cruft (emoji script, embeds, feeds, REST/XML-RPC links) has been removed.
- The duplicate jQuery copies were replaced with one jQuery 1.11.1 from code.jquery.com. The design manual page keeps its own jQuery 1.9.1 (also from code.jquery.com, over HTTPS).
- The Google Analytics (Universal Analytics) snippet has been removed.
- The "Proudly powered by WordPress" credit has been replaced with a note that this is an archived static copy.
- The "NODEM Design Manual" under `wp-content/uploads/ci/` is kept as a standalone page.

Some links point to resources that were already unavailable on the live site (e.g. `new_site/.../CultureKickPastActivities.pdf`) and are left as they were.
