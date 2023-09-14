import React, { useState } from "react";
import "./LoginForm.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";


function SignupForm() {

    const [email,setEmail] = useState('')
    const [password,setPassword] = useState('')
    const [currentUserName,setCurrentUserName] = useState('')
    const [token,setToken] = useState('')
    const navigate = useNavigate()
  
    const handleSubmit=(e)=>{
        e.preventDefault();

        const loginData = {email,password}

        // Make a POST request to the login endpoint
        axios.post("http://localhost:3001/login",loginData)
        .then((response)=>{
          console.log("hlo",response.data)
            if(response.data.status === true){
                
                console.log("checking",response.data)
                 

             
                setCurrentUserName(response.data.username)
                setToken(response.data)
                
                console.log("username checking",response.data.currentUserName)
                localStorage.setItem('currentUserName',response.data.currentUserName)
                localStorage.setItem("token",token)
                alert(response.data.message)
                navigate("/")
               
                
            
            }else{
                alert(response.data.message)
               
            }


        }).catch((error)=>{
            alert("Invalid Email Id or Password")
        })
     
    }
  return (
    <div className="container">
      <div className="signupParentDiv">
        <img width="150px" height="100px" src="/bco.png" alt="" />
        <form onSubmit={handleSubmit}>
          <label htmlFor="fname">Email</label>
          <br />
          <input
            className="input"
            id="fname"
            placeholder="Enter your email"
            type="email"
            name="email"
            value={email}
            onChange={(e)=>setEmail(e.target.value)}
          />
          <br />
          <label htmlFor="lname" className="mt-2">
            Password
          </label>
          <br />
          <input
            className="input "
            id="lname"
            name="password"
            placeholder="Enter your password"
            type="password"
            value={password}
            onChange={(e)=>setPassword(e.target.value)}
          />
          <br />
          <br />
          <button className="mb-2" type="submit">Login</button>
        </form>
      </div>
      <p className="pg text center text-muted  ">
        New to Books & Co?  <Link to={"/signin"}><a className="text-blue fw-bold ">Signup</a></Link> 
      </p>
    </div>
  );
}

export default SignupForm;
