import axios from 'axios'
import React, { useState } from 'react'
import { useNavigate } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css'

import './signup.css'

function Signup(){
    const [name,setname] = useState('')
    const [email,setemail] = useState('')

    const [phonenumber,setPhonenumber] = useState('')
    const [password,setpassword] = useState('')

    const [errmsg,setError] = useState('')
    const [state,setState] = useState(false)

    const [otp,setOtp] = useState('')
    const [showval,setShowval] = useState(false)

    
    let navigate = useNavigate()

    function handleSubmit(event){
        event.preventDefault()
        if (otp !==""){
            axios.post('http://localhost:8081/create',{name,email,phonenumber,password,otp})
            .then(res =>{
                console.log(res);
                if (res.data !== "PhoneNumber Already Exists" || res.data !== "Invalid OTP"){
                    console.log(res.data);
                    navigate('/success',{ replace: true });
                }else{
                    setError(res.data)
                }
                
            })
            .catch(err => console.log(err));
        
        }else{
            setError("OTP Required")
        }
    }

    function onclickSendOtp(){
        if (phonenumber !== ""){
            axios.post('http://localhost:8081/otp',{email,phonenumber})
            .then(res=> {
                if (res.data === "PhoneNumber Already Exists"){
                    setError("PhoneNumber Already Exists")
                    
                }else{
                    setState(true)
                    console.log(res)
                }
            }).catch(err=>console.log(err))

        }else{
            setError("Please Enter Phone Number")
            
        }
    }
    function handleShowbtn(event){
        event.preventDefault()
        setShowval(!showval)
    }

    function onSubmit(){
        navigate('/login');
    }

    return(
        <div className='bg'>
            <div className='card '>
                <h1 className=''>Signup</h1>
                <hr className='hr'/>
                <form onSubmit={handleSubmit}>

                    <label htmlFor="fname" >Full Name </label>
                    <br/>
                    <input 
                    type="text" 
                    id="fname" 
                    placeholder="Full name" required
                    className='sinput' 
                    name='fname' 
                    value={name} 
                    autoComplete="given-name"
                    onChange={e=>setname(e.target.value)}/>
                    
                    <br/>

                    <label htmlFor="email" >Email </label>
                    <br/>
                    <input type="text" id="email" placeholder="Email" required className='sinput' name="email" value={email} autoComplete="email" onChange={e=>setemail(e.target.value)}/>
                    <br/>
                    <label htmlFor="phone" >Phone Number </label>
                        <br/>
                    <div className=''>
                        <input type="text" id="phone" placeholder="Phone Number" required className='sinput pass' name="phone" value={phonenumber} autoComplete="off" onChange={e=>setPhonenumber(e.target.value)}/>
                        <button className='btn btn-secondary' onClick={onclickSendOtp}>Send OTP</button>
                    </div>
                    {state &&
                    <input type='text' placeholder='OTP' required className='sinput'onChange={e=>setOtp(e.target.value)}/>
                    }
                    <br/>
                    
                    <div >
                        <label htmlFor="password" >Set Password </label>
                        <br/>
                        
                        <input type={showval ? 'text' : 'password'}  id="password" placeholder="Password" required className='sinput pass' name="password" value={password} autoComplete="off" onChange={e=>setpassword(e.target.value)}
                        />
                        <button className = "btn btn-info " onClick={handleShowbtn}>{showval ? 'Hide':'Show'}</button>
                        
                    </div>
                    <br/>

                    <p className='error'>{errmsg}</p>

                    <button type="submit" className="btn btn-primary m-3">Submit</button>
                    <br/>
                
                    <a className='btn btn-outline-warning m-3' onClick={onSubmit}>Already a member Login here</a>

                    
                </form>
            </div>
            <img src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTZi6q5JSIAniOLXM1lpNcJvOO_sNU3q5_R8w&usqp=CAU' alt='img' className='img' />
        </div>
    )
    
}
export default Signup