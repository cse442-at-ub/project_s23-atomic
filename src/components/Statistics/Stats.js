import React from "react"
import Navbar from "../Homepage/Navbar";
import HabitContext from "../contexts/HabitContext";
import Chart from 'chart.js/auto';
import {useState, useEffect, useContext} from "react";
import './statspage.css'

export default function Stats() {
    const {user, getUserData} = useContext(HabitContext);

    return (
        <div className="statsContainer">
            <Navbar />
            <div className="statsContent">
                <h1>Statistics</h1>
                
            </div>
        </div>
    );
};