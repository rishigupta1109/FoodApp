import FoodItem from "../FoodItems/FoodItem";
import React, { useState } from "react";
import Aos from "aos";
import 'aos/dist/aos.css';
Aos.init();


const Ordered=(props)=>{
    console.log(props.obj);
    const [items, setitems] = useState(props.obj.items);
    const clickHandler=()=>{
      props.reset(false);
    }
  
  
    return(<div data-aos="flip-left" className="cart">
    <div id="headimg">
    <h1 id="EYF">Enjoy Your Food!</h1>
    </div>
    <div id="info">
      <h1>{props.obj.username}</h1>
      <br></br>
      <h2>Adress : {props.obj.Adress}</h2>
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
          <div className="totaldiv">{props.obj.totalamt}Rs</div>
        </div>
              <button id="HomeBut" onClick={clickHandler}>Home</button>
  
  
    </div>)
  }

  export default Ordered;