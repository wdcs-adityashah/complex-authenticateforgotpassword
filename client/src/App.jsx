import {BrowserRouter,Routes,Route} from 'react-router-dom';
import Signup from './Components/Signup';
import Login from './Components/Login';
import Home from './Components/Home';
import ForgotPassword from './Components/ForgotPassword';
import ResetPassword from './Components/ResetPassword';
import Dashboard from './Components/Dashboard';
function App() {

  return (
    <>
     <BrowserRouter>
     <Routes>
      <Route path="/signup" element={<Signup/>}/>
      <Route path='/login' element = {<Login/>}/>
      <Route path='/' element={<Home/>}/>
      <Route path='/forgotPassword' element={<ForgotPassword/>}/>
      <Route path='/resetPassword/:token' element={<ResetPassword/>}/>
      <Route path='/dashboard' element={<Dashboard/>}></Route>
     </Routes>
     </BrowserRouter>
    </>
  )
}

export default App
