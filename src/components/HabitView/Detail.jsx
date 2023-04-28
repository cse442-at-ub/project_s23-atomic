import React from 'react';
import './detail.css';
import Navbar from '../Homepage/Navbar';
import HabitContext from '../contexts/HabitContext';

import { useState, useEffect, useContext} from 'react';
import { useNavigate, useLocation, Link} from "react-router-dom";
import {ToastContainer, toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from "axios";

function Detail(){

    const navigate = useNavigate();
    const routeHome = () =>{
        let path = '/CSE442-542/2023-Spring/cse-442q/homepage'
        navigate(path)
    }

    // Used preliminarly before routeDetail data transfer was written
    // const routeEditHabit = () =>{
    //     let path = '/CSE442-542/2023-Spring/cse-442q/edit'
    //     navigate(path)
    // }


    // any page that routes to this page should send in state param values (title, category, details, counter, total, added)
    //need to pass in correct habit information to this component 
    // added will be a boolean to keep track of when a user gets sent to the page
    // if true, user came from editing or adding/creating a new habit and a success message will be displayed
    // if false, regular habit information will be displayed with no success message
    // we use useLocation to get this state
    const { state } = useLocation();

    // This is for navigating to the Edit page
    // It gets saves the data that this Detail.jsx directly recieves from the first routDetail() call
    const routeEdit = () => {
        const n = state.title;
        const c = state.category;
        const d = state.details;
        const sum = state.counter;
        const t = state.total;
        const type = state.type;
        const path = '/CSE442-542/2023-Spring/cse-442q/edit';
        
        sessionStorage.setItem("added","true")
        navigate(path, {state:{title:n, category:c, details:d, counter:sum, total:t, type:type}});
    }


    // notify user that habit was successfully added if coming from creating/adding habit
    const notify = () => {
        toast.success('New Habit Added!', {
            position: "top-right",
            autoClose: 1050,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
            });
    };
    
    const updateHabit = async(id, t, tt) => {
        let result = true;
        await axios({
           method: "post",
           url: "http://localhost:8000/updatehabit.php",
           data: {
              id: id,
              counter: tcounter,
              type: t,
              title: tt
           },
           }).then(function (response) {
              // successful call will replace user object with correct information
              console.log("success");
              console.log(response.data)
              console.log(response.config.data);
           }).catch(function (error) {
              console.log("failed to send post request");
              console.log(error);
              console.log("error is "+ error.msg);
              result = false;
           });
           return result;
     }


    const [tcounter, setTcounter] = useState(state.counter)
    const {good_habits, bad_habits, user, setUser, getUserData, addGoodHabit, addBadHabit, sendHabits} = useContext(HabitContext);

    const updateCounter =(data, title, newCounter) =>{
        return data.map(obj =>{
            //is this the right comparison?
                return{
                    ...obj,
                    title: {
                        ...obj,
                        counter: newCounter
                    }
                }
        })
    }


    const increment = async() => {
        //console.log(state.title);
        setTcounter(tcounter+1);
        const data = await getUserData(sessionStorage.getItem("id"));
        let thisuser = data
        // console.log(thisuser.good)
        // console.log("originals =", thisuser.good[state.title])
        // console.log(tcounter)

        //copy of original habit but with updated counter
        if(state.type === "Good"){
            const Days ={
                0: tcounter + 1,
                1: thisuser.good[state.title]["Days"][1],
                2: thisuser.good[state.title]["Days"][2],
                3: thisuser.good[state.title]["Days"][3],
                4: thisuser.good[state.title]["Days"][4],
                5: thisuser.good[state.title]["Days"][5],
                6: thisuser.good[state.title]["Days"][6],
                7: thisuser.good[state.title]["Days"][7],
            }
            const habit = {
                Days,
                title: thisuser.good[state.title]["title"],
                total: thisuser.good[state.title]["total"],
                //+ 1 properly updates counter
                counter: tcounter + 1,
                details: thisuser.good[state.title]["details"],
                category: thisuser.good[state.title]["category"],
            }
            console.log(state.type)
        
            delete thisuser.good[state.title]
            console.log("altered good object =", thisuser.good)

            const rslt ={
                ...thisuser.good,
                [state.title] : habit
            }
            sendHabits(sessionStorage.getItem("id"), rslt, thisuser.bad)
        }else{
            const Days ={
                0: tcounter + 1,
                1: thisuser.bad[state.title]["Days"][1],
                2: thisuser.bad[state.title]["Days"][2],
                3: thisuser.bad[state.title]["Days"][3],
                4: thisuser.bad[state.title]["Days"][4],
                5: thisuser.bad[state.title]["Days"][5],
                6: thisuser.bad[state.title]["Days"][6],
                7: thisuser.bad[state.title]["Days"][7],
            }
            const habit = {
                Days,
                title: thisuser.bad[state.title]["title"],
                total: thisuser.bad[state.title]["total"],
                //+ 1 properly updates counter
                counter: tcounter + 1,
                details: thisuser.bad[state.title]["details"],
                category: thisuser.bad[state.title]["category"],
            }
            delete thisuser.bad[state.title]
            console.log("altered bad object =", thisuser.bad)

            const rslt ={
                ...thisuser.bad,
                [state.title] : habit
            }
            sendHabits(sessionStorage.getItem("id"), thisuser.good, rslt)
        }
        //console.log("final good object =", rslt)
    };
    const decrement = async() => {
        setTcounter(tcounter-1);
        const data = await getUserData(sessionStorage.getItem("id"));
        let thisuser = data
        if (tcounter > 0){
            if(state.type === "Good"){
                const Days ={
                    0: tcounter - 1,
                    1: thisuser.good[state.title]["Days"][1],
                    2: thisuser.good[state.title]["Days"][2],
                    3: thisuser.good[state.title]["Days"][3],
                    4: thisuser.good[state.title]["Days"][4],
                    5: thisuser.good[state.title]["Days"][5],
                    6: thisuser.good[state.title]["Days"][6],
                    7: thisuser.good[state.title]["Days"][7],
                }
                const habit = {
                    Days,
                    title: thisuser.good[state.title]["title"],
                    total: thisuser.good[state.title]["total"],
                    //+ 1 properly updates counter
                    counter: tcounter - 1,
                    details: thisuser.good[state.title]["details"],
                    category: thisuser.good[state.title]["category"],
                }
                console.log(state.type)
            
                delete thisuser.good[state.title]
                console.log("altered good object =", thisuser.good)
    
                const rslt ={
                    ...thisuser.good,
                    [state.title] : habit
                }
                sendHabits(sessionStorage.getItem("id"), rslt, thisuser.bad)
            }else{
                const Days ={
                    0: tcounter - 1,
                    1: thisuser.bad[state.title]["Days"][1],
                    2: thisuser.bad[state.title]["Days"][2],
                    3: thisuser.bad[state.title]["Days"][3],
                    4: thisuser.bad[state.title]["Days"][4],
                    5: thisuser.bad[state.title]["Days"][5],
                    6: thisuser.bad[state.title]["Days"][6],
                    7: thisuser.bad[state.title]["Days"][7],
                }
                const habit = {
                    Days,
                    title: thisuser.bad[state.title]["title"],
                    total: thisuser.bad[state.title]["total"],
                    //+ 1 properly updates counter
                    counter: tcounter - 1,
                    details: thisuser.bad[state.title]["details"],
                    category: thisuser.bad[state.title]["category"],
                }
                delete thisuser.bad[state.title]
                console.log("altered bad object =", thisuser.bad)
    
                const rslt ={
                    ...thisuser.bad,
                    [state.title] : habit
                }
                sendHabits(sessionStorage.getItem("id"), thisuser.good, rslt)
            }
        }else{
            setTcounter(0)
        }
    };

    // if (tcounter < 0){
    //     setTcounter(0)
    // };

    useEffect(() => {
        if (sessionStorage.getItem("added") === "true"){
            sessionStorage.setItem("added","false");
            notify();
        }
      }, []);

    return(
        <div className="detail_wrapper">
            <Navbar />
            <div className='info_container'>
                <ToastContainer limit={1}/>
                <div className='back_link' onClick={routeHome}>&lt; Back to Home</div>
                <div className='column_1'>
                    <h1 className="detail-title">{state.title}</h1>
                    <button className='edit_button' onClick={() => routeEdit()}>Edit</button>
                </div>
                <div className='column_2'>
                    <div className='category_container'>
                        <p id='category_label' className={state.category}>{state.category}</p>
                        <p id='category_label' className={state.type}>{state.type}</p>
                    </div>
                    <p style={{fontWeight:"bold"}}>Details</p>
                    <div id="detail_box">
                        <p>{state.details}</p>
                    </div>
                </div>
                <div className='column_3'>
                    <div className='counter_info'>
                        <div className='counter_button'>
                            <button id="minus_btn" onClick={decrement}>-</button>
                            <label>{tcounter}</label>
                            <button id="plus_btn" onClick={increment}>+</button>
                        </div>
                        <label> / {state.total}</label>
                    </div>
                    <button id="delete_button">Delete</button>
                </div>
            </div>
        </div>    
    )

}

export default Detail;