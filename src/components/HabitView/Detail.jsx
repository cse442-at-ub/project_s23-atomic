import React from 'react';
import './detail.css';
import Navbar from '../Homepage/Navbar';

import { useState } from 'react';
import { useNavigate, useLocation, Link} from "react-router-dom";

//need to pass in correct habit information to this component 
// added will be a boolean to keep track of when a user gets sent to the page
// if true, user came from choosing a preset habit and a success message will be displayed
// if false, regular habit information will be displayed
function Detail(title, category, details, counter, total, added){

    const navigate = useNavigate();
    const location = useLocation();

    const [user, setUser] = useState(0);

    return(
        <div className="detail_wrapper">
            <Navbar />
            <div className='info_container'>
                <Link to="/homepage" className='back_link'>&lt; Back to Home</Link>
                <div className='column_1'>
                    <h1 className="detail--title">Sleep 6-8 Hours</h1>
                    <button className='edit_button'>Edit</button>
                </div>
                <div className='column_2'>
                    <label id='category_label'>Category</label>
                    <label>Details</label>
                    <div id="detail_box">Details</div>
                </div>
                <div className='column_3'>
                    <div className='counter_info'>
                        <div className='counter_button'>
                            <button>-</button>
                            Counter
                            <button>+</button>
                        </div>
                        <label> / total</label>
                    </div>
                    <button>Delete</button>
                </div>
            </div>
        </div>    
    )

}

export default Detail;