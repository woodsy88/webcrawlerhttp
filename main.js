const {crawlPage} = require('./crawl')
const {printReport} = require('./report')


async function main() {
  if (process.argv.length < 3) {
    console.log("no website provided");
    process.exit(1)
  }
  if (process.argv.lenght > 3) {
    console.log("to many command line arguements");
  }
  // for (const arg of process.argv) {
  //   console.log(arg)
  // }

  const baseURL = process.argv[2]
  console.log("starting crawl on:", baseURL)
  const pages = await crawlPage(baseURL,baseURL,{})
  printReport(pages)
}

main()