import React,{useState} from "react";
import './App.css';
import Navbar from "./comp/UI/Navbar";
import Context from "./comp/Context/Context";
import Details from "./comp/details/Details";
import FoodItemContainer from "../src/comp/FoodItems/FoodItemContainer";
import BackdropCart from "./comp/Cart/Cart";

function App() {
  const [cart, setcart] = useState(false);
  const navbarcartcall=(cart)=>{
    setcart(cart);
  }
 
  const [cartFoodArray,setcartFoodArray]=useState([]);
  const FoodCartObject=(obj)=>{
   let bool =false;
   cartFoodArray.forEach(((value,index)=>{
     if(value.name===obj.name){
       bool=true;
      cartFoodArray[index].amount=Number(cartFoodArray[index].amount)+Number(obj.amount);
     }
   }))
    if(!bool){setcartFoodArray([...cartFoodArray,obj]);}
  }
  return (
    <div id="App">
    <Context.Provider value={{Cart:cart}}>
    {cart&&<BackdropCart obj={cartFoodArray} onclick={navbarcartcall}></BackdropCart>}
      <Navbar onclick={navbarcartcall}></Navbar>
      <Details></Details>
      <FoodItemContainer onclick={FoodCartObject} ></FoodItemContainer>
      </Context.Provider>
    </div>
  );
}

export default App;
