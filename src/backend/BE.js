const express=require("express");

const mongoose=require("mongoose");

var session = require('express-session');
var MongoDBStore = require('connect-mongodb-session')(session);
 
var app = express();
var store = new MongoDBStore({
  uri: 'mongodb://localhost:27017/UserData',
  connectionOptions: {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    serverSelectionTimeoutMS: 10000
  },
  collection: 'mySessions'
});
 
// Catch errors
store.on('error', function(error) {
  console.log(error);
});
 
app.use(require('express-session')({
  secret: 'Tdgrdgctx4tt',
  cookie: {
    maxAge: 1000 * 60 * 60 * 24 * 7 // 1 week
  },
 store:store,
  resave: false,
  saveUninitialized: true
}));
mongoose.connect('mongodb://localhost:27017/UserData',{useNewUrlParser:true,useUnifiedTopology:true});
var cors = require('cors');

app.use(cors({
    origin: 'http://192.168.29.202:3000',
    credentials: true
}));
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
 console.log('we are connected ')
});
const schema= new mongoose.Schema({
    name: String ,
    password: String,
    email:String,
    orders:Array,
})
const foodschema=new mongoose.Schema({
    id:Number,
    src:String,
    name:String,
    price:Number,
});
const Fooditems=mongoose.model("FoodItem",foodschema);
const Data=mongoose.model("Data",schema);


// app.use(express.urlencoded());
// const bodyParser = require("body-parser");
app.use(express.urlencoded());
app.use(express.json());


const signup=async(req,res)=>{
    Data.find(
        {name:req.body.name},
        (err,data)=>{
           if( data.length===0){
            console.log(req.body);
            const userData={name:req.body.name,password:req.body.password,email:req.body.email};
            
             const user=new Data(userData);
            user.save((err,user)=>{
                if(err) return console.error("error");
                
            })
            res.json(userData);
           }
           else{
               res.json({isloggedin:null});
           }
        }  
    );
   
    

}


app.post("/CreateUser",(req,res)=>{
   
    signup(req,res);

})
app.post("/SearchUser",(req,res)=>{
   
    console.log(req.body);
    let userData={email:req.body.email,password:req.body.password,found:true};
    
    let found=undefined;
    Data.find(
        {email:req.body.email},
        (err,Data)=>{
           
            console.log("data",Data);
          
            if(Data.length!==0)  {
                console.log(Data[0].password);
                if(Data[0].password===req.body.password){ req.session.email=req.body.email;console.log("id",req.sessionID);userData={...userData, name:Data[0].name};  found=true; res.json(userData);}
                else{res.json({message:"wrong password",found:false}); console.log(false)}
            }
            else{res.json({message:"User not found",found:false}); console.log(false)}
            console.log(userData);
        }
       

        
    );
    
    
    Data.findOneAndUpdate({email:req.body.email}, {$set:{isloggedin:true}},function(err, doc){
        if(err){
            console.log("Something wrong when updating data!");
        }
    
        console.log(doc);
    });
    

})

const checklogin=async(req,res)=>{
    console.log("req",req.sessionID);
    let userData={};
   if(req.session.email){ await Data.find({email:req.session.email},(err,data)=>{
       userData=data[0]; 
   });}
   


if(req.session.email){
   
    let Data={userData, "isloggedin": true};
    console.log("data",Data);
    res.send(Data);

}else{
    res.send({
        "isloggedin": false
    })
}

}
app.post("/CheckLogin",(req,res)=>{
    checklogin(req,res);
})
app.post("/logoutUser",(req,res)=>{
    req.session.destroy(function(err) {
       console.log("session destroyed");
      })
    Data.findOneAndUpdate({email:req.body.email}, {$set:{isloggedin:false}},function(err, doc){
        if(err){
            console.log("Something wrong when updating data!");
        }
    
        console.log(doc);
        res.send({success:true})
    });
})
const getfooditems=async(res)=>{
    let arr=[];
    await Fooditems.find((err,data)=>{arr=[...arr,data]; return (data); })
    await res.send(arr);
}
app.get("/getfooditems",(req,res)=>{
    getfooditems(res);
})

const setOrder=async(req,res)=>{
    let orderdata=[];
    await Data.find({email:req.body.email},(err,data)=>{console.log(data); orderdata=[...data[0].orders]});
    await Data.findOneAndUpdate({email:req.body.email},{$set:{orders:[...orderdata,req.body]}});
    await res.send({success:true});
}
app.post("/setOrder",(req,res)=>{
    setOrder(req,res);
})
app.post("/getOrder",(req,res)=>{
    console.log(req.body.email);
    Data.find({email:req.body.email},(err,data)=>{
        res.send(data);
        console.log("value",data);
    });
})

app.listen(5500,"192.168.29.202");