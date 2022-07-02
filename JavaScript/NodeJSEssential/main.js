import _, { chain } from 'lodash'
 
// 산술 연산자
console.log(1 + 2)

// 할당 연산자
let a = 2
a = a + 1
a += 1


// 비교 연산자
const b = 2
console.log(a === b)
console.log(a !== b)
console.log(a < b)



function isEqual(x, y) {
    return x === y
}

console.log(isEqual(2, '2'))

// 논리 연산자
const c = a && b



//Switch
// 반드시 break 필요

// for
//(시작조건; 종료조건; 변화조건) {}



// 변수 유효범위
// let, const : 블록 내부 (Block Level 의 유효범위)
// var : 함수 내부 (Function Level 의 유효범위)

function scope() {
    console.log(a) //Reference Level
    if(true) {
        console.log(a) //유효 범위긴 하지만 할당 전이므로 undefined
        const a = 123
    }

    console.log(b) //undefined
    if(true) {
        var b = 123;
    }
}
scope()


// 형 변환
const a_5 = 1
const b_5 = '1'

console.log(a_5 === b_5)
console.log(a_5 == b_5) // 동등 연산자. 형 변환이 일어나면서 비교. 쓰지마.



// Truthy (참 같은 값)
// true, {}, [], 1, 2, 'false', -12, '3.14' ...

// Falsy (거짓 같은 값)
// false, '', null, undefined, 0, -0, NaN (Nat a Number)
// 1 + undefined = NaN

if ('false') {
    console.log(123)
}


// 함수 복습
function sum(x, y /*매개 변수*/) { //기명 함수
    console.log(x + y)
    return x + y
}

const s = function (x, y) { //익명 함수
    console.log(arguments) // 파라미터가 배열로 들어있음
    return arguments[0] + arguments[1]
}

sum(1, 3/*인수*/)
sum(4, 12)


// 화살표 함수
// () => {}
const double = function(x) {
    return x * 2
}

double(7)


const doubleArrow = (x) => {
    return x * 2
}

//축약형. 매개변수 1개로 () 제거. 실행문이 리턴 1개일때 {return} 제거
x => x * 2

const doubleArrowObject = x => ({name: 'Heropy'}) // 객체 반환시에는 () 감싸야 함. {}가 겹치니까

doubleArrow(7)

// 즉시실행함수
// IIFE, Imediatel-Invokde Function Expression

const a = 7
function double() {
    console.log(a * 2)
}
double(); //여기서 세미콜론 필요

//함수를 만들자마자 실행
(function() {
    console.log(a * 2)
})();
// (function{})()

(function() {
    console.log(a * 2)
}());
//(function{}())

// 호이스팅(Hoisting)
// 함수 선언부가 유효범위(Scope) 최상단으로 끌어올려지는 현상
const a = 7

double()
const double = function () { //함수 선언 아님. 호이스팅 해당 안 됨
    console.log(a * 2)
}
function double () { //함수 선언.
    console.log(a * 2)
}


//타이머 함수
//setTimeOut(함수, 시간(ms)) : 일정 시간 후 함수 실행
//setInterval(함수, 시간) : 시간 간격마다 함수 실행
//clearTimeout() : 설정된 Timeout함수를 종료
//clearInterval() : 설정된 Interval 함수를 종료

setTimeout(function() {
    console.log('Heropy!')
}, 3000) //3s


const timer =  setTimeout(() => {
    console.log('Heropy!')
}, 3000)

const h1El = document.querySelector('h1')
h1El.addEventListener('click', () => {
    clearTimeout(timer) //클릭시 멈춰짐
})

const timer =  setInterval(() => {
    console.log('Heropy!')
}, 3000)

const h1El = document.querySelector('h1')
h1El.addEventListener('click', () => {
    clearInterval(timer) //클릭시 멈춰짐
})


// 콜백(Callback)
// 함수의 인수로 사용되는 함수
// 실행 위치(타이밍) 보장 하기 위해 많이 사용됨

// setTimeout(함수, 시간)

function timeout(cb) {
    setTimeout(() => {
        console.log('Heropy!')
        cb()
    }, (3000));
}

timeout(() => {
    console.log('Done!')
})







const heropy = {
    firstName: 'Heropy',
    lastName: 'Park',
    getFullName: function () { // 메소드. 객체 내부에 있는 함수.
        return `${this.firstName} ${this.lastName}` //` 로 데이터 보간하여 들어감
        //this == heropy. 함수가 포함된 객체를 지칭
    }
}
console.log(heropy)
console.log(heropy.getFullName())

const amy = {
    firstName: 'Amy',
    lastName: 'Clarke',
    getFullName: function () { 
        return `${this.firstName} ${this.lastName}`
    }
}
console.log(amy)
console.log(amy.getFullName())

const neo = {
    firstName: 'Neo',
    lastName: 'Smith',
    getFullName: function () { 
        return `${this.firstName} ${this.lastName}`
    }
}
console.log(neo)
console.log(neo.getFullName())




function User(first, last) { //파스칼 케이스('U'ser)로 생성자임을 나타내는 경우가 많음
    this.firstName = first
    this.lastName = last
    // this.getFullName = function () {
    //     return `${this.firstName} ${this.lastName}`
    // }
}

// JS 는 프로토타입 기반의 언어
// 다른 언어의 class와는 조금 다름
// 각 타입의 프로토타입에는 메소드들이 많이 들어있음 (includes 등)
User.prototype.getFullName = function() {
    return `${this.firstName} ${this.lastName}`
}

//new 생성자함수()
const heropy /*인스턴스*/ = new User('Heropy', 'Park')
const amy = new User('Amy', 'Clarke')
const neo = new User('Neo', 'Smith')

console.log(heropy.getFullName()) // 메소느가 해당 함수를 '참조'함

const heropy = {} // 리터럴 : 기호를 사용해 바로 데이터를 생성함 ("A"도 동일)

