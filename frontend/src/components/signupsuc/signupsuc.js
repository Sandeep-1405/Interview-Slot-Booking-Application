import React from "react"
import { useNavigate } from "react-router-dom"
import 'bootstrap/dist/css/bootstrap.min.css'
import './signupsuc.css'
function Signupsuc(){
    const navigate = useNavigate()
    function onClickLogin(){
        navigate('/',{ replace: true })
    }
    return(
        <div className="shadow text-center successbg">
            <h1 className="heading">Registeration Completed successfuly!!!</h1>
            <div>
                <img src="https://www.seekpng.com/png/detail/72-722839_success-save-success-png-icon.png" alt="successimg" className="successimg"/>
            </div>
            <p className="successpara">Click here to <a onClick={onClickLogin} className=''>Login</a></p>
        </div>
    )
}
export default Signupsuc