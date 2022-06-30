import _ from 'lodash'
import getType from './getType'

console.log(_.camelCase('hello world'))

console.log(typeof 'Hello')
console.log(typeof 123)
console.log(typeof true)
console.log(typeof undefined)
console.log(typeof null) //의도하여 비워 놓음
console.log(typeof {}) //Object
console.log(typeof []) //Object

console.log(getType(123))
console.log(getType(false))
console.log(getType(null))
console.log(getType({}))
console.log(getType([])) //Array
