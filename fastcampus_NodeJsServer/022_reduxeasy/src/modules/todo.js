//우리가 원하는 행동, 데이터의 변화 각각의 액션으로 할당

// 액션 타입(문자열)
const CREATE = 'todo/CREATE' // 할 일 목록을 추가하는 액션
const DONE = 'todo/DONE' // 할 일 목록 중에서 완료 처리 하는 것

// 액션 생성 함수 (payload : 여러 데이터 포함)
export function create(payload /* = {id=0, text=''}*/) {
  return {
    type: CREATE, // type 반드시 필요
    payload,
  }
}

export function done(id) {
  return {
    type: DONE, // type 반드시 필요
    id,
  }
}

// 초기 상태
// useState()
const initState = {
  list: [
    {
      id: 0,
      text: '척추 펴기',
      done: true,
    },
    {
      id: 1,
      text: '물 마시기',
      done: false,
    },
  ],
  listColor: 'red',
  listName: '할 일 목록',
}

// 리듀서 -> 스토어 변경
export default function todo(state = initState, action) {
  switch (action.type) {
    case CREATE:
      return {
        ...state, // 다른 state들 전달용 (listColor, listName)
        list: state.list.concat({
          id: action.payload.id,
          text: action.payload.text,
          done: false, // 지금 할 일 목록에 추가되었으므로 false
        }),
      }
    case DONE:
      return {
        ...state,
        list: state.list.map((item) => {
            return item.id === action.id? {...item, done: true} : item
        }),
      }
    default:
      return state
  }
}

// 디스패치 함수, 액션을 불러온다

// 액션 -> 리듀서

// 리듀서 -> 스토어 변경
