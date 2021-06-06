import "./Cart.css";
import FoodItem from "../FoodItems/FoodItem";
import React, { useState } from "react";
import reactDom from "react-dom";

const Cart = (props) => {
  const [items, setitems] = useState(props.obj);
  


  const clickHandler = () => {
    props.onclick(false);
  };
  return (
    <div id="cart">
      <div id="headimg">
        {" "}
        <h1 id="order-now-heading">Cart</h1>
        <img
          src="https://media.istockphoto.com/vectors/shopping-cart-icon-isolated-on-white-background-vector-id1206806317?k=6&m=1206806317&s=612x612&w=0&h=Fo7D7nh_QPu758KRdbNTp7m4xSVOxBvJ2cfUvA1_k_U="
          alt="cart-icon"
          id="cartimg"
        ></img>
      </div>
      {items.map((data) => {
        return (
          <FoodItem
            key={Math.random()}
            amount={data.amount}
            id={data.id}
            src={data.src}
            name={data.name}
            price={data.price}
          ></FoodItem>
        );
      })}
      <button id="order-button" onClick={clickHandler}>
        Order!
      </button>
    </div>
  );
};
const Backdrop = () => {
  return <div id="backdrop"></div>;
};

const BackdropCart = (props) => {
  const clickHandler = (cart) => {
    props.onclick(cart);
  };

  return (
    <>
      {reactDom.createPortal(
        <Backdrop></Backdrop>,
        document.getElementById("backdrop-root")
      )}
      {reactDom.createPortal(
        <Cart obj={props.obj} onclick={clickHandler}></Cart>,
        document.getElementById("cart-root")
      )}
    </>
  );
};

export default BackdropCart;
