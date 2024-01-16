import { useState } from "react";
import Modal from "./Modal";
import { Link, useNavigate } from "react-router-dom";
import Cart from "./Cart";
import { useCart } from "./ContextReducer";
const Navbar = () => {
    const data=useCart();
    const[cartview,setcartview]=useState(false);
    const navigate=useNavigate();
    const logoutHanlder=()=>{
        localStorage.removeItem("authtoken");
        navigate("/login")
    }
    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light sticky-top">
            <div className="container-fluid">
                <Link className="navbar-brand" to="/">Zombimato</Link>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
                    <div className="navbar-nav">
                        <Link className="nav-link active" aria-current="page" to="/">Home</Link>
                        <Link className="nav-link" to="/myorders">My orders</Link>
                        {!localStorage.getItem('authtoken') &&
                            <div className="d-flex">
                                <Link className="btn text-success mx-1" to="/login">login</Link>
                                <Link className="btn text-success mx-1" to="/signup">Signup</Link>
                            </div>
                        }
                        {localStorage.getItem('authtoken') &&
                         <>
                         <div className="btn text-success  d-flex " onClick={()=>{setcartview(!cartview)}} >My cart {data.length!==0 && <> {data.length}</>}</div>
                         {cartview && <Modal onclose={()=>{setcartview(false)}}><Cart></Cart></Modal>}
                         <div className="btn text-danger  d-flex " onClick={logoutHanlder}>Logout</div>
                         </>}
                    </div>

                </div>
            </div>
        </nav>
    )
}
export default Navbar;