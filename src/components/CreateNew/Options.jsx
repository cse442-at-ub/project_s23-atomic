import React from 'react';
import './options.css';
import Navbar from '../Homepage/Navbar';
import { useState } from 'react';
import { useNavigate, useLocation } from "react-router-dom";

function Options(){
    const navigate = useNavigate();
    const location = useLocation();

    const [user, setUser] = useState(0);

    const handlePreset = () => {
        navigate('/suggestions');
    }

    const handleCustom = () => {
        navigate('/create');
    }


    return(
        <div className="options_container">
            <Navbar />
            <div className="options_title_container">
                <div className="preset_option_container" onClick={handlePreset}>
                    <h1 className="preset_option_title">Choose from Our Recommended Habits!</h1>
                    <br/>
                    <p id="description">Not sure what you want to track?</p>
                    <p id="description">Pick from our suggestions! We're here to help!</p>
                </div>
                <div className="border"></div>
                <div className="custom_option_container" onClick={handleCustom}>
                    <h1 className="custom_option_title">Create Your Own Habit!</h1>
                    <br/>
                    <p id="description">Need to put more thought into it?</p>
                    <p id="description">Make a custom habit! You have all the control.</p>
                </div>
            </div>
        </div>    
    )
}

export default Options;