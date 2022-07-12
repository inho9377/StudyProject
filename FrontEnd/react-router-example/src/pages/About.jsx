import queryString from 'query-string'

export default function About(props) {
  console.log(props)
  const searchParams = props.location.search
  console.log(searchParams)
  const query = queryString.parse(searchParams)
  console.log(query) // 객체로 반환
  return <div>
    <h2>About 페이지 입니다.</h2>
    {query.name && <p>name 은 {query.name} 입니다.</p>}
    </div>
}
