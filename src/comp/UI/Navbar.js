import "./Navbar.css";
import logo from "../FoodZinga.jpeg";
import DropdownS from "../UI/dropdown";
// import ReactDom from "react-dom";
const Navbar=(props)=>{
    async function sendlogout(){
        const Url="http://localhost:80/logoutUser";
        const header={"content-type":'application/json' }
        const Body= JSON.stringify({name:props.UserName});
        console.log(Body);
        const params={method:"POST",body:Body,headers:header}
        const response =await fetch(Url,params);
        const data=await response;
        const obj= data.json();
        if(response.ok){}
        console.log(obj.then((result)=>{console.log(result)}));
        props.logout();
        return data;
    } 
    const logoutHandler=()=>{
        sendlogout();

    }
    const clickHandler=()=>{
        props.onclick(true);
        window.scrollTo(0,0);
      
    }
    return (
        <div id="Navbar" style={{position:props.sticky?"initial":"sticky"}}>
               <div id="head-part"> 
                <img id="logo" src={logo} alt="logo"></img>
                <h1 id="heading">FoodZinga</h1>  
                </div>
                <div id="bottom-part">
               {props.isLoggedIn && <h1 id="UserName"><DropdownS openYourorder={props.openYourorder} logout={logoutHandler} userName={props.UserName}></DropdownS> </h1>}
               {props.isLoggedIn && <button id="cart-button" onClick={clickHandler}><img src="https://media.istockphoto.com/vectors/shopping-cart-icon-isolated-on-white-background-vector-id1206806317?k=6&m=1206806317&s=612x612&w=0&h=Fo7D7nh_QPu758KRdbNTp7m4xSVOxBvJ2cfUvA1_k_U=" alt="cart-icon" id="cart-img"></img> <span id="cart-text">Cart{props.itemsNo!==0&& <div id="ItemNo">{props.itemsNo}</div>}</span></button>}
               </div>
        </div>
    )
}

export default Navbar;