import { useCart, useDispatchCart } from "./ContextReducer";
const Cart = () => {
    const data = useCart();
    const dispatch = useDispatchCart();
    const checkouthandler = async() => {
        let userEmail = localStorage.getItem("userEmail");
        let res = await fetch('http://localhost:5000/zom/orderData', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ order_data: data, email: userEmail, order_date: new Date().toDateString() }),
        });
        if (res.status === 200) {
            dispatch({ type: "DROP" })
        }
    }
if (data.length === 0) {
    return <div className="d-flex justify-content-center">Empty cart</div>
}
let totalPrice = data.reduce((total, food) => total + food.price, 0);
return (<>
    <div className='container m-auto mt-5 table-responsive  table-responsive-sm table-responsive-md' >
        <table className='table table-hover '>
            <thead className=' text-success fs-4'>
                <tr>
                    <th scope='col' >#</th>
                    <th scope='col' >Name</th>
                    <th scope='col' >Quantity</th>
                    <th scope='col' >Option</th>
                    <th scope='col' >Amount</th>
                    <th scope='col' ></th>
                </tr>
            </thead>
            <tbody>
                {data.map((food, index) => (
                    <tr>
                        <th scope='row' >{index + 1}</th>
                        <td >{food.name}</td>
                        <td>{food.qty}</td>
                        <td>{food.size}</td>
                        <td>{food.price}</td>
                        <td ><button type="button" className="btn p-0" onClick={() => { dispatch({ type: "REMOVE", index }) }} >delete</button> </td></tr>
                ))}
            </tbody>
        </table>
        <div><h1 className='fs-2'>Total Price:{totalPrice}/-</h1></div>
        <div>
            <button className='btn bg-success mt-5 ' onClick={checkouthandler} > Check Out </button>
        </div>
    </div >
</>)
}
export default Cart;