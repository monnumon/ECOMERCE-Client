import React from "react";
import {Link} from "react-router-dom"

const ProductListItems = ({ product }) => {
    const {price, category, subs, shipping, brand,color, quantity, sold} = product;
    return (
    <ul className="list-group list-group-flush">
      <li className="list-group-item">
        Price{" "}
        <span className="label label-default label-pill float-end">
           {price} VNĐ
        </span> 
      </li>

      {category && <li className="list-group-item">
        Category{" "}
        <Link to = {`/category/${category.slug}`}  className="label label-default label-pill float-end">
           {category.name}
        </Link> 
      </li>
      }

      {subs && (
          <li className="list-group-item">
              SubCategories
              {subs.map((s)=> 
               <Link 
               key={s._id}
               to = {`sub/${s.slug}}`}  
               className="label label-default label-pill float-end"
               >
                    {s.name}
               </Link>               
              )}  
        </li>
  
      )}
      
      <li className="list-group-item">
        Shipping{" "}
        <span className="label label-default label-pill float-end">
           {shipping}
        </span> 
      </li>

      <li className="list-group-item">
        Color{" "}
        <span className="label label-default label-pill float-end">
           {color} 
        </span> 
      </li>

      <li className="list-group-item">
        Brand{" "}
        <span className="label label-default label-pill float-end">
           {brand} 
        </span> 
      </li>

      <li className="list-group-item">
        Available{" "}
        <span className="label label-default label-pill float-end">
           {quantity} 
        </span> 
      </li>

      <li className="list-group-item">
        Sold{" "}
        <span className="label label-default label-pill float-end">
           {sold} 
        </span> 
      </li>
    </ul>
    )
}

export default ProductListItems;