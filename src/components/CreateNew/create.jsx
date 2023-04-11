import React, { useState } from "react";

import { useContext } from 'react'
import HabitContext from '../contexts/HabitContext';

import Navbar from "../Homepage/Navbar";

import './createpage.css'; // Why is this needed for this page. For some reason it influences the background color.
import "./create.css"

function Create() {
    const {user, good_habits, bad_habits,addGoodHabit,addBadHabit,sendHabits} = useContext(HabitContext);

    // const test = {
    //     "Sleep 6-8 Hours":
    //         {"title":"Sleep 6-8 Hours",
    //         "counter": 0,
    //         "total": 1,
    //         "details": "Getting enough sleep is vital to your health.",
    //         "category": "Health"
    //         // "Days":{7: 0, 6: 0, 5: 0, 4: 0, 3: 0, 2: 0, 1: 0, 0: {"date": current_date,"counter": 0} }
    //         },

    // }

    const [habit, setHabit] = useState({
        title: "",
        counter: 0,
        details: "",
        category: ""
    });
    const setTitle = (event) => {
        setHabit({ ...habit, title: event.target.value });
    };
    const setCounter = (event) => {
        setHabit({ ...habit, counter: event.target.value });
    };
    const setDetails = (event) => {
        setHabit({ ...habit, details: event.target.value });
    };
    const setCategory = (event) => {
        setHabit({ ...habit, category: event.target.value });
    };
    
    return (
    <div id="create-container">
        <h2>Create New Habit</h2>
        <div id="categories">
            <h5>Category</h5>
        </div>
        <div id="title">
            <h5>Title</h5>
            <input onChange={setTitle} type="text" />
        </div>
        <div id="details">
            <h5>Details</h5>
            <input onChange={setDetails} type="text" />
        </div>
        <div id="counter">
            <h5>Counter</h5>
        </div>
    <Navbar/>
    </div>
    );
};

export default Create;