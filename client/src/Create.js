import React, { useState } from "react";
import "./Create.css";
import axios from 'axios'
import {redirect, useNavigate} from 'react-router-dom'

function Create() {
  const date = new Date(); // Get the current date

const formattedDate = date.toLocaleDateString('en-US', {
  year: 'numeric',
  month: '2-digit',
  day: '2-digit'
});
  const[name,setname]=useState();
  const[email,setemail]=useState();
  const[mobile,setmobile]=useState();
  const [gender,setgender]=useState();
  const[image,setimage]=useState(null)
  const [courses, setCourses] = useState([]);
  const[file,setfile]=useState();
  const [designation,setdesignation]=useState()
  const navigate=useNavigate()

  const handleCheck = (event) => {
    const { value, checked } = event.target;
    setCourses((prev) =>
      checked ? [...prev, value] : prev.filter((course) => course !== value)
    );
  };

  function handlesubmit(e){
    e.preventDefault()
    const formdata=new FormData()
    formdata.append('file',file)
    axios.post('http://localhost:3001/upload',formdata)
    .then((result)=>{
      axios.post('http://localhost:3001/create',{
        name,
        email,
        mobile,
        designation,
        gender,
        date:formattedDate,
        course:courses.join(','),
        image:result.data})
    .then((e)=>{
      navigate("/list")
      console.log(e)
    }).catch(err=>console.log(err))
    }
    )
    .catch(err=>console.log(err))
    
  }
  function handleradio(data){
setgender(data.target.value)
  }

  
  function handledesignation(data){
    setdesignation(data.target.value)
  }
  return (
    <div className="crt">
      <div className="create-box">
        <form className="ins-box" onSubmit={handlesubmit}>
          <div className="inputbox">
            <b>Name</b>
            <input type="text" placeholder="name"  onChange={(e)=>setname(e.target.value)} required/>
          </div>
          <div className="inputbox">
            <b>Email</b>
            <input type="email" placeholder="email" onChange={(e)=>setemail(e.target.value)} required />
          </div>
          <div className="inputbox">
            <b>Mobile</b>
            <input type="text" placeholder="mobile"   onChange={(e)=>setmobile(e.target.value)} required />
          </div>
          <div className="inputbox">
            <b>designation</b>
            <select name="designation" onChange={handledesignation}>
              <option value="hr">hr</option>
              <option value="manager">manager</option>
              <option value="sales">sales</option>
            </select>
          </div>
          <div className="inputbox">
            <b>gender</b>
            <div className="check">
              <p>
                <input type="radio" name="gender" value="male" onChange={handleradio} />
                male
              </p>
              <p>
                <input type="radio" name="gender" value="female" onChange={handleradio}/>
                female
              </p>
            </div>
          </div>
          <div className="inputbox">
            <b>course</b>
            <div className="check">
              <p>
                <input type="checkbox" name="mca" value="mca" onChange={handleCheck} />
                MCA
              </p>
              <p>
                <input type="checkbox" name="bca" value="bca" onChange={handleCheck} />
                BCA
              </p>
              <p>
                <input type="checkbox" name="bsc" value="bsc" onChange={handleCheck} />
                BSc
              </p>
            </div>
          </div>
          <div className='inputbox'>
            <b>img upload</b>
            <input type='file' placeholder='name' name='name' onChange={e=>setfile(e.target.files[0])} />
          </div>
          <div className='submit'>
          <button type="submit">Create</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Create;
