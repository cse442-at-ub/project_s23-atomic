import React, { useEffect } from "react"
import { Link, useNavigate } from "react-router-dom";
import Navbar from "./Navbar"
import './style.css'
import axios from 'axios'

import { useContext } from 'react'
import HabitContext from '../contexts/HabitContext'

export default function HomeMain() {
    const {good_habits, bad_habits, user, setUser, getUserData} = useContext(HabitContext);

    // will contain all the categories of habits that the user has
    // this will be used to display the correct categories on the homepage
    const categories = [];
    const health = [];
    const work = [];
    const school = [];
    const social = [];
    const misc = [];
    const family = [];
    
    const navigate = useNavigate();
    const routeCreate = () => {
        navigate('/options');
    }

    // code to get user friendly date string
    var days = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];
    var months = ['January','February','March','April','May','June','July','August','September','October','November','December'];
    let currDate = new Date();
    let date = currDate.getDate();
    let year = currDate.getFullYear();
    var day = days[ currDate.getDay() ];
    var month = months[ currDate.getMonth() ];

    // use effect will run after the component renders
    // reloading will reset the values for variables to their defaults, so we want to use use effect to
    // call a get request to receieve the users information if they reload
    useEffect(() => {
        // get request to get user information
        getUserData(sessionStorage.getItem('id'));
    }, [])

    
    return (

        <div className="mainContainer">
            <Navbar />

            <div className="date_container">
                <button className="createButton" onClick={routeCreate}>Create New</button> 
                <h1 className="date">Today's Date: {day}, {month} {date} {year}</h1> 
            </div>
            <div className="message_container">
                
            </div>

            <div className="habit_container">
                <div className="habit_list">
                    <div className="habit_list_wrapper">

                    </div>
                </div>
                <div className="habit_list">
                    <div className="habit_list_wrapper">

                    </div>
                </div>
                <div className="habit_list">
                    <div className="habit_list_wrapper">

                    </div>
                </div>
                <div className="habit_list">
                    <div className="habit_list_wrapper">

                    </div>
                </div>
                <div className="habit_list">
                    <div className="habit_list_wrapper">

                    </div>
                </div>
                <div className="habit_list">
                    <div className="habit_list_wrapper">

                    </div>
                </div>

            </div>

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