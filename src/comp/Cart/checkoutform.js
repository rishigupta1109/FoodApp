import useValidate from "../hooks/useValidate"; 
import { useState } from "react";
import Aos from "aos";
import 'aos/dist/aos.css';
Aos.init();
const CheckoutForm=(props)=>{
  const [UserName,setUserName]=useState(props.UserName);
  const [Useremail,setUseremail]=useState(props.email);
  const [dispatchName,NameValidation,NameIsValid,Name]=useValidate("name",props.UserName);
  const [dispatchAdress,AdressValidation,AdressIsValid,Adress]=useValidate("name");
  const [dispatchCardNo,CardNoValidation,CardNoIsValid,CardNo]=useValidate("cardno");
  const [dispatchCVV,CVVValidation,CVVIsValid,CVV]=useValidate("cvv");
  // const [Adress,setAdress]=useState("");
  // const [CardNo,setCardNo]=useState("");
  // const [CVV,setCVV]=useState("");
let valid=NameIsValid&&AdressIsValid&&CardNoIsValid&&CVVIsValid;
const clickHandler=(e)=>{

  e.preventDefault();
 if(valid){ 
  console.log(UserName,Adress,CardNo,CVV);
  sendOrder();
  props.ordered({
    user:props.UserName,
    username:UserName,
    Adress:Adress,
    CardNo:CardNo,
    email:Useremail,
    CVV:CVV,
    date:new Date(),
    items:props.Array,
    totalamt:props.TotalAmount
  });
  dispatchName({type:"reset"});
  dispatchAdress({type:"reset"});
  dispatchCardNo({type:"reset"});
  dispatchCVV({type:"reset"});


}
else{
  dispatchName({type:"touched"});
  dispatchAdress({type:"touched"});
  dispatchCardNo({type:"touched"});
  dispatchCVV({type:"touched"});
}
}
const sendOrder=async()=>{
  const Url="http://192.168.29.202:5500/setOrder";
  const Order=JSON.stringify({
    user:props.UserName,
    username:UserName,
    email:Useremail,
    Adress:Adress,
    CardNo:CardNo,
    CVV:CVV,
    date:new Date(),
    items:props.Array,
    itemscount:props.itemscount,
    totalamt:props.TotalAmount
  });
  const header={"content-type":'application/json' }
  const params={method:"POST",body:Order,headers:header};
  const response=await fetch(Url,params);
  const data=response.json();
  console.log(data);
}

  const UserNameHandler=(e)=>{
    dispatchName({type:"input",value:e.target.value});
    
      setUserName(e.target.value);
  }
  const UserNameBlurHandler=(e)=>{
    dispatchName({type:"touched"});
    
}
  const AdressHandler=(e)=>{
    dispatchAdress({type:"input",value:e.target.value});
      // setAdress(e.target.value);
  }
  const AdressBlurHandler=(e)=>{
    dispatchAdress({type:"touched"});
    
}
  const CardNoBlurHandler=(e)=>{
    dispatchCardNo({type:"touched"});
    
}
  const CVVBlurHandler=(e)=>{
    dispatchCVV({type:"touched"});
    
}

  const CardNoHandler=(e)=>{
    dispatchCardNo({type:"input",value:e.target.value});
  }
  const CVVHandler=(e)=>{
    if(e.target.value.length<4){ dispatchCVV({type:"input",value:e.target.value});}
      
  }
  const homeHandler=()=>{
    props.onclick(false);
  }
  const Nameid= NameValidation? "Name-input":"Name-input invalid";
  const Adressid= AdressValidation? "Name-input":"Name-input invalid";
  const CardNoid= CardNoValidation? "Name-input":"Name-input invalid";
  const CVVid= CVVValidation? "Name-input":"Name-input invalid";
    return (< div data-aos="flip-right" className="cart">
    <div id="headimg">
    <h1 id="EYF">Checkout</h1>
    </div>
    <hr></hr>
    <form onSubmit={clickHandler} id="checkoutform">
        <div id="formitem"><h3>Name : </h3><input className={Nameid} value={UserName} onBlur={UserNameBlurHandler}  onChange={UserNameHandler} type="text" placeholder="Rameesh"></input>
        {!NameValidation&&<p style={{color:"red"}}>please write a valid Name</p>}</div>
        <div id="formitem"><h3>Adress : </h3><input className={Adressid} value={Adress}  onBlur={AdressBlurHandler} onChange={AdressHandler} type="text" placeholder="PF Coloni"></input>
        {!AdressValidation&&<p style={{color:"red"}}>please write a valid Adress</p>}</div>
        <div id="formitem"><h3>Card No. :</h3><input className={CardNoid} value={CardNo} onChange={CardNoHandler} onBlur={CardNoBlurHandler} type="number" placeholder="65464854****"></input>
         {!CardNoValidation&&<p style={{color:"red"}}>please write a valid CardNo.<br></br> *must contain 12 Number</p>}</div>
        <div id="formitem"><h3>CVV</h3><input className={CVVid} value={CVV} onChange={CVVHandler} onBlur={CVVBlurHandler}  type="number" placeholder="***"></input>
         {!CVVValidation&&<p style={{color:"red"}}>please write a valid CVV <br></br>*must contain 3 Number</p>}</div>
        <div id="formitem"><button  className="submit-btn">Submit</button></div>
         <button className="submit-btn" onClick={homeHandler} >Home</button>
    </form>
  </div>)
}

export default CheckoutForm;