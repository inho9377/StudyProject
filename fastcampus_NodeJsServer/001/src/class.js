// class Person {
//     constructor(name) {
//         this.name = name
//     }
//     greet() {
//         return 'bbb'
//     }
// }


// class Student extends Person {
//     constructor (name) {
//         super(name)
//     }

//     study() {
//         return 'aaa'
//     }
// }

// const me = new Student('aaa')
// console.log(me.study())
// console.log(me.greet())

// const personalDate = {
//     nickname: 'JH',
//     emial: 'jh12@email.com'
// }

// const publicData = {
//     age: 22
// }

// const user = {
//     ...personalDate, // 흩뿌려서 들어가게함
//     ...publicData
// }

// const overrides = {
//     DATABASE_HOST: 'myhost.com',
//     DATABASE_PASSWORD: 'mypassword'
// }

// const config = {
//     DATABASE_HOST: 'a',
//     DATABASE_PASSWORD: '****',
//     DATABASE_USERNAME: 'myuser',
//     ...overrides, //앞에 오게되면 반대로 config의 정보로 덮어씌워짐
// }
// /*
// {
//     DATABASE_HOST: 'myhost.com',
//     DATABASE_PASSWORD: 'mypassword',
//     DATABASE_USERNAME: 'myuser',
// }
//  */

// const user = {
//     nickname: 'jh',
//     age: 22,
//     email: 'a@aa'
// }

// const {nickname, ...personalDate} = user
// console.log(personalDate) // {age: 22, email: 'a@aa'}

// const pets = ['dog', 'cat']
// const predators = ['wolf']
// const animals = [...pets, ...predators]
// console.log(animals) // ['dog', 'cat', 'wolf']

// const [head, ...rest] = [1,2,3]
// head //1
// rest //[2,3]

// const ary = [1,2,3,4,5]

// const [head, ...rest] = ary
// conslog.log(head, rest) // 1, [2345]
// conslog.log(head, ...rest) // 1 2 3 4 5 (5개 인자가 들어간 것)

// const personalDate = {
//     email: 'abc@def',
//     password: '***'
// }

// const publicData = {
//     nickname: 'foo'
// }

// const shouldOverride = false

// const user = {
//     ...({
//         email: 'abc@def'
//         password: '***'
//     }),
//     ...(shouldOverride?
//        { 
//         nickname: 'foo'
//     } 
//     : null
//     )
// }


// function foo(head, ...rest) {
//     console.log(head)
//     console.loge(rest)
// }
// foo(1,2,3,4) //1, [2,3,4]



// const people = [
//     {
//         age: 20,
//         city: '서울',
//         pet: ['cat', 'dog']
//     },
//     {
//         age: 21,
//         city: '서울'
//     }
// ]

// function solveA() {
//     /**@type {string[]} */
//     const cities = []

//     for(const person of people) {
//         if(person.age < 30) {
//             if(!cities.find(city => person.city === city)){
//                 cities.push(person.city)
//             }
//         }
//     }

//     return cities
// }

// console.log(solveA())

// function solveAModern() {
//     const allCities = people.fillter(person => person.age <= 30)
//             .map(person => person.city)
//     const set = new Set(allCities) //  집합. 중복 없음

//     return Array.from(set)
// }

// function solveAModern_() {
//     const allCities = people.fillter(({age}) => age <= 30)
//             .map(({city}) => city)
//     const set = new Set(allCities) //  집합. 중복 없음

//     return Array.from(set)
// }


// console.log('solveAModern', solveAModern())



// /*

// {
//     '서울': {
//         'dog': 2,
//         'cat': 1
//     },
//     '대구': {
//     }
// }

// */

// /** @typedef {Object.<string, Object<string, number>} PetsOfCities */

// function solveB() {
//     /** @type{PetsOfCities} */
//     const result = {}

//     for (const person of people) {
//         const {city, pet: petOrPets} = person

//         if(petOrPets) {
//             const petsOfCity = result[city] || {}
//             if(typeof petOrPets === 'string') {
//                 const pet = petOrPets

//                 const originNumPetsOfCity = petsOfCity[pet] || 0
//                 petsOfCity[pet] = originNumPetsOfCity + 1
//             }
//             else {
//                 for(const pet of petOrPets) {
//                     const originNumPetsOfCity = petsOfCity[pet] || 0
//                     petsOfCity[pet] = originNumPetsOfCity + 1
//                 }

//             }
//             result[city] = petsOfCity
//         }
//     }

// }

// function solveBModern() {
//     return people.map(({pet: petOrPets, city}) => {
//         const pets = (typeof petOrPets === 'string'? [petOrPets] : petOrPets) || []
//         //pets를 무조건 배열로 변경

//         return {
//             city,
//             pets,
//         }
    
//     /**
//      * [
//      *  [
//      *      ["서울", "cat"],
//      *      ["서울", "dog"],
//      *  ],
//      *  [
//      *      ["부산", "dog"],
//      *  ],
//      * ]
//      */
//     }).map(({city, pets}) => {
//         pets.map(pet => [city, pet])
//     })//.flat() //여러 겹으로 되있는 배열을 한 겹 펴줌
//     .flatMap(({city, pets}) => pets.map((pet) => [city, pet]))
//     /**
//      * [
//      *  ['서울', 'cat'],
//      *  ['서울', 'dog'],
//      *  ['부산', 'dog']
//      * ]
//      */
//     .reduce((  /** @type{PetsOfCities} */result, [city, pet] ) => {
//         if(!city || !pet) {
//             return result
//         }        

//         return {
//             ...result, //result 해체하여 새 오브젝트, but 내용은 동일
//             [pet]: result[city]?.[pet] || 0 + 1 //optional chainning: undefined나 null이면 뒤로 더 진행하지 않고, 아니면 뒤 계속 연산
//             //lint에 parseOptions 추가 필요
//         }

//     }, {})
// }

// // Promise

// /* eslint-disable no-new */
// /* eslint-disable no-console */
// new Promise((resolve, reject) =>{
//     console.log('Inside Promise')
//     reject(new Error('FirstReject')) //Error 발생
//     resolve('First resolve') //resolve 이후 promise가 다음 단계로 이동

// })
// .catch((error) => {
//     console.log('error', error)
// })
// .then(value => {
//     console.log('inside first then')
//     console.log('value', value) // First resolve
// })

// //error -> then (catch 후 then 실행)
// //단, reject된 값만 사용하므로 value는 undefined 가 됨
// //resolve와 reject는 먼저 실행된 값만 사용됨. 이후 catch, then 체인을 탄다.

// new Promise((resolve, reject) =>{
//     setTimeout(() => {
//         resolve(Math.random())
//         console.log('After Resolve')
//     }, 1000);
// })
// .then((value) => {
//     console.log('then 1')
//     console.log('value', value)
// })
// .then(() => {
//     console.log('then 2')
// })
// // After Resolve -> then 1 -> value 0.2 -> then 2



// function returnPromiseForTimeout() {
//     return new Promise(resolve => {
//         setTimeout(() => {
//             resolve(Math.random())
//             console.log('After Resolve')
//         }, 1000)
//     })
// }

// returnPromiseForTimeout()
//     .then((value) => {
//         console.log(value)
//         return returnPromiseForTimeout()
//     })
//     .then(() => { //Promise가 return되었으므로. 해당 Promise가 resolve될 때 까지 기다린 후 then 호출됨
//         console.log(alert)
//         return returnPromiseForTimeout()
//     })

// returnPromiseForTimeout()

// const fs = require('fs')


// /**
//  * 
//  * @param {string} fileName 
//  */
// function readFileInPromise(fileName) {
//     return new Promise((resolve, reject) => {
//         fs.readFile.fileName(fileName, 'utf-8', (error, value) =>{
//             if(error) {
//                 reject(error)
//             }
//             resolve(value)
//         })
//     })
// }

// fs.readFile('.gitignore', 'utf-8', (error, value) => {

//     console.log(value)
// })

// //Promise 형태의 API
// fs.readFile('.gitignore', 'utf-8').then((vakue) => console.log(value))
// readFileInPromise('.gitignore').then((value) => console.log(value))



// /**
//  * 
//  * @param {number} duration 
//  */
// async function sleep(duration) {
//     return new Promise(resolve => {
//         setTimeout(() => {
//             resolve(undefined)
//         }, duration);
//     })
// }

// async function main() {
//     await sleep(1000)
//     await sleep(1000)

//     try {
//         const result = await 
//         fs.readFile('.gitignore', 'utf-8').then((vakue) => console.log(value))
//     }
//     catch(error) {
//         console.log(error)
//     }
//     console.log(result)
// }

// main()

// // @ts-check

// require('core-js')// 해당 노드에 정의되지 않은 함수들 사용 가능


// const complicatedArray = [1,[2,3]]
// const flattendArray = complicatedArray.flat()

// console.log(flattendArray)

// const original = 'abcabc123'
// const changed = original.replaceAll('abc', '123')
// console.log(changed)

// function sleep(duration) {
//     console.log('sleepstart')
//     return new Promise((resolve) => {
//         setTimeout(() => {
//             console.log('sleep done')
//             resolve(duration)
//         }, duration);
//     })
// }

// function alwaysReject() {
//     return new Promise((resolve, reject) => {
//         reject()
//     })
// }

// Promise.all([
//     sleep(1000),
//     sleep(1500),
//     sleep(2000),
//     alwaysReject() // then 이 동작하지 않음
// ]).then(() => {
//     console.log('Promise.all done!')
// })

// Promise.allSettled([
//     sleep(1000),
//     sleep(1500),
//     sleep(2000),
//     alwaysReject() // reject가 되어도 then 으로 넘어감
// ]).then(() => {
//     console.log('Promise.allSettled done!')
// })

// const objs = [{
//     foo : {
//         bar: 1
//     }
// },
// {

// },
// {
//     foo: {},
// }
// ]
// console.log(objs.map((obj) => {
//     const {foo} = obj
//     if(foo) {
//         return foo.bar
//     }
//     return undefined
// }))

// //Optional Chaining
// objs.map(obj => obj.foo?.bar) //PolyFill 로 해결 불가. Transpile 해야한다.


// @ts-check

// 프레임워크 없이 간단한 토이프로젝트 웹 서버 만들어보기
