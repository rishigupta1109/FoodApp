import React,{useState,useEffect} from "react";
import './App.css';
import loading from './icons/loading.png';
import Navbar from "./comp/UI/Navbar";
import Context from "./comp/Context/Context";
import Details from "./comp/details/Details";
import Signup from "./comp/signup/Signup";
import Login from "./comp/login/Login";
import FoodItemContainer from "../src/comp/FoodItems/FoodItemContainer";
import BackdropCart from "./comp/Cart/BackDropCart";
import YourOrderBackDrop from "./comp/YourOrders/YourOrderBackDrop";
import Modal from "./comp/UI/Modal/Modal";

function App() {
  const [isLoggedIn,setisLoggedIn]=useState(null);
  const [cart, setcart] = useState(false);
  const [yourOrderBackDrop, setyourOrderBackDrop] = useState(false);
  const [signup,setsignup]=useState(null);
  const [login,setlogin]=useState(null);
  const [UserName,setUserName]=useState("");
  const [isLoading,setisLoading]=useState(null);
  const [modal,setModal]=useState(false);
  const [modalmessage,setModalmessage]=useState("");

  const GetInfo=async()=>{
    setisLoading(true);
    const Url="http://localhost:80/CheckLogin";
    const response = await fetch(Url);
    const data=await response.json();
    console.log(data);
    setisLoggedIn(data.isloggedin);
    // setlogin(!data.isloggedin);
    setsignup(!data.isloggedin);
    setUserName(data.name);
    setisLoading(false);
  }
  useEffect(()=>{GetInfo()},[]);

  const loginhandler=()=>{
    setlogin(true);
    setsignup(false);
  }
  const signuphandler=()=>{
    setlogin(false);
    setsignup(true);
  }
  const loggedIn=()=>{
    setlogin(false);
    setsignup(false);
    setisLoggedIn(true);
  }
  const logoutHandler=()=>{
    setlogin(true);
    setsignup(false);
    setisLoggedIn(false);

  }
  
  const navbarcartcall=(cart)=>{
    setcart(cart);
  }
  const yourorderhandler=()=>{
    setyourOrderBackDrop(false);
  }
 
  const [cartFoodArray,setcartFoodArray]=useState([]);
  const FoodCartObject=(obj)=>{
   let bool =false;
   cartFoodArray.forEach(((value,index)=>{
     if(value.name===obj.name){
       bool=true;
      cartFoodArray[index].amount=Number(cartFoodArray[index].amount)+Number(obj.amount);
      setcartFoodArray([...cartFoodArray]);
     }
   }))
    if(!bool){setcartFoodArray([...cartFoodArray,obj]);}
  }
  let noofitems=0;
  
  cartFoodArray.forEach((data)=>{noofitems=noofitems+Number(data.amount)});
  const UserNameHandler=(name)=>{
    setUserName(name);

  }
  const amountChangeHandler=(name,amount)=>{
    cartFoodArray.forEach(((value,index)=>{
      if(value.name===name){
       cartFoodArray[index].amount=amount;
       setcartFoodArray([...cartFoodArray]);
      }
      if(value.amount==='0'){
        cartFoodArray.splice(index,1);
        console.log(cartFoodArray);
        setcartFoodArray([...cartFoodArray]);

      }
    }))
    

  }
  const resetArray=()=>{
    cartFoodArray.splice(0,cartFoodArray.length);
  }
  const openYourorder=()=>{
    window.scrollTo(0,0);
    setyourOrderBackDrop(true);
  }
  const signupmodal=(bool)=>{
    setModal(true);

    if(bool) {setModalmessage("Signup succesfully")}
    else{setModalmessage("User already exist")}
  }
  const closeModal=()=>{
    setModal(false);
  }
  const loginModal=()=>{
    

    
      setModal(true);
      setModalmessage("wrong user id or password");
  }
  





  return (
    <div id="App">
      {modal&&<Modal message={modalmessage} closeModal={closeModal}></Modal>}
    <Context.Provider value={{Cart:cart ,amountChange:amountChangeHandler}}>
    <Navbar openYourorder={openYourorder} isLoggedIn={isLoggedIn}  logout={logoutHandler} sticky={cart} itemsNo={noofitems} onclick={navbarcartcall} UserName={UserName}></Navbar>
    {isLoggedIn&&<><Details></Details>
      <FoodItemContainer onclick={FoodCartObject} cartFoodArray={cartFoodArray} ></FoodItemContainer></>}
     {signup&&<Signup signupmodal={signupmodal} login={loginhandler}></Signup>}
    {login&& <Login loginModal={loginModal} signup={signuphandler} logIn={loggedIn} UserNameHandler={UserNameHandler}></Login>}
    {isLoading&&<div id="loading-box"><h2 id="loading-text">Loading<img id="loading-img" src={loading} alt="loading" ></img></h2></div>}
    
    {yourOrderBackDrop&&<YourOrderBackDrop onclick={yourorderhandler} UserName={UserName}></YourOrderBackDrop>}
    {cart&&<BackdropCart UserName={UserName} reset={resetArray} obj={cartFoodArray}  onclick={navbarcartcall}></BackdropCart>}
      </Context.Provider> 
    </div>
  );
}

export default App;
