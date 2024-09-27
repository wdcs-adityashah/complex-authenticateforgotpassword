import React, { useState } from "react";
import "../App.css";
import Axios from 'axios';
import {useNavigate,Link} from 'react-router-dom'
const ResetPassword = () => {
  const [password, setPassword] = useState("");

  const navigate = useNavigate();
  const handleSubmit = (e) => {
    e.preventDefault()
    Axios.post('http://localhost:5010/auth/reset-password',{
    password
    }).then(response=>{
      if(response.data.status){
        navigate('/login')
      }
    }).catch(err=>{
        console.log(err);
    })
  };

  return (
    <div className="sign-up-container">
      <form className="sign-up-form" onSubmit={handleSubmit}>
        <h2>Reset Password</h2>
    <label htmlFor="email">Email:</label>
        
        <input
          type="password"
          placeholder="*****"
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">Reset</button>
       
    </form>
    </div>
  );
};

export default ResetPassword;
