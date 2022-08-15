import CustomList from './components/CustomList';
import './App.css'


// props
function App() {
  const array1 = ["apple", "banana", "orange"];
  
  return (
    <div className="App">
      <ul>
        {array1.map((value, index) => {
          return (
            <CustomList text={`${index} ${value}`}></CustomList>
          )
        })}
      </ul>
    </div>
  )
}

export default App
