import React from "react"
import Navbar from "./components/Navbar"
import Info from "./components/Info"
import Blank from "./components/Blank"
import { BrowserRouter as Router, 
  Routes, 
  Route, 
  Navigate,} from "react-router-dom";

export default function App(){
  return(
    <div className="container">
      <Info/>
      <Navbar/>
    </div>
  )
}