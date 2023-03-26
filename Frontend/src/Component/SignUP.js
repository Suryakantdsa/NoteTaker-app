import React, { useState } from 'react'
import {  useNavigate } from 'react-router-dom'
import "./SignUP.css"

function SignUP() {
    const [email,getEmail]=useState("")
    const [password,getPassword]=useState("")
    const [passwordRepeat,getPasswordRep]=useState("")
    const [checkbox,setCheck]=useState(false)
    const navigate=useNavigate()

    const handleRegister= async()=>{
        if(password===passwordRepeat && checkbox){
            fetch("https://notetaker4.onrender.com/signup",
            {
                method:"post",
                body:JSON.stringify({email,password})
                ,headers:{
                    "Content-Type":"application/json"
                }
            })
            .then(resp=>resp.json())
            .then((data)=>{
                console.log(data.auth)
                localStorage.setItem("token",data.auth)
                localStorage.setItem("user",( data.result.email))
                if(data.auth){
                    navigate("/signin")
                }
                console.log(data.result)
            })
            .catch(err=>console.log(err))

        }
        else{
            alert("all the field is mandatory")
        }
       
    }

    return (
        <div className='container-up'>
            <div id='signup-box'>
                <h1>Sign Up</h1>
                <input type="email" placeholder='EMAIL' 
                value={email}
                onChange={(e)=>getEmail(e.target.value)}
                />
                <input type="password" placeholder='PASSWORD' 
                value={password}
                onChange={(e)=>getPassword(e.target.value)}
                />
                <input type="password" placeholder='REPEAT PASSWORD' value={passwordRepeat}
                onChange={(e)=>getPasswordRep(e.target.value)}
                />
                <label htmlFor='checked'>
                    <span
                        style={{ color: "gray" }}
                    > <input type="checkbox" id="checked" 
                    onChange={(e)=>setCheck(e.target.checked)}
                    /> I agree with
                    </span>
                    <span
                        style={{ fontWeight: 'bold', textDecoration: "underline" }}
                    >
                        TERMS & CONDITIONS
                    </span>

                </label>

                <button onClick={()=>{handleRegister()}}>CONTINUE</button>
                

            </div>
        </div>
    )
}

export default SignUP