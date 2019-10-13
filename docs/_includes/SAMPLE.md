# Sample Page for Dynamically Generated json-ld structured data

You should see the following structured data in `json-ld` format:

```html
<script type="application/ld+json">
{
  "@context":"http://schema.org",
  "@type":"BreadcrumbList",
  "itemListElement":[
    {
      "@type":"ListItem",
      "position":1,
      "item":{
        "@type":"WebPage",
        "@id":"https://gabrielkoo.github.io/json-ld-breadcrumb",
        "name":"JSON-LD Breadcrumb",
        "url":"https://gabrielkoo.github.io/json-ld-breadcrumb"
      }
    },
    {
      "@type":"ListItem",
      "position":2,
      "item":{
        "@type":"WebPage",
        "@id":"https://gabrielkoo.github.io/json-ld-breadcrumb/sample-page",
        "name":"Sample Page",
        "url":"https://gabrielkoo.github.io/json-ld-breadcrumb/sample-page"
      }
    }
  ]
}
</script>
```

[Go back](https://gabrielkoo.github.io/json-ld-breadcrumb/)
