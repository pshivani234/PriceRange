import React, { useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import axios from 'axios';
import '../styles/LogIn.css';

const LogIn = () => {
  const emailRef = useRef(null);
  const passwordRef = useRef(null);
  const navigate = useNavigate();

  const handleLogIn = async (e) => {
    e.preventDefault();
    const email = emailRef.current.value;
    const password = passwordRef.current.value;

    if (!email || !password) {
      toast.error('Please fill in all fields.');
      return;
    }

    try {
      const response = await axios.post('/login', { email, password });
      if (response.status === 200) {
        toast.success('Log in successful!');
        navigate('/Home');
      } else {
        toast.error('Incorrect email or password');
      }
    } catch (error) {
      toast.error('Log in failed. Please try again.');
      console.error('Error logging in:', error);
    }
  };

  return (
    <div className='log-in'>
      <h2>Log In</h2>
      <form onSubmit={handleLogIn}>
        <div className="form-group">
          <label>Email:</label>
          <input type="email" ref={emailRef} />
        </div>
        <div className="form-group">
          <label>Password:</label>
          <input type="password" ref={passwordRef} />
        </div>
        <button type="submit">Log In</button>
      </form>
    </div>
  );
}

export default LogIn;
