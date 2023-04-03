import React from 'react';
import './suggestions.css';
import Navbar from '../Homepage/Navbar';
import axios from 'axios';
import { useState } from 'react';
import { useNavigate, useLocation, Link } from "react-router-dom";

function Suggestions(){

    const navigate = useNavigate();
    const location = useLocation();

    const [user, setUser] = useState(0);

    return(
        <div className="preset_container">
            <Navbar />
            <div className="overall_list_container">
                <div className='top_page'>
                    <Link to="/homepage" className='back_link'>&lt; Back to Home</Link>
                    <h1>Pick A Habit</h1>
                </div>
                <div className="list_container">
                    <div className='category_wrapper'>
                        <h3>Health</h3>
                        <div className='category' id="health">
                            <ul>
                                <li>Sleep 6-8 Hours</li>
                                <li>Eat Breakfast</li>
                                <li>Drink Water</li>
                                <li>Exercise</li>
                                <li>Meditate</li>
                                <li>Digital Detox</li>
                                <li>Meal Prep</li>
                                <li>Eat Something Healthy</li>
                                <li>Explore Nature</li>
                                <li>Self Care</li>
                                <li>Brush Your Teeth</li>
                            </ul>
                        </div>
                    </div>
                    <div className='category_wrapper'>
                        <h3>Work</h3>
                        <div className='category' id="work">
                            <ul>
                                <li>Arrive On Time</li>
                                <li>Organize your Workspace</li>
                                <li>Manage Your Schedule</li>
                                <li>Help Your Teammates</li>
                                <li>Actively Listen To Others</li>
                                <li>Accept Constructive Criticism</li>
                                <li>Separate Work From Personal Life</li>
                                <li>Dress Appropriately</li>
                                <li>Gossip Less</li>
                                <li>Stop Procrastinating</li>
                            </ul>
                        </div>
                    </div>
                    <div className='category_wrapper'>
                        <h3>Social</h3>
                        <div className='category' id="social">
                            <ul>
                                <li>Reach Out to Someone You Love</li>
                                <li>Be Positive</li>
                                <li>Beat your Anxiety</li>
                                <li>Ask for Help</li>
                                <li>Be Grateful</li>
                                <li>Give Yourself a Compliment</li>
                                <li>Compliment a Stranger</li>
                                <li>Do Something That Scares You</li>
                            </ul>
                        </div>
                        
                    </div>
                </div>
                <div className="list_container">
                    <div className='category_wrapper'>
                        <h3>School</h3>
                        <div className='category' id="school">
                            <ul>
                                <li>Take Class Notes</li>
                                <li>Study</li>
                                <li>Work On Your Assignments</li>
                                <li>Take A Wellness Break</li>
                                <li>Go To Class</li>
                            </ul>
                        </div>
                    </div>
                    <div className='category_wrapper'>
                        <h3>Family</h3>
                        <div className='category' id="family">
                            <ul>
                                <li>Spend Time With Your Loved Ones</li>
                                <li>Show Your Love</li>
                                <li>Eat Together</li>
                                <li>Be Active Together</li>
                                <li>Set Goals</li>
                                <li>Listen To Each Other</li>
                                <li>Play A Game</li>
                            </ul>
                        </div>
                    </div>
                    <div className='category_wrapper'>
                        <h3>Miscellaneous</h3>
                        <div className='category' id="misc">
                            <ul>
                                <li>Save Money</li>
                                <li>Clean</li>
                                <li>Journal</li>
                                <li>Read</li>
                                <li>Learn Something New</li>
                                <li>Listen to Music</li>
                                <li>Reward Yourself</li>
                            </ul>
                        </div>
                    </div>
                    <div className='category_wrapper'>
                        <h3>Harmful</h3>
                        <div className='category' id="bad">
                            <ul>
                                <li>Smoke</li>
                                <li>Drink Alcohol</li>
                                <li>Drink Coffee</li>
                                <li>Eat Junk Food</li>
                                <li>Sit All Day</li>
                                <li>Bite Your Nails</li>
                                <li>Skip A Meal</li>
                                <li>Multitask</li>
                                <li>Criticize Yourself</li>
                                <li>Binge Eat</li>
                                <li>Overcommit Yourself</li>
                                <li>Gossip</li>
                                <li>Lying</li>
                            </ul>
                        </div>
                    </div>
                </div> 
            </div>
        </div>    
    )
}

export default Suggestions;