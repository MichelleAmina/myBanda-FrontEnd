import React, { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom'
import './Login.css'

function Login(){
    const [addclass, setaddclass] = useState("")
    const [showLocationInput, setShowLocationInput] = useState(false);
    const [showContactInput, setShowContactInput] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        document.body.classList.add('login-page');

        // Clean up function to remove the class when component unmounts
        return () => {
            document.body.classList.remove('login-page');
        };
    }, []);

    const [formData, setFormData] = useState({
        username: "",
        email: "",
        password: "",
        confirmPassword: "",
        location: "",
        contact: "",
        role: "",
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        if (name === "role") {
            // If role is changed, update state and set visibility of location and contact inputs
            setFormData({
                ...formData,
                [name]: value
            });
            setShowLocationInput(value === "3"); 
            setShowContactInput(value === "3"); 
        } else {
            setFormData({
                ...formData,
                [name]: value
            });
            if (name in loginData) {
                setLoginData({
                    ...loginData,
                    [name]: value
                });
            }
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch("https://mybanda-backend-4.onrender.com/signup", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            });
            const data = await response.json();
            console.log('Successful');
            navigate('/login');
        } catch (error) {
            console.error('Signup failed:', error);
        }
        
    };

    const [loginData, setLoginData] = useState({
        email: "",
        password: ""
    });

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch("https://mybanda-backend-4.onrender.com/login", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(loginData)
            });

            if (response.ok) {
                const data = await response.json();
                const { access_token } = data; // Extract the JWT token from the response
                localStorage.setItem('access_token', access_token); // Store the token in local storage
                console.log('User logged in:', data);
                navigate('/driverhomepage');
                console.log('Successful');
            } else {
                console.error('Login failed:', response.statusText);
            }
        } catch (error) {
            console.error('Login failed:', error);
        }
    };


    return (
        <div id="container" className={`container ${addclass}`}>
            <div className="form-container sign-up-container">
                <form onSubmit={handleSubmit}>
                    <h4 id="form-title">Create Account!</h4>
                    {/* <label id="form-label" htmlFor="name">Name:</label>
                    <input 
                        type="text"    
                        name="name" 
                        id="name"
                        placeholder="Name" 
                        value={formData.name} 
                        onChange={handleChange} 
                        required 
                    /> */}
                    <label id="form-label" htmlFor="username">Username:</label>
                    <input 
                        type="text" 
                        name="username" 
                        id="username"
                        placeholder="Username" 
                        value={formData.username} 
                        onChange={handleChange} 
                        required 
                    />
                    <label id="form-label" htmlFor="email">Email:</label>
                    <input 
                        type="email" 
                        name="email" 
                        id="email"
                        placeholder="Email" 
                        value={formData.email} 
                        onChange={handleChange} 
                        required 
                    />
                    <label id="form-label" htmlFor="role">Role:</label>
                    <select name="role" id="role" value={formData.role} onChange={handleChange}>
                        <option value="1">Buyer</option>
                        <option value="2">Seller</option>
                        <option value="3">Delivery person</option>
                    </select>
                    <label id="form-label" htmlFor="password">Password:</label>
                    <input  
                        type="password" 
                        name="password" 
                        id="password"
                        placeholder="Password" 
                        value={formData.password} 
                        onChange={handleChange} 
                        required 
                    />
                    <label id="form-label" htmlFor="confirmPassword">Confirm password:</label>
                    <input 
                        type="password" 
                        name="confirmPassword" 
                        id="confirmPassword"
                        placeholder="Confirm password" 
                        value={formData.confirmPassword} 
                        onChange={handleChange} 
                        required 
                    />
                    
                    {showLocationInput && (
                        <>
                            <label id="form-label" htmlFor="location">Location:</label>
                            <input 
                                type="text" 
                                name="location" 
                                id="location" 
                                placeholder="Location" 
                                value={formData.location} 
                                onChange={handleChange} 
                                required 
                            />
                        </>
                    )}
                    {showContactInput && (
                        <>
                            <label id="form-label" htmlFor="contact">Contact:</label>
                        </>
                    )}
                    {showContactInput && (
                        <input 
                            type="tel" 
                            name="contact" 
                            id="contact"
                            placeholder="Contact"  
                            value={formData.contact} 
                            onChange={handleChange} 
                            required 
                        />
                    )}
                    <button type="submit">Sign Up</button>
                </form>
            </div>
            <div className="form-container log-in-container">
                <form onSubmit={handleLogin}>
                    <h1>Login</h1>
                    <label id="form-label" htmlFor="email">email:</label>
                    <input 
                        type="text" 
                        name="email"
                        placeholder="email" 
                        value={loginData.email}
                        onChange={handleChange}
                        required 
                    />
                    <label id="form-label" htmlFor="password">Password:</label>
                    <input 
                        type="password" 
                        name="password"
                        placeholder="Password" 
                        value={loginData.password}
                        onChange={handleChange}
                        required 
                    />
                    <button type="submit">Login</button>
                </form>
            </div>
            <div className="overlay-container">
                <div className="overlay">
                    <div className="overlay-panel overlay-left">
                        <div className="overlay-log-in">
                            <h1>Welcome Back!</h1>
                            <p>To keep connected with us please login with your personal info</p>
                        </div>
                        <div className="overlay-login-signup">
                            <p>Don't have an account?</p>
                            <button className="ghost" id="signUp" onClick={() => setaddclass("")}> Go Signup</button>
                        </div>
                    </div>
                    <div className="overlay-panel overlay-right">
                        <div className="overlay-signup">
                            <h1>Hello, Friend!</h1>
                            <p>Enter your personal details and start journey with us</p>
                        </div>
                        <div className="overlay-signup-login">
                            <p>Already have an account?</p>
                            <button className="ghost" id="login" onClick={() => setaddclass("right-panel-active")}> Go Login</button>
                        </div>
                        
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Login 

