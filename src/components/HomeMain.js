import React from "react"
import { Link } from "react-router-dom";
import Navbar from "./Navbar"

export default function HomeMain() {
    return (
    <div className="mainContainer">
    <button className="createButton">Create New</button>    

    <p className="healthHabitsList">  </p>
    <h2 className="healthHabits"></h2>
    <h2 className="healthHabitsTitle">Health</h2>


    <p className="schoolHabitsList">  </p>
    <h2 className="schoolHabits"></h2>
    <h2 className="schoolHabitsTitle">School</h2>
    
    <p className="socialHabitsList">  </p>
    <h2 className="socialHabits"></h2>
    <h2 className="socialHabitsTitle">Social</h2>

    <Navbar/>

    </div>
    );
};