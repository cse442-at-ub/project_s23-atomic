import React from "react"
import logo from '../../assets/images/atomic_logo.png'
import gear from '../../assets/images/gearIcon.png'


export default function Navbar() {
    return (
    <nav>
        <button className="nav--homeButton">
            <img src={logo} className="nav--logo"/>
            <h2 className="nav--title">Atomic</h2>
            <h3 className="nav--subtitle"> Habits For Life </h3>
        </button>
        <button className="nav--stats"> Statistics</button>
        <button className="nav--info"> Information</button>
        <button className="nav--settingsButton">
        <img src={gear} className="nav--settings"/>
        </button>
    </nav>
    )
}