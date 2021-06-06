import "./FoodItems.css";
import FoodItem from "./FoodItem";
let items=[{
    id:0,
    src:`https://images7.alphacoders.com/596/thumb-1920-596343.jpg`,
    name:'Pizza',
    price:100,
},{
    id:1,
    src:`http://adwallpapers.xyz/uploads/posts/166553-burger-4k-ultra-hd-wallpaper.jpg`,
    name:'Burger',
    price:80,
},{
    id:2,
    src:`https://i.pinimg.com/originals/0f/89/31/0f8931ee47cabb86a8df65166f87b1a7.jpg`,
    name:'Sandwich',
    price:50,
},{
    id:3,
    src:`https://wallpaperaccess.com/full/3708926.jpg`,
    name:'Noodles',
    price:30,
},]
const FoodItems=(props)=>{
    const clickHandler=(obj)=>{
        props.onclick(obj);
    }
    return (
        <div id="food-items">
        <h1 id="order-now-heading">Order Now!</h1>
        {items.map((data)=>{return(<FoodItem key={Math.random()} onclick={clickHandler} id={data.id} src={data.src} name={data.name} price={data.price}></FoodItem>)})}
        </div>
    )
}
export default FoodItems;