import Context from "../Context/Context";
import "./FoodItem.css";
import React,{useContext,useState} from "react";

const FoodItem=(props)=>{
    
    const ctx=useContext(Context);
    const clickHandler=()=>{
        props.onclick({
            src:props.src,
            name:props.name,
            amount:value,
            price:props.price,
            id:props.id

        })

    }
    const [value,setvalue]=useState("");
    const changeHandler=(e)=>{
        setvalue(e.target.value);

    }
    
    return (
        <div id="food-item">
            <img id="food-img" alt="pizza" src={props.src}  ></img>
            <h2 id="food-name">{props.name}</h2>
            <h2 id="food-price">{props.price}Rs</h2>
            <input type="number" value={ctx.Cart?props.amount:value} onChange={changeHandler} id="amount" ></input>
            {!ctx.Cart&&<button id="add-to-cart" onClick={clickHandler}>Add to Cart</button>}
        </div>
    );
}
export default FoodItem;