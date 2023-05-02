import React, { useState } from "react";

import { useContext } from 'react'
import HabitContext from '../contexts/HabitContext';
import { toast } from 'react-toastify';

import { useNavigate } from "react-router-dom";


import Navbar from "../Homepage/Navbar";

import './createpage.css'; // Why is this needed for this page. For some reason it influences the background color.
import "./create.css"

function Create() {
    const {user, good_habits, bad_habits,addGoodHabit,addBadHabit,sendHabits} = useContext(HabitContext);
    const navigate = useNavigate();

    // const exampleHabit = { 
    //     "title":"Sleep 6-8 Hours",
    //     "counter": 0,
    //     "total": 1,
    //     "details": "Getting enough sleep is vital to your health.",
    //     "category": "Health",
    //     "Days":{7: 0, 6: 0, 5: 0, 4: 0, 3: 0, 2: 0, 1: 0, 0: {"date": current_date,"counter": 0} }
    // }

    const [habit, setHabit] = useState({
        title: "",
        total: 0,
        details: "",
        category: "Health",
        type: "good"
    });
    const setTitle = (event) => {
        setHabit({ ...habit, title: event.target.value });
    };
    const setTotal = (event) => {
        setHabit({ ...habit, total: event.target.value });
    };
    const setDetails = (event) => {
        setHabit({ ...habit, details: event.target.value });
    };
    const setCategory = (event) => {
        setHabit({ ...habit, category: event.target.value });
    };
    const setType = (event) => {
        setHabit({ ...habit, type: event.target.value });
    };
    
    const submitHandler = (event) => {
        console.log("Create Habit submitHandler() called");
        event.preventDefault();

        // Obtain current_date
        let separator = "/"
        let newDate = new Date();
        let date = newDate.getDate();
        let month = newDate.getMonth() + 1;
        let year = newDate.getFullYear();
        let current_date = `${year}${separator}${month<10?`0${month}`:`${month}`}${separator}${date}`

        // Create habit JSON Object
        const habitObj = {};
        habitObj["title"] = habit.title;
        habitObj["counter"] = 0;
        habitObj["total"] = habit.total;
        habitObj["details"] = habit.details;
        habitObj["category"] = habit.category;
        habitObj["Days"] = {7: 0, 6: 0, 5: 0, 4: 0, 3: 0, 2: 0, 1: 0, 0: {"date": current_date,"counter": 0} };

        console.log("habitObj was created as: " + JSON.stringify(habitObj));
        console.log("habit.type was : " + habit.type);
        
        if (habit.type === "good") { // If habit is GOOD
            console.log("logging as a Good habit");
            addGoodHabit(habitObj);
            submit(habitObj, habit.type);
        } else if (habit.type === "bad") { // If habit is BAD
            console.log("logging as a Bad habit");
            addBadHabit(habitObj);
            submit(habitObj, habit.type);
        } 
    }

    const submit = async(info, type) => {
        // console.log(user.className)
        // console.log(sessionStorage.getItem("className"))
        const update = await sendHabits(sessionStorage.getItem("className"),user.good,user.bad);
        if (update){
            console.log("About to run routeDetail()");
            routeDetail(info, type);
        }else{
            notify();
        }
    }

    const routeDetail = (habit, type) => {
        const n = habit["title"];
        const c = habit["category"];
        const d = habit["details"];
        const sum = habit["counter"];
        const t = habit["total"];
        const path = '/CSE442-542/2023-Spring/cse-442q/detail';
        
        sessionStorage.setItem("added","true")

        console.log("About to run navigate()");
        navigate(path, {state: {title: n, category: c, details: d, counter: sum, total: t,type: type, added: true}});
    }

    // use toastify to notify user on error for username or email that's already in use
    const notify = ()=>{
        toast.error('Error Adding Habit',{position: toast.POSITION.TOP_RIGHT, autoClose:false,theme:"colored"})
    }

    return (
        <>
            <Navbar/>
            <div className="create-container">
                <h2>Create New Habit</h2>
                <form onSubmit={submitHandler}>
                    <div className="categories">
                        <div>
                            <h3>Category</h3>
                            <select name="" className="" onClick={setCategory} required>
                                <option value="Health">Health</option>
                                <option value="Work">Work</option>
                                <option value="School">School</option>
                                <option value="Social">Social</option>
                                <option value="Misc">Misc</option>
                                <option value="Family">Family</option>
                            </select>
                        </div>
                        <div>
                            <h3>Type</h3>
                            <select name="" className="" onClick={setType} required>
                                <option value="Good">Good</option>
                                <option value="Bad">Bad</option>
                            </select>
                        </div>
                    </div>
                    <div className="title">
                        <h3>Title</h3>
                        <input onChange={setTitle} type="text" required/>
                    </div>
                    <div className="details">
                        <h3>Details</h3>
                        {/* <input onChange={setDetails} type="text"/> */}
                        <textarea onChange={setDetails} name="details" rows="4"></textarea>
                    </div>
                    <div className="counter">
                        <h3>Daily Goal Counter</h3>
                        <input
                            type="number" onChange={setTotal} required
                            // Only allow numbers. If a keypress is not a number, do nothing.
                            // onKeyDown={(event) => {
                            //     if (!/[0-9]/.test(event.key)) {
                            //     event.preventDefault();
                            //     }
                            // }}
                        />
                    </div>
                    <div className="habit-submit-container">
                        <input type="submit" />
                    </div>
                </form>
            </div>
        </>
    );
};

export default Create;