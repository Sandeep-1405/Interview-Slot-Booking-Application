import { useState } from "react"

function Admin(){
    const [email,setemail] = useState('')
    const [password,setpassword] = useState('')

    function onclicklogin(){
        console.log(email)
        
    }
    return(
        <div>
            <h1>Admin Login</h1>
            <h6>Email</h6>
            <input type="email" name="email" placeholder="Email" onChange={e=>setemail(e.target.value)}/>
            <h6>Password</h6>
            <input type="password" name="password" placeholder="Password" onChange={e=>setpassword(e.target.value)} />
            <button onClick={onclicklogin}>Login</button>
        </div>
    )
}

export default Admin