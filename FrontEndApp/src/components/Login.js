
import React, { useState } from 'react';
import axios from 'axios';
import Task from './Task'
import { useHistory } from "react-router-dom";  

function Login(props) {
  const [loading, setLoading] = useState(false);
  const username = useFormInput('');
  const password = useFormInput('');
  const [error, setError] = useState(null);
  const history = useHistory();
  

  // handle button click of login form
  const handleLogin = async() => { 
    try {
        setError(null);
        setLoading(true);    
        let response =axios.post('http://localhost:8000/users/login',{ username: username.value, password: password.value })
        history.push('/viewtask',{username:username.value}); 
      } catch(error) {
        setLoading(false);
        setError("Something went wrong. Please try again later.");
    }
  }

  const handleSignup = () => {
    console.log ('SignUp User')    
    setError(null);
    setLoading(true);  
    
    axios.post('http://localhost:8000/users/SignUpUser', 
    { username: username.value, password: password.value }).then(response => {
        console.log(response)
      setLoading(false);
      history.push('/task',{username: username.value,signup:true})
    }).catch(error => {
      setLoading(false);
      setError("Something went wrong. Please try again later.");
    });
  }

  return (
    <div>
      Login<br /><br />
      <div>
        Username<br />
        <input type="text" {...username} autoComplete="new-password" />
      </div>
      <div style={{ marginTop: 10 }}>
        Password<br />
        <input type="password" {...password} autoComplete="new-password" />
      </div>
      {error && <><small style={{ color: 'red' }}>{error}</small><br /></>}<br />
      <input type="button" value={loading ? 'Loading...' : 'Login'} onClick={handleLogin} disabled={loading} /><br />
      <input type="button" value={loading ? 'Loading...' : 'Create New User'} onClick={handleSignup} disabled={loading} /><br />      
    </div>
  );
}

const useFormInput = initialValue => {
  const [value, setValue] = useState(initialValue);

  const handleChange = e => {
    setValue(e.target.value);
  }
  return {
    value,
    onChange: handleChange
  }
}

export default Login;