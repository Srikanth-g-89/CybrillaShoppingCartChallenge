
import React, { Component } from "react";
import axios from 'axios';


class Login extends Component {
  constructor(props) {
    super(props)
    this.state= {
      error : '',
      username:'',
      password:'',
      loading:false
    }   
    this.handleLogin = this.handleLogin.bind(this);
    this.handleSignup = this.handleSignup.bind(this);  
    this.setusername = this.setusername.bind(this);
    this.setpassword =  this.setpassword.bind(this); 
} 

setusername = (emailid) => {
  this.setState({username:emailid})  
}

setpassword = (pwd) => {
  this.setState({password:pwd})  
}

  handleLogin = async(e) => { 
    try {
      this.setState({
        loading:true}
        )         
        await axios.post('http://localhost:8000/users/login',{ username: this.state.username, password: this.state.password })
        
        if (this.state.username.toString().toLowerCase() === 'marketing') {
          this.props.history.push('/marketing',{username: this.state.username,isloggedIn:true});
        }else {
          this.props.history.push('/viewtask',{username: this.state.username,isloggedIn:true});
        }
         
      } catch(error) {
        this.state.error ="Error in Login..Please try again later"        
    }
  }

  handleSignup = async(e) => {
    try {
      this.setState({
        loading:true}
        )      
      await axios.post('http://localhost:8000/users/SignUpUser', 
      { username: this.state.username, password: this.state.password })
      if (this.state.username.toLowerCase === 'marketing') {
        this.props.history.push('/marketingpage',{username: this.state.username,isloggedIn:true})
      } else {
        this.props.history.push('/task',{username: this.state.username,isloggedIn:true})
      }
      
    } catch(err) {
      this.setState({
        error:"Error in SignUp..Please try again later"
      })      
    }


  }
  render() { 
    return ( 
      <div>
      <h1>Login</h1><br/>              
          Name:
          <input type="email" value={this.state.username} onChange={(e) =>this.setusername(e.target.value)} /><br/>
           Password:
          <input type="password" value={this.state.password} onChange={(e) =>this.setpassword(e.target.value)}  /><br/>
          <input type="button" value="Login" onClick={(e) =>this.handleLogin(e)} /><br/>
          <input type="button" value="Create New User" onClick={(e) =>this.handleSignup(e)} /> 
          <div style={{ color: 'red' }}>{this.state.error}</div>     
      </div>      
      );
  }
}
 
export default Login;

/*function Login(props) {
  const [loading, setLoading] = useState(false);
  const username = useFormInput('');
  const password = useFormInput('');
  const [error, setError] = useState(null);
  const history = useHistory();
  

  // handle button click of login form


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

export default Login;*/