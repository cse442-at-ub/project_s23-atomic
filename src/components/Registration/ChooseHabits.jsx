import React from 'react';
import './choose.css';
import axios from 'axios';
import { useState } from 'react';
import { useNavigate, useLocation } from "react-router-dom";


// we want to pass user id to this component when navigating in order to correctly add habits to database 
// future implementation may use cookies that is handled by php backend
function ChooseHabits() {

     // use navigate uses Router to navigate to different paths
    const navigate = useNavigate();
    // signin.jsx sends state variable user, which holds the new users id, to choosehabits.jsx
    // useLocation is used to get that state
    const { state } = useLocation();
    const routeHome = () =>{ 
        let path = `/homepage`; 
        navigate(path);
    }
    const routeSignup = () =>{ 
        let path = `/signup`; 
        navigate(path);
    }

    // hard coded habits that will be added to database
    // all habits should share this format
    let good_habits = {
        "Sleep 6-8 Hours": {'counter': 0, 'total': 1, 'details': 'Getting enough sleep is vital to your health.', 'category': 'Wellness'},
        "Eat Breakfast": {'counter': 0, 'total': 1, 'details': 'Eating breakfast everyday starts your day.','category':'Wellness'},
        "Drink Water": {'counter': 0, 'total': 8, 'details': '8 glasses a day is recommended for gut and skin health.','category':'Wellness'},
        "Exercise": {'counter': 0, 'total': 1, 'details': 'Exercise for at least 30 minutes a day. Go on a walk!','category':'Wellness'},
        "Meditate": {'counter': 0, 'total': 1, 'details': 'Ground your mind daily. Tap in.','category':'Wellness'},
        "Journal": {'counter': 0, 'total': 1, 'details': 'Put whats on your mind on paper. It will help.','category':'Wellness'},
        "Read": {'counter': 0, 'total': 1, 'details': 'Pick up a good book. Reading 20 minutes a day is ideal.','category':'Wellness'},
        "Clean": {'counter': 0, 'total': 1, 'details': 'Clean your room. Or do the dishes. Clean something.','category':'Wellness'}
    }

    let bad_habits = {
        "Smoke": {'counter': 0, 'total': 14, 'details': 'Smoking is hard to stop. Take small steps and try smoking less every day.', 'category': 'Wellness'},
        "Drink Alcohol": {'counter': 0, 'total': 5, 'details': 'Drink responsibly.','category':'Wellness'},
        "Drink Coffee": {'counter': 0, 'total': 3, 'details': 'Who wouldve thought? Lower your caffeine intake.','category':'Wellness'},
        "Eat Junk Food": {'counter': 0, 'total': 8, 'details': 'Lower your junk food intake. You can do it.','category':'Wellness'},
        "Sit All Day": {'counter': 0, 'total': 1, 'details': 'Sitting is addicting. Go on a short walk or get up and clean.','category':'Wellness'},
        "Bite Nails": {'counter': 0, 'total': 5, 'details': 'A habit since childhood. Small steps.','category':'Wellness'},
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
    const makePost = async() => {
        let good_habits_object = makeObject(habitList.dailyHabits, true);
        let bad_habits_object = makeObject(habitList.habitsToStop, false);
        await axios({
        method: "post",
        url: "http://localhost:8000/addhabit.php",
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
            console.log(state.user)
            setHabitBool(false); 
        } else {
            // console.log(habitList);
            setHabitBool(true);
            makePost();
        }
    }

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
                                <input onClick={addHabit} id="habit_input" type="checkbox" value="Sleep 6-8 Hours"/>
                                <label id="habit_label">Sleep 6-8 Hours</label>
                            </li>
                            <li>
                                <input onClick={addHabit} id="habit_input" type="checkbox" value="Eat Breakfast"/>
                                <label id="habit_label">Eat Breakfast</label>
                            </li>
                            <li>
                                <input onClick={addHabit} id="habit_input" type="checkbox" value="Drink Water"/>
                                <label id="habit_label">Drink Water</label>
                            </li>
                            <li>
                                <input onClick={addHabit} id="habit_input" type="checkbox" value="Exercise"/>
                                <label id="habit_label">Exercise</label>
                            </li>
                            <li>
                                <input onClick={addHabit} id="habit_input" type="checkbox" value="Meditate"/>
                                <label id="habit_label">Meditate</label>
                            </li>
                            <li>
                                <input onClick={addHabit} id="habit_input" type="checkbox" value="Journal"/>
                                <label id="habit_label">Journal</label>
                            </li>
                            <li>
                                <input onClick={addHabit} id="habit_input" type="checkbox" value="Read"/>
                                <label id="habit_label">Read</label>
                            </li>
                            <li>
                                <input onClick={addHabit} id="habit_input" type="checkbox" value="Clean"/>
                                <label id="habit_label">Clean</label>
                            </li>
                        </ul>
                    </div>
                    <label id="habit_heading">Daily Habits to End</label>
                    <div className="habit_group">
                        <ul>
                            <li>
                                <input onClick={addHabitToStop} id="habit_input" type="checkbox" value="Smoke"/>
                                <label id="habit_label">Smoke</label>
                            </li>
                            <li>
                                <input onClick={addHabitToStop} id="habit_input" type="checkbox" value="Drink Alcohol"/>
                                <label id="habit_label">Drink Alcohol</label>
                            </li>
                            <li>
                                <input onClick={addHabitToStop} id="habit_input" type="checkbox" value="Drink Coffee"/>
                                <label id="habit_label">Drink Coffee</label>
                            </li>
                            <li>
                                <input onClick={addHabitToStop} id="habit_input" type="checkbox" value="Eat Junk Food"/>
                                <label id="habit_label">Eat Junk Food</label>
                            </li>
                            <li>
                                <input onClick={addHabitToStop} id="habit_input" type="checkbox" value="Sit All Day"/>
                                <label id="habit_label">Sit All Day</label>
                            </li>
                            <li>
                                <input onClick={addHabitToStop} id="habit_input" type="checkbox" value="Bite Nails"/>
                                <label id="habit_label">Bite Nails</label>
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