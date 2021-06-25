// import {useState } from "react";
import "../login/Login.css";
import Aos from "aos";
import 'aos/dist/aos.css';
// import "../signup/Signup.css";
import useValidate from "../hooks/useValidate"; 
// import { PromiseProvider } from "mongoose";
Aos.init();
const Login=(props)=>{
    const [dispatchName,NameValidation,NameIsValid,Name]=useValidate("name");
    const [dispatchPassword,PasswordValidation,PasswordIsValid,Password]=useValidate("password");
    let valid=NameIsValid&&PasswordIsValid;
    // let loggedIn=false;
    
    
    

    async function sendData(){
        const Url="http://localhost:80/SearchUser";
        const header={"content-type":'application/json' }
        const Body= JSON.stringify({name:Name,password:Password});
        console.log(Body);
        const params={method:"POST",body:Body,headers:header}
        const response =await fetch(Url,params);
        const data=await response;
        const obj= data.json();
        let founded=false;
        obj.then((result)=>{console.log("data" ,result); props.UserNameHandler(result.name); founded=result.found; console.log(founded);
        if(founded){
           
            props.logIn();
        }
        else {
           props.loginModal();
        }
    });
        
        return founded;
    } 
    const submitHandler=(e)=>{
      e.preventDefault();
        if(valid){
            sendData();
            
            dispatchName({type:"reset"});
            
            dispatchPassword({type:"reset"});
            // setNameISTouched(false);
            // setLastNameISTouched(false);
            // setEmailISTouched(false);
          
        }
        else{
            dispatchName({type:"touched"});
            dispatchPassword({type:"touched"});
        //     setNameISTouched(true);
        //     setLastNameISTouched(true);
        // setEmailISTouched(true);
    }
        
    }
   
    const NamechangeHandler=(e)=>{
        dispatchName({type:"input",value:e.target.value});
        
    }
    const NameBlurHandler=(e)=>{
        dispatchName({type:"touched"});
        
    }
    
    const PasswordchangeHandler=(e)=>{
        dispatchPassword({type:"input",value:e.target.value});
        
    }
    const PasswordBlurHandler=(e)=>{
        dispatchPassword({type:"touched"});
        
    }
    const Nameid= NameValidation? "Name-input":"Name-input invalid";
    const Passwordid= PasswordValidation? "Name-input":"Name-input invalid";
    return (<div id="container-box">
        <div id="container">
            <div id="login-container">
                <div data-aos="fade-left" data-aos-duration="1000" id="login-login-container">
        <div><h1>Login</h1></div>
            <form action="localhost/" method="POST" onSubmit={submitHandler}>
            <div className="input-container">
                <label>FirstName :</label>
                <input name="name" className={Nameid} type="text" value={Name} onBlur={NameBlurHandler} onChange={NamechangeHandler} />
                {!NameValidation&&<p style={{color:"red"}}>please write a valid name</p>}
            </div>
            
            <div className="input-container">
                <label>Password :</label>
                <input name="password" className={Passwordid} type="password" value={Password} onBlur={PasswordBlurHandler} onChange={PasswordchangeHandler} />
                {!PasswordValidation&&<p style={{color:"red"}}>please write a valid Password</p>}
            </div>
            <div className="input-container">
                <button disabled={!valid} className="submit-button" >Submit</button>
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