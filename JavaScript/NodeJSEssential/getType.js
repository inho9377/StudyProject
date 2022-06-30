
//default : 가장 기본적인 함수 데이터
export default function getType(data) {
    return Object.prototype.toString.call(data).slice(8, -1)
}