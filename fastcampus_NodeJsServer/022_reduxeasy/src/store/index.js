import { combineReducers } from 'redux'
import todo from './modules/todo'

export default combineReducers({
  todo, // 서브 리듀서
})

// 루트 리듀서
// const rootReducer = {
//   todo: {
//     list: [
//       {
//         id: 0,
//         text: '척추 펴기',
//         done: true,
//       },
//       {
//         id: 1,
//         text: '물 마시기',
//         done: false,
//       },
//     ],
//   },
// }
