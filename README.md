# json-ld-breadcrumb
[![Actions Status](https://github.com/gabrielkoo/json-ld-breadcrumb/workflows/Test/badge.svg)](https://github.com/gabrielkoo/json-ld-breadcrumb/actions)

Generate breadcrumb in `json-ld` format and inject into HTML

GitHub Page: [https://gabrielkoo.github.io/json-ld-breadcrumb/](https://gabrielkoo.github.io/json-ld-breadcrumb/)


## Background
Nowadays SEO is really important for a website. However, sometimes you don't have much access on the building process of the HTML pages, e.g. if you are using (static) website generators that do not come with plugins to auto-generate breadcrumb's `json-ld` data, or if you are using tools like [Webflow](https://webflow.com/).

While plugins serving such a purpose are available everywhere for [PHP](https://www.php.net/) / [WordPress](https://wordpress.org/) / JavaScript frameworks like [Gatsby](https://www.gatsbyjs.org/), it seems that no one has made one for vanilla HTML yet.

## How it works
This package retrieves the path of the current page by `window.location`, and then injects a script tag with [breadcrumb data as specifid in schema.org](https://schema.org/BreadcrumbList).

Google's [documentation on structured data](https://developers.google.com/search/docs/guides/intro-structured-data#structured-data-format) mentions that:

> JavaScript notation embedded in a \<script\> tag in the page head or body. The markup is not interleaved with the user-visible text, which makes nested data items easier to express, such as the Country of a PostalAddress of a MusicVenue of an Event. Also, Google can read JSON-LD data when it is dynamically injected into the page's contents, such as by JavaScript code or embedded widgets in your content management system.

Therefore, it is possible for Google to parse these dynamically injected `json-ld` data.

## Usage

First, run `yarn build`. Then the file `json-ld-breadcrumb.min.js` will be available in the `./dist` directory.

Embed the file `json-ld-breadcrumb.min.js` into your HTML file.

```html
<script>
// Optional: Setup an optional mapping for the breadcrumb names:
window.breadcrumbMap = {
  'aida-rikako': '逢田梨香子',
  kawaisa: '可愛さ',
};
</script>
<script src="/path/to/dist/json-ld-breadcrumb.min.js"></script>
```

If above scripts are embedded in say, https://domain.ltd/seiyu-artist/Aida-Rikako/kawaisa, then the breadcrumb should look like this:

```html
<script type="application/ld+json">
{
  "@context": "http://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    {
      "@type": "ListItem",
      "position": 1,
      "item": {
        "@type": "WebPage",
        "@id": "https://domain.ltd/seiyu-artist",
        "name": "Seiyu Artist",
        "url": "https://domain.ltd/seiyu-artist"
      }
    },
    {
      "@type": "ListItem",
      "position": 2,
      "item": {
        "@type": "WebPage",
        "@id": "https://domain.ltd/seiyu-artist/Aida-Rikako",
        "name": "逢田梨香子",
        "url": "https://domain.ltd/seiyu-artist/Aida-Rikako"
      }
    },
    {
      "@type": "ListItem",
      "position": 3,
      "item": {
        "@type": "WebPage",
        "@id": "https://domain.ltd/seiyu-artist/Aida-Rikako/kawaisa",
        "name": "可愛さ"
      }
    }
  ]
}
</script>
```

## Sample

[https://gabrielkoo.github.io/json-ld-breadcrumb/sample-page](https://gabrielkoo.github.io/json-ld-breadcrumb/sample-page)


## Testing

```bash
yarn test
```
