import { createContext, useReducer, useContext } from "react";

const CartStateContext = createContext();
const CartDispatch = createContext();
const reducer = (state, action) => {
    switch (action.type) {
        case "ADD":
            return [...state, { id: action.id, name: action.name, size: action.size, price: action.price, img: action.img, qty: action.qty }];
        case "REMOVE":
            let newarr=[...state];
            newarr.splice(action.index,1);
            return newarr;
        case "UPDATE":
            let arr=[...state];
            arr.find((food,index)=>{
                if(food.id===action.id){
                    arr[index]={...food,qty:action.qty+food.qty,price:action.price+food.price};
                }
                return arr;
            });
            return arr;
        case "DROP":
            let a=[];
            return a;
        default:
            return [state]
    }
}
const CartProvider = ({ children }) => {
    const [state, dispatch] = useReducer(reducer, []);
    return (
        <CartDispatch.Provider value={dispatch}>
            <CartStateContext.Provider value={state}>
                {children}
            </CartStateContext.Provider>
        </CartDispatch.Provider>
    )
}
export const useCart = () => useContext(CartStateContext);
export const useDispatchCart = () => useContext(CartDispatch);
export default CartProvider;