import React from "react"
import Navbar from "./components/Navbar"
import CreateNew from "./components/create"
import Blank from "./components/Blank"
import { BrowserRouter as Router, 
  Routes, 
  Route, 
  Navigate,} from "react-router-dom";

export default function App(){
  return(
    <div className="container">
      <CreateNew/>
      <Navbar/>
    </div>
  )
}