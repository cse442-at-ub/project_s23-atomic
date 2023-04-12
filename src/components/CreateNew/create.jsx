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
        counter: 0,
        details: "",
        category: "",
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
        habitObj["counter"] = habit.counter;
        habitObj["total"] = 0;
        habitObj["details"] = habit.details;
        habitObj["category"] = habit.category;
        habitObj["Days"] = {7: 0, 6: 0, 5: 0, 4: 0, 3: 0, 2: 0, 1: 0, 0: {"date": current_date,"counter": 0} };

        console.log("habitObj was created as: " + JSON.stringify(habitObj));
        
        if (habit.type === "good") { // If habit is GOOD
            addGoodHabit(habitObj);
            submit(habitObj, habit.type);
        } else if (habit.type === "bad") { // If habit is BAD
            addBadHabit(habitObj);
            submit(habitObj, habit.type);
        } 
    }

    const submit = async(info, type) => {
        // console.log(user.id)
        // console.log(sessionStorage.getItem("id"))
        const update = await sendHabits(sessionStorage.getItem("id"),user.good,user.bad);
        if (update){
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
        const path = '/detail';
        
        sessionStorage.setItem("added","true")
        navigate(path, {state: {title: n, category: c, details: d, counter: sum, total: t,type: type, added: true}});
    }

    // use toastify to notify user on error for username or email that's already in use
    const notify = ()=>{
        toast.error('Error Adding Habit',{position: toast.POSITION.TOP_RIGHT, autoClose:false,theme:"colored"})
    }

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
                        <select name="" id="" onClick={setType} required>
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