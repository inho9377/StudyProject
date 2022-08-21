import './App.css'
import Profile from './Profile'
import Board from './Board'
import React from 'react'
import { Routes } from 'react-router-dom'

function App() {
  return (
    <div className="App">
      <nav>
        <ul>
          <li>
            <a href="/">프로필</a>
          </li>
          <li>
            <a href="profile">프로필</a>
          </li>
          <li>
            <a href="board">게시판</a>
          </li>
        </ul>
      </nav>
      <Routes path='/profile' component={Profile} />
      <Routes path='/board' component={Board} />
    </div>
  )
}

export default App
