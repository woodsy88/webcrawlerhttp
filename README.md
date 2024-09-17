# webcrawlerhttp

This is a web crawler application that recursively explores and maps the structure of a website.

## How to Use

To use the app, run:

`npm start <url to crawl>`

Example:

`npm start https://www.spacedventures.com/`

## What It Does

This web crawler application does the following:

1. Starts from a given base URL and recursively crawls all pages within the same domain.
2. Extracts and follows links from each page to discover the site structure.
3. Keeps track of how many times each page is linked to within the site.
4. Respects the same-domain policy, not following links to external websites.

## How It Works

1. The main `crawlPage` function:
   - Checks if the current URL is within the same domain as the base URL.
   - Normalizes URLs and tracks visited pages.
   - Fetches page content, checks for errors, and ensures it's HTML.
   - Extracts URLs from the HTML and recursively crawls them.

2. The `getURLsFromHTML` function:
   - Parses HTML using JSDOM.
   - Extracts all `<a>` tags and their `href` attributes.
   - Handles both relative and absolute URLs.

3. The `normalizeURL` function:
   - Standardizes URLs by removing the protocol and trailing slashes.

## Output

The crawler returns an object where:
- Keys are normalized URLs of crawled pages
- Values are the number of times each URL was encountered during the crawl

This output provides:
1. A map of all unique pages within the domain
2. The frequency of internal links to each page

## Use Cases

This web crawler can be useful for:
- Creating a sitemap
- Analyzing internal linking structure
- Identifying the most linked-to pages within a site
- Understanding the overall structure of a website

## Note

This crawler is designed for educational and analytical purposes. Always respect robots.txt files and website terms of service when crawling websites.