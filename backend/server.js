import express from "express"
import cors from 'cors'
import 'dotenv/config'
import connectDB from "./config/mongodb.js"
import connectCloudinary from "./config/cloudinary.js"
import userRouter from "./routes/userRoute.js"
import doctorRouter from "./routes/doctorRoute.js"
import adminRouter from "./routes/adminRoute.js"
import userModel from "./models/userModel.js"
import bcrypt from 'bcrypt'
import jwt from "jsonwebtoken";

// app config
const app = express()
const port = process.env.PORT || 4000
connectDB()
connectCloudinary()

// middlewares
app.use(express.json())
app.use(cors())

// api endpoints
app.use("/api/user", userRouter)
app.use("/api/admin", adminRouter)
app.use("/api/doctor", doctorRouter)


app.get('/getAccessToken', async(req, res) => {
  const params=`?client_id=${process.env.CLIENT_ID}&client_secret=${process.env.CLIENT_SECRET}&code=${req.query.code}`
  const url='https://github.com/login/oauth/access_token'+params;
  try{
    const response=await fetch(url, {
      method:'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      }
    })
    const data=await response.json()
    
    //get user details
    const userResponse=await fetch('https://api.github.com/user', {
      method:'GET',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Authorization': `token ${data.access_token}`
      }
    })
    const userData=await userResponse.json();
    const email=userData.email;
    if(!email){
      res.status(400).send({success:false, message:'Email Not Found.Please Public your email in github account'});
      return;
    }
    const user=await userModel.findOne({email})
    const newHashPassword=await bcrypt.hash(data.access_token, 10);
    if(!user){
      const newUser=await userModel.create({
        name:userData.name,
        email:userData.email,
        image:userData.avatar_url,
        address:{
          line1:userData.company,
          line2:userData.location
        },
        password:newHashPassword
      })
      const token=jwt.sign({id:newUser._id}, process.env.JWT_SECRET)
      res.json({ success: true, token })
    }else{
      const token=jwt.sign({id:user._id}, process.env.JWT_SECRET)
      res.json({ success: true, token })
    }     
  }catch(error){
    console.log(error)
  }
})

app.get("/", (req, res) => {
  res.send("API Working")
});

app.listen(port, () => console.log(`Server started on PORT:${port}`))