import React from 'react';
import './detail.css';
import Navbar from '../Homepage/Navbar';

import { useState, useEffect } from 'react';
import { useNavigate, useLocation, Link} from "react-router-dom";
import {ToastContainer, toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Detail(){

    const navigate = useNavigate();
    // any page that routes to this page should send in state param values (title, category, details, counter, total, added)
    //need to pass in correct habit information to this component 
    // added will be a boolean to keep track of when a user gets sent to the page
    // if true, user came from editing or adding/creating a new habit and a success message will be displayed
    // if false, regular habit information will be displayed with no success message
    // we use useLocation to get this state
    const { state } = useLocation();

    // notify user that habit was successfully added if coming from creating/adding habit
    const notify = () => {
        toast.success('New Habit Added!', {
            position: "top-right",
            autoClose: 1050,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
            });
    };

    useEffect(() => {
        let error = true;
        if(state.added && error){
            notify();
            error = false;
        }
      }, [state.added]);

    return(
        <div className="detail_wrapper">
            <Navbar />
            <div className='info_container'>
                <ToastContainer limit={1}/>
                <Link to="/homepage" className='back_link'>&lt; Back to Home</Link>
                <div className='column_1'>
                    <h1 className="detail-title">{state.title}</h1>
                    <button className='edit_button'>Edit</button>
                </div>
                <div className='column_2'>
                    <p id='category_label'>{state.category}</p>
                    <p>Details</p>
                    <div id="detail_box">
                        <p>{state.details}</p>
                    </div>
                </div>
                <div className='column_3'>
                    <div className='counter_info'>
                        <div className='counter_button'>
                            <button id="minus_btn">-</button>
                            <label>{state.counter}</label>
                            <button id="plus_btn">+</button>
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