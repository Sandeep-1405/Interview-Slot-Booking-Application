import axios from "axios"
import { useEffect, useState } from "react"
import './admin.css'
import { useNavigate } from "react-router-dom"

function Admin(){

    const [userslist,setuserslist] = useState([])
    const [option,setoption] = useState('')
    const [email,setemail] = useState('')
    const [error,seterr] = useState('')

    const navigate = useNavigate()

    useEffect(()=>{
        axios.get('http://localhost:8081/getdata')
        .then(res=> {
            //console.log(res.data)
            setuserslist(res.data)
        })
        .catch(err=>console.log(err))
    },[])

    function onchangeselect(event){
        setoption(event.target.value)
        //console.log(option)
    }

    function onclickchangestatus(){
    if(email.length !== 0 && option !== 'Change Status'){
            window.location.reload(false);
            axios.put('http://localhost:8081/status',{email,option})
            .then(res=>(console.log(res)))
            .catch(err=>(console.log(err)))
        }else{
            seterr("Email and Status Required")
        }
    }
    function onclicklogout(){
        navigate('/login',{replace:true})
    }

    return(
        <div className="text-center body">
            <h1 className="m-3 text-danger">Welcome Admin</h1>
            <div className="d-flex justify-content-around m-3">
                <button className="btn btn-danger" onClick={onclicklogout}>Logout</button>
            </div>
            <div className="tdiv">
                <table className="m-auto table table-responsive">
                    <thead>
                        <tr>
                            <th className="p-3">Name</th>
                            <th className="p-3">Phone Number</th>
                            <th className="p-3">Email</th>
                            <th className="p-3">Date</th>
                            <th className="p-3">Time</th>
                            <th className="p-3">Topic</th>
                            <th className="p-3">Status</th>
                        </tr>
                    </thead>
                
                    {userslist.map(Details =>(
                        <tbody key={Details.ID}>
                            <tr>
                                <td className="p-3">{Details.Name}</td>
                                <td className="p-3">{Details.PhoneNumber}</td>
                                <td className="p-3">{Details.Email}</td>
                                <td className="p-3">{Details.Date.slice(0,10)}</td>
                                <td className="p-3">{Details.Time.slice(0,5)}</td>
                                <td className="p-3">{Details.Topic}</td>
                                <td className="p-3">{Details.Status}</td>
                            </tr>
                        </tbody>
                    ))}
                </table>
            </div>
            
            <div className="statuscard">
                <h6 className="m-3">Email :</h6>
                <input type="email" placeholder="Email" className="m-2" onChange={e=>setemail(e.target.value)}/>
                <h6 className="m-3">Status :</h6>
                <select onChange ={onchangeselect} className="m-2">
                    <option value="Change Status" >Change Status</option>
                    <option value="Completed">Completed</option>
                    <option value="Pending">Pending</option>
                    <option value="Reshedule">Reshedule</option>
                    <option value="Cancel">Cancel</option>
                </select>
                <button className="btn btn-success m-2 ml-3" onClick={onclickchangestatus}>Change Status</button>
            </div>
            <p className="text-danger">{error}</p>
        </div>
    )
}

export default Admin