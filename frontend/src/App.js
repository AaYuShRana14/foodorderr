import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./screens/Home";
import Signup from "./screens/Signup";
import Login from "./screens/Login";
import CartProvider from "./Components/ContextReducer";
import Myorder from "./screens/Myorder";
function App() {
  return (
    <CartProvider>
      <BrowserRouter>
      <>
        <Routes>
          <Route path="/" element={<Home></Home>}></Route>
          <Route path="/signup" element={<Signup></Signup>}></Route>
          <Route path="/login" element={<Login></Login>}></Route>
          <Route path="/myorders" element={<Myorder></Myorder>}></Route>
        </Routes>
        </>
      </BrowserRouter>
      
    </CartProvider>
  );
}

export default App;
