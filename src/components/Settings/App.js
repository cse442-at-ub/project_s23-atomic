import React from "react"
import Navbar from "./components/Navbar"
import Settings from "./components/settings"
import Blank from "./components/Blank"
import { BrowserRouter as Router, 
  Routes, 
  Route, 
  Navigate,} from "react-router-dom";

export default function App(){
  return(
    <div className="container">
      <Settings/>
      <Navbar/>
    </div>
  )
}