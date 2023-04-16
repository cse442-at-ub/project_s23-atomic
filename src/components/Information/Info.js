import React from "react"
import { Link } from "react-router-dom";
import Navbar from "../Homepage/Navbar";
import './infopage.css'

export default function Info() {
    return (
    <div className="infoContainer">
    <p className="schoolHabitsList">  </p>
    <h2 className="schoolHabits"></h2>
    <h2 className="schoolHabitsTitle">School</h2>
    <Navbar/>
    </div>
    );
};