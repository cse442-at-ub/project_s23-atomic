import React from "react";

import "./login.css"

import LoginCharacter from "../../assets/images/login-character.png"

function Login() {
    return(
        <>
        <div className="login-container">
            <div id="login-main">
                <div id="login-greeting">
                    <h2>Let's sign in!</h2>
                    <img src={LoginCharacter} alt="login-character" />
                </div>
                <div id="login-form">
                    <form>
                        <div className="login-form-field">
                            <label>
                                <h6>Username</h6>
                                <input type="text" name="username" size="30" />
                            </label>
                        </div>
                        <div className="login-form-field">
                            <label>
                                <h6>Password</h6>
                                <input type="password" name="password" size="30" />
                            </label>
                        </div>
                        <div id="login-submit">
                            <input type="submit" value="Submit"/>
                        </div>
                    </form>
                </div>
            </div>
        </div>
        </>
    )
}

export default Login;
