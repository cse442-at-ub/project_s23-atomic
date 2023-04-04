import React from "react"
import { Link } from "react-router-dom";
import Navbar from "./Navbar"
import './style.css'

import { useContext } from 'react'
import HabitContext from '../contexts/HabitContext'

export default function HomeMain() {
    const {good_habits, bad_habits, user, setUser} = useContext(HabitContext);

    var days = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];
    var months = ['January','February','March','April','May','June','July','August','September','October','November','December'];
    let currDate = new Date();
    let date = currDate.getDate();
    let year = currDate.getFullYear();
    var day = days[ currDate.getDay() ];
    var month = months[ currDate.getMonth() ];

    
    return (

        <div className="mainContainer">
            <Navbar />

            <div className="date_container">
                <h1 className="date">Today's Date: {day}, {month} {date} {year}</h1>
            </div>

            <Link to="/options">
            <button className="createButton">Create New</button>   
            </Link> 

            <p className="healthHabitsList">  </p>
            <h2 className="healthHabits"></h2>
            <h2 className="healthHabitsTitle">Health</h2>


            <p className="schoolHabitsList">  </p>
            <h2 className="schoolHabits"></h2>
            <h2 className="schoolHabitsTitle">School</h2>
            
            <p className="socialHabitsList">  </p>
            <h2 className="socialHabits"></h2>
            <h2 className="socialHabitsTitle">Social</h2>

        </div>
    );
};