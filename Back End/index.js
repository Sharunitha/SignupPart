const  express = require("express");
const app = express();
const mongoose =require("mongoose");
app.use(express.json());
const cors=require("cors");
app.use(cors());
const bcrypt=require("bcryptjs")

const jwt=require("jsonwebtoken");
const JWT_SECRET="dhgvhu7ert789564258()wsde8d55d47854dhfygfhbj?ffe854![]kij485";

const mongourl="mongodb+srv://Shruthika:Shan%402002@cluster0.kvy6ee0.mongodb.net/?retryWrites=true&w=majority";
 mongoose.set('strictQuery', true)
mongoose.connect(mongourl,{
    useNewUrlParser:true,
    
})
.then(()=>{console.log("connected to database");
})
.catch((e)=>console.log(e));

require("./userDetails");
const User= mongoose.model("UserInfo");

app.post("/register",async(req,res)=>{
    const{fname,lname,email,password}=req.body;

    const encryptedPassword=await bcrypt.hash(password,10);
    try{
        const olduser = await User.findOne({email});
        if(olduser){
            return res.send({error:"User Exists"});
        }
        await User.create(
            {
                fname,
                lname,
                email,
                password:encryptedPassword,
            }
        );
        res.send({status:"ok"})

    }catch(error){
        res.send({status:"error"})
    }
});
app.post("/login-user",async(req,res)=>{
    const{email,password}=req.body;

    const user= await User.findOne({email});
    if(!user){
        return res.json({error:"User Not found"});
    }
    if(await bcrypt.compare(password,user.password)){
        const token=jwt.sign({email:user.email},JWT_SECRET,{
            expiresIn:3600,
        });

        if(res.status(201)){
            return res.json({status:"ok",data:token});
        }else{
            return res.json({error:"error"});
        }
    }
    res.json({status:"error",error:"InvalidPassword"});
});

app.post("/userData",async(req,res)=>{
    const{token}=req.body;
    try{
        const user=jwt.verify(token,JWT_SECRET,(err,res)=>{
           if(err){
            return "token expired";
           }
           return res;
        });
        console.log(user);
        if(user=="token expired"){
            return res.send({status:"error",data:"token expired"});
        }
        const useremail=user.email;
        User.findOne({email:useremail})
        .then((data)=>{
            res.send({status:"ok",data:data});
        })
        .catch((error)=>{
            res.send({status:"ok",data:error});
        });
    }catch(error){}
});

app.listen(5000,()=>{
    console.log('Server Started');
});

