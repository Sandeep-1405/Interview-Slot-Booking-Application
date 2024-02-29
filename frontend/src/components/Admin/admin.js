import { useState } from "react"
import { useNavigate } from "react-router-dom"

function Admin(){
    const [email,setemail] = useState('')
    const [password,setpassword] = useState('')
    const [showerr,seterror] = useState('')
    
    const navigate = useNavigate()

    function onclicklogin(){
        console.log(email)
        if (email === 'sandeep@admin.com' && password === "Sandeep@123"){
            navigate('/adminhome',{replace:true})
        }else{
            seterror("Invalid Login Details")
        }
        
    }
    return(
        <div>
            <h1>Admin Login</h1>
            <h6>Email</h6>
            <input type="email" name="email" placeholder="Email" onChange={e=>setemail(e.target.value)}/>
            <h6>Password</h6>
            <input type="password" name="password" placeholder="Password" onChange={e=>setpassword(e.target.value)} />
            <button onClick={onclicklogin}>Login</button>
            <p>{showerr}</p>
        </div>
    )
}

export default Admin