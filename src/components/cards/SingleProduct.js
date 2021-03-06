import React, {useState} from "react";
import {Card, Tabs, Tooltip} from "antd"
import {Link} from "react-router-dom"
import { HeartOutlined, ShoppingCartOutlined } from "@ant-design/icons";
import { Carousel } from 'react-responsive-carousel';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import ProductListItems from './ProductListItems'
import StarRating from "react-star-ratings";
import RatingModal from "../modal/RatingModal";
import { showAverage } from "../../functions/rating";
import _ from "lodash"
import { useSelector, useDispatch } from "react-redux";
import {addToWishlist} from "../../functions/user"
import { toNamespacedPath } from "path";
import {toast} from 'react-toastify'
import { useHistory } from "react-router-dom";


const {TabPane} = Tabs;




const SingleProduct = ({product, onStarClick, star}) => {

    const [tooltip,setTooltip] = useState("CLick to add")

    const {user, cart} = useSelector((state) => ({...state}))
    const dispatch = useDispatch()
    let history = useHistory();
    const {title, images, description, _id} = product;

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

           dispatch ({
            type: "SET_VISIBLE",
            payload: true,
          });
  
  
        }
      }

      const handleAddToWishlist = (e) => {
        e.preventDefault();
         addToWishlist(product._id, user.token).then((res) => {
          console.log("ADDED TO WISHLIST", res.data);
          toast.success("Added to wishlist");
          history.push("/user/wishlist");
      })
    }

    

    return (
        <>
            <div className="col-md-7">
                <Carousel showArrows={true} autoPlay infiniteLoop >
                    {images && images.map((i) => <img src={i.url} key={i.public_id} />)}
                </Carousel>

                <Tabs type = "card">
                    <TabPane tab="Description" key ="1">
                        {description && description}
                    </TabPane>

                    <TabPane tab="More" key ="2">
                       Call me baby.
                    </TabPane>
                </Tabs>
            </div>

            <div className="col-md-5">
                <h1 className="bg-info p-3">{title}</h1>
                {product && product.ratings && product.ratings.length > 0
                    ? showAverage(product)
                         : <div className="text-center pt-1 pb-3" > No Rating Yet </div>}
                
               <Card  
                 actions = {[
                    <Tooltip title={tooltip}>
                    <a onClick={handleAddToCart}>
                      <ShoppingCartOutlined className="text-danger" /> <br /> Add to
                      Cart
                    </a>
                  </Tooltip>,
                  <a onClick={handleAddToWishlist}>
                    <HeartOutlined className="text-info" /> <br /> Add to Wishlist
                  </a>,
                    <RatingModal>
                    <StarRating 
                        name={_id}
                        numberOfStars={5}
                        rating={star}
                        changeRating={onStarClick}
                        isSelectable={true}
                        starRatedColor="red"
                    />
                    </RatingModal>
                ]}
                >
                    <ProductListItems product={product} />
               </Card>
            </div>
        </>
    )
}

export default SingleProduct;


