function printReport(pages) {
  console.log("=============");
  console.log("REPORTS");
  console.log("=============");
  const sortedPages = sortPages(pages)
  for (const sortedPage of sortedPages) {
    const url = sortedPage[0]
    const hits = sortedPage[1]
    console.log(`found ${hits} links to page ${url}`);
  }
  console.log("=============");
  console.log("END REPORT");
  console.log("=============");  
}

function sortPages(pages) {
  const pagesArr = Object.entries(pages)
  pagesArr.sort((a,b) => {
    let aHits = a[1]
    let bHits = b[1]
    return bHits - aHits
  })
  return pagesArr
}
module.exports = {
  sortPages,
  printReport
}