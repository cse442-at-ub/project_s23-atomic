import React from "react"
import Navbar from "../Homepage/Navbar";
import HabitContext from "../contexts/HabitContext";

import {Bar, Line} from "react-chartjs-2";
import 'chart.js/auto';

import {useState, useEffect, useContext} from "react";
import {Link} from "react-router-dom";
import './statspage.css'

export default function Stats() {

    // user is the user data from the backend
    // getUserData is the function to get the user data from the backend
    // both are from HabitContext.js
    const {user, getUserData} = useContext(HabitContext);

    // variable to store current selected habit type
    const [habitType, setHabitType] = useState("All");
    // variable to store current selected habit
    const [habit, setHabit] = useState("Choose A Habit");
    // variable to store the habit titles 
    const [habitTitles, setHabitTitles] = useState([]);

    // will be used to store the data for the graph
    // list of objects matching the format {title: habit title, logs: log number}
    // or {day: day of the week, logs: log number} if a specific habit is selected
    const [data, setData] = useState([]);

    // chart data structure for the graph
    const [chart, setChart] = useState({
        labels: [],
        datasets: [
            {
                label: '',
                data: []
            }
        ],
    });

    // function to set the habit type
    const setHabitTypeFunc = (event) => {
        resetData();
        setHabitType(event.target.value);
        // want to reset habit state to default state
        setHabit("Choose A Habit")
    }
    // function to set the habit
    const setHabitFunc = (event) => {
        resetData();
        setHabit(event.target.value)
    }
    // function to reset chart data and data state
    const resetData = () => {
        setData([]);
        setChart({
            labels: [],
            datasets: [
                {
                    label: '',
                    data: []
                }
            ],
        });
    }

    // function to filter out the data for the graph
    const getData = async() => {

        // if the habit type is all, get all the habits
        if (habitType === "All") {
            const goodhabitData = await Promise.all(
                Object.keys(user.good).map((habit) => {
                    return (
                        {
                            title: user.good[habit].title,
                            logs: user.good[habit].counter
                        }
                    )
                }),
            )
            setData(goodhabitData);
            const badhabitData = await Promise.all(
                Object.keys(user.bad).map((habit) => {
                    return (
                        {
                            title: user.bad[habit].title,
                            logs: user.bad[habit].counter
                        }
                    )
                }),
            )
            // add the bad habits to the data if they are not already in the data
            badhabitData.map((habit) => {
                if (!data.some(item => item.hasOwnProperty(habit.title))){
                    setData(data => [...data, habit]);
                }
            })

        }
        // if the habit type is good, get all the good habits
        if (habitType === "Good") {
            if (habit === "Choose A Habit") {
                const habitData = await Promise.all(
                    Object.keys(user.good).map((habit) => {
                        return (
                            {
                                title: user.good[habit].title,
                                logs: user.good[habit].counter
                            }
                        )
                    })
                )
                setData(habitData);
            } else {
                const habitData = await Promise.all(
                    Object.keys(user.good[habit].Days).map((num) => {
                        if (num !== "0") {
                            return (
                                {
                                    day: "Day " + num,
                                    logs: user.good[habit].Days[num]
                                }
                            )
                        }
                    })
                )
                setData(habitData.slice(1));
            }
        }
        // if the habit type is bad, get all the bad habits
        if (habitType === "Bad") {
            if(habit === "Choose A Habit") {
                const habitData = await Promise.all(
                    Object.keys(user.bad).map((habit) => {
                        return (
                            {
                                title: user.bad[habit].title,
                                logs: user.bad[habit].counter
                            }
                        )
                    })
                )
                setData(habitData);
            } else {
                const habitData = await Promise.all(
                    Object.keys(user.bad[habit].Days).map((num) => {
                        if (num !== "0") {
                            return (
                                {
                                    day: "Day " + num,
                                    logs: user.bad[habit].Days[num]
                                }
                            )
                        }
                    })
                )
                setData(habitData.slice(1));
            }
        }

        // console.log(data)
        // console.log(chart)
    }

    // function to set chart data
    const setChartData = () => {
        if (habit === "Choose A Habit") {
            setChart({
                labels: data.map(row => row.title),
                datasets: [
                    {
                        backgroundColor: 'rgba(79, 98, 194, 0.85)',
                        data: data.map(row => row.logs)
                    }
                ],
            })
        } else {
            setChart({
                labels: data.map(row => row.day),
                datasets: [
                    {
                        label: 'logs',
                        backgroundColor: 'rgba(79, 98, 194)',
                        borderColor: 'rgba(79, 98, 194,0.75)',
                        data: data.map(row => row.logs)
                    }
                ],
            })
        }

    }

    // function to return selections with habits based on habit type
    const getHabits = async() => {
        if (habitType === "Good") {
            const titles = await Promise.all(
                Object.keys(user.good).map((habit) => {
                    return (
                        <option value={user.good[habit].title}>{user.good[habit].title}</option>
                    )
                })
            )
            setHabitTitles(titles);
        }
        else if (habitType === "Bad") {
            const titles = await Promise.all(
                Object.keys(user.bad).map((habit) => {  
                    return (
                        <option value={user.bad[habit].title}>{user.bad[habit].title}</option>
                    )
                })
            )
            setHabitTitles(titles);
        }
    }



    // use effect will run every 700 milliseconds to get the user data from the backend
    useEffect(() => {
        const interval = setInterval(async () => {
            // call the getUserData function from HabitContext.js to get the user data
            // makes get request to backend to get user data
            const info = await getUserData(sessionStorage.getItem("id"));

            // if the user data is not null, set the user data
            if (info !== null) {
                getData();
                setChartData();
                getHabits();
            }

        }, 1050)
        return () => clearInterval(interval)
    })

    // use effect will run every time the habit and habit type changes
    useEffect(() => {
        getData();
        setChartData();
        getHabits();
    }, [habitType, habit])
    

    // use effect will run once to set the title of the page

    useEffect(() => {
        document.title = "Statistics ";
    }, []);

    const alloptions = {
        responsive: true,
        animation: {
            duration: 0 // general animation time
        },
        scales: {
            x: {
                ticks: {
                    font: {
                        size: 22,
                    },
                }
            },
            y: {
                ticks: {
                    beginAtZero: true,
                    font: {
                        size: 22,
                    }
                },
                title: {
                    display: true,
                    text: 'Number of Logs',
                    font : {
                        size: 22,
                    }   
                }
            }
        },
        plugins: {
          legend: {
            display: false,
          },
        },
    };

    return (
        <div className="stats_wrapper">
            <Navbar />
            <div className="stats-container">
                <div className="stats-header">
                    <Link to="/CSE442-542/2023-Spring/cse-442q/homepage" className='stat_back_link'>&lt; Back to Home</Link>
                </div>
                <div className="graph_container">
                    <div className="graph-title">
                        { (habit === "Choose A Habit") ?
                            <h2>Daily Progress</h2>
                        :
                            <h2>Weekly Progress for {habit}</h2>
                        }
                    </div>   
                    <div className="statgraph">
                        <div className="statgraph_selection">
                            <div className="type_statgraph_selection">
                                <label>Habit Type</label>
                                <select name="statgraph_select" id="statgraph_select" onChange={setHabitTypeFunc}>
                                    <option value="All">All</option>
                                    <option value="Good">Good Habits</option>
                                    <option value="Bad">Bad Habits</option>
                                </select>
                            </div>

                            { (habitType !== "All") ? 
                                <div className="habit_statgraph_selection">
                                    <label>Habit</label>
                                    <select name="statgraph_select" id="statgraph_select_habits" onChange={setHabitFunc}>
                                        <option value="Choose A Habit">Choose A Habit</option>
                                        {habitTitles}
                                    </select>
                                </div>
                            :
                                null
                            }
                        </div>
                        <div className="statgraph_content">
                            {habit === "Choose A Habit" ?
                                (data.length !== 0) ?
                                    <Bar data={chart} redraw options={alloptions}/>
                                :
                                    <div className="no_habits">
                                        <h2>You have no habits to display</h2>
                                    </div>

                            :
                                (data.length !== 0) ?
                                    <Line data={chart} redraw options={alloptions}/>
                                :
                                    <div className="no_habits">
                                        <h2>You have no habits to display</h2>
                                    </div>  
                            }
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
};