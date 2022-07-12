import logo from './logo.svg';
import './App.css';
import {BrowserRouter, Route, Routes} from 'react-router-dom'
import Home from './pages/Home';
import Profile from './pages/Profile';
import About from './pages/About';

function App() {
  return (//switch -> routes
    <BrowserRouter>
        <Route path = "/" exact component= {Home} />
        <Route path = "/profile" component= {Profile} />
        <Route path = "/profile/:id" component= {Profile} />
        <Route path = "/about" component= {About} />
    </BrowserRouter>
  );
}

export default App;
