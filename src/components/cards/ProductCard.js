import React, {useState} from "react";
import {Card, Tooltip} from "antd"
import { EyeOutlined, ShoppingCartOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import { showAverage } from "../../functions/rating";
import _ from "lodash"
import { useSelector, useDispatch } from "react-redux";


const { Meta } = Card;


const ProductCard = ({product}) => {

    const [tooltip,setTooltip] = useState("CLick to add")

    //redux
    const {user, cart} = useSelector((state) => ({...state}))
    const dispatch = useDispatch()

    const handleAddToCart = () => {
      let cart = [];
      if(typeof window !== "undefined") {
        //if cart is in  localStorage Get it
        if(localStorage.getItem('cart')){ // localStorage cho phép lưu trữ dữ liệu trên client của người dùng vd như lưu số hàng có trong giỏ hàng
          cart = JSON.parse(localStorage.getItem('cart')) // locaStorage chỉ nhận dữ liệu json
        }  
         // push new product to Cart
         cart.push({
           ...product,
           count: 1,
         })
         // remove duplicates
          let unique = _.uniqWith(cart, _.isEqual) 
         //save to local storage
       
         localStorage.setItem('cart', JSON.stringify(unique))
         console.log('unique', unique)
         // show Tooltip
         setTooltip("Added");

         //add to the redux store
         dispatch ({
           type: "ADD_TO_CART",
           payload: unique,
         });

         //show cart in side drawer
         dispatch ({
          type: "SET_VISIBLE",
          payload: true,
        });

      }
    }
    //destructions
    const { title, description, images, slug ,price } = product;


    return (  

   <>
      {product && product.ratings && product.ratings.length > 0  ? (
         showAverage(product)
       ) : (
       <div className="text-center pt-1 pb-3" > No Rating Yet </div> )}
    <Card
      cover={
        <img
          src={images && images.length ? images[0].url : ""}
          style={{ height: "150px", objectFit: "cover" }}
          className="p-1"
        />
      }
      actions={[
        <Link to={`/product/${slug}`}>
           <EyeOutlined className="text-warning" /> 
           <br/> View Product
        </Link>,

        <Tooltip title={tooltip}>
          <a onClick={handleAddToCart }  disabled={product.quantity < 1} >  
            <ShoppingCartOutlined className="text-danger"/>  <br/> 
            {product.quantity < 1 ? "Out of Stock": "Add to Cart"}
          </a>
        </Tooltip> ,
      ]}
    >
      <Meta
        title={`${title} - ${price} đ`}
        description={`${description && description.substring(0, 40)}...`}
      />
        </Card> 
  </>
    )
}


export default ProductCard;