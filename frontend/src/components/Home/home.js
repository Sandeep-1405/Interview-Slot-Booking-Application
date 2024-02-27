import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css'
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom'


/*import DatePicker from 'react-datetime';
import moment from 'moment';*/
import 'react-datetime/css/react-datetime.css';

import './home.css'

function Home(props){

    const [usersData,setData] = useState([])
    const [date,setdate] = useState('')
    const [time,settime] = useState('')

    const [email,setemail] = useState('')
    const [state,setstate] = useState(false)
    const [err,seterr] = useState('')

    const [name,setname] = useState('')
    const [topic,settopic] = useState('')

    


    const navigate = useNavigate();

    useEffect(()=>{
        let getstate = localStorage.getItem('setstate')
        setstate(getstate)

        let getname = localStorage.getItem('name');
        let getemail = localStorage.getItem('email');
        let getdate = localStorage.getItem('date');
        let gettime = localStorage.getItem('time');
        let gettopic = localStorage.getItem('topic');

        setname(getname)
        setemail(getemail)
        setdate(getdate)
        settime(gettime)
        settopic(gettopic)

        axios.get('http://localhost:8081/getdata')
        .then(res=> {
            setData(res.data)
            //console.log(res.data.Email)
        },[])
        .catch(err=>console.log(err))
    },[]);
    
    function onchangedate(event){
        setdate(event.target.value);
    }
    function onchangetime(event){
        settime(event.target.value)
    }

    function onchangeemail(event){
        setemail(event.target.value)
    }

    function onClickLogout(){
        navigate('/login',{replace:true})
    }
    /*const yesterday = moment().add(2, 'day');
    const disablePastDt = current => {
        return current.isAfter(yesterday);
    };
    <div >
        <DatePicker
            isValidDate={disablePastDt}  onChange={onchangedate}
            />
    </div>*/

    function onclicksubmit(){
        //console.log(new Date().setDate(new Date().getDate()+6)) to add days to todays date
        if ( email.length !==0 && name.length !==0 && date.length !==0 && time.length !==0 && topic.length !==0){
            
            axios.put('http://localhost:8081/interview',{email,date,time,topic})
            .then(res=>{
                console.log(res)
                if (res.data === "Please Provide Registered Email (Which Given While Registering)"){
                    seterr("Please Provide Registered Email (Which Given While Registering)")
                }else if(new Date(date) <= new Date().setDate(new Date().getDate()+6)){
                    seterr("Please Select a Valid Date. For Example: If Today is Monday, Select date from next week Monday")
                }
                else{
                    setstate(true)
                    localStorage.setItem('setstate',true);
                    localStorage.setItem('name',name);
                    localStorage.setItem('email',email);
                    localStorage.setItem('date',date);
                    localStorage.setItem('time',time);
                    localStorage.setItem('topic',topic);
                    
                    seterr('')
                }
            })
            .catch(error => console.log(error))
        }else{
            seterr("All fields Required*")
        }
        
    }

    function onclickcancel(){
        
        localStorage.setItem('setstate',false)
        
        /*setdate('0000-00-00')
        settime('00:00:00')
        settopic('Cancelled')*/

        axios.put('http://localhost:8081/cancel',{email,date,time,topic})
        .then(res=>{
            //console.log("Interview Cancelled")
            console.log(res.data)
            seterr("Interview Cancelled")
        })
        .catch(error=> console.log(error))
    }
    
    function statechange(){
        setstate(false)
        setdate('')
        settime('')
        setname('')
        setemail('')
        settopic('')
        seterr('')
    }

    function selectslot(){
        return(
            <div className='text-center border pt-5 mt-5'>
                <h1 className='text-success text-bold'>Select Your Slot...</h1>
                <div className=' slotcard '>
                    
                    <input type='text'  name='name'  placeholder='Your Name' className='m-5'  onChange={e=>(setname(e.target.value))}/>

                    <input type='email' name='email' placeholder='Your Email' required className='m-5' onChange={onchangeemail}/>
                    
                    <input type='date' placeholder="Select a date" onChange={onchangedate} required className='m-5'min/>

                    <input type='time' placeholder="Select a date" onChange={onchangetime} required className='m-5'/>
                    
                    

                    <select name="topic" id="topic" className='m-5' onChange={e=>(settopic(e.target.value))}>
                        <option value="Select Interview Topic">Select Interview Topic</option>
                        <option value="Full Stack Developer">Full Stack Developer</option>
                        <option value="Frontend Developer">Frontend Developer</option>
                        <option value="Backend Developer">Backend Developer</option>
                        <option value="Python Developer">Python</option>
                        <option value="React Developer">React JS</option>
                        <option value="Java Developer">Java</option>
                        <option value="SQL">SQL </option>
                        <option value="Only HTML CSS">Only HTML CSS</option>
                        <option value="Node js Developer">Node JS</option>
                        <option value="JavaScript Developer">JavaScript</option>
                        <option value="other Topics">Other Topics</option>
                    </select>
                    
                </div>
                <button className='btn btn-success mb-3' onClick={onclicksubmit}>Submit</button>
            </div>
        )
    }

    function slotsuccess(){

        return(
            <div className='text-center border pt-5 mt-5'>
                <h1 className=''>Congratulations  {name} 🤩🤩</h1>
                <h3 className='m-3'>Your slot was Selected on </h3>
                <h3 className='text-primary'>{date} {time}</h3>
                <h3 className='text-primary'>on {topic}</h3>
                <div className='m-4'>
                    <button className='btn btn-danger m-2' onClick={onclickcancel}>Cancel</button>
                    <button className='btn btn-warning m-2'  onClick={statechange}>Reshedule</button>
                    <button className='btn btn-success m-2'  onClick={statechange}>New Slot</button>
                </div>
            </div>
        )
    }

    

    

    return(
        <div className='home'>
            <div className='text-center m-5 '>
                <h1 className='m-3 text-primary'>Welcome to InterviewMe</h1>
                
                <button className="btn btn-primary logout" onClick={onClickLogout}>Logout</button>
                <button className="btn btn-primary logout2" onClick={onClickLogout}>Logout</button>
                <h4 className='mt-3'>Registered Users</h4>
                <ul className='parent'>
                    {usersData.map(Details =>(
                        /*<Profile Details = {Details} key = {Details.ID}/>*/
                        <li className='child p-2' key={Details.ID}>
                            <p>{Details.Name}</p>
                            <p>{Details.Email.slice(0,3)+"xxx@gmail.com"}</p>
                        </li>
                    ))}
                </ul>

                

                {state ? slotsuccess() : selectslot()}

                <p className='text-danger pt-3'>{err}</p>
                
                
            </div>
        </div>
    )
}
export default Home