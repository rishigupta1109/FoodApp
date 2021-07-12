import { Card } from "react-bootstrap";
import "./YourOrders.css";
import Accordion from 'react-bootstrap/Accordion';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useEffect,useState } from "react";
import FoodItem from "../FoodItems/FoodItem";
import Aos from "aos";
import 'aos/dist/aos.css';
Aos.init();


const YourOrders=(props)=>{
 
  const [order,setorder]=useState([{orders:[]}]);
    const getorders=async()=>{
        const Url="http://192.168.29.202:5500/getOrder";
        console.log(props.UserName);
        const Order=JSON.stringify({
          email:props.email
        });
        const header={"content-type":'application/json' }
        const params={method:"POST",body:Order,headers:header,credentials:"include"};
        const response=await fetch(Url,params);
        const data=response.json();
        console.log(data);
        data.then((value)=>{setorder(value);});
    }
    useEffect(()=>{getorders()},[]);

    const clickHandler=()=>{
      props.onclick();
    }
    console.log("length",order[0].orders.length);

    return(<div data-aos="zoom-in" className="cart">
        <div id="YO-container">
          <div className="vr">
        <h1 id="YO">Your Orders</h1>
        <button id="crossbut" onClick={clickHandler}><img src="http://simpleicon.com/wp-content/uploads/cross.png" id="crossimg" alt="cross"></img></button>
        </div>
        {order[0].orders.length===0&&<h1>No orders </h1>}
        <div id="accordtions-container">
       {order.length>0&&order[0].orders.map((Order,index)=>{console.log(index);
         return  (<Accordion >
    <Card>
      <div className="card">
    <Accordion.Toggle as={Card.Header} eventKey="0">
     
      <h3>{Order.itemscount} items Ordered On : {new Date(Order.date).getDate()}-{(new Date(Order.date).getMonth())+1}-{new Date(Order.date).getFullYear()} on {new Date(Order.date).getHours()}:{new Date(Order.date).getMinutes()}:{new Date(Order.date).getSeconds()}  </h3>
    </Accordion.Toggle>
    <Accordion.Collapse eventKey="0">
      <Card.Body>
      <div id="content">
        <h3>Name:{Order.username}</h3><br></br><h3>adress:{Order.Adress}</h3>
      {order.length>0&&order[0].orders[index].items.map((data)=>{
        console.log(data);
        return (<FoodItem key={Math.random()}
              ordered="true"
              amount={data.amount}
              id={data.id}
              key={data.id}
              src={data.src}
              name={data.name}
              price={data.price}
              Total={data.Total} ></FoodItem>);})}
              <div id="total-box"><h2>Total</h2><h2>{Order.totalamt}</h2></div>
              </div>
      
      </Card.Body>
    </Accordion.Collapse>
    </div>
     </Card>
    
    </Accordion>)})}
    </div>
    </div>
    </div>)

}

export default YourOrders;