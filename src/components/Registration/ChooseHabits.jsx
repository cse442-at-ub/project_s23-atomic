import React from 'react';
import './choose.css';
import { useState } from 'react';

function ChooseHabits() {

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


    // handles submiting of form; checks whether 3 or more habits were chosen
    const handleSubmit = (event) => {
        if (habitCounter < 3) {
            setHabitBool(false); 
            event.preventDefault();   
        } else {
            console.log(habitList);
            setHabitBool(true);
        }
    }

    return (
        <div className='choose_habits_container'>
            <div className="choose_habits_div">
                <h1 id="choose_habits_header">You're One Step Closer!</h1>
                {habitBool && <p id="choose_habits_message">Choose at least 3</p>}
                {!habitBool && <p id="warning_message">Choose at least 3</p>}
                <small>Don't worry. You can always add more later ;)</small>
                <form id="choose_habits_form" onSubmit={handleSubmit}>
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
                    <button>Return</button>
                    <button type="submit" form='choose_habits_form'>Next</button>
            </div>
        </div>
    );
}

export default ChooseHabits;