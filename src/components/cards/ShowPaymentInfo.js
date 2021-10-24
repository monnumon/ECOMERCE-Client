import React from "react";


const ShowPaymentInfo = ({order, showStatus = true })  => (
    <div>
        <p>
            <span>Order Id: {order.paymentIntent.id } </span> {" /"}
            <span>Amount: {(order.paymentIntent.amount).toLocaleString('VND', {style: 'currency', currency: 'vnd'}) } </span>{"/ "}
            <span>Currency: {order.paymentIntent.currency.toUpperCase()} </span> {" /"}
            <span> Method: {order.paymentIntent.payment_method_types[0] } </span> {"/ "}
            <span> Payment: {order.paymentIntent.status.toUpperCase() } </span> {" /"}
            <span>Order on:  {" "} {new Date(order.createdAt).toLocaleDateString()} </span> {"/ "}
            <br/>
            {showStatus && (
                <span className="badge bg-primary text-white">
                STATUS: {order.orderStatus}
                </span>
            )}
        </p>    
    </div>
   
)

export default ShowPaymentInfo