import React, { useState } from 'react';

import axios from 'axios';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import {
  signinFailed,
  signinStart,
  signinSuccess,
} from '../../redux/userSlice';

const Signin = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');    
    const [email, setEmail] = useState(''); 
    
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleSignin = async (e) => {
        e.preventDefault();
        dispatch(signinStart());

        try {
            const res = await axios.post('/auth/signin', { username, password });
            dispatch(signinSuccess(res.data));
            navigate('/');
        } catch (err) {
            dispatch(signinFailed());
        }
    }

    const handleSignup = async (e) => {
        e.preventDefault();
        dispatch(signinStart());

        try {
            const res = await axios.post('/auth/signup', { username, email, password });
            dispatch(signinSuccess(res.data));
            navigate('/');
        } catch (err) {
            dispatch(signinFailed());
        }
    }

    return (
        <div className="bg-gray-200 flex flex-col py-12 px-8 rounded-lg w-8/12 md:w-6/12 mx-auto gap-10">
            <h2 className="text-3xl font-bold text-center">
                Sign in to Twitter
            </h2>
            <input 
                type="text" 
                placeholder="Username"
                className="text-xl py-2 rounded-full px-4"
                onChange={(e) => setUsername(e.target.value)}    
            />
            <input 
                type="password" 
                placeholder="Password"
                className="text-xl py-2 rounded-full px-4"
                onChange={(e) => setPassword(e.target.value)}    
            />
            <button 
                className="text-xl py-2 rounded-full px-4 bg-blue-500 text-white"
                onClick={handleSignin}    
            >
                Sign in
            </button>
            <p className="text-center text-xl">
                Don't have an account? <br /><b>Sign up</b>
            </p>
            <input 
                type="text" 
                placeholder="Username"
                className="text-xl py-2 rounded-full px-4"
                onChange={(e) => setUsername(e.target.value)}    
            />
            <input 
                type="email" 
                placeholder="Email"
                required
                className="text-xl py-2 rounded-full px-4"
                onChange={(e) => setEmail(e.target.value)}    
            />
            <input 
                type="password" 
                placeholder="Password"
                className="text-xl py-2 rounded-full px-4"
                onChange={(e) => setPassword(e.target.value)}    
            />
            <button 
                className="text-xl py-2 rounded-full px-4 bg-blue-500 text-white"
                type="submit"
                onClick={handleSignup}    
            >
                Sign up
            </button>
        </div>
    );
}

export default Signin;
