import React from "react"
import { Link } from "react-router-dom";
import Navbar from "./Navbar"
import './statspage.css'

export default function Stats() {
    return (
    <div className="statsContainer">
    <Link to="/create">
    <button className="createButton">Create New</button>   
    </Link> 
    <Navbar/>
    </div>
    );
};