import React from "react"
import logo from '../../assets/images/atomic_logo.png'
import gear from '../../assets/images/gearIcon.png'
import {Link, useNavigate} from 'react-router-dom'
import {useContext} from 'react'
import './style.css';
import HabitContext from "../contexts/HabitContext";


export default function Navbar() {
    const {user} = useContext(HabitContext);

    let navigate = useNavigate()
    const routeHome = () => {navigate('/homepage')}
 
    return (
    <nav>
        <button className="nav--homeButton" onClick={routeHome}>
            <img src={logo} className="nav--logo" alt="atomic icon"/>
            <h2 className="nav--title">Atomic</h2>
            <h3 className="nav--subtitle"> Habits For Life </h3>
        </button>
        <Link to="/statistics">
            <button className="nav--stats"> Statistics</button>
        </Link>
        <Link to="/information">
            <button className="nav--info"> Information</button>
        </Link>
        <Link to="/settings">
        <button className="nav--settingsButton">
            <img src={gear} className="nav--settings" alt="settings icon"/>
        </button>
        </Link>
        <h2 id="nav_username_label">{user.username !== "" ? user.username : ""}</h2>
    </nav>
    )
}