const {normalizeURL, getURLsFromHTML} = require('./crawl.js')
const {test, expect} = require('@jest/globals')

test('normalizeURL strip protocal', () => {
  const input = 'https://blog.boot.dev/path'
  // actul output of our normalize function
  const actual = normalizeURL(input)
  const expected = 'blog.boot.dev/path'
  expect(actual).toEqual(expected)
})

test('normalizeURL strip trailing slash', () => {
  const input = 'https://blog.boot.dev/path/'
  // actul output of our normalize function
  const actual = normalizeURL(input)
  const expected = 'blog.boot.dev/path'
  expect(actual).toEqual(expected)
})

test('normalizeURL capitals', () => {
  const input = 'https://BLOG.boot.dev/path'
  // actul output of our normalize function
  const actual = normalizeURL(input)
  const expected = 'blog.boot.dev/path'
  expect(actual).toEqual(expected)
})

test('normalizeURL strip http', () => {
  const input = 'http://blog.boot.dev/path/'
  // actul output of our normalize function
  const actual = normalizeURL(input)
  const expected = 'blog.boot.dev/path'
  expect(actual).toEqual(expected)
})

test('getURLsFromHTML absolute urls', () => {
  const inputHTMLBody = `
  <html>
    <body>
      <a href="https://blog.boot.dev/">
        Boot.dev.blog
      </a>   
    </body>
  </html>
  `
  const inputBaseURL = 'https://blog.boot.dev'
  // actul output of our normalize function
  const actual = getURLsFromHTML(inputHTMLBody, inputBaseURL)
  const expected = ["https://blog.boot.dev/"]
  expect(actual).toEqual(expected)
})


test('getURLsFromHTML relative urls', () => {
  const inputHTMLBody = `
  <html>
    <body>
      <a href="/path/">
        Boot.dev.blog
      </a>   
    </body>
  </html>
  `
  const inputBaseURL = 'https://blog.boot.dev'
  // actul output of our normalize function
  const actual = getURLsFromHTML(inputHTMLBody, inputBaseURL)
  const expected = ["https://blog.boot.dev/path/"]
  expect(actual).toEqual(expected)
})


test('getURLsFromHTML multiple links - relative and absolute', () => {
  const inputHTMLBody = `
  <html>
    <body>
      <a href="/path1/">
        Boot.dev.blog
      </a>  
      <a href="https://blog.boot.dev/path2/">
      Boot.dev.blog   
      </a>
    </body>
  </html>
  `
  const inputBaseURL = 'https://blog.boot.dev'
  // actul output of our normalize function
  const actual = getURLsFromHTML(inputHTMLBody, inputBaseURL)
  const expected = ["https://blog.boot.dev/path1/", "https://blog.boot.dev/path2/"]
  expect(actual).toEqual(expected)
})

test('getURLsFromHTML invalid url', () => {
  const inputHTMLBody = `
  <html>
    <body>
      <a href="invalid">
        Invalid URL
      </a>   
    </body>
  </html>
  `
  const inputBaseURL = 'https://blog.boot.dev'
  // actul output of our normalize function
  const actual = getURLsFromHTML(inputHTMLBody, inputBaseURL)
  const expected = []
  expect(actual).toEqual(expected)
})