import "./Cart.css";
import FoodItem from "../FoodItems/FoodItem";
import React, { useState } from "react";
import reactDom from "react-dom";

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
    props.orderHandler(items,TotalAmount);
    // props.reset();

  }
  return (
    <div id="cart">
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
      {items.length===0&&<h1>Please Add Items in Cart</h1>}
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
const Backdrop = () => {
  return <div id="backdrop"></div>;
};

const Ordered=(props)=>{
  console.log(props.obj);
  const [items, setitems] = useState(props.obj);
  const clickHandler=()=>{
    props.reset(false);
  }


  return(<div id="cart">
  <div id="headimg">
  <h1 id="EYF">Enjoy Your Food!</h1>
  </div>
  <h1 id="cart-heading">Your Order</h1>
  
{items.map((data)=>{return <FoodItem key={Math.random()}
            ordered="true"
            amount={data.amount}
            id={data.id}
            src={data.src}
            name={data.name}
            price={data.price}
            Total={data.Total} ></FoodItem>})}
            <div id="food-item">
        <div className="totaldiv">Total</div>
        <div className="totaldiv">{props.TotalAmt}Rs</div>
      </div>
            <button id="HomeBut" onClick={clickHandler}>Home</button>


  </div>)
}

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
  const orderHandler=(items,TotalAmt)=>{
    setArray(items);setOrderd(true);
    setTotalAmount(TotalAmt);
  }
  const [Orderd, setOrderd] = useState(false);
  

  return (
    <>
      {reactDom.createPortal(
        <Backdrop></Backdrop>,
        document.getElementById("backdrop-root")
      )}
      {!Orderd&&reactDom.createPortal(
        <Cart  orderHandler={orderHandler}  obj={props.obj} onclick={clickHandler}></Cart>,
        document.getElementById("cart-root")
      )}
      {Orderd&&reactDom.createPortal(
        <Ordered TotalAmt={TotalAmount} reset={resetHandler}  obj={Array} ></Ordered>,
        document.getElementById("cart-root")
      )}
    </>
  );
};

export default BackdropCart;
