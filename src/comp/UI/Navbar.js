import "./Navbar.css";
import logo from "../FoodZinga.jpeg";
// import ReactDom from "react-dom";
const Navbar=(props)=>{
    const clickHandler=()=>{
        props.onclick(true);
        window.scrollTo(0,0);
      
    }
    return (
        <div id="Navbar" style={{position:props.sticky?"initial":"sticky"}}>
                <img id="logo" src={logo} alt="logo"></img>
                <h1 id="heading">FoodZinga</h1>  
                <button id="cart-button" onClick={clickHandler}><img src="https://media.istockphoto.com/vectors/shopping-cart-icon-isolated-on-white-background-vector-id1206806317?k=6&m=1206806317&s=612x612&w=0&h=Fo7D7nh_QPu758KRdbNTp7m4xSVOxBvJ2cfUvA1_k_U=" alt="cart-icon" id="cart-img"></img> <span id="cart-text">Cart{props.itemsNo!==0&& <div id="ItemNo">{props.itemsNo}</div>}</span></button>
        </div>
    )
}

export default Navbar;