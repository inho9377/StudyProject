// @ts-check

const fs = require('fs')

const data = fs.readFileSync('local/big-file', 'utf-8')

let chunkCount = 0

/** @type {Object.<string,number>} */
const numBLocksPerCharacter = {
  a: 0,
  b: 0,
}

/** @type {string} */
let prevCharacter = ''

for (let i = 0; i < data.length; i += 1) {
  if (data[i] !== prevCharacter) {
    const newCharacter = data[i]

    if (!newCharacter) {
      continue
    }

    prevCharacter = newCharacter
    numBLocksPerCharacter[newCharacter] += 1
  }
}
