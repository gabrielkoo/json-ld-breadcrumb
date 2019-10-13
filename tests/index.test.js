const {
  generateBreadcrumbData,
  injectSchemaScript,
} = require('../src/index.js');

describe('Test json-ld-breadcrumb', () => {
  beforeAll(() => {
    const protocol = 'https';
    const host = 'domain.ltd';
    const pathname = '/path-1/path-second/path_the-third/Aida-Rikako/kawaii';

    delete window.location;
    window.location = Object.create(window);
    window.location = {
      host,
      href: `${protocol}://${host}${pathname}`,
      origin: `${protocol}://${host}`,
      pathname,
      protocol,
    };
  });

  it('Can generate breadcrumb data', () => {
    const data = generateBreadcrumbData();

    expect(data).toHaveProperty('@type', 'BreadcrumbList');
    expect(data).toHaveProperty('itemListElement');
    expect(data.itemListElement).toHaveLength(5);
    [
      'Path 1',
      'Path Second',
      'Path The Third',
      'Aida Rikako',
      'Kawaii',
    ].forEach((name, index) => expect(data.itemListElement[index]).toHaveProperty('item.name', name));
  });

  it('Can generate breadcrumb data with name mapping', () => {
    window.breadcrumbMap = {
      'path-second': 'Special Breadcrumb Name',
      'path-the-third': 'My third path name',
      'aida-rikako': '逢田梨香子',
      kawaii: '超絶可愛い',
    };

    const data = generateBreadcrumbData();

    expect(data).toHaveProperty('@type', 'BreadcrumbList');
    expect(data).toHaveProperty('itemListElement');
    expect(data.itemListElement).toHaveLength(5);
    [
      'Path 1',
      'Special Breadcrumb Name',
      'My third path name',
      '逢田梨香子',
      '超絶可愛い',
    ].forEach((name, index) => expect(data.itemListElement[index]).toHaveProperty('item.name', name));
  });

  it('Can inject script into HTML', () => {
    document.head.innerHTML = `
      <title>Website Title</title>
      <script>console.log('hi');</script>
    `;
    const data = { key: 'value' };

    injectSchemaScript(data);

    const head = document.getElementsByTagName('head')[0];
    const scripts = Object.values(head.getElementsByTagName('script'));
    const script = scripts[scripts.length - 1];

    expect(script).toHaveProperty('type', 'application/ld+json');
    expect(script).toHaveProperty('innerHTML', JSON.stringify(data));
  });
});
