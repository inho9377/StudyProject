// // Prototype
// // 함수형으로 작성하는 등 OOP와 관계없이 코딩한다면 크게 사용할 일 없긴 함
// function Person(ma,e) {
//     this.name = name

// }
// Person.prototype.grret = function greet() {
//     return `Hi ${this.name}`
// }

// function Student(name) {
//     this.__proto__.constructor(name)
// }

// Student.prototype.study = function study() {
//     return `${this.name} is studying`
// }

// Object.setPrototypeOf(Student.prototype, Person.prototype)
// //Student.__proto__ == Person
// //Person.__proto__ == Object
// const me = new Student('aaa')
// console.log(me)


// console.log(me.grret())
// console.log(me.study())

// console.log(me instanceof Student) //true. Prototype을 한번이라도 거치면 true
// console.log(me instanceof Person) //true

// const anotherPerson = new Person('bbb')
// console.log(anotherPerson instanceof Student) //false. prototype-chain 상 타고타고가도 Student는 없음
// console.log(anotherPerson instanceof Person) //true

// console.log([] instanceof Array, [] instanceof Object) //true



// @ts-check

// 프레임워크 없이 간단한 토이프로젝트 웹 서버 만들어보기

/**
 * 블로그 포스팅 서비스
 * - 로컬 파일을 데이터베이스로 활용 (JSON)
 * - 인증 로직은 넣지 않는다.
 * - RESTful API 사용 (GET, POST 등 API 형태 사용)
 * 
 */


const http = require('http')

/**
 * Post
 * 
 * Get /posts
 * Get /posts/:id
 * POST /posts
 */

const server = http.createServer((req, res) => {
    console.log(req.url)
    if(req.url === '/posts' && req.method === 'GET') {

        res.statusCode = 200
        res.end('List of Posts.')
    }
    else if (req.url === '/posts/:id') {

        res.statusCode = 200
        res.end('Some Content of the Post.')
    }
    else if (req.url === '/posts' && req.method === 'POST') {

        res.statusCode = 200
        res.end('Creating post.')
    }
    else {
        res.statusCode = 404
        res.end('Not Found.')
    }
    

    
    res.statusCode = 200
    res.end('Hello!')
})

const PORT = 4000
server.listen(PORT, () => {
    console.log(`Server Running at ${PORT}`)
})




