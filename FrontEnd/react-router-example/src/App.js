import logo from './logo.svg'
import './App.css'
import { BrowserRouter, Route, Switch, Link, Redirect } from 'react-router-dom'
import Home from './pages/Home'
import Profile from './pages/Profile'
import About from './pages/About'
import NotFount from './pages/NotFount'
import Login from './pages/Login'
import Links from './components/Links'
import NavLinks from './components/NavLinks'

const isLogin = true;

function App() {
  return (
    //switch -> routes
    <BrowserRouter>
    {/* a 태그는 브라우저에 그냥 입력해서 이동 (리액트와 다름) */}
    {/* <a href="/">Home</a> */}

    {/* to는 props. 페이지 이동(뷰를 보여주는 방식)*/}
    <Link to="/">Home</Link>
    <Links></Links>
    <NavLinks />
      <Switch>
        <Route path="/login" render={() => isLogin? <Redirect to="/" /> : <Login />} component={Login} />
        <Route path="/profile/:id" component={Profile} />
        <Route path="/profile" component={Profile} />
        <Route path="/about" component={About} />
        <Route path="/" exact component={Home} />
        <Route component={NotFount} />
      </Switch>
    </BrowserRouter>
  )
}

export default App
