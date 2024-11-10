import React, { useEffect, useState } from 'react'
import './Employee.css'
import axios from 'axios'
import { useNavigate,Link } from 'react-router-dom'
import pic from "./images/pic.png"

function Employee() {
  const[pc,setpc]=useState(pic)
  const navigate=useNavigate()
  const count=0;
  const[users,setusers]=useState([])
  function handlecreate(){
navigate("/create")
  }
  useEffect(() => {
    axios
      .get("http://localhost:3001")
      .then((result) => {setusers(result.data)})
      .catch((err) => console.log(err));
  }, []);    

  function handledelete(id){
axios.delete('http://localhost:3001/deleteuser/'+id)
.then((res)=>{console.log(res)
  window.location.reload()
})
.catch(err=>console.log(err))
  }
  return (
  <div className='cntr'>
  <div className='box'>
        <div className='create'>
        <button onClick={handlecreate}>create employee</button>
        </div>
        <div className='search'>
        <div className='searchbar'>
        <input type="search" placeholder="search" name="search"/>
        <button>check</button>
        </div>
        </div>
        <table classname="table">
            <thead>
              <tr>
                <th>id</th>
                <th>image</th>
                <th>name</th>
                <th>email</th>
                <th>mobile</th>
                <th>designation</th>
                <th>gender</th>
                <th>course</th>
                <th>create Date</th>
                <th>action</th>
              </tr>
            </thead>
            <tbody>
              {
                users.map((user,index)=>{
                  return <tr key={user._id}>
                    <td>{index+1}</td>
                    <td><img src={`http://localhost:3001/images/${user.image}`}/></td>
                    <td>{user.name}</td>
                    <td>{user.email}</td>
                    <td>{user.mobile}</td>
                    <td>{user.designation}</td>
                    <td>{user.gender}</td>
                    <td>{user.course}</td>
                    <td>{user.date}</td>
                    <td><Link to={`/update/${user._id}`}><button id="edit">update</button></Link><button id="del" onClick={(e)=>handledelete(user._id)}>delete</button></td>
                  </tr>
                })
              }
            </tbody>
        </table>
    </div>
  </div>
    
  )
}

export default Employee