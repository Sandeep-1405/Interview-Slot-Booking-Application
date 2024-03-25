import React, { useEffect, useState } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import './login.css'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
//import Forgot from '../Forgot/forgot'
//import Home from '../Home/home'
//import { CookiesProvider, useCookies } from 'react-cookie'
import Cookies from 'js-cookie'


const Login = () =>{

    const [email,setEmail] = useState('')
    const [password,setPassword] = useState('')
    const [errormsg,seterrMsg] = useState('')

    const [user,setuser] = useState('User')
    const [showval,setShowval] = useState(false)
    //const [cookies, setCookie] = useCookies(['user'])

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

    useEffect(()=>{
        const token = Cookies.get("jwt")
        //console.log(token)
        if (token !== undefined){
            navigate('/home')
        }
    },[])
    

    function onClickLogin(event){
        event.preventDefault()
        
        if (email.length === 0 || password.length===0){
            seterrMsg("All Fields Required")
        }else{
            seterrMsg("")
            if (user === "Admin" && email === "sandeep@admin.com" && password === "Sandeep@123"){
                navigate('/admin',{ replace: true })
            }else if(user === "User"){
                //setCookie('user',email)
                
                axios.post('http://localhost:8081/login',{email,password})
                .then(res=>{
                    console.log(res)
                    if(res.data.length === 0){
                        seterrMsg("Invalid Details")
                        //console.log("Invalid Details")
                    }
                    else if (res.data[0].Email === email && res.data[0].Password === password){
                        Cookies.set("jwt",res.data[1]['jwttoken'],{ expires: new Date(Date.now() + 86400e3)})
                        //console.log(res.data[1]['jwttoken'])
                        navigate('/home',{ replace: true })
                    }
                })
                .catch(err=>{
                    console.log(err)
                })  
            }else{
                seterrMsg("Invalid Details")
            }
        }
    }
    function onClickSignup(){
        sign('/signup')
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

                        <a href='http://localhost:3000/Signup' onClick={onClickSignup} className='forgot'>signup</a>

                    </div>
                    <button className='btns btn btn-primary' onClick={onClickLogin}>Login</button>
                </div>
            </div>          
        </div>
        
    )
}
export default Login