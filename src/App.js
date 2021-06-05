
import './App.css';
import Navbar from "./comp/UI/Navbar";
import Details from "./comp/details/Details";
import FoodItems from "../src/comp/FoodItems/FoodItems"

function App() {
  return (
    <div id="App">
      <Navbar></Navbar>
      <Details></Details>
      <FoodItems></FoodItems>
    </div>
  );
}

export default App;
