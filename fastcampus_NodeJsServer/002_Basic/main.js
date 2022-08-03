// require

const { path, paths, fileName } = module
console.log({
  path,
  paths,
  fileName,
})

console.log(require('./animals'))

const animalsA = require('./animals')
const animalsB = require('./animals') // require 여러번 해도 실행 자체는 1번만 이루어짐
console.log(animalsA === animalsB) //log

const fs = require('fs')
const { Stream } = require('stream')

//utf8 : 파일을 어떻게 읽어야 할지 알려줌
const result = fs.readFile('src/test', 'utf-8')

console.log(result)

const bufferFromFile = fs.readFile('src/test', 'utf-8')
const buf = Buffer.from([97, 98, 99, 100, 101])

console.log(buf.compare(bufferFromFile))

const bufB = Buffer.from([1, 2])
const bufs = Buffer.from(buf, bufB)
bufs.sort(Buffer.compare)
console.log(buf)

const buf = Buffer.from([0, 1, 2, 3])

console.log(Buffer.isBuffer([0, 0, 0, 0]))

buf.readInt32LE() //32비트 정수로 읽음


const stream = fs.createReadStream('src/test')

stream.pipe(process.stdout)

process.stdin.setEncoding('utf-8')
process.stdin.on('data', data => {
    console.log(data, data.length)
})

pricess.stdin.pipe(process.stdout)

process.exit(1)

const os = require('os')

console.log(os.arch())
console.log(os.platform())
console.log(os.cpus())


const path = require('path') //어디서 실행하냐에 따라 달라짐
const fileContent = fs.readFileSync('./test.txt', 'utf-8')

// 경로 합치기. 절대경로로 만들어줌
const filePath = path.resolve(__filename, './text.txt')
const fileContent1 = fs.readFileSync(filePath, 'utf-8')
console.log(fileContent)
