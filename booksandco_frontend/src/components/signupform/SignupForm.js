import React, { useState } from "react";
import "./SignupForm.css";
import axios from "axios";
import { Link,  useNavigate } from "react-router-dom";

function SignupForm() {

  const [username,setUsername] = useState('')
  const [email,setEmail] = useState('')
  const [phone,setPhone] = useState('')
  const [password,setPassword] = useState('')
  const navigate = useNavigate()
  

  const handleSubmit = (e)=>{
    e.preventDefault();

     // Make an API call to register the user
   const  userCredentials = {username,email,phone,password}  
     if(username && email && phone && password){
      axios.post("http://localhost:3001/signin",userCredentials)
    .then((response)=>{
      console.log(response.data)
     alert(response.data.message)
     navigate("/login")

     // Handle the response data as needed
    })
    .catch((error)=>{
     alert("Error:", error)
    })

     }else{
      alert("Invalid Input")
     }
    

  }


  return (
    <div className="container">
      <div className="signupParentDiv">
        <img width="150px" height="100px" src="/bco.png" alt="" />
        <form onSubmit={handleSubmit}>
          <label htmlFor="fname">Username</label>
          <br />
          <input
            type="text"
            value={username}
            onChange={(e)=>{ setUsername(e.target.value)}}
            className="input"
            name="name"
            placeholder="Enter your name"
          />
          <br />
          <label htmlFor="fname">Email</label>
          <br />
          <input
            className="input"
            value={email}
            onChange={(e)=>{setEmail(e.target.value)}}
            placeholder="Enter your email"
            type="email"
            name="email"
          />
          <br />
          <label htmlFor="lname">Phone</label>
          <br />
          <input
            type="number"
            value={phone}
            onChange={(e)=>{setPhone(e.target.value)}}
            className="input"
            placeholder="Enter your phone number"
            name="phone"
          
          />
          <br />
          <label htmlFor="lname">Password</label>
          <br />
          <input
            className="input"
            value={password}
            onChange={(e)=>{setPassword(e.target.value)}}
            name="password"
            placeholder="Enter your password"
            type="password"
          />
          <br />
          <br />
          <button type="submit">Signup</button>
        </form>
      </div>

      <p className="parag text center text-muted">
        Already have an account? <Link to={'/login'}><a className="text-blue">Login</a></Link> 
      </p>
    </div>
  );
}

export default SignupForm;
