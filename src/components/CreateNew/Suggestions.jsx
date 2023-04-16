import React from 'react';
import './suggestions.css';
import Navbar from '../Homepage/Navbar';
import { useContext } from 'react'
import HabitContext from '../contexts/HabitContext'
import { useState } from 'react';
import { useNavigate, useLocation, Link } from "react-router-dom";
import {ToastContainer, toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Suggestions(){
    const {user, good_habits, bad_habits,addGoodHabit,addBadHabit,sendHabits} = useContext(HabitContext);

    const navigate = useNavigate();
    // any page that routes to this page should send in state param values (title, category, details, counter, total, added)
    //need to pass in correct habit information to this component 
    // added will be a boolean to keep track of when a user gets sent to the page
    // if true, user came from editing or adding/creating a new habit and a success message will be displayed
    // if false, regular habit information will be displayed with no success message
    // we use useLocation to get this state
    const routeDetail = (habit, type) => {
        const n = habit["title"];
        const c = habit["category"];
        const d = habit["details"];
        const sum = habit["counter"];
        const t = habit["total"];
        const path = '/CSE442-542/2023-Spring/cse-442q/detail';
        
        sessionStorage.setItem("added","true")
        navigate(path, {state: {title: n, category: c, details: d, counter: sum, total: t,type: type, added: true}});
    }

    // use toastify to notify user on error for username or email that's already in use
    const notify = ()=>{
        toast.error('Error Adding Habit',{position: toast.POSITION.TOP_RIGHT, autoClose:false,theme:"colored"})
    }

    const notifyExists = ()=>{
        toast.error('Habit Already Exists',{position: toast.POSITION.TOP_RIGHT, autoClose:false,theme:"colored"})
    }

    const getHabit = (event) => {
        const habit_title = event.target.innerHTML;
        const type = event.target.value;
        let pos = "";
        let habit = {}
        console.log(type)
        // good habits will not have a value, so type should equal 0
        // bad habits will have the value "1"
        if (type === 0){
            pos = "Good";
            habit = good_habits[habit_title];
            // console.log(user.good[habit_title])
            if (user.good[habit_title] !== undefined){
                console.log("habit exists")
                notifyExists();
            } else {
                // add habit to user's good habits
                addGoodHabit(habit);
                submit(habit, pos)
            }
        }else{
            pos = "Harmful";
            habit = bad_habits[habit_title];
            if (user.bad[habit_title] !== undefined){
                notifyExists();
            } else {
                // add habit to user's bad habits
                addBadHabit(habit);
                submit(habit, pos)
            }
        }
        console.log(user)

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

    return(
        <div className="preset_container">
            <Navbar />
            <div className="overall_list_container">
                <ToastContainer limit={1}/>
                <div className='top_page'>
                    <Link to="/options" className='sug_back_link'>&lt; Back</Link>
                    <h1>Pick From Our Options!</h1>
                </div>
                <div className="list_container">
                    <div className='category_wrapper'>
                        <h3>Health</h3>
                        <div className='category' id="health">
                            <ul>
                                <li onClick={getHabit}>Sleep 6-8 Hours</li>
                                <li onClick={getHabit}>Eat Breakfast</li>
                                <li onClick={getHabit}>Drink Water</li>
                                <li onClick={getHabit}>Exercise</li>
                                <li onClick={getHabit}>Meditate</li>
                                <li onClick={getHabit}>Digital Detox</li>
                                <li onClick={getHabit}>Meal Prep</li>
                                <li onClick={getHabit}>Eat Something Healthy</li>
                                <li onClick={getHabit}>Explore Nature</li>
                                <li onClick={getHabit}>Self Care</li>
                                <li onClick={getHabit}>Brush Your Teeth</li>
                                <li onClick={getHabit}>Take Your Medication</li>
                                <li onClick={getHabit}>Stretch</li>
                                <li onClick={getHabit}>Take Your Vitamins</li>
                            </ul>
                        </div>
                    </div>
                    <div className='category_wrapper'>
                        <h3>Work</h3>
                        <div className='category' id="work">
                            <ul>
                                <li onClick={getHabit}>Arrive On Time</li>
                                <li onClick={getHabit}>Organize Your Workspace</li>
                                <li onClick={getHabit}>Manage Your Schedule</li>
                                <li onClick={getHabit}>Help Your Teammates</li>
                                <li onClick={getHabit}>Actively Listen To Others</li>
                                <li onClick={getHabit}>Accept Constructive Criticism</li>
                                <li onClick={getHabit}>Separate Work From Personal Life</li>
                                <li onClick={getHabit}>Dress Appropriately</li>
                                <li onClick={getHabit}>Gossip Less</li>
                                <li onClick={getHabit}>Stop Procrastinating</li>
                            </ul>
                        </div>
                    </div>
                    <div className='category_wrapper'>
                        <h3>Social</h3>
                        <div className='category' id="social">
                            <ul>
                                <li onClick={getHabit}>Reach Out To Someone You Love</li>
                                <li onClick={getHabit}>Be Positive</li>
                                <li onClick={getHabit}>Beat Your Anxiety</li>
                                <li onClick={getHabit}>Ask For Help</li>
                                <li onClick={getHabit}>Be Grateful</li>
                                <li onClick={getHabit}>Give Yourself A Compliment</li>
                                <li onClick={getHabit}>Compliment A Stranger</li>
                                <li onClick={getHabit}>Do Something That Scares You</li>
                            </ul>
                        </div>
                        
                    </div>
                </div>
                <div className="list_container">
                    <div className='category_wrapper'>
                        <h3>School</h3>
                        <div className='category' id="school">
                            <ul>
                                <li onClick={getHabit}>Take Class Notes</li>
                                <li onClick={getHabit}>Study</li>
                                <li onClick={getHabit}>Work On Your Assignments</li>
                                <li onClick={getHabit}>Take A Wellness Break</li>
                                <li onClick={getHabit}>Go To Class</li>
                            </ul>
                        </div>
                    </div>
                    <div className='category_wrapper'>
                        <h3>Family</h3>
                        <div className='category' id="family">
                            <ul>
                                <li onClick={getHabit}>Spend Time With Your Loved Ones</li>
                                <li onClick={getHabit}>Show Your Love</li>
                                <li onClick={getHabit}>Eat Together</li>
                                <li onClick={getHabit}>Be Active Together</li>
                                <li onClick={getHabit}>Set Goals</li>
                                <li onClick={getHabit}>Listen To Each Other</li>
                                <li onClick={getHabit}>Play A Game</li>
                            </ul>
                        </div>
                    </div>
                    <div className='category_wrapper'>
                        <h3>Miscellaneous</h3>
                        <div className='category' id="misc">
                            <ul>
                                <li onClick={getHabit}>Save Money</li>
                                <li onClick={getHabit}>Clean</li>
                                <li onClick={getHabit}>Journal</li>
                                <li onClick={getHabit}>Read</li>
                                <li onClick={getHabit}>Learn Something New</li>
                                <li onClick={getHabit}>Listen to Music</li>
                                <li onClick={getHabit}>Reward Yourself</li>
                            </ul>
                        </div>
                    </div>
                    <div className='category_wrapper'>
                        <h3>Harmful</h3>
                        <div className='category' id="bad">
                            <ul>
                                <li onClick={getHabit} value="1">Smoke</li>
                                <li onClick={getHabit} value="1">Drink Alcohol</li>
                                <li onClick={getHabit} value="1">Drink Coffee</li>
                                <li onClick={getHabit} value="1">Eat Junk Food</li>
                                <li onClick={getHabit} value="1">Sit All Day</li>
                                <li onClick={getHabit} value="1">Bite Nails</li>
                                <li onClick={getHabit} value="1">Skip A Meal</li>
                                <li onClick={getHabit} value="1">Multitask</li>
                                <li onClick={getHabit} value="1">Criticize Yourself</li>
                                <li onClick={getHabit} value="1">Binge Eat</li>
                                <li onClick={getHabit} value="1">Overcommit Yourself</li>
                                <li onClick={getHabit} value="1">Gossip</li>
                                <li onClick={getHabit} value="1">Lying</li>
                            </ul>
                        </div>
                    </div>
                </div> 
            </div>
        </div>    
    )
}

export default Suggestions;