import Context from "../Context/Context";
import "./FoodItem.css";
import React,{useContext,useState,useEffect,useRef} from "react";

const FoodItem=(props)=>{
    const input=useRef();
    const ctx=useContext(Context);
    const [value,setvalue]=useState('0');
    
    const valueChanger=(e)=>{
        if(e.target.name==="plus"){
            input.current.value=Number(input.current.value)+1;
            !ctx.Cart&&props.onclick({
                src:props.src,
                name:props.name,
                amount:1,
                price:props.price,
                id:props.id,
                Total:props.price*input.current.value
    
            });
        }
        else{if(input.current.value!=='0') {input.current.value=Number(input.current.value)-1;
            !ctx.Cart&&props.onclick({
                src:props.src,
                name:props.name,
                amount:-1,
                price:props.price,
                id:props.id,
                Total:props.price*input.current.value
    
            });}}
        setvalue(input.current.value);
        ctx.Cart&&ctx.amountChange(input.current.name,input.current.value);
        ctx.Cart&&props.changeHandler(input.current.name,input.current.value);
        console.log(e.target.value);
        

    }
    useEffect(()=>{
    setvalue(props.amount);
    },[])
    return (
        <div id="food-item">
            <img id="food-img" alt="pizza" src={props.src}  ></img>
            <h2 id="food-name">{props.name}</h2>
            <h2 id="food-price">{props.price}Rs</h2>
            {props.ordered===undefined&&<div id="packetinput"><button onClick={valueChanger} name="minus" className="changebutton">-</button> 
             <input readOnly ref={input} type="number"  min="0" max='100' name={props.name} value={value}  id="amount" ></input>
             <button onClick={valueChanger} name="plus" className="changebutton">+</button></div>}
             {props.ordered&&<h2 id="food-price">{props.amount}X</h2>}
            {props.ordered===true&& <h2 id="food-name">{props.amount}</h2>}
            {(ctx.Cart||props.ordered)&& <h2 id="food-price">{props.Total}Rs</h2>}
           
        </div>
    );
}
export default FoodItem;