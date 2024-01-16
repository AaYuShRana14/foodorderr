import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link} from "react-router-dom";
const Signup = () => {
    let navigate=useNavigate();
    const[credentials,setcredentials]=useState({name:"",email:"",password:"",geolocation:"",age:""});
    const changeHandler=(e)=>{
        setcredentials({...credentials,[e.target.name]:e.target.value});
    }
    const submitHandler=async(e)=>{
        e.preventDefault();
        const res=await fetch('http://localhost:5000/zom/createuser',{
            method:'POST',
            headers:{
                'Content-Type': 'application/json',
            },
            body:JSON.stringify({name:credentials.name,age:credentials.age,password:credentials.password,email:credentials.email,location:credentials.geolocation})
        });
        let json=await res.json();
        if(!json.success){
            alert('enter valid credentials');
        }
        navigate('/login');
    }
    return (<>
        <div className="container">
            <form onSubmit={submitHandler}>
                <div className="mb-3">
                    <label htmlFor="name" className="form-label">Name</label>
                    <input type="text" id="name" className="form-control" name="name" value={credentials.name} onChange={changeHandler}></input>
                </div>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email</label>
                    <input type="email" id="email" className="form-control" name="email" value={credentials.email} onChange={changeHandler}></input>
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">password</label>
                    <input type="password" id="password" className="form-control" name="password" value={credentials.password} onChange={changeHandler}></input>
                </div>
                <div className="mb-3">
                    <label htmlFor="geolocation" className="form-label">Address</label>
                    <input type="text" id="geolocation" className="form-control" name="geolocation" value={credentials.geolocation} onChange={changeHandler}></input>
                </div>
                <div className="mb-3">
                    <label htmlFor="age" className="form-label">Age</label>
                    <input type="text" id="age" className="form-control" name="age" value={credentials.age} onChange={changeHandler}></input>
                </div>
                <button type="submit" className="btn btn-primary">Submit</button>
                <Link to='/login' className="m-3 btn btn-primary">Already a user</Link>
            </form>
        </div>
    </>)
}
export default Signup;