function normalizeURL(urlString) {
  const urlObj = new URL(urlString);
  console.log(urlObj);
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
  normalizeURL
}