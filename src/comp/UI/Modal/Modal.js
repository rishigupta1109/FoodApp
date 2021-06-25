import Backdrop from "../../Cart/Backdrop";
import reactDom from "react-dom";
import "./Modal.css";
const ModalBox=(props)=>{
    return(
        <div id="modalbox">
            <div id="message"><h2>Message</h2></div>
            
            <h3>{props.message}</h3>
            <button id="ok" onClick={props.closeModal}>OK!</button>
        </div>
    )

}




const Modal=(props)=>{
    return(<>
        {reactDom.createPortal(<Backdrop onclick={props.closeModal} ></Backdrop>, document.getElementById("backdrop-root"))}
        {reactDom.createPortal(<ModalBox message={props.message} closeModal={props.closeModal} ></ModalBox>,document.getElementById("cart-root"))}
</>
    )
}
export default Modal;