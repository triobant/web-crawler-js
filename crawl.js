import { JSDOM } from  'jsdom'

function normalizeURL(url) {
    const urlObj = new URL(url)
    let fullPath = `${urlObj.host}${urlObj.pathname}`
    if (fullPath.slice(-1) === '/') {
        fullPath = fullPath.slice(0, -1)
    }
    return fullPath
}

function getURLsFromHTML(html, baseURL) {
    const urls = []
    const dom = new JSDOM(html)
    const anchors = dom.window.document.querySelectorAll('a')

    for (const anchor of anchors) {
        if (anchor.hasAttribute('href')) {
            let href = anchor.getAttribute('href')

            try {
                // convert any relative URLs to absolute URLs
                href = new URL(href, baseURL).href
                urls.push(href)
            } catch(err) {
                consolge.log(`${err.message}: ${href}`)
            }
        }
    }

    return urls
}

async function crawlPage(currentURL) {
    // fetch and parse the html of the currentURL
    console.log(`crawling ${currentURL}`)

    let res
    try {
        res = await fetch(currentURL)
    } catch (err) {
        throw new Error(`Got Network error: ${err.message}`)
    }

    if (res.status > 399) {
        console.log(`Got HTTP error: ${res.status} ${res.statusText}`)
        return
    }

    const contentType = res.headers.get('content-type')
    if (!contentType || !contentType.includes('text/html')) {
        console.log(`Got non-HTML response: ${contentType}`)
        return
    }

    console.log(await res.text())
}

export { normalizeURL, getURLsFromHTML, crawlPage }
