// @ts-check

const { log } = console

const fs = require('fs')

function processJSON(highWaterMark) {
  const rs = fs.createReadStream('local/jsons', {
    encoding: 'utf-8',
    highWaterMark: highWaterMark,
  })

  let totalSum = 0
  let accumulatedJsonStr = ''

  rs.on('data', (chunk) => {
    log('Event data', chunk)

    if (typeof chunk !== 'string') {
      return
    }

    accumulatedJsonStr += chunk
    //줄바꿈 문자 포함되는가
    const lastNewlineIdx = accumulatedJsonStr.lastIndexOf('\n')

    //JSON 여러개 있을 것
    const jsonLinesStr = accumulatedJsonStr.substring(0, lastNewlineIdx)
    //JSON 앞으로 만들어질 것
    accumulatedJsonStr = accumulatedJsonStr.substring(lastNewlineIdx)

    totalSum += jsonLinesStr
      .split('\n')
      .map((jsonLine) => {
        try {
          JSON.parse(jsonLine)
        } catch {
          return undefined
        }
      })
      .filter((json) => json) //undefined 제외
      .map((json) => json.data)
      .reduce((sum, curr) => sum + curr, 0) //reduce : prevValue: 이전까지 쌓인값, currentValue: 배열의 각 값

    //   totalSum += chunk
    //     .split('\n')
    //     .map((jsonLine) => {
    //       try {
    //         JSON.parse(jsonLine)
    //       } catch {
    //         return undefined
    //       }
    //     })
    //     .filter((json) => json) //undefined 제외
    //     .map((json) => json.data)
    //     .reduce((sum, curr) => sum + curr, 0) //reduce : prevValue: 이전까지 쌓인값, currentValue: 배열의 각 값
  })

  rs.on('end', () => {
    log('Event end')
    log(`totalSum (high WaterMark : ${highWaterMark})`, totalSum)
  })
}

for (let watermark = 1; watermark < 50; watermark += 1) {
  processJSON(watermark)
}
