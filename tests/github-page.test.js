const {
  generateBreadcrumbData,
} = require('../src/index.js');

describe('Test json-ld-breadcrumb', () => {
  beforeAll(() => {
    const protocol = 'https';
    const host = 'gabrielkoo.github.io';
    const pathname = '/json-ld-breadcrumb/sample-page';

    delete window.location;
    window.location = Object.create(window);
    window.location = {
      host,
      href: `${protocol}://${host}${pathname}`,
      origin: `${protocol}://${host}`,
      pathname,
      protocol,
    };
    window.breadcrumbMap = {
      'json-ld-breadcrumb': 'json-ld-breadcrumb',
    };
  });

  it('Can generate correct breadcrumb data for GitHub Page', () => {
    const data = generateBreadcrumbData();

    expect(data).toHaveProperty('@type', 'BreadcrumbList');
    expect(data).toHaveProperty('itemListElement');
    expect(data.itemListElement).toHaveLength(2);
    expect(data.itemListElement[0]).toHaveProperty('item.name', 'json-ld-breadcrumb');
    expect(data.itemListElement[1]).toHaveProperty('item.name', 'Sample Page');
  });
});
