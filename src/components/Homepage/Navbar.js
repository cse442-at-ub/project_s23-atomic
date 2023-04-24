import React from "react"
import logo from '../../assets/images/atomic_logo.png'
import avatar from '../../assets/images/avatar.png'
import {useNavigate} from 'react-router-dom'
import {useContext} from 'react'
import './navbar.css'
import HabitContext from "../contexts/HabitContext";


export default function Navbar() {
    const {user} = useContext(HabitContext);

    let navigate = useNavigate()
    const routeHome = () => {navigate('/CSE442-542/2023-Spring/cse-442q/homepage')}

    const routeStatistics = () => {navigate('/CSE442-542/2023-Spring/cse-442q/statistics')}
    const routeFAQ = () => {navigate('/CSE442-542/2023-Spring/cse-442q/information')}
 
    return (
    <nav>
        <div className='app_logo_div' onClick={routeHome}>
            <img src={logo} alt="atom logo" style={{width: 65, height: 65}}></img>
            <div id="name_nav">
                <label>Atomic</label>
                <label id="sub_label">Habits for Life</label>
            </div>
        </div>
        <div className='nav_button_div'>
            <p onClick={routeStatistics}>Statistics</p>
            <p onClick={routeFAQ}>FAQ</p>
        </div>
        <div className='profile_nav_div'>
            <img src={avatar} alt="avatar" style={{width: 85, height: 80}}></img>
            <h2 id="nav_username_label">{user.username !== "" ? user.username : ""}</h2>
        </div>
    </nav>
    )
}