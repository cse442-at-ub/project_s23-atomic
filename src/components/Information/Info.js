import React from "react"
import { Link } from "react-router-dom";
import Navbar from "../Homepage/Navbar";
import './infopage.css'

import meditate from "../../assets/profilepics/meditate.jpg"

export default function Info() {
    return (
        <div>
            <Navbar />
            <div className="info-container">
                <h1> You have all the answers you need to live the life you want.</h1>
                <h2>Look Within.</h2>
                <img src={meditate} alt="info" className="info-img" />
            </div>
        </div>
    );
};