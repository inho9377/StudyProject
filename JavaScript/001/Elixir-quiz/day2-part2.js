import fs from 'fs'

const data = fs.readFileSync('Elixir-quiz/input-part2.txt').toString();

const dataList = data.trim().split('\n');

let retVal = null;
dataList.forEach((value) => {
    const find = dataList.find((value_in, index_in) => {
        return getSameCount(value_in, value) === (value_in.length-1)
    });
    if(find) {
        console.log(`Find! ${find}`)
        const chList = find.split('');
        const result = chList.reduce((acc, cur, i) => {
            return cur == value[i]? acc + cur : acc;
        });
        retVal = result;
        return false;
    }
})

console.log(`RetvaLUE : ${retVal}`);



function getSameCount(str1, str2) {
    const chList = str1.split('');

    const acc = chList.reduce((acc, cur, i) => { 
        return cur == str2[i]? +acc+1 : acc;
    }, 0)

    console.log(`${str1}. ${str2}.  ${acc}`)

    return acc;
}

export function start() {

}