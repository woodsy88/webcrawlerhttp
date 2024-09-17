const { log } = require('console');
const {JSDOM} = require('jsdom')

// Main crawling function
const crawlPage = async (baseURL, currentUrl, pages) => {
  // Parse URLs
  const baseURLObj = new URL(baseURL)
  const currentURLObj = new URL(currentUrl)
  
  // Check if current URL is within the same domain as base URL
  if (baseURLObj.hostname !== currentURLObj.hostname) {
    return pages
  }

  // Normalize the current URL
  const normalizedCurrentURL = normalizeURL(currentUrl)

  // If the page has already been crawled, increment the count and return
  if(pages[normalizedCurrentURL] > 0) {
    pages[normalizedCurrentURL] ++
    return pages
  }
  
  // Mark the current page as crawled
  pages[normalizedCurrentURL] = 1
  console.log(`=====currently crawling ${currentUrl}`)

  try {
    // Fetch the page content
    const response = await fetch(currentUrl)

    // Handle HTTP errors
    if (response.status > 399) {
      console.log(`server retuned an error of: ${response.status} ${response.statusText}` );
      return pages
    } 

    // Check if the response is HTML
    const contentType = response.headers.get("content-type")
    if (!contentType.includes("text/html")) {
      console.log(`none html response, content type: ${contentType} on page: ${currentUrl}` );
      return pages
    }

    // Parse the HTML content
    const htmlBody= await response.text()
    
    // Extract URLs from the HTML
    const nextURLs =  getURLsFromHTML(htmlBody,baseURL)

    // Recursively crawl each extracted URL
    for (const nextURL of nextURLs) {
      pages = await crawlPage(baseURL, nextURL, pages)
    }
    return pages
  }
  catch (error) {
    console.log(error.message);
  }
}

// Function to extract URLs from HTML content
function getURLsFromHTML(htmlBody, baseURL) {
  const urls = [];
  // Parse HTML using JSDOM
  const dom = new JSDOM(htmlBody)
  // Select all <a> tags
  const linkElements = dom.window.document.querySelectorAll('a');
  for (const linkElement of linkElements) {
      // Handle relative URLs
      if (linkElement.href.slice(0,1) === '/') {
          try {
            const urlObj = new URL(`${baseURL}${linkElement.href}`)
            urls.push(urlObj.href)
          }
          catch (error) {
            console.log(`error with relative path: ${error.message}`);
          }
      } else {
        // Handle absolute URLs
        try {
        const urlObj = new URL(linkElement.href)
        urls.push(urlObj.href)
        }
        catch (error) {
          console.log(`error with absolute path ${error.message}`);
        }
      }
  }
  return urls
}

// Function to normalize URLs
function normalizeURL(urlString) {
  const urlObj = new URL(urlString);
  // Combine hostname and pathname
  const hostPath =`${urlObj.hostname}${urlObj.pathname}`;
  // Remove trailing slash if present
  if (hostPath.length > 0 && hostPath.slice(-1) === '/') {
    return hostPath.slice(0, -1)
  } 
  return hostPath
}

// Export functions for use in other modules
module.exports = {
  normalizeURL,
  getURLsFromHTML,
  crawlPage
}

/*
Summary:
This web crawler recursively explores an entire website starting from a given base URL.
It returns an object where keys are normalized URLs of crawled pages and values are 
the number of times each URL was encountered. This provides a comprehensive map of 
the website's structure, including all unique pages within the domain and the frequency 
of internal links to each page. This data can be used for creating sitemaps, analyzing 
internal linking structures, or identifying the most linked-to pages within a site.
*/