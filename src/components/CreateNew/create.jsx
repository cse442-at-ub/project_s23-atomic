import React from "react"
import Navbar from "./Navbar"

import './createpage.css' // Why is this needed for this page. For some reason it influences the background color.
import "./create.css"

export default function create() {
    return (
    <div id="create-container">
        <h2>Create New Habit</h2>
        <div id="categories">
            <h5>Category</h5>
        </div>
        <div id="title">
            <h5>Title</h5>
            <input type="text" />
        </div>
        <div id="details">
            <h5>Details</h5>
        </div>
        <div id="counter">
            <h5>Counter</h5>
        </div>
    <Navbar/>
    </div>
    );
};