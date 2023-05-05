import React from "react"
import logo from '../../assets/images/atomic_logo.png'

import cat from '../../assets/profilepics/cat.jpeg'
import hamster from '../../assets/profilepics/hamster.JPG'
import hoopla from '../../assets/profilepics/hoopla.jpeg'
import joker from '../../assets/profilepics/joker.jpeg'
import lisa from '../../assets/profilepics/lisa.JPG'
import sandy from '../../assets/profilepics/sandy.jpeg'
import sniff from '../../assets/profilepics/sniff.png'
import chillCat from '../../assets/profilepics/chillCat.png'
import meditate from '../../assets/profilepics/meditate.jpg'
import patrick from '../../assets/profilepics/patrick.jpg'
import pepe from '../../assets/profilepics/pepe.jpg'
import shrek from '../../assets/profilepics/shrek.jpg'

// import avatar from '../../assets/images/avatar.png'
import {useNavigate} from 'react-router-dom'
import {useContext, useState, useEffect} from 'react'
import './navbar.css'
import HabitContext from "../contexts/HabitContext";

export default function Navbar() {

    // array of avatars
    const avatars = [cat, hamster, hoopla, joker, lisa, sandy, sniff, chillCat, meditate, patrick, pepe, shrek]
    // will be used to generate a random avatar index for profile picture
    const [randomNumber, setRandomNumber] = useState(0)
    // generate a random number to be used as an index for the avatars array
    const genNumber = () => {
        var num = Math.floor(Math.random() * avatars.length);
        setRandomNumber(num);
    }

    useEffect(() => {
        genNumber();
    }, [])

    const {user,setUser} = useContext(HabitContext);

    let navigate = useNavigate()
    const routeHome = () => {navigate('/CSE442-542/2023-Spring/cse-442q/homepage')}

    const routeStatistics = () => {navigate('/CSE442-542/2023-Spring/cse-442q/statistics')}
    const routeFAQ = () => {navigate('/CSE442-542/2023-Spring/cse-442q/information')}
    const routeEmail = () => {navigate('/CSE442-542/2023-Spring/cse-442q/email')}
    const routeLogout = () => {
        sessionStorage.clear();
        setUser({})
        navigate('/CSE442-542/2023-Spring/cse-442q/')
    }

    const checkPath = (path) => {
        if (window.location.pathname === "/CSE442-542/2023-Spring/cse-442q/" + path) {
            return true;
        }
        return false;
    }

    return (
    <nav>
        <div className='app_logo_div' onClick={routeHome}>
            <img src={logo} alt="atom logo"></img>
            <div id="name_nav">
                <label>Atomic</label>
                <label id="sub_label">Habits for Life</label>
            </div>
        </div>
        <div className='app_button_div'>
            {checkPath("statistics") ? <p id="current_tab" onClick={routeStatistics}>Statistics</p> : <p onClick={routeStatistics}>Statistics</p>}
            {checkPath("information") ? <p id="current_tab" onClick={routeFAQ}>FAQ</p> : <p onClick={routeFAQ}>FAQ</p>}
            {checkPath("email") ? <p id="current_tab" onClick={routeEmail}>Email Reminder</p> : <p onClick={routeEmail}>Email Reminder</p>} 
        </div>
        <div className='profile_nav_div'>
            <img src={pepe} alt="avatar"></img>
            <div className='nav_dropdown'>
                <h2 id="nav_username_label">{user.username !== "" ? user.username : ""}</h2>
                <div className='nav_logout'>
                    <p onClick={routeLogout}>Log Out</p>
                </div>
            </div>
        </div>
    </nav>
    )
}