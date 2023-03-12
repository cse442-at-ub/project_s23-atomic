<<<<<<< HEAD
import React from "react"
import ReactDOM from "react-dom"
import "./style.css"
import App from "./App"

ReactDOM.render(<App />, document.getElementById("root"))
=======
import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

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
>>>>>>> fb5f95d35a3c2bddedc1f910f9019e8a3193ac74
