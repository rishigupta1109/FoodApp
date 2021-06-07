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
      setcartFoodArray([...cartFoodArray]);
     }
   }))
    if(!bool){setcartFoodArray([...cartFoodArray,obj]);}
  }
  let noofitems=0;
  
  cartFoodArray.forEach((data)=>{noofitems=noofitems+Number(data.amount)});

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
  return (
    <div id="App">
    <Context.Provider value={{Cart:cart ,amountChange:amountChangeHandler}}>
    {cart&&<BackdropCart reset={resetArray} obj={cartFoodArray}  onclick={navbarcartcall}></BackdropCart>}
      <Navbar sticky={cart} itemsNo={noofitems} onclick={navbarcartcall}></Navbar>
      <Details></Details>
      <FoodItemContainer onclick={FoodCartObject} ></FoodItemContainer>
      </Context.Provider>
    </div>
  );
}

export default App;
