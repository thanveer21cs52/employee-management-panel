const mongoose=require('mongoose')
const CreateSchema=new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true 
      },
      email: {
        type: String,
        required: true,
        unique: true,  
        match: [/.+\@.+\..+/, 'Please enter a valid email'] 
      },
      mobile: {
        type: Number,
        required: true,
        unique: true,
        minlength: 10, 
      },
      designation: {
        type: String,
        enum: ['hr', 'manager', 'sales'], 
        default:'hr'
      },
      gender: {
        type: String,
        enum: ['male', 'female'] 
      },
      course: {
        type: [String],
        required: true
      },
      image:{
        type:String
      },
      date:{
        type:String,
      }
})

const createModel=mongoose.model("employees",CreateSchema)
module.exports=createModel