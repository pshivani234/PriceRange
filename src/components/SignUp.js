import React, { useRef, useState } from 'react';
import {toast} from 'react-hot-toast'
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import '../styles/SignUp.css'

const SignUp = () => {
  const emailRef = useRef(null);
  const passwordRef = useRef(null);
  const confirmPasswordRef = useRef(null);
  const [showPassword, setShowPassword] = useState(false); 
  const [showConfirmPassword, setShowConfirmPassword] = useState(false); 
  const navigate = useNavigate();

  const handleTogglePassword = () => {
    setShowPassword(!showPassword); 
  };

  const handleToggleConfirmPassword = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  const handleSignIn = (e) => {
    e.preventDefault();
    const email = emailRef.current.value;
    const password = passwordRef.current.value;
    const confirmPassword = confirmPasswordRef.current.value;

    if (!email || !password || !confirmPassword) {
      toast.error('Please fill in all fields.');
      return;
    }

    if (password === confirmPassword) {
      console.log('Email:', email);
      console.log('Password:', password);
      toast.success('Sign up successful!');
    } else {
      toast.error('Passwords do not match!');
    }
    navigate('/Home')
  };

  return (
    <div className='sign-up'>
      <h2>Sign Up</h2>
      <form onSubmit={handleSignIn}>
        <div className="form-group">
          <label>Email:</label>
          <input type="email" ref={emailRef} />
        </div>
        <div className="form-group">
          <label>Password:</label>
          <div className="password-input">
            <input type={showPassword ? 'text' : 'password'} ref={passwordRef} />
            <span onClick={handleTogglePassword}>
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </span>
          </div>
        </div>
        <div className="form-group">
          <label>Confirm Password:</label>
          <div className="password-input">
            <input type={showConfirmPassword ? 'text' : 'password'} ref={confirmPasswordRef} />
            <span onClick={handleToggleConfirmPassword}>
              {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
            </span>
          </div>
        </div>
        <button onClick={handleSignIn} type="submit">Sign Up</button>
      </form>
      
    </div>
  );
}

export default SignUp;
