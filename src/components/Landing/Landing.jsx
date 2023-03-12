import React from 'react';
import './landing.css';
import Logo from '../../assets/images/atomic_logo.png'

function Landing() {
    return (
        <div className="landing_page_container">
            <div className='landing_navbar'>
                <div className='logo_div'>
                    <img src={Logo} alt="atom logo" style={{width: 40, height: 40}}></img>
                    <label>Atomic</label>
                </div>
                <div className='nav_button_div'>
                    <label>About Us</label>
                    <label>FAQ  |</label>
                    <button id="navbar_log_in">Log In</button>
                    <button>Sign Up</button>
                </div>
            </div>

            <h1>Welcome</h1>
            <p id="mantra">Direct your life with Atomic</p>
            <p>Log and track your habits, good and bad. <i>Who are we to judge.</i></p>
            <p>Live your best life. Be the person you want to be.</p>
            <div className="landing_button_div">
                <button>Sign Up</button>
                <button>Log In</button>
            </div>
        </div>
    );
}

export default Landing;

