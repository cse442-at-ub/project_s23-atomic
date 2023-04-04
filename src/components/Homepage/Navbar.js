import React from "react"
import logo from '../../assets/images/atomic_logo.png'
import gear from '../../assets/images/gearIcon.png'
import {Link, useNavigate} from 'react-router-dom'


export default function Navbar() {
    let navigate = useNavigate()
    const routeHome = () => {navigate('/homepage')}
 
    return (
    <nav>
        <button className="nav--homeButton" onClick={routeHome}>
            <img src={logo} className="nav--logo"/>
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
            <img src={gear} className="nav--settings"/>
            </button>
            </Link>
    </nav>
    )
}