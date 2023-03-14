import React from "react"
import { Link } from "react-router-dom";
import Navbar from "./Navbar"
import './settingspage.css'

export default function settings() {
    return (
    <div className="settingsContainer">
    <p className="healthHabitsList">  </p>
    <h2 className="healthHabits"></h2>
    <h2 className="healthHabitsTitle">Health</h2>
    <Navbar/>
    </div>
    );
};