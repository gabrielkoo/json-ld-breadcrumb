/* Your code goes here */
/* global window, document */
const titleCase = str => str.replace(/\b\S/g, t => t.toUpperCase());

const getBreadcrumbName = (name) => {
  const cleanedName = name
    .replace(/_/g, '-')
    .toLowerCase();

  let result = titleCase(cleanedName).replace(/-/g, ' ');

  const { breadcrumbMap } = window;
  if (typeof breadcrumbMap === 'object') {
    const key = breadcrumbMap[cleanedName];
    if (key) result = key;
  }

  return result;
};

export const generateBreadcrumbData = () => {
  const { origin, pathname } = window.location;

  const paths = pathname.split('/').filter(s => s !== '');
  const trailingSlash = pathname.endsWith('/') ? '/' : '';

  return {
    '@context': 'http://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: paths.map((path, index) => {
      const url = `${origin}/${paths.slice(0, index + 1).join('/')}${trailingSlash}`;
      const name = getBreadcrumbName(path);
      return {
        '@type': 'ListItem',
        position: index + 1,
        item: {
          '@type': 'WebPage',
          '@id': url,
          name,
          url,
        },
      };
    }),
  };
};

export const injectSchemaScript = (data) => {
  const head = document.getElementsByTagName('head')[0];
  const script = document.createElement('script');
  script.type = 'application/ld+json';
  script.innerHTML = JSON.stringify(data);
  head.append(script);
};

const makeBreadcrumbScript = () => {
  const data = generateBreadcrumbData();
  injectSchemaScript(data);
};

makeBreadcrumbScript();
