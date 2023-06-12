const {sortPages} = require('./report.js')
const {test, expect} = require('@jest/globals')

test('sortPages 2 pages', () => {
  const input = {
    'https:/wagslane.dev/path': 1,
    'https:/wagslane.dev': 3,
  }
  // actul output of our normalize function
  const actual = sortPages(input)
  // taking an object as input, and turning it into an array and sorting it
  const expected = [['https:/wagslane.dev', 3], ['https:/wagslane.dev/path', 1] ]
  expect(actual).toEqual(expected)
})

test('sortPages 5 pages', () => {
  const input = {
    'https:/wagslane.dev/path': 1,
    'https:/wagslane.dev': 3,
    'https:/wagslane.dev/path2': 5,
    'https:/wagslane.dev/path3': 2,
    'https:/wagslane.dev/path4': 9,
  }
  // actul output of our normalize function
  const actual = sortPages(input)
  // taking an object as input, and turning it into an array and sorting it
  const expected = [
    ['https:/wagslane.dev/path4', 9], 
    ['https:/wagslane.dev/path2', 5],
    ['https:/wagslane.dev', 3], 
    ['https:/wagslane.dev/path3', 2],
    ['https:/wagslane.dev/path', 1],
]
  expect(actual).toEqual(expected)
})