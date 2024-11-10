const express=require('express')
const cors=require('cors')
const mongoose=require('mongoose')
const userModel=require('./models/user')
const createModel=require("./models/create")
const multer=require('multer')
const path =require('path')
const app=express()
app.use(express.json())
app.use(cors())
app.use(express.static('public'))
const storage=multer.diskStorage({
  destination:(req,file,cb)=>{
    cb(null,'public/images')
  },
  filename: (req,file,cb) => {
    cb(null,file.fieldname+'_'+Date.now()+path.extname(file.originalname))
  }
})
const upload=multer({
  storage:storage
})

mongoose.connect("mongodb://localhost:27017/employee", { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("Connected to MongoDB"))
  .catch(err => console.error("Could not connect to MongoDB:", err));

app.get("/",(req,res)=>{
  createModel.find({})
  .then(users=>res.json(users))
  .catch(err=>res.json(err))
})
app.get("/getimage",(req,res)=>{
  createModel.find()
  .then(users=>res.json(users))
  .catch(err=>res.json(err))
})

app.get("/getuser/:id",(req,res)=>{
  const id=req.params.id;
  createModel.findById(id)
  .then(users=>res.json(users))
  .catch(err=>res.json(err))
})
app.put("/updateuser/:id",(req,res)=>{
  const id=req.params.id;
  createModel.findByIdAndUpdate({_id: id},
    {
      name:req.body.name,
      email:req.body.email,
      mobile:req.body.mobile,
      gender:req.body.gender,
      designation:req.body.designation,
      course:req.body.course
    })
  .then(users=>res.json(users))
  .catch(err=>res.json(err))
})
app.delete("/deleteuser/:id",(req,res)=>{
  const id=req.params.id;
  createModel.findByIdAndDelete({_id: id})
  .then(users=>res.json(users))
  .catch(err=>res.json(err))
})
app.post("/create",(req,res)=>{
  createModel.create(req.body)
.then(result=>console.log(result))
.catch(err=>res.json(err))

})
app.post("/upload",upload.single('file'),(req,res)=>{
  res.json(req.file.filename)
})
app.post("/login",(req,res)=>{
  const{username,password}=req.body;
  userModel.findOne({username:username})
  .then(user =>{
    if(user){
      if(user.password===password){
        res.json("success")
      }
      else{
        res.json("password invalid")
      }
    }
    else{
      res.json("no user found")
    }
  })
})
// app.post("/login",(req,res)=>{
// userModel.create(req.body)
// .then(users=>res.json(users))
// .catch(err=>res.json(err))
// })
app.listen(3001,()=>{
    console.log("server 3001 is running perfectly");
})