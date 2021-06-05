import "./Navbar.css";

const Navbar=(props)=>{
    return (
        <div id="Navbar">
                         <h1 id="heading">FoodZinga</h1>  
                         <button id="cart-button"><img src="https://media.istockphoto.com/vectors/shopping-cart-icon-isolated-on-white-background-vector-id1206806317?k=6&m=1206806317&s=612x612&w=0&h=Fo7D7nh_QPu758KRdbNTp7m4xSVOxBvJ2cfUvA1_k_U=" alt="cart-icon" id="cart-img"></img> <span id="cart-text">Cart</span></button>
        </div>
    )
}

export default Navbar;