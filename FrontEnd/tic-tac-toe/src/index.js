import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css'; //css 스타일 파일을 전역적으로 추가
import App from './App';
import reportWebVitals from './reportWebVitals';

// main
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
