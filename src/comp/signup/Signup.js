// import {useState } from "react";
import Aos from "aos";
import 'aos/dist/aos.css';
import "./Signup.css";
import useValidate from "../hooks/useValidate";
Aos.init();
const Signup=(props)=>{
    const [dispatchName,NameValidation,NameIsValid,Name]=useValidate("name");
    const [dispatchPassword,PasswordValidation,PasswordIsValid,Password]=useValidate("password");
    const [dispatchemail,emailValidation,emailIsValid,email]=useValidate("email");
    let valid=NameIsValid&&PasswordIsValid&&emailIsValid;

    async function sendData(){
        const Url="http://192.168.29.202:5500/CreateUser";
        const header={"content-type":'application/json' }
        const Body= JSON.stringify({name:Name,password:Password,email:email});
        const params={method:"POST",body:Body,headers:header,credentials:"include"}
        const response =await fetch(Url,params);
        const data=await response;
        const obj= data.json();
        
       obj.then((result)=>{if(result.isloggedin===null){
           props.signupmodal(false);
        
        }
    else{  props.signupmodal(true)}});
        return data;
    } 
    const submitHandler=(e)=>{
      e.preventDefault();
        if(valid){
            sendData();
            props.login();
            // console.log(Name,Password);
            // setName('');
            // setLastName('');
            // setEmail('');
            dispatchName({type:"reset"});
            dispatchemail({type:"reset"});
            
            dispatchPassword({type:"reset"});
            // setNameISTouched(false);
            // setLastNameISTouched(false);
            // setEmailISTouched(false);
          
        }
        else{
            dispatchName({type:"touched"});
            dispatchPassword({type:"touched"});
            dispatchemail({type:"touched"});
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
    const emailchangeHandler=(e)=>{
        dispatchemail({type:"input",value:e.target.value});
        
    }
    const emailBlurHandler=(e)=>{
        dispatchemail({type:"touched"});
        
    }
    
    const PasswordchangeHandler=(e)=>{
        dispatchPassword({type:"input",value:e.target.value});
        
    }
    const PasswordBlurHandler=(e)=>{
        dispatchPassword({type:"touched"});
        
    }
    const Nameid= NameValidation? "Name-input":"Name-input invalid";
    const Passwordid= PasswordValidation? "Name-input":"Name-input invalid";
    const emailid= emailValidation? "Name-input":"Name-input invalid";
    return (<div id="container-box">
        <div id="container">
        <div id="login-container">
        <div data-aos="fade-left" data-aos-duration="1000" id="login-signup-container">
                    <h1>Welcom Back!</h1>
                    <h3>To Order Food SignIn Now</h3>
                    <button   className="login-signup-button" onClick={props.login}>SignIn</button>
                </div>

                <div data-aos="fade-right" data-aos-duration="1000" id="login-login-container">
        <div><h1 id="signup-heading">Create New Account</h1></div>
            <form action="localhost/" method="POST" onSubmit={submitHandler}>
            <div className="input-container">
                <label>Name :</label>
                <input name="name" className={Nameid} type="text" value={Name} onBlur={NameBlurHandler} onChange={NamechangeHandler} />
                {!NameValidation&&<p style={{color:"red"}}>please write a valid name</p>}
            </div>
            <div className="input-container">
                <label>email :</label>
                <input name="email" className={emailid} type="text" value={email} onBlur={emailBlurHandler} onChange={emailchangeHandler} />
                {!NameValidation&&<p style={{color:"red"}}>please write a valid email</p>}
            </div>
            
            <div className="input-container">
                <label>Password :</label>
                <input name="password" className={Passwordid} type="password" value={Password} onBlur={PasswordBlurHandler} onChange={PasswordchangeHandler} />
                {!PasswordValidation&&<p style={{color:"red"}}>please write a valid Password</p>}
            </div>
            <div className="input-container">
                <button disabled={!valid} className="submit-button" >SignUp</button>
                <br></br>
            </div>

            </form>
              
                </div>
        </div>
        </div>
        </div>
    );
}

export default Signup;