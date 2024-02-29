import React, { useState } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import './login.css'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
//import Forgot from '../Forgot/forgot'
//import Home from '../Home/home'

const Login = () =>{

    const [email,setEmail] = useState('')
    const [password,setPassword] = useState('')
    const [errormsg,seterrMsg] = useState('')
    const [user,setuser] = useState('User')
    const [showval,setShowval] = useState(false)

    function onChangeEmail(event){
        setEmail(event.target.value)
    }
    function onChangePassword(event){
        setPassword(event.target.value)
    }
    function handleShowbtn(event){
        event.preventDefault()
        setShowval(!showval)
    }

    const navigate = useNavigate();
    const sign = useNavigate();

    function onClickLogin(event){
        event.preventDefault()
        if (email.length === 0 || password.length===0){
            seterrMsg("All Fields Required")
        }else{
            seterrMsg("")
            if (user === "Admin" && email === "sandeep@admin.com" && password === "Sandeep@123"){
                navigate('/admin')
            }else if(user === "User"){
                axios.post('http://localhost:8081/login',{email,password})
                .then(res=>{
                    //console.log(res)
                    if(res.data.length === 0){
                        seterrMsg("Invalid Details")
                        //console.log("Invalid Details")
                    }
                    else if (res.data[0].Email === email && res.data[0].Password === password){
                        navigate('/home',{ replace: true })
                        /*this.props.history.replace('/home');*/
                    }
                })
                .catch(err=>{
                    console.log(err)
                })  
            }else{
                seterrMsg("Please Select User Type")
            } 
        }
    }
    function onClickSignup(){
        sign('/')
    }
    return(
        <div className="bg">
            <img src='https://st.depositphotos.com/18722762/51522/v/450/depositphotos_515228796-stock-illustration-online-registration-sign-login-account.jpg' alt='img' className='limg '/>

            <div className="content">
                <h1 className='loginheading'>Login</h1>
                <select className='w-25 m-3' onChange={e=>(setuser(e.target.value))}>
                    <option value="User">User</option>
                    <option value="Admin">Admin</option>
                </select>

                <div>
                    <input type='email' placeholder='Email' className='sinput'  onChange={onChangeEmail} required/>
                    <br/>
                    <input type={showval ? 'text' : 'password'} placeholder='Password' className='sinput' onChange={onChangePassword} required/>

                    <button className = "btn btn-secondary" onClick={handleShowbtn}>{showval ? 'Hide':'Show'}</button>

                    <p className='text-danger font-weight-bold m-3'>{errormsg}</p>

                    <div className='d-flex'>
                        
                        <a href='http://localhost:3000/Forgot' className='forgot'>forgot password</a>

                        <a href='http://localhost:3000/' onClick={onClickSignup} className='forgot'>signup</a>

                    </div>
                    <button className='btns btn btn-primary' onClick={onClickLogin}>Login</button>
                </div>
            </div>          
        </div>
        
    )
}
export default Login