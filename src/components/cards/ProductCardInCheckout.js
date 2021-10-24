import React from "react";
import ModalImage from "react-modal-image";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { CheckCircleFilled, CloseCircleOutlined, CloseOutlined } from "@ant-design/icons";



const ProductCardInCheckout = ({p}) => {

    const colors =  ["Black", "Brown", "Silver", "White", "Blue"]
    const dispatch = useDispatch();

    const handleQuantityChange = (e) => {


        let count = e.target.value < 1 ? 1:  e.target.value;
        
        
        if(count > p.quantity){
            toast.error(`Max available quantity: ${p.quantity}`)
            return;
        }

        let cart = []
        if(typeof window !== "undefined") {
            if(localStorage.getItem("cart")){
                cart = JSON.parse(localStorage.getItem("cart"))
            }
                cart.map((product, i) => {
                    if(product._id == p._id){
                        cart[i].count = count;
                    }
                })

                localStorage.setItem("cart", JSON.stringify(cart));
                dispatch({
                    type: "ADD_TO_CART",
                    payload: cart,
                })
        }
    }

    const handleRemove = () => {
        
        let cart = []
        if(typeof window !== "undefined") {
            if(localStorage.getItem("cart")){
                cart = JSON.parse(localStorage.getItem("cart"))
            }
             if (window.confirm("Remove this item from your Cart?")) {
                cart.map((product, i) => {
                    if(product._id === p._id){
                        cart.splice(i, 1) 
                    }
                })
            
                localStorage.setItem("cart", JSON.stringify(cart));     
                dispatch({
                    type: "ADD_TO_CART",
                    payload: cart,
                })   
            }
        }
    }





    return (
        <tbody>
            <tr>
                <td>
                    <div style={{width: "100px", height: "auto"}}>
                        {(<ModalImage small={p.images[0].url} large={p.images[0].url} />)}
                    </div>
                </td>
                <td> {p.title}</td> 
                <td> {p.price} Đ</td> 
                <td> {p.brand}</td> 
                <td> {p.color} </td> 
                <td className="text-center COUNT" >
                   
                        <input
                            type="number"
                            className="form-control"
                            value={p.count}
                            onChange={handleQuantityChange}
                        />
                   
                    </td>
                <td> {p.shipping === "Yes" ? ( 
                    <CheckCircleFilled className="text-success"  /> 
                    ) : (
                    <CloseCircleOutlined className="text-danger" /> 
                    )}
                </td>
                <td> 
                    <CloseOutlined className="text-danger pointer" onClick={handleRemove} />
                </td> 
            </tr>
        </tbody>
    )
}

export default ProductCardInCheckout 