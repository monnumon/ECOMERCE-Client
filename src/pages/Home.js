import React  from "react";
import { getProducts} from "../functions/product";
import ProductCard from "../components/cards/ProductCard";
import Jumbotron from "../components/cards/Jumbotron";
import LoadingCard from "../components/cards/LoadingCard";
import NewArrivals from "../components/home/NewArrivals";
import BestSellers from "../components/home/BestSellers";
import CategoryList from "../components/category/CategoryList";
import SubList from "../components/sub/SubList";




const Home = () =>{
    return (
    <>
    
    <div className="container-fluid text-sm-center p-5 bg-light text-danger h1 font-weight-bold"> 
            <Jumbotron text={['Lastet Product','New Arrival', 'Best Seller']} />
    </div>
        <br/>
        <br/>
    <h4 className="container-fluid text-sm-center p-3 bg-light  font-weight-bold" > 
        New Arrivals
    </h4>
        <br/>
        <br/>
        <NewArrivals/>
    
    <h4 className="container-fluid text-sm-center p-3 bg-light  font-weight-bold" > 
        Best Seller
    </h4>
        <br/>
        <br/>
        <BestSellers/>

    <h4 className="container-fluid text-sm-center p-3 bg-light  font-weight-bold" > 
        Categoies
    </h4>
        <br/>
        <br/>
        <CategoryList/>

    <h4 className="container-fluid text-sm-center p-3 bg-light  font-weight-bold" > 
        Subs Category
    </h4>
        <br/>
        <br/>
        <SubList/>

    
    </>
    )
}

export default Home;