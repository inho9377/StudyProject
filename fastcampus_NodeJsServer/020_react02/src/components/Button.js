import './../style/Button.scss'
import styled from 'styled-components'

// 만들 태그
// HTML 태그를 갖게 됨
const MyButton = styled.button`
  font-size: 24px;
`

export default function Button() {
  return <MyButton>Green</MyButton>
}

// 복잡한 형태의 컴포넌트
// 컴포넌트 여러개를 적어서 만드는 경우 많음 (아래에)

const MySection = styled.section``

const MyDiv = styled.MyDiv``
