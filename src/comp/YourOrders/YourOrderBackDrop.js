import Backdrop from "../Cart/Backdrop";
import YourOrders from "./YourOrders";
import reactDom from "react-dom";
const YourOrderBackDrop=(props)=>{
    const clickHandler=()=>{
        props.onclick();
    }
    return(<>
        {reactDom.createPortal(<Backdrop onclick={clickHandler}></Backdrop>, document.getElementById("backdrop-root"))}
        {reactDom.createPortal(<YourOrders email={props.email} onclick={clickHandler} UserName={props.UserName}></YourOrders>,document.getElementById("cart-root"))}
</>
    )
}

export default YourOrderBackDrop;