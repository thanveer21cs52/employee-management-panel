import {React,useState} from 'react'
import './Login.css'
import axios from 'axios'
import {useNavigate} from 'react-router-dom'


function Login() {
  const[username,setusername]=useState();
const[password,setpassword]=useState();
const navigate=useNavigate();
function handlesubmit(e){
e.preventDefault()
axios.post('http://localhost:3001/login',{username,password})
.then(result=>{
  console.log(result.data)
  if(result.data==="success"){
    navigate('/home')
  }
  else{
    alert(result.data)
  }
  
})
.catch(err=>console.log(err))
}
  return (
    <div className="login_page">
    <form onSubmit={handlesubmit}>
      <div className="login_box">
        <div id="username" className='bx-size'>
        <b>Username</b>
        <input type="email" placeholder="Enter Username" name="uname" onChange={(e)=>setusername(e.target.value)} required />
        </div>
        <div id="password" className='bx-size'>
        <b>Password</b>
        <input
          type="password"
          placeholder="Enter Password"
          name="psw"
          onChange={(e)=> setpassword(e.target.value)}
          required
        />
        </div>
        <button type="submit">Login</button>
      </div>
      </form>
    </div>
  );
}

export default Login