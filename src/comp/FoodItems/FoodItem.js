import "./FoodItem.css";

const FoodItem=()=>{
    return (
        <div id="food-item">
            <div id="food-img"  ></div>
            <h2 id="food-name">Pizza</h2>
            <h2 id="food-price">100Rs</h2>
            <input type="number" id="amount"></input>
            <button id="add-to-cart">Add to Cart</button>
        </div>
    );
}
export default FoodItem;