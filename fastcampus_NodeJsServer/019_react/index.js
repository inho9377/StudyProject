// import Reat from 'react'; // HTML을 통해 불러오므로 숨겨져 있음
// import ReactDOM from 'react-dom';

// 함수형 컴포넌트
function helloWorldButton() {
    // 비구조화 할당
    const [isClick, setClickState] = React.useState(false) // 컴포넌트의 상태를 설정하는 메서드, 파라미터는 isClick의? 초기값
    const text = isClick ? "Bye world!" : "Hello world!"
    // setClickState(true)
    // console.log(isClick) // true

    // JSX.  createElement 같은거 잘 안씀
    return (
        <button onClick={() => setClickState(!isClick)}>
            {text}
        </button>
    )

//   return React.createElement('button', { onClick: () => { setClickState(!isClick)} },  text)
}

const rootContainer = document.getElementById('react-root')
ReactDOM.render(React.createElement(helloWorldButton), rootContainer)

