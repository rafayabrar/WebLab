import "./SignIn.css";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from 'axios';


function SignIn() {
    console.log("SignIn component rendered");
    const [username, setUsername] = useState()
    const [password, setPassword] = useState()
    const navigate = useNavigate()

    const handleSubmit = (e) => {
        e.preventDefault()
        axios.post('http://localhost:4000/admin-signin', {username,password})
        .then(result => {
            console.log("API Response:", result.data);
            if(result.data.message === "OK"){
                localStorage.setItem('admin', 'true')
                navigate('/trip-form')
            } else {
                alert("Invalid username or password")
            }
        })
        .catch(err => console.log(err))
    };

    return (
        <div className="signin-container">
            <form className="signin-form" onSubmit={handleSubmit}>
                <h2>Admin Sign In</h2>
                <div className="form-group">
                    <label htmlFor="username">Username</label>
                    <input type="text" id="username" name="username" placeholder="Enter your username" onChange={(e) => setUsername(e.target.value)} required />
                </div>
                <div className="form-group">
                    <label htmlFor="password">Password</label>
                    <input type="password" id="password" name="password" placeholder="Enter your password" onChange={(e) => setPassword(e.target.value)} required />
                </div>
                <button type="submit"  className="signin-button">Login</button>
            </form>
        </div>
    );
}

export default SignIn;
