import React from "react"
import logo from '../../assets/images/atomic_logo.png'
import gear from '../../assets/images/gearIcon.png'
import {Link} from 'react-router-dom'


export default function Navbar() {
    return (
    <nav>
        <button className="nav--homeButton">
            <img src={logo} className="nav--logo" alt="Atomic Symbol"/>
            <h2 className="nav--title">Atomic</h2>
            <h3 className="nav--subtitle"> Habits For Life </h3>
        </button>
            <Link to="/statistics">
                <button onClick="location.href='localhost:3000/signup'" className="nav--stats"> Statistics</button>
            </Link>
            <Link to="/information">
            <button className="nav--info"> Information</button>
            </Link>
            <Link to="/settings">
            <button className="nav--settingsButton">
            <img src={gear} className="nav--settings" alt="gear symbol"/>
            </button>
            </Link>
    </nav>
    )
}