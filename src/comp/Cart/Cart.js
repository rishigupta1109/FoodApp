import FoodItem from "../FoodItems/FoodItem";
import React, { useState } from "react";
import "./Cart.css";
import Aos from "aos";
import 'aos/dist/aos.css';
Aos.init();



const Cart = (props) => {
    const [items, setitems] = useState(props.obj);
    let TotalAmount=0;
    items.forEach((data)=>{
      TotalAmount=TotalAmount+Number(data.amount)*Number(data.price);
  
    });
    const cartChangeHandler=(name,amount)=>{
      items.forEach(((value,index)=>{
        if(value.name===name){
         items[index].amount=amount;
         items[index].Total=amount*items[index].price;
         setitems([...items]);
        }
        if(value.amount==='0'){
          items.splice(index,1);
          setitems([...items]);
  
        }
      }))
    }
  
    
    const clickHandler = () => {
      props.onclick(false);
    };
    const orderHandler=()=>{
      let noofitems=0;
      items.map((data)=>{
        noofitems=noofitems+Number(data.amount);
      })
      props.orderHandler(items,TotalAmount,noofitems);
      // props.reset();
  
    }
    return (
      <div data-aos="zoom-in" className="cart">
        <div id="headimg">
          {" "}
          <h1 id="cart-heading">Cart</h1>
          <img
            src="https://media.istockphoto.com/vectors/shopping-cart-icon-isolated-on-white-background-vector-id1206806317?k=6&m=1206806317&s=612x612&w=0&h=Fo7D7nh_QPu758KRdbNTp7m4xSVOxBvJ2cfUvA1_k_U="
            alt="cart-icon"
            id="cartimg"
          ></img>
        <button id="crossbut" onClick={clickHandler}><img src="http://simpleicon.com/wp-content/uploads/cross.png" id="crossimg" alt="cross"></img></button>
        </div>
        {items.length===0&&<h1 id="paiic">Please Add Items in Cart</h1>}
        {items.map((data) => {
          return (
            <FoodItem
            changeHandler={cartChangeHandler}
              key={Math.random()}
              amount={data.amount}
              id={data.id}
              src={data.src}
              name={data.name}
              price={data.price}
              Total={data.amount*data.price}
            ></FoodItem>
           
          );
        })}
        {items.length!==0&&<div id="food-item">
          <div className="totaldiv">Total</div>
          <div className="totaldiv">{TotalAmount}Rs</div>
        </div>}
        {items.length!==0&&<button id="order-button" onClick={orderHandler}>
          Order!
        </button>}
      </div>
    );
  };

  export default Cart;