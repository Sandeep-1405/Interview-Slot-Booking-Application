import {BrowserRouter, Routes,Route} from 'react-router-dom'
import Signup from './components/Signup/signup';
import Login from './components/Login/login';
import Home from './components/Home/home';
import Signupsuc from './components/signupsuc/signupsuc';
import Forgot from './components/Forgot/forgot';
import Admin from './components/Admin/admin'
import './App.css';
import Adminhomepage from './components/Adminhomepage/adminhome';

function App() {
  return (
    <div >
      <BrowserRouter>
        <Routes>
          <Route exact path='/' Component={Signup} />
          <Route exact path='/login' Component={Login} />
          <Route exact path='/home' Component={Home} />
          <Route exact path='/success' Component={Signupsuc} />
          <Route exact path='/forgot' Component={Forgot} />
          <Route exact path='/admin' Component={Admin} />
          <Route exact path='/adminhome' Component={Adminhomepage} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
