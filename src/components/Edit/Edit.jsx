import React, { useState, useContext } from "react";

import {ToastContainer, toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate, useLocation} from "react-router-dom";

import HabitContext from '../contexts/HabitContext';
import Navbar from "../Homepage/Navbar";

import '../CreateNew/createpage.css'; // Why is this needed for this page. For some reason it influences the background color.
import "../CreateNew/create.css"

function Edit() {
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

    // any page that routes to this page should send in state param values (title, category, details, counter, total, added)
    // need to pass in correct habit information to this component 
    // we use useLocation to get this state
    const { state } = useLocation();
    console.log("State incoming was: " + JSON.stringify(state));

    // TODO: set the initial state of the habit you are editing
    const [habit, setHabit] = useState({
        title: state.title,
        total: state.total,
        details: state.details,
        category: state.category,
        type: state.type
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


    // Checks if the entered data is the same as what it was before
    // Returns a Boolean
    const changedValues = () => {
        const diffCategory = (habit.category !== state.category);
        const diffType = (habit.type !==  state.type);
        const diffTtitle = (habit.title !==  state.title);
        const diffDetails = (habit.details !==  state.details);
        const diffTotal = (habit.total !==  state.total);

        const retval = (diffCategory || diffType || diffTtitle || diffDetails || diffTotal);
        console.log("changedValues(): " + retval);
        return retval;
    }
    
    // Create a new habit obj to replace the old one:
    // 1) Transfer counter, total, and days data
    // 2) Then fill in the rest of the info
    const submitHandler = (event) => {
        console.log("Create Habit submitHandler() called");
        event.preventDefault();

        if (changedValues()) {
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
            
            if (habit.type === "Good") { // If habit is GOOD
                console.log("logging as a Good habit");
                addGoodHabit(habitObj);
                submit(habitObj, habit.type);
            } else if (habit.type === "Harmful") { // If habit is BAD
                console.log("logging as a Bad habit");
                addBadHabit(habitObj);
                submit(habitObj, habit.type);
            }
        } else {
            failedToEdit();
        }
    }

    const submit = async(info, type) => {
        // console.log(user.id)
        // console.log(sessionStorage.getItem("id"))
        const update = await sendHabits(sessionStorage.getItem("id"),user.good,user.bad);
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

    const failedToEdit = () => {
        toast.error('No changes were made',{position: toast.POSITION.TOP_RIGHT, hideProgressBar:true, pauseOnHover:true, theme:"colored"})
    }

    return (
        <>
            <Navbar/>
            <div id="create-container">
                <ToastContainer limit={1}/>
                <h2>Create New Habit</h2>
                <form onSubmit={submitHandler}>
                    <div id="categories">
                        <div>
                            <h5>Category</h5>
                            <select name="" id="" onClick={setCategory} defaultValue={state.category} required>
                                <option value="Health">Health</option>
                                <option value="Work">Work</option>
                                <option value="School">School</option>
                                <option value="Social">Social</option>
                                <option value="Misc">Misc</option>
                                <option value="Family">Family</option>
                            </select>
                        </div>
                        <div>
                            <h5>Type</h5>
                            <select name="" id="" onClick={setType} defaultValue={state.type} required>
                                <option value="Good">Good</option>
                                <option value="Harmful">Bad</option>
                            </select>
                        </div>
                    </div>
                    <div id="title">
                        <h5>Title</h5>
                        <input onChange={setTitle} type="text" defaultValue={state.title} required/>
                    </div>
                    <div id="details">
                        <h5>Details</h5>
                        <input onChange={setDetails} type="text"  defaultValue={state.details}/>
                    </div>
                    <div id="counter">
                        <h5>Daily Goal Counter</h5>
                        <input
                            type="number" onChange={setTotal}  defaultValue={state.total} required
                            // Only allow numbers. If a keypress is not a number, do nothing.
                            // onKeyDown={(event) => {
                            //     if (!/[0-9]/.test(event.key)) {
                            //     event.preventDefault();
                            //     }
                            // }}
                        />
                    </div>
                    <div>
                        <input type="submit" />
                    </div>
                </form>
                <button onClick={() => changedValues()}>Check for changes</button>
            </div>
        </>
    );
};

export default Edit;