import "./FoodItems.css";
import FoodItem from "./FoodItem";
import {useState,useEffect} from "react";
import loading from "../../icons/loading.png";

// let items=[{
//     id:0,
//     src:`https://images7.alphacoders.com/596/thumb-1920-596343.jpg`,
//     name:'Pizza',
//     price:100,
// },{
//     id:1,
//     src:`http://adwallpapers.xyz/uploads/posts/166553-burger-4k-ultra-hd-wallpaper.jpg`,
//     name:'Burger',
//     price:80,
// },{
//     id:2,
//     src:`https://i.pinimg.com/originals/0f/89/31/0f8931ee47cabb86a8df65166f87b1a7.jpg`,
//     name:'Sandwich',
//     price:50,
// },{
//     id:3,
//     src:`https://wallpaperaccess.com/full/3708926.jpg`,
//     name:'Noodles',
//     price:30,
// },]
const FoodItems=(props)=>{
    const [items,setItems]=useState([]);
    const [isLoading,setisLoading]=useState(true);
    const GetInfo=async()=>{
        // setisLoading(true);
        const Url="http://192.168.29.202:5500/getfooditems";
        const response = await fetch(Url,{method:'GET',credentials:"include"});
        const data=await response.json();
        console.log(data);
        setItems(data);
        setisLoading(false);
      }
      useEffect(()=>{
          GetInfo();
      },[])
      console.log(items);
    const clickHandler=(obj)=>{
        props.onclick(obj);
    }
    let noofiteminobj=[];
    items.map((data)=>{data.map((key)=>{let bool=false;
        props.cartfoodarray.map((value)=>{
            if(value.name===key.name){noofiteminobj.push(value.amount); bool=true;}
        })
        if(!bool){
            noofiteminobj.push(0);
        }})
    })
    return (
        <div id="food-items">
        <h1 id="order-now-heading">Order Now!</h1>
        {isLoading&&<h1>Loading<img src={loading} alt="loading" id="loading-img"></img></h1>}
        {items.map((data)=>{return data.map((value,index)=>{return(<FoodItem key={Math.random()} onclick={clickHandler} 
        id={value.id} src={value.src} amount={noofiteminobj[index]}  name={value.name} price={value.price}></FoodItem>)})})}
        </div>
    )
}
export default FoodItems;