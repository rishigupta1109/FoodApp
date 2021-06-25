const express=require("express");
const app=express();
const mongoose=require("mongoose");
mongoose.connect('mongodb://localhost:27017/UserData',{useNewUrlParser:true,useUnifiedTopology:true});
var cors = require('cors');

app.use(cors({
    origin: 'http://localhost:3000',
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
    isloggedin:Boolean,
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
            const userData={name:req.body.name,password:req.body.password,isloggedin:false};
            
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
    const userData={name:req.body.name,password:req.body.password,found:true};
    
    let found=undefined;
    Data.find(
        {name:req.body.name},
        (err,Data)=>{
            console.log(Data);
          
            if(Data.length!==0)  {
                console.log(Data[0].password);
                if(Data[0].password===req.body.password){console.log(true);  found=true; res.json(userData);}
                else{res.json({found:false}); console.log(false)}
            }
            else{res.json({found:false}); console.log(false)}
            console.log(userData);
        }
       

        
    );
    
    
    Data.findOneAndUpdate({name:req.body.name}, {$set:{isloggedin:true}},function(err, doc){
        if(err){
            console.log("Something wrong when updating data!");
        }
    
        console.log(doc);
    });
    

})
const checklogin=async(res)=>{
    let bool=false;
   await Data.find((err,Data)=>{Data.forEach((element)=>{if(element.isloggedin){res.send(element);console.log(element); bool=true} return true;})});
    if(!bool){res.send({isloggedin:false})}
}
app.get("/CheckLogin",(req,res)=>{
    checklogin(res);
})
app.post("/logoutUser",(req,res)=>{
    Data.findOneAndUpdate({name:req.body.name}, {$set:{isloggedin:false}},function(err, doc){
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
    await Data.find({name:req.body.user},(err,data)=>{console.log(data); orderdata=[...data[0].orders]});
    await Data.findOneAndUpdate({name:req.body.user},{$set:{orders:[...orderdata,req.body]}});
    await res.send({success:true});
}
app.post("/setOrder",(req,res)=>{
    setOrder(req,res);
})
app.post("/getOrder",(req,res)=>{
    console.log(req.body.user);
    Data.find({name:req.body.user},(err,data)=>{
        res.send(data);
        console.log("value",data);
    });
})

app.listen(80, () => { console.log('listening to 80') });