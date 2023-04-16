import React from "react"
import { Link } from "react-router-dom";
import Navbar from "../Homepage/Navbar";
import './statspage.css'

export default function Stats() {
    return (
    <div className="statsContainer">
    <Link to="/CSE442-542/2023-Spring/cse-442q/create">
    <button className="createButton">Create New</button>   
    </Link> 
    <Navbar/>
    </div>
    );
};