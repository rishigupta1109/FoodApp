// import {useState } from "react";
import "../login/Login.css";
import Aos from "aos";
import 'aos/dist/aos.css';
// import "../signup/Signup.css";
import useValidate from "../hooks/useValidate"; 
// import { PromiseProvider } from "mongoose";
Aos.init();
const Login=(props)=>{
    const [dispatchemail,emailValidation,emailIsValid,email]=useValidate("email");
    const [dispatchPassword,PasswordValidation,PasswordIsValid,Password]=useValidate("password");
    let valid=emailIsValid&&PasswordIsValid;
    // let loggedIn=false;
    
    
    

    async function sendData(){
        const Url="http://192.168.29.202:5500/SearchUser";
        const header={"content-type":'application/json' }
        const Body= JSON.stringify({email:email,password:Password});
        
        const params={method:"POST",body:Body,headers:header,credentials:"include"}
        const response =await fetch(Url,params);
        const data=await response;
        const obj= data.json();
        let founded=false;
        obj.then((result)=>{ props.UserNameHandler(result.name,result.email);  founded=result.found; ;
        if(founded){
           
            props.logIn();
        }
        else {
           props.loginModal(result.message);
        }
    });
        
        return founded;
    } 
    const submitHandler=(e)=>{
      e.preventDefault();
        if(valid){
            sendData();
            
            dispatchemail({type:"reset"});
            
            dispatchPassword({type:"reset"});
            // setNameISTouched(false);
            // setLastNameISTouched(false);
            // setEmailISTouched(false);
          
        }
        else{
            dispatchemail({type:"touched"});
            dispatchPassword({type:"touched"});
        //     setNameISTouched(true);
        //     setLastNameISTouched(true);
        // setEmailISTouched(true);
    }
        
    }
   
    const NamechangeHandler=(e)=>{
        dispatchemail({type:"input",value:e.target.value});
        
    }
    const NameBlurHandler=(e)=>{
        dispatchemail({type:"touched"});
        
    }
    
    const PasswordchangeHandler=(e)=>{
        dispatchPassword({type:"input",value:e.target.value});
        
    }
    const PasswordBlurHandler=(e)=>{
        dispatchPassword({type:"touched"});
        
    }
    const Nameid= emailValidation? "Name-input":"Name-input invalid";
    const Passwordid= PasswordValidation? "Name-input":"Name-input invalid";
    return (<div id="container-box">
        <div id="container">
            <div id="login-container">
                <div data-aos="fade-left" data-aos-duration="1000" id="login-login-container">
        <div><h1 id="signup-heading">Sign-In</h1></div>
            <form action="localhost/" method="POST" onSubmit={submitHandler}>
            <div className="input-container">
                <label>Email :</label>
                <input name="name" className={Nameid} type="text" value={email} onBlur={NameBlurHandler} onChange={NamechangeHandler} />
                {!emailValidation&&<p style={{color:"red"}}>please write a valid email</p>}
            </div>
            
            <div className="input-container">
                <label>Password :</label>
                <input name="password" className={Passwordid} type="password" value={Password} onBlur={PasswordBlurHandler} onChange={PasswordchangeHandler} />
                {!PasswordValidation&&<p style={{color:"red"}}>please write a valid Password</p>}
            </div>
            <div className="input-container">
                <button disabled={!valid} className="submit-button" >SignIn</button>
                <br></br>
            </div>

            </form>
            </div>
                <div data-aos="fade-right" data-aos-duration="1000" id="login-signup-container">
                    <h1>Hello Friend!</h1>
                    <h3>Enter Your Details and start journey with us</h3>
                <button  className="login-signup-button" onClick={props.signup} >Signup</button>
                </div>

                </div>
        </div>
        </div>

    );
}

export default Login;