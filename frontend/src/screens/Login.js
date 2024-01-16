import { useState} from "react";
import { Link,useNavigate } from "react-router-dom";
const Login = () => {
    let navigate=useNavigate();
    const [credentials, setcredentials] = useState({ email: "", password: "" });
    const submitHandler = async (e) => {
        e.preventDefault();
        const res = await fetch('http://localhost:5000/zom/loginuser', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ password: credentials.password, email: credentials.email }),
        });
        const json = await res.json();
        console.log(json);
        if (!json.success) {
            alert('enter valid credentials')
        }
        
        else{
            localStorage.setItem("authtoken",json.authtoken);
            localStorage.setItem("userEmail",credentials.email);
            navigate("/");
        }
        
        
    }
    const changeHandler = (event) => {
        setcredentials({ ...credentials, [event.target.name]: event.target.value });
    }
    return <>
        <div className="container">
            <form onSubmit={submitHandler}>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email</label>
                    <input type="email" id="email" className="form-control" name="email" value={credentials.email} onChange={changeHandler}></input>
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">password</label>
                    <input type="password" id="password" className="form-control" name="password" value={credentials.password} onChange={changeHandler}></input>
                </div>
                <button type="submit" className="btn btn-primary">Submit</button>
                <Link to='/signup' className="m-3 btn btn-primary">New user</Link>
            </form>
        </div>
    </>
}
export default Login;