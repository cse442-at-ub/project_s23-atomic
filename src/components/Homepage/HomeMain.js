import React, { useEffect } from "react"
import { Link, useNavigate } from "react-router-dom";
import Navbar from "./Navbar"
import './style.css'
import axios from 'axios'

import { useContext, useState } from 'react'
import HabitContext from '../contexts/HabitContext'

export default function HomeMain() {
    // user object for this component to use which matches the one in HabitContext.js
    let thisUser = {
        id: 0,
        username: "",
        good: {},
        bad: {},
    }

    let categories = [];

    // in order to display so many habits, we need to iterate through the good and bad habits
    // and display them in a list for each category
    const [goodHealth, setGoodHealth] = useState([]);
    const [goodWork, setGoodWork] = useState([]);
    const [goodSchool, setGoodSchool] = useState([]);
    const [goodSocial, setGoodSocial] = useState([]);
    const [goodFamily, setGoodFamily] = useState([]);
    const [goodMisc, setGoodMisc] = useState([]);

    const [badHealth, setBadHealth] = useState([]);
    const [badWork, setBadWork] = useState([]);
    const [badSchool, setBadSchool] = useState([]);
    const [badSocial, setBadSocial] = useState([]);
    const [badFamily, setBadFamily] = useState([]);
    const [badMisc, setBadMisc] = useState([]);

    // code to get user friendly date string
    var days = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];
    var months = ['January','February','March','April','May','June','July','August','September','October','November','December'];
    let currDate = new Date();
    let date = currDate.getDate();
    let year = currDate.getFullYear();
    var day = days[ currDate.getDay() ];
    var month = months[ currDate.getMonth() ];

    const navigate = useNavigate();
    const routeCreate = () => {
        navigate('/options');
    }

    const {good_habits, bad_habits, user, setUser, getUserData} = useContext(HabitContext);

    const getCateogries = () => {
        if (user.good !== {}) {
            Object.keys(user.good).forEach((key) => {
                if(categories.includes(user.good[key].category) === false) {
                    categories.push(user.good[key].category);
                }
            })
        }
        if (user.bad !== {}) {
            Object.keys(user.bad).forEach((key) => {
                if(categories.includes(user.bad[key].category) === false) {
                    categories.push(user.bad[key].category);
                }
            })
        }
        // console.log(categories);
        // console.log(thisUser.good);
        // console.log(thisUser.bad);
    }

    // function that fills the lists with divs that contain the habit information
    // takes in the object to iterate through, the category of the habits, and the list to fill
    // returns a list of divs that contain the habit information
    async function fillLists(obj,category, list) {
        if (obj !== {}) {
            if(categories.includes(category)) {
                const buildList = await Promise.all(
                    Object.keys(obj).map((habit) => {
                        if(obj[habit].category === category) {
                            return (
                                <li className="iterated_list">
                                    <div className="habit_item">
                                        <h3 className="habit_title">{obj[habit].title}</h3>
                                        <div className='counter_info'>
                                            <div className='counter_button'>
                                                <button id="minus_btn">-</button>
                                                <label>{obj[habit].counter}</label>
                                                <button id="plus_btn">+</button>
                                            </div>
                                            <label> / {obj[habit].total}</label>
                                        </div>
                                    </div>
                                </li>
                            )
                        }
                    }) 
                )
                list(buildList)
            }
        }
    }
            

    // use effect will run once after the component renders because of the empty dependency array
    useEffect(() => {
        document.title = "Home";  
    }, [])

    // use effect will run every 200 milliseconds to get the user data from the backend
    useEffect(() => {
        const interval = setInterval(async () => {
            // call the getUserData function from HabitContext.js to get the user data
            // makes get request to backend to get user data
            const data = await getUserData(5);
            // set thisUser to the data we received from the backend
            thisUser = data;
            // call the getCateogries function to get the categories the user has
            getCateogries();
  
            if (thisUser.id) {
                if(categories.includes("Health")) {
                    fillLists(user.good, "Health", setGoodHealth);
                    fillLists(user.bad, "Health", setBadHealth);
                }
                if(categories.includes("Work")) {
                    fillLists(user.good, "Work", setGoodWork);
                    fillLists(user.bad, "Work", setBadWork);
                }
                if(categories.includes("School")) {
                    fillLists(user.good, "School", setGoodSchool);
                    fillLists(user.bad, "School", setBadSchool);
                }
                if(categories.includes("Social")) {
                    fillLists(user.good, "Social", setGoodSocial);
                    fillLists(user.bad, "Social", setBadSocial);
                }
                if(categories.includes("Family")) {
                    fillLists(user.good, "Family", setGoodFamily);
                    fillLists(user.bad, "Family", setBadFamily);
                }
                if(categories.includes("Misc")) {
                    fillLists(user.good, "Misc", setGoodMisc);
                    fillLists(user.bad, "Misc", setBadMisc);
                }   
           } else {
              console.log("No posts");
           }
        }, 200)
        return () => clearInterval(interval)
     })
   
    return (
        <div className="mainContainer">
            <Navbar />

            <div className="date_container">
                <button className="createButton" onClick={routeCreate}>Create New</button> 
                <h1 className="date">Today's Date: {day}, {month} {date} {year}</h1> 
            </div>
            <div className="message_container">
                Keep it up! You've logged 8 habits today!
            </div>

            <div className="habit_container">
                {goodHealth.length !== 0 && badHealth.length !== 0 ? (
                <div className="habit_list">
                    <div className="category_title">Health</div>
                    {goodHealth.length !== 0 ? (
                        <div className="habit_list_wrapper">
                            {goodHealth}
                        </div>
                    ) : null }
                    {badHealth.length !== 0 ? (
                        <div className="bad_habit_list_wrapper">
                            {badHealth}
                        </div>
                    ) : null }
                </div>
                ) : null }

                {goodWork.length !== 0 && badWork.length !== 0 ? (
                <div className="habit_list">
                    <div className="category_title">Work</div>
                    {goodWork.length !== 0 ? (
                        <div className="habit_list_wrapper">
                            {goodWork}
                        </div>
                    ) : null }
                    {badWork.length !== 0 ? (
                        <div className="bad_habit_list_wrapper">
                            {badWork}
                        </div>
                    ) : null }
                </div>
                ) : null }

                {goodSchool.length !== 0 && badSchool.length !== 0 ? (
                <div className="habit_list">
                    <div className="category_title">School</div>
                    {goodSchool.length !== 0 ? (
                        <div className="habit_list_wrapper">
                            {goodSchool}
                        </div>
                    ) : null }
                    {badSchool.length !== 0 ? (
                        <div className="bad_habit_list_wrapper">
                            {badSchool}
                        </div>
                    ) : null }
                </div>
                ) : null }

                {goodSocial.length !== 0 && badSocial.length !== 0 ? (
                <div className="habit_list">
                    <div className="category_title">Social</div>
                    {goodSocial.length !== 0 ? (
                        <div className="habit_list_wrapper">
                            {goodSocial}
                        </div>
                    ) : null }
                    {badSocial.length !== 0 ? (
                        <div className="bad_habit_list_wrapper">
                            {badSocial}
                        </div>
                    ) : null }
                </div>
                ) : null }
                
                {goodFamily.length !== 0 && badFamily.length !== 0 ? (
                <div className="habit_list">
                    <div className="category_title">Family</div>
                    {goodFamily.length !== 0 ? (
                        <div className="habit_list_wrapper">
                            {goodFamily}
                        </div>
                    ) : null }
                    {badFamily.length !== 0 ? (
                        <div className="bad_habit_list_wrapper">
                            {badFamily}
                        </div>
                    ) : null }
                </div>
                ) : null }
                
                {goodMisc.length !== 0 && badMisc.length !== 0 ? (
                <div className="habit_list">
                    <div className="category_title">Misc.</div>
                    {goodMisc.length !== 0 ? (
                        <div className="habit_list_wrapper">
                            {goodMisc}
                        </div>
                    ) : null }
                    {badMisc.length !== 0 ? (
                        <div className="bad_habit_list_wrapper">
                            {badMisc}
                        </div>
                    ) : null }
                </div>
                ) : null }

            </div>
        </div>
    );
};