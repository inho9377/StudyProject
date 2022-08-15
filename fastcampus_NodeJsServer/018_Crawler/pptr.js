const puppeteer = require('puppeteer')
const cheerio = require('cheerio')

// 하나의 페이지 안에 있는 하이퍼링크를 수집하고 재검색하는 함수
const crawling = async (href) => {
  const browser = await puppeteer.launch({
    headless: false, // 크롬 열기
  })
  const page = await browser.newPage()
  await page.setViewport({
    width: 1440,
    height: 1080,
  })
  await page.goto(href)

  const html = await page.content() // HTML 추출
  const $ = cheerio.load(html)
  let hrefArray = []
  $('a').each((index, element) => {
    const href = $(element).attr('href')
    hrefArray.push(href)
  })
  console.log(hrefArray)
  await browser.close()
  hrefArray.forEach((item) => {
    crawling(item)
  })
}

crawling('https://www.tistory.com/category/life')
