import Cookies from "js-cookie"
import { Route, useNavigate } from "react-router-dom"

function ProtectedRoute(props){
    const navigate = useNavigate();
    const token = Cookies.get("jwt")
    if (token === undefined){
        return navigate('/login')
    }
    return <Route {...props} />
}

export default ProtectedRoute