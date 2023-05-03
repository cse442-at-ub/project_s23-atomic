import React from 'react';
import './options.css';
import Navbar from '../Homepage/Navbar';
import { useEffect, useState } from 'react';
import { useNavigate, useLocation, Link} from "react-router-dom";

function Options(){
    const navigate = useNavigate();
    const location = useLocation();

    let user = (sessionStorage.getItem("id"));

    const handlePreset = () => {
        sessionStorage.setItem("id", user)
        navigate('/CSE442-542/2023-Spring/cse-442q/suggestions');
    }

    const handleCustom = () => {
        navigate('/CSE442-542/2023-Spring/cse-442q/create');
    }

    useEffect(() => {
        // set document title
        document.title = "Create New Habit";
    }, []);


    return(
        <div className="options_container">
            <Navbar />
            <div id="link">
                <Link to="/CSE442-542/2023-Spring/cse-442q/homepage" className='options_back_link'>&lt; Back</Link>
            </div>
            <div className="options_title_container">
                <div className="preset_option_container" onClick={handlePreset}>
                    <h2 className="preset_option_title">Choose from Our Recommended Habits!</h2>
                    <br/>
                    <p id="description">Not sure what you want to track?</p>
                    <p id="description">Pick from our suggestions! We're here to help!</p>
                </div>
                <div className="border"></div>
                <div className="custom_option_container" onClick={handleCustom}>
                    <h2 className="custom_option_title">Create Your Own Habit!</h2>
                    <br/>
                    <p id="description">Need to put more thought into it?</p>
                    <p id="description">Make a custom habit! You have all the control.</p>
                </div>
            </div>
        </div>    
    )
}

export default Options;