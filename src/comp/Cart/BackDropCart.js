import "./Cart.css";
// import FoodItem from "../FoodItems/FoodItem";
import React, { useState } from "react";
import reactDom from "react-dom";
import Backdrop from "./Backdrop";
import Ordered from "./Ordered";
import Cart from "./Cart";
import CheckoutForm from "./checkoutform";



const BackdropCart = (props) => {
  const clickHandler = (cart) => {
    props.onclick(cart);
  };
  const resetHandler=(cart)=>{
    props.onclick(cart);
    props.reset();
    
  }
  const [TotalAmount, setTotalAmount] = useState(0)
  const [Array, setArray] = useState([]);
  const [Bill, setBill] = useState([]);
  const[itemscount,setitemscount]=useState(0);
  const checkoutHandler=(items,TotalAmt,noofitems)=>{
    setArray(items);setcheckout(true);
    setTotalAmount(TotalAmt);
    setitemscount(noofitems);
  }
  const orderHandler=(bill)=>{
    setcheckout(false);
    setOrderd(true);
    setBill(bill);
    
  }
  const [checkout, setcheckout] = useState(false);
  const [ordered, setOrderd] = useState(false);
  

  return (
    <>
      {reactDom.createPortal(
        <Backdrop onclick={clickHandler}></Backdrop>,
        document.getElementById("backdrop-root")
      )}
      {!checkout&&!ordered&&reactDom.createPortal(
        <Cart  orderHandler={checkoutHandler}  obj={props.obj} onclick={clickHandler}></Cart>,
        document.getElementById("cart-root")
      )}
      {checkout&&!ordered&&reactDom.createPortal(
        <CheckoutForm email={props.email} itemscount={itemscount} ordered={orderHandler} Array={Array} onclick={clickHandler} TotalAmount={TotalAmount} UserName={props.UserName} TotalAmt={TotalAmount}    ></CheckoutForm>,
        document.getElementById("cart-root")
      )}
      {ordered&&!checkout&&reactDom.createPortal(
        <Ordered  reset={resetHandler} onclick={clickHandler}  UserName={props.UserName} TotalAmt={TotalAmount} reset={resetHandler}   obj={Bill} ></Ordered>,
        document.getElementById("cart-root")
      )}

    </>
  );
};

export default BackdropCart;
