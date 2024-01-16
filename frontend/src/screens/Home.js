import { useEffect, useState } from "react";
import Footer from "../Components/Footer";
import Navbar from "../Components/Navbar";
import Card from "../Components/Card";
const Home = () => {
    const [fooditem, setitem] = useState([]);
    const [search,setSearch]=useState('');
    const [foodCat, setCat] = useState([]);
    const loadData = async (req, res) => {
        let response = await fetch("http://localhost:5000/zom/foodData", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
            }
        });
        response = await response.json();
        setitem(response[0]);
        setCat(response[1]);
    }
    useEffect(() => {
        loadData()
    }, [])
    return (<>
        <Navbar></Navbar>
        <div>
            <div id="carouselExampleControls" className="carousel slide" data-bs-ride="carousel" style={{ objectFit: "contain !important" }} >
                <div className="carousel-inner" id="carousel">
                    <div className="carousel-caption" style={{ zIndex: '10' }}>
                        <div className="d-flex justify-content-center">
                            <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" value={search} onChange={(e) => { setSearch(e.target.value) }}></input>
                        </div>
                    </div>
                    <div className="carousel-item active">
                        <img src="https://source.unsplash.com/random/900*700/?burger" className="d-block w-100" alt="..." style={{ filter: "brightness(50%)", maxHeight: "550px", objectFit: "cover" }}></img>
                    </div>
                    <div className="carousel-item">
                        <img src="https://source.unsplash.com/random/900*700/?pizza" className="d-block w-100" alt="..." style={{ filter: "brightness(50%)", maxHeight: "550px", objectFit: "cover" }}></img>
                    </div>
                    <div className="carousel-item">
                        <img src="https://source.unsplash.com/random/900*700/?food" className="d-block w-100" alt="..." style={{ filter: "brightness(50%)", maxHeight: "550px", objectFit: "cover" }}></img>
                    </div>
                </div>
                <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleControls" data-bs-slide="prev">
                    <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                    <span className="visually-hidden">Previous</span>
                </button>
                <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleControls" data-bs-slide="next">
                    <span className="carousel-control-next-icon" aria-hidden="true"></span>
                    <span className="visually-hidden">Next</span>
                </button>
            </div>
        </div>
        <div className="row mb-3">
            {foodCat && foodCat.map(data => (
                <>
                    <div key={data._id} className="fs-3 m-3">{data.CategoryName}</div>
                    {fooditem && fooditem.filter(item => item.CategoryName === data.CategoryName && item.name.toLowerCase().includes(search.toLocaleLowerCase())).map(food => (
                        <>
                            <div key={food._id} className="col-12 col-md-6 col-lg-3" >
                                <Card key={food._id} fooditem={food} options={food.options[0]}></Card>
                            </div>
                        </>
                    ))}
                    <hr></hr>
                </>
            ))

            }
        </div>

        <Footer></Footer>
    </>)
}
export default Home;