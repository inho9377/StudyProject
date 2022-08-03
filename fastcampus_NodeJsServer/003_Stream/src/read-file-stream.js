//@ts-check

//aabbabaabbbbbaababb ... aaaabbbb
//위와 같은 파일에서 a의 연속 구간 a chunk 의 개수와 b의 연속 구간 b chunk 의 개수를 세는 프로그램

const fs = require('fs')

const rs = fs.createReadStream('local/big-file', {
  encoding: 'utf-8',
})

let chunkCount = 0

/** @type {Object.<string,number>} */
const numBLocksPerCharacter = {
  a: 0,
  b: 0,
}

/** @type {string} */
let prevCharacter

const { log } = console
rs.on('data', (data) => {
  if (typeof data !== 'string') {
    return
  }

  for (let i = 0; i < data.length; i += 1) {
    if(data[i] !== prevCharacter) {
        const newCharacter = data[i]

        if (!newCharacter) {
            continue
        }
        
        prevCharacter = newCharacter
        numBLocksPerCharacter[newCharacter] += 1
    }
  }

  chunkCount += 1
  log('Event: data', data[0])
})

rs.on('end', () => {
  log('end')
  log('blockCount: ', numBLocksPerCharacter)
})
