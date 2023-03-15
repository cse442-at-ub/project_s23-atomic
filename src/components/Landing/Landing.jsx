import React from 'react';
import './landing.css';
import Logo from '../../assets/images/atomic_logo.png'
import { useNavigate } from "react-router-dom";

function Landing() {

    // use navigate uses Router to navigate to different paths
    const navigate = useNavigate();
    const routeSignup = () =>{ 
        let path = `/signup`; 
        navigate(path);
    }
      const routeLogin = () =>{ 
        let path = `/login`; 
        navigate(path);
    }


    return (
        <div className="landing_page_container">
            <div className='landing_navbar'>
                <div className='logo_div'>
                    <img src={Logo} alt="atom logo" style={{width: 50, height: 50}}></img>
                    <div id="app_name_nav">
                        <label>Atomic</label>
                        <label>Habits for Life</label>
                    </div>
                </div>
                <div className='nav_button_div'>
                    <label>About Us</label>
                    <label>FAQ  |</label>
                    <button id="navbar_log_in" onClick={routeLogin}>Log In</button>
                    <button onClick={routeSignup}>Sign Up</button>
                </div>
            </div>

            <h1>Welcome</h1>
            <p id="mantra">Direct your life with Atomic</p>
            <p>Log and track your habits, good and bad. <i>Who are we to judge.</i></p>
            <p>Live your best life. Be the person you want to be.</p>
            <div className="landing_button_div">
                <button onClick={routeSignup}>Sign Up</button>
                <button onClick={routeLogin}>Log In</button>
            </div>
        </div>
    );
}

export default Landing;

