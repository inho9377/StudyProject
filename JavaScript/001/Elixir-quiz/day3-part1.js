import fs from 'fs'

const data = fs.readFileSync('input-part3.txt').toString();

const dataList = data.trim().split('\n');

let initValue = [];
dataList[0].split('').forEach((value, index) => {
    console.log(index)
    initValue.push({zero : 0, one : 0});
})

console.log(initValue)
const totalCount = dataList.reduce((acc, cur, i) => {
    const charList = cur.split('')
    acc = charList.reduce((accChar, cur, i) => {
        if(cur == '0') {
            accChar[i].zero++;
        }
        else if (cur == '1') {
            accChar[i].one++;
        }
        console.log(accChar[i])
        return accChar;
    }
    , acc)

    return acc;
}, initValue)

const up = totalCount.reduce((acc, cur, i) => {
    acc += cur.zero > cur.one? '1' : '0'
    return acc
}, '')

const down = totalCount.reduce((acc, cur, i) => {
    acc += cur.zero > cur.one? '0' : '1'
    return acc;
},'')

function changeBase(number, fromBase, toBase) {
    if (fromBase == 10)
        return (parseInt(number)).toString(toBase)
    else if (toBase == 10)
        return parseInt(number, fromBase);
    else {
        var numberInDecimal = parseInt(number, fromBase);
        return parseInt(numberInDecimal).toString(toBase);
    }
}

const number1 = changeBase(up, 2, 10);
const number2 = changeBase(down, 2, 10);
console.log(number1 * number2)

