import Context from "../Context/Context";
import "./FoodItem.css";
import React,{useContext,useState,useEffect} from "react";

const FoodItem=(props)=>{
    
    const ctx=useContext(Context);
    const clickHandler=()=>{
        props.onclick({
            src:props.src,
            name:props.name,
            amount:value,
            price:props.price,
            id:props.id,
            Total:props.price*value

        })

    }
    const [value,setvalue]=useState("");
    const changeHandler=(e)=>{
        setvalue(e.target.value);
        ctx.Cart&&ctx.amountChange(e.target.name,e.target.value);
        ctx.Cart&&props.changeHandler(e.target.name,e.target.value);
        


    }
    useEffect(()=>{if(ctx.Cart)
    {setvalue(props.amount);}
    },[])
    return (
        <div id="food-item">
            <img id="food-img" alt="pizza" src={props.src}  ></img>
            <h2 id="food-name">{props.name}</h2>
            <h2 id="food-price">{props.price}Rs</h2>
            {props.ordered===undefined&&<input type="number" min="0" max='100' name={props.name} value={value} onChange={changeHandler} id="amount" ></input>}
            {props.ordered===true&& <h2 id="food-name">{props.amount}</h2>}
            {ctx.Cart&& <h2 id="food-price">{props.Total}Rs</h2>}
            {!ctx.Cart&&<button id="add-to-cart" onClick={clickHandler}>Add to Cart</button>}
        </div>
    );
}
export default FoodItem;