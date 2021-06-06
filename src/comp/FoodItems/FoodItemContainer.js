
import "./FoodItemContainer.css";
import FoodItems from "./FoodItems";
const FoodItemContainer=(props)=>{
    const clickHandler=(obj)=>{
        props.onclick(obj);
    }
    return (
        <div id="FoodItemContainer">
            <FoodItems onclick={clickHandler}></FoodItems>
        </div>

    )
}

export default FoodItemContainer;