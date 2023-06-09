const { log } = require('console');
const {JSDOM} = require('jsdom')

const crawlPage = async (baseURL, currentUrl, pages) => {
  
  const baseURLObj = new URL(baseURL)
  const currentURLObj = new URL(currentUrl)
  
  if (baseURLObj.hostname !== currentURLObj.hostname) {
    return pages
  }
  const normalizedCurrentURL = normalizeURL(currentUrl)
  // if already crawled this page, increment the count
  if(pages[normalizedCurrentURL] > 0) {
    pages[normalizedCurrentURL] ++
    return pages
  }
  
  pages[normalizedCurrentURL] = 1
  console.log(`=====currently crawling ${currentUrl}`)

  try {
    const response = await fetch(currentUrl)
    // console.log("response", response);

    if (response.status > 399) {
      console.log(`server retuned an error of: ${response.status} ${response.statusText}` );
      return pages
      
    } 
    const contentType = response.headers.get("content-type")
    if (!contentType.includes("text/html")) {
      console.log(`none html response, content type: ${contentType} on page: ${currentUrl}` );
      return pages
    }

      // use text() to parse the html instead of using .json(), whic does .json()
      const htmlBody= await response.text()
      // console.log(html);
      const nextURLs =  getURLsFromHTML(htmlBody,baseURL)

      for (const nextURL of nextURLs) {
        pages = await crawlPage(baseURL, nextURL, pages)
      }
      return pages
  }
  catch (error) {
    console.log(error.message);
  }
}

function getURLsFromHTML(htmlBody, baseURL) {
  const urls = [];
  const dom = new JSDOM(htmlBody)
  const linkElements = dom.window.document.querySelectorAll('a');
  for (const linkElement of linkElements) {
      // if the first character is a /, its a relative url
      if (linkElement.href.slice(0,1) === '/') {
          try {
            // relative urls
            const urlObj = new URL(`${baseURL}${linkElement.href}`)
            // console.log("urlString", urlObj);
            urls.push(urlObj.href)
          }
          catch (error) {
            console.log(`error with relative path: ${error.message}`);
          }
      } else {
        try {
        // absolute urls
        const urlObj = new URL(linkElement.href)
        // console.log("urlString", urlObj);
        urls.push(urlObj.href)
        }
        catch (error) {
          console.log(`error with absolute path ${error.message}`);
        }
      }
  }
  // console.log("urls", urls);
  return urls
}

function normalizeURL(urlString) {
  const urlObj = new URL(urlString);
  // console.log(urlObj);
  const hostPath =`${urlObj.hostname}${urlObj.pathname}`;
  // check if last character equals a slash
  if (hostPath.length > 0 && hostPath.slice(-1) === '/') {
    // return the url minus the last character which is a slash
    return hostPath.slice(0, -1)
  } 
  return hostPath
}

// normalizeURL('https://blog.boot.dev/path')`

module.exports = {
  normalizeURL,
  getURLsFromHTML,
  crawlPage
}