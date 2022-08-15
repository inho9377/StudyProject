const axios = require('axios')
const fs = require('fs')

let article = {}
const cralwer = (pageNumber) => {
  axios
    .get(
      `https://api.brunch.co.kr/v1/search/article?q=IT&page=${pageNumber}&pageSize=20&highlighter=y&escape=y&sortBy=accu`,
    )
    .then((response) => {
      const data = response.data
      article[pageNumber] = data.data.list.map((item) => {
        return {
          title: item.title,
          contentSummary: item.contentSummary,
          contentId: item.contentId,
        }
      })

      const nextNumber = pageNumber + 1
      console.log('current page Number : ', pageNumber)
      if (nextNumber < 10) {
        cralwer(nextNumber)
        return
      }

      fs.writeFile(
        'brunch_article.json',
        JSON.stringify(article),
        (err, data) => {
          if (err) {
            console.error(err)
            return
          }
          console.log('success file write')
        },
      )
    })
}

const data = cralwer(1)
