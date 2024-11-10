const mongoose=require('mongoose')
const userSchema=new mongoose.Schema({
    username: {
    type: String,
    required: true,
    unique: true,
    match: [/.+\@.+\..+/, 'Please enter a valid email'],
    },
    password: {
        type: String,
        required: true,
        minlength: [6, 'Password must be at least 6 characters long'],
        maxlength: [20, 'Password must be at most 20 characters long'],
        match: [/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,20}$/, 'Password must contain at least one letter, one number, and one special character'],
      }
})

const userModel=mongoose.model("users",userSchema)
module.exports=userModel