import React from 'react';
import './choose.css';
import axios from 'axios';
import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from "react-router-dom";
import { useContext } from 'react'
import HabitContext from '../contexts/HabitContext'


function ChooseHabits() {
    // preset objects from HabitContext
    const {good_habits, bad_habits, user, setUser} = useContext(HabitContext);

    // use navigate uses Router to navigate to different paths
    const navigate = useNavigate();
    // we want to pass user id to this component when navigating from signin page
    // in order to correctly add habits to database 
    // Future implementation may use cookies to do this that is handled by php backend
    // signin.jsx sends state variable user, which holds the new users id, to choosehabits.jsx
    // useLocation is used to get that state
    const { state } = useLocation();
    const routeHome = () =>{ 
        let path = `/CSE442-542/2023-Spring/cse-442q/homepage`; 
        navigate(path);
    }
    const routeSignup = () =>{ 
        let path = `/CSE442-542/2023-Spring/cse-442q/signup`; 
        navigate(path);
    }

    // state variable to track whether correct number of habits was chosen
    const [habitBool, setHabitBool] = useState(true);
    // counts the number of habits chosen
    const [habitCounter, setHabitCounter] = useState(0);
    // adds habits to their corresponding list (plain string)
    const [habitList, setHabitList] = useState({
        dailyHabits: [],
        habitsToStop: []
    });

    // function to increment or decrement habit counter variable when a habit is selected
    const countHabits = (event) => {
        if (event.target.checked) {
            setHabitCounter(habitCounter + 1);
        } else {
            setHabitCounter(habitCounter - 1);
        }
    }

    // adds or removes habit to/from correct list based on good habit chosen
    const addHabit = (event) => {
        countHabits(event);
        if (event.target.checked) {
            setHabitList({
                ...habitList,
                dailyHabits: [...habitList.dailyHabits, event.target.value]
            });
        } else {
            setHabitList({
                ...habitList,
                dailyHabits: habitList.dailyHabits.filter(habit => habit !== event.target.value)
            });
        }
    }

    // adds or removes habit to/from correct list based on bad habit chosen
    const addHabitToStop = (event) => {
        countHabits(event);
        if (event.target.checked) {
            setHabitList({
                ...habitList,
                habitsToStop: [...habitList.habitsToStop, event.target.value]
            });
        } else {
            setHabitList({
                ...habitList,
                habitsToStop: habitList.habitsToStop.filter(habit => habit !== event.target.value)
            });
        }
    }

    // fucntion to iterate habit lists to create json object
    // type is a boolean, true means to get good habits, false vice versa
    const makeObject = (list, type) =>{
        let object = {}
        if (type){
            list.map((habit) => 
            object[habit] = good_habits[habit],
            );
        }else{
            list.map((habit) => 
            object[habit] = bad_habits[habit],
            );
        }
        
        return object; 
    }

    // use axios to send the post request to php server
    // url points to the php server tht is created when you cd into PHP and run php -S localhost:8000
    // need to have actual url to access server
    const makePost = async() => {
        let good_habits_object = makeObject(habitList.dailyHabits, true);
        let bad_habits_object = makeObject(habitList.habitsToStop, false);
        await axios({
        method: "post",
        //url: "http://localhost:8000/addhabit.php",
        url: "https://www-student.cse.buffalo.edu/CSE442-542/2023-Spring/cse-442q/addhabit.php",
        data: {
            id: state.user,
            good_habits: good_habits_object,
            bad_habits: bad_habits_object
        },
        }).then(function (response) {
            // successful submit will navigate to next page
            console.log("success");
            console.log(response.data)
            // console.log(response.config.data);

            // users info in context state
            setUser({
                ...user,
                id: state.user,
                good: good_habits_object,
                bad: bad_habits_object
            })
            // save id in session
            sessionStorage.setItem('id',state.user);

            routeHome();
        }).catch(function (error) {
            console.log("failed to send post request");
            console.log(error);
            console.log('error is '+ error.msg);
        });
    }


    // handles submiting of form; checks whether 3 or more habits were chosen
    const handleSubmit = (event) => {
        event.preventDefault();   
        
        if (habitCounter < 3) {
            // console.log(state.user)
            setHabitBool(false); 
        } else {
            // console.log(habitList);
            setHabitBool(true);
            makePost();
        }
    }

    useEffect(() => {
        document.title = "Choose Your Habits";  
    }, []);

    return (
        <div className='choose_habits_container'>
            <div className="choose_habits_div">
                <h1 id="choose_habits_header">You're One Step Closer!</h1>
                {habitBool && <p id="choose_habits_message">Choose at least 3</p>}
                {!habitBool && <p id="warning_message">Choose at least 3</p>}
                <small>Don't worry. You can always add more later ;)</small>
                <form id="choose_habits_form" action="#" nmethod="post" onSubmit={handleSubmit}>
                    <label id="habit_heading">Daily Habits to Start</label>
                    <div className="habit_group">
                        <ul>
                            <li>
                                <input onClick={addHabit} id="habit_input_1" type="checkbox" value="Sleep 6-8 Hours"/>
                                <label htmlFor="habit_input_1" id="habit_label">Sleep 6-8 Hours</label>
                            </li>
                            <li>
                                <input onClick={addHabit} id="habit_input_2" type="checkbox" value="Eat Breakfast"/>
                                <label htmlFor="habit_input_2" id="habit_label">Eat Breakfast</label>
                            </li>
                            <li>
                                <input onClick={addHabit} id="habit_input_3" type="checkbox" value="Drink Water"/>
                                <label htmlFor="habit_input_3" id="habit_label">Drink Water</label>
                            </li>
                            <li>
                                <input onClick={addHabit} id="habit_input_4" type="checkbox" value="Exercise"/>
                                <label htmlFor="habit_input_4" id="habit_label">Exercise</label>
                            </li>
                            <li>
                                <input onClick={addHabit} id="habit_input_5" type="checkbox" value="Meditate"/>
                                <label htmlFor="habit_input_5" id="habit_label">Meditate</label>
                            </li>
                            <li>
                                <input onClick={addHabit} id="habit_input_6" type="checkbox" value="Journal"/>
                                <label htmlFor="habit_input_6" id="habit_label">Journal</label>
                            </li>
                            <li>
                                <input onClick={addHabit} id="habit_input_7" type="checkbox" value="Read"/>
                                <label htmlFor="habit_input_7" id="habit_label">Read</label>
                            </li>
                            <li>
                                <input onClick={addHabit} id="habit_input_8" type="checkbox" value="Clean"/>
                                <label htmlFor="habit_input_8" id="habit_label">Clean</label>
                            </li>
                        </ul>
                    </div>
                    <label id="habit_heading">Daily Habits to End</label>
                    <div className="habit_group">
                        <ul>
                            <li>
                                <input onClick={addHabitToStop} id="habit_input_9" type="checkbox" value="Smoke"/>
                                <label htmlFor="habit_input_9" id="habit_label">Smoke</label>
                            </li>
                            <li>
                                <input onClick={addHabitToStop} id="habit_input_10" type="checkbox" value="Drink Alcohol"/>
                                <label htmlFor="habit_input_10" id="habit_label">Drink Alcohol</label>
                            </li>
                            <li>
                                <input onClick={addHabitToStop} id="habit_input_11" type="checkbox" value="Drink Coffee"/>
                                <label htmlFor="habit_input_11" id="habit_label">Drink Coffee</label>
                            </li>
                            <li>
                                <input onClick={addHabitToStop} id="habit_input_12" type="checkbox" value="Eat Junk Food"/>
                                <label htmlFor="habit_input_12" id="habit_label">Eat Junk Food</label>
                            </li>
                            <li>
                                <input onClick={addHabitToStop} id="habit_input_13" type="checkbox" value="Sit All Day"/>
                                <label htmlFor="habit_input_13" id="habit_label">Sit All Day</label>
                            </li>
                            <li>
                                <input onClick={addHabitToStop} id="habit_input_14" type="checkbox" value="Bite Nails"/>
                                <label htmlFor="habit_input_14" id="habit_label">Bite Nails</label>
                            </li>
                        </ul>
                    </div>
                </form>   
            </div>
            <div className='button_group'>
                    <button onClick={routeSignup}>Return</button>
                    <button type="submit" form='choose_habits_form'>Next</button>
            </div>
        </div>
    );
}

export default ChooseHabits;