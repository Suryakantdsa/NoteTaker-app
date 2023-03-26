import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import "./SignIn.css"
function SignIn() {
    const [email,getEmail]=useState("")
    const [err,setErr]=useState(false)
    const [password,getPassword]=useState("")
    const [checkbox,setCheck]=useState(false)
    const navigate=useNavigate()

    const handleSignin=async()=>{
        if(email && password ){
            fetch("https://notetaker4.onrender.com/signin",
            {
                method:"post",
                body:JSON.stringify({email,password})
                ,headers:{
                    "Content-Type":"application/json"
                }
            })
            .then(resp=>resp.json())
            .then((data)=>{
                // console.log(data.auth)
                localStorage.setItem("token",data.auth)
                localStorage.setItem("user",( data.result.email))
                if(data.auth){
                    navigate("/home")
                }
                // if(data.msg){
                //     setErr(true)
                // }
    
                // console.log(data.result)
            })
            .catch((err)=>{console.log(err)
                setErr(true)
            })

        }
    }


    return (
        <div className='container-in'>
            <div id='signin-box'>
                <h1>Sign In</h1>
                <label htmlFor='email'>
                    Email address
                </label>
                <input type="email" id='email'  placeholder='Enter email' onChange={(e)=>{getEmail(e.target.value)}} value={email}/>
                <label htmlFor='password'>
                    Password
                </label>
                <input type="password" id='password' placeholder='Enter password'  onChange={(e)=>{getPassword(e.target.value)}} value={password} />
               
                <div id='save-label'>
                <input type="checkbox" id='save'  onChange={(e)=>{setCheck(e.target.checked)}} value={checkbox} />
                <label htmlFor='save' > Remember me</label>
                </div>
                
                <button onClick={()=>{handleSignin()}}>Submit</button>
                {err&&<p style={{color:"red"}}>User Does not exit Please register</p>}
                <div id="forgot">
                    <span>Forgot </span>
                    <span style={{ color: "blue", fontWeight: "bold" }}>Password</span>
                </div>
                <Link to={"/signup"}>Create a account <span style={{ color: "blue", fontWeight: "bold",marginTop:"2rem" }} >Register</span></Link>

            </div>
        </div>
    )
}

export default SignIn