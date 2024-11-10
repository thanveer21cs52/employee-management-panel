import React, { useEffect, useState } from 'react'
import "./Create.css";
import pic from "./images/pic.png"
import axios from 'axios'
import {useNavigate, useParams} from 'react-router-dom'

function Update() {
  const[name,setname]=useState();
  const[email,setemail]=useState();
  const[mobile,setmobile]=useState();
  const[gender,setgender]=useState("");
  const[course,setcourse]=useState([]);
  const [designation,setdesignation]=useState()
  const[image,setimage]=useState()
  const[updateimg,setupdateimage]=useState()
  const[file,setfile]=useState()
  const {id}=useParams()
  const navigate=useNavigate()
 

useEffect(() => {
  axios
    .get(`http://localhost:3001/getuser/${id}`)
    .then((result) => {
      console.log(result);
      setname(result.data.name);
      setemail(result.data.email);
      setmobile(result.data.mobile);
      setgender(result.data.gender);
      setdesignation(result.data.designation);
      setcourse(result.data.course);
      setimage(result.data.image)
      console.log(result.data.image)
    })
    .catch((err) => console.log(err));
}, [id]);


const handleCheck = (event) => {
  const { value, checked } = event.target;
  setcourse((prev) =>
    checked ? [...prev, value] : prev.filter((c) => c !== value)
  );
};

function handleupdate(e){
  e.preventDefault()
  const formdata=new FormData()
  formdata.append('file',file)
  if(file){
    axios.post('http://localhost:3001/upload',formdata)
  .then((result)=>{setupdateimage(result.data)
    console.log(result.data)
  })
  .catch(err=>console.log(err))
  axios.put('http://localhost:3001/updateuser/'+id,{name,email,mobile,designation,gender,course:course.join(','),image:image})
  .then((e)=>{
    navigate("/list")
  }).catch(err=>console.log(err))

  }
  else{
    axios.put('http://localhost:3001/updateuser/'+id,{name,email,mobile,designation,gender,course:course.join(',')})
    .then((e)=>{
      navigate("/list")
    }).catch(err=>console.log(err))
  
  }
  
 
}

  return (
    <div className="crt">
    <div className="create-box">
      <form className="ins-box" onSubmit={handleupdate}>
        <div className="inputbox">
          <b>Name</b>
          <input type="text" placeholder="name" name="name" value={name} onChange={(e)=>setname(e.target.value)}/>
        </div>
        <div className="inputbox">
          <b>Email</b>
          <input type="email" placeholder="email" name="email" value={email}  onChange={(e)=>setemail(e.target.value)} required />
        </div>
        <div className="inputbox">
          <b>Mobile</b>
          <input type="text" placeholder="mobile" name="mobile" value={mobile} onChange={(e)=>setmobile(e.target.value)} required />
        </div>
        <div className="inputbox">
          <b>designation</b>
          <select name="designation"  value={designation} onChange={(e)=>setdesignation(e.target.value)} >
            <option value="hr">hr</option>
            <option value="manager">manager</option>
            <option value="sales">sales</option>
          </select>
        </div>
        <div className="inputbox">
  <b>Gender</b>
  <div className="check">
    <p>
      <input 
        type="radio" 
        name="gender"  
        value="male"  
        checked={gender === 'male'} 
        onChange={(e) => setgender(e.target.value)} 
      />
      male
    </p>
    <p>
      <input 
        type="radio" 
        name="gender"  
        value="female" 
        checked={gender === 'female'} 
        onChange={(e) => setgender(e.target.value)} 
      />
      female
    </p>
  </div>
</div>

        <div className="inputbox">
          <b>course</b>
          <div className="check">
      <p>
        <input
          type="checkbox"
          name="mca"
          value="mca"
          checked={course.includes('mca')}
          onChange={handleCheck}
        />
        mca
      </p>
      <p>
        <input
          type="checkbox"
          name="bca"
          value="bca"
          checked={course.includes('bca')}
          onChange={handleCheck}
        />
        bca
      </p>
      <p>
        <input
          type="checkbox"
          name="bsc"
          value="bsc"
          checked={course.includes('bsc')}
          onChange={handleCheck}
        />
        bsc
      </p>
    </div>
        </div>
        <div className='inputbox'>
          <img src={`http://localhost:3001/images/${image}`} alt="image"></img>
        </div>
        <div className='inputbox'>
            <b>img upload</b>
            <input type='file' placeholder='name' name='name' onChange={e=>setfile(e.target.files[0])} />
          </div>
          <div className='submit'>
          <button type="submit">update</button>  <button onClick={()=>navigate("/list")}>Exit</button>
          </div>
      </form>
    </div>
  </div>
  )
}

export default Update