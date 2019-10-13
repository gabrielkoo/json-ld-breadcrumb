"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.injectSchemaScript = exports.generateBreadcrumbData = void 0;

var _typeof2 = _interopRequireDefault(require("@babel/runtime/helpers/typeof"));

/* Your code goes here */

/* global window, document */
var titleCase = function titleCase(str) {
  return str.replace(/\b\S/g, function (t) {
    return t.toUpperCase();
  });
};

var getBreadcrumbName = function getBreadcrumbName(name) {
  var cleanedName = name.replace(/_/g, '-').toLowerCase();
  var result = titleCase(cleanedName).replace(/-/g, ' ');
  var _window = window,
      breadcrumbMap = _window.breadcrumbMap;

  if ((0, _typeof2["default"])(breadcrumbMap) === 'object') {
    var key = breadcrumbMap[cleanedName];
    if (key) result = key;
  }

  return result;
};

var generateBreadcrumbData = function generateBreadcrumbData() {
  var _window$location = window.location,
      origin = _window$location.origin,
      pathname = _window$location.pathname;
  var paths = pathname.split('/').filter(function (s) {
    return s !== '';
  });
  var trailingSlash = pathname.endsWith('/') ? '/' : '';
  return {
    '@context': 'http://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: paths.map(function (path, index) {
      var url = "".concat(origin, "/").concat(paths.slice(0, index + 1).join('/')).concat(trailingSlash);
      var name = getBreadcrumbName(path);
      return {
        '@type': 'ListItem',
        position: index + 1,
        item: {
          '@type': 'WebPage',
          '@id': url,
          url: url,
          name: name
        }
      };
    })
  };
};

exports.generateBreadcrumbData = generateBreadcrumbData;

var injectSchemaScript = function injectSchemaScript(data) {
  var head = document.getElementsByTagName('head')[0];
  var script = document.createElement('script');
  script.type = 'application/ld+json';
  script.innerHTML = JSON.stringify(data);
  head.append(script);
};

exports.injectSchemaScript = injectSchemaScript;

var makeBreadcrumbScript = function makeBreadcrumbScript() {
  var data = generateBreadcrumbData();
  injectSchemaScript(data);
};

makeBreadcrumbScript();