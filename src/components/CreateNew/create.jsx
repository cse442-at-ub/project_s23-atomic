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
        category: "",
        type: 0
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
    
    const submitHandler = (event) => {
        console.log("Create Habit submitHandler() called");
        event.preventDefault();
        if (habit.type === 0) { // If habit is GOOD
            const type = "good"
            addGoodHabit(habit);
            // submit(habit, type);
        } else if (habit.type === 1) { // If habit is BAD
            const type = "bad"
            addGoodHabit(habit);
            // submit(habit, type);
        } 
    }

    // const submit = async(info, type) => {
    //     // console.log(user.id)
    //     // console.log(sessionStorage.getItem("id"))
    //     const update = await sendHabits(sessionStorage.getItem("id"),user.good,user.bad);
    //     if (update){
    //         routeDetail(info, type);
    //     }else{
    //         notify();
    //     }
    // }

    return (
        <>
            <div id="create-container">
                <Navbar/>
                <h2>Create New Habit</h2>
                <form onSubmit={submitHandler}>
                    <div id="categories">
                        <h5>Category</h5>
                        <select name="" id="" onClick={setCategory} required>
                            <option value="none"></option>
                            <option value="health">Health</option>
                            <option value="work">Work</option>
                            <option value="school">School</option>
                            <option value="social">Social</option>
                            <option value="misc">Misc</option>
                            <option value="family">Family</option>
                        </select>
                        <br />
                        <select name="" id="" onClick={setCategory} required>
                        <option value="none"></option>
                            <option value="good">Good</option>
                            <option value="bad">Bad</option>
                        </select>
                    </div>
                    <div id="title">
                        <h5>Title</h5>
                        <input onChange={setTitle} type="text" required/>
                    </div>
                    <div id="details">
                        <h5>Details</h5>
                        <input onChange={setDetails} type="text"/>
                    </div>
                    <div id="counter">
                        <h5>Counter</h5>
                        <input
                            type="number" onChange={setCounter} required
                            // Only allow numbers. If a keypress is not a number, do nothing.
                            // onKeyDown={(event) => {
                            //     if (!/[0-9]/.test(event.key)) {
                            //     event.preventDefault();
                            //     }
                            // }}
                        />
                    </div>
                    <br />
                    <input type="submit" />
                </form>
            </div>
        </>
    );
};

export default Create;