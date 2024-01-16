import { useRef } from "react";
import { useState } from "react";
import { useEffect } from "react";
import { useCart,useDispatchCart } from "./ContextReducer";
const Card = (props) => {   
    let data=useCart();
    const priceref=useRef();
    const options=props.options; 
    const price=Object.keys(options);
    const dispatch=useDispatchCart();
    const[quan,setquan]=useState(1);
    const[size,setSize]=useState('');
    const addtocarthandler=async()=>{
        let food;
        for(const item of data){
            if(item.id===props.fooditem._id){
                food=item;
                break;
            }
        }
        if(food!==undefined){
            if(food.size===size){
                await dispatch({type:"UPDATE",id:props.fooditem._id,price:finalPrice,qty:quan,img:props.fooditem.img});
                return;
            }
            else{
                await dispatch({type:"ADD",id:props.fooditem._id,name:props.fooditem.name,price:finalPrice,qty:quan,size,img:props.fooditem.img});
                return;
            }
        }
        await dispatch({type:"ADD",id:props.fooditem._id,name:props.fooditem.name,price:finalPrice,qty:quan,size,img:props.fooditem.img});
    }
    useEffect(()=>{
        setSize(priceref.current.value);
    },[]);
    let finalPrice=quan*parseInt(options[size]);
    return (
        <div className="card m-2" style={{ width: "18rem" }} key={props.fooditem._id}>
            <img src={props.fooditem.img} className="card-img-top" alt="..." style={{height:"150px",objectFit:"fill"}}></img>
            <div className="card-body">
                <h5 className="card-title">{props.fooditem.name}</h5>
                <p className="card-text">{props.fooditem.description}</p>

                <select className="m-2 h-100 bg-success rounded" onChange={(e)=>{setquan(e.target.value)}}>
                    {Array.from(Array(6), ((e, i) => {
                        return (<option key={i + 1} value={i + 1} >{i + 1}</option>)
                    }))}
                </select>
                <select className="m-2 bg-success rounded" ref={priceref} onChange={(e)=>setSize(e.target.value)}>
                    {price.map(p=>(<option key={p} value={p}>{p}</option>))}
                </select>
                <div className="d-inline h-100">Total:{finalPrice}</div>
                <button className="btn btn-success justify-center ms-2" onClick={addtocarthandler}>Add to cart</button>
            </div>
        </div>
    )
}
export default Card;