/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */

import React, { useState } from "react";
import { signInWithEmailAndPassword, sendPasswordResetEmail } from "firebase/auth";
import { auth } from "../firebase";
import 'bootstrap-icons/font/bootstrap-icons.css';
import imgs from './images/Login.gif';
import resetpass from './images/Forgot password.gif';

const Login = (props) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [emailForReset, setEmailForReset] = useState('');
    const [showResetModal, setShowResetModal] = useState(false);

    const onchangeUsername = (event) => {
        setUsername(event.target.value);
    }

    const onchangePassword = (event) => {
        setPassword(event.target.value);
    }

    const onsubmitForms = (event) => {
        event.preventDefault();
        signInWithEmailAndPassword(auth, username.trim(), password.trim()).then((userCredential) => {
            const user = userCredential.user;
            props.click();
        }).catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.log(errorCode)
            if(errorCode == "auth/network-request-failed")
                {
                    alert("Pleace Check you internet");
                }
            else if(errorCode == "auth/invalid-credential")
                {
                    alert("invalid email or password");
                }
        })
    }

    const handleForgotPassword = () => {
        setShowResetModal(true);
    }

    const handleSendResetEmail = () => {
        sendPasswordResetEmail(auth, emailForReset).then(() => {
            setShowResetModal(false);
        }).catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.log(errorCode, errorMessage);
        });
    }

    const onPassword =(event)=>{
        event.preventDefault();
        let btn = document.getElementById('password');
        if (btn.type === "password") 
            {
            btn.type = "text";
            }
             else 
             {
                btn.type = "password";
            }
    }

    return (
        <>
            <form action="" method="post" onSubmit={onsubmitForms}>
                <div className='header'>
                    <h2>Sign In</h2>
                </div>
                <div className="input-box">
                    <input type="text" name="username" placeholder="Username" required value={username} onChange={onchangeUsername} />
                </div>
                <div className="input-box">
                    <input type="password" name="password" id="password" placeholder="Password" required value={password} onChange={onchangePassword} />
                    <button onClick={onPassword} id="button"><i className="bi bi-eye"></i></button>
                </div>
                <div className="input-button-box">
                    <input type="Submit" value="Login" />
                    <input type="reset" value="Cancel" />
                </div>
                <a href="#" onClick={handleForgotPassword}>Forgot Password?</a>
            </form>

            {showResetModal && (
                <div className="modal">
                    <h2>Reset Password</h2>
                    <div className="img-con">
                    <img src={resetpass} alt="" />
                    </div>
                    <div className="input-box">
                        <input
                            type="email"
                            name="emailForReset"
                            placeholder="Enter your email"
                            value={emailForReset}
                            onChange={(e) => setEmailForReset(e.target.value)}
                            required
                        />
                    </div>
                    <div className="input-button-box">
                        <button onClick={handleSendResetEmail}>Send Reset Email</button>
                        <button onClick={() => setShowResetModal(false)}>Cancel</button>
                    </div>
                </div>
            )}
            <aside className="cons">
            <img src={imgs} alt="" />
            </aside>
        </>
    )
}

export default Login;
