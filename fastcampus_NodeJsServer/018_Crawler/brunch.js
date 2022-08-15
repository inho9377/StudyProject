const puppeteer = require('puppeteer')
const cheerio = require('cheerio')

const crawling = async (href) => {
  const browser = await puppeteer.launch({
    headless: false,
  })
  const page = await browser.newPage()
  await page.setViewport({
    width: 1440,
    height: 1080,
  })
  await page.goto(href)
  await page.screenshot({ path: 'brunch.png' })

  await page.click('input.txt_search') // 해당 영역 클릭하여 f12 개발자 도구로 확인
  await page.keyboard.type('hello world')
  await page.keyboard.press('Enter')

  await page.waitForNavigation()
  // 페이지 안에서 동작함. console.log도 해당 브라우저에서 확인 가능
  let infiniteScollInterval = setInterval(async () => {
    await page.evaluate(() => {
      window.scrollBy(0, window.innerHeight) // 0 부터 Height 까지 스크롤
    })
  })

  setTimeout(async () => {
    clearInterval(infiniteScollInterval)
    console.log('done')
    await browser.close()
  }, 1000 * 10)
}

crawling('https://brunch.co.kr/search?q=IT&type=article')
