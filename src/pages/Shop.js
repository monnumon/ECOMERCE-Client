import React, {useState, useEffect} from 'react';
import {getProductsByCount, fetchProductsByFilter   } from '../functions/product'
import {useSelector, useDispatch} from "react-redux"
import ProductCard from '../components/cards/ProductCard'
import {getAllCategories} from '../functions/category'
import {getAllSubs} from '../functions/sub'
import {Menu, Slider, Checkbox, Radio} from 'antd'
import { DollarOutlined, DownSquareOutlined, StarOutlined } from '@ant-design/icons';
import Star from "../components/forms/Star";
import {isEmpty, isEqual } from "lodash";

const {SubMenu, ItemGroup}  = Menu

const Shop = () =>{

    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(false);
    const [price, setPrice] = useState([0, 0]);
    const [ok, setOk] = useState(false);
    const [categories, setCategories] = useState([]);
    const [subs, setSubs] = useState([])
    const [categoryIds, setCategoryIds] = useState([]);
    const [subIds, setSubIds] = useState([]);
    const [star, setStar] = useState('');
    const [sub, setSub] = useState("");
    const [brands, setBrands] = useState([
      "Apple",
      "Samsung",
      "Microsoft",
      "Lenovo",
      "ASUS",
    ]);
    const [brand, setBrand] = useState("");
    const [colors, setColors] = useState([
      "Black",
      "Brown",
      "Silver",
      "White",
      "Blue",
    ]);
    const [color, setColor] = useState("");
    const [shipping, setShipping] = useState("");


    let dispatch = useDispatch();
    let { search } = useSelector((state) => ({ ...state }));
    const { text } = search;

 
    
    console.log('price', price);
    console.log('shipping', shipping);

    useEffect(() => {
      loadAllProducts();
      // fetch categories
      getAllCategories().then((res) => setCategories(res.data));
      // fetch subcategories
      getAllSubs().then((res) => setSubs(res.data));
    }, []);
    // search agr

    const fetchProducts = (arg) => {
        fetchProductsByFilter(arg).then((res) => {
          setProducts(res.data);
        });
      };
    

    //1. load product on page by default
    const loadAllProducts = () => {
        getProductsByCount(12).then((p) => {
          setProducts(p.data);
          setLoading(false);
        });
      };
    

    //2. Load proudct on user search input
    useEffect(() => {
        const delayed = setTimeout(() => {
          fetchProducts({ query: text });
          if(!text) {
            loadAllProducts();
          }
        }, 300);
        return () => clearTimeout(delayed);
      }, [text]);
     

   //3. load product based on price range
   useEffect(() => {
    // console.log("ok to request");
    fetchProducts({ price });
  }, [ok]);
  
  const handleSlider = (value) => {
    dispatch({
      type: "SEARCH_QUERY",
      payload: { text: "" },
    });

    //reset
    setCategoryIds([]);
    setPrice(value);
    setStar("")
    setSub('')
    setTimeout(() => {
      setOk(!ok);
    }, 300);
  };
    

    //4. load product based on category
    //Show categories in a list of checkbox
    const showCategories = () =>
         categories.map((c) => (
            <div key={c._id}>
                <Checkbox 
                    onChange={handleCheck}
                    className="pb-2 pl-4 pr-4" 
                    value={c._id}
                    name="category"
                    checked={categoryIds.includes(c._id)}
                > 
                    {c.name} 
               </Checkbox>
               <br/>
            </div>
         ))

    // handleCheck for categories
    const handleCheck = (e) => {
        dispatch({
          type: "SEARCH_QUERY",
          payload: { text: "" },
        });
        setStar("")
        setPrice([0, 0]);
        // console.log(e.target.value);
        let inTheState = [...categoryIds];
        let justChecked = e.target.value;
        let foundInTheState = inTheState.indexOf(justChecked); // index or -1
    
        // indexOf method ?? if not found returns -1 else return index [1,2,3,4,5]
        if (foundInTheState === -1) {
          inTheState.push(justChecked);
        } else {
          // if found pull out one item from index
          inTheState.splice(foundInTheState, 1);
        }
    
        setCategoryIds(inTheState);
        // console.log(inTheState);
        fetchProducts({ category: inTheState });
      };

    //5. show products by star

       const handleStarClick = (num) => {
        // dispatch({
        //   type: "SEARCH_QUERY",
        //   payload: { text: "" },
        // });
        // setPrice([0, 0]);
        // setCategoryIds([])
        setStar(num)
        fetchProducts({stars: num}); 
       } 

       const showStar = () => (
         <div className="pr-4 pl-4 pb-2"> 
            <Star  starClick={handleStarClick}  numberOfStars={5} />
            <Star  starClick={handleStarClick}  numberOfStars={4} />
            <Star  starClick={handleStarClick}  numberOfStars={3} />
            <Star  starClick={handleStarClick}  numberOfStars={2} />
            <Star  starClick={handleStarClick}  numberOfStars={1} />
         </div>
       )

       //6. Show product by Sub category
      
       const showSubs = () =>
       subs.map((s) => (
        <div key={s._id}>
        <Checkbox 
            onChange={handleSubCheck}
            className="pb-2 pl-4 pr-4" 
            value={s._id}
            name="sub"
            checked={subIds.includes(s._id)}
        > 
            {s.name} 
       </Checkbox>
       <br/>
    </div>
       ));
   
       const handleSubCheck = (e) => {
        dispatch({
          type: "SEARCH_QUERY",
          payload: { text: "" },
        });
        setStar("")
        setPrice([0, 0]);
        // console.log(e.target.value);
        let inTheState = [...subIds];
        let justChecked = e.target.value;
        let foundInTheState = inTheState.indexOf(justChecked); // index or -1
    
        // indexOf method ?? if not found returns -1 else return index [1,2,3,4,5]
        if (foundInTheState === -1) {
          inTheState.push(justChecked);
        } else {
          // if found pull out one item from index
          inTheState.splice(foundInTheState, 1);
        }
    
        setSubIds(inTheState);
        // console.log(inTheState);
        fetchProducts({ sub: inTheState });
      };  
   

      // 7. show products based on brand name
  const showBrands = () =>
  brands.map((b) => (
    <Radio
      value={b}
      name={b}
      checked={b === brand}
      onChange={handleBrand}
      className="pb-1 pl-4 pr-4"
    >
      {b}
    </Radio>
  ));

const handleBrand = (e) => {
  setSub("");
  dispatch({
    type: "SEARCH_QUERY",
    payload: { text: "" },
  });
  // setPrice([0, 0]);
  // setCategoryIds([]);
  // setStar("");
  setBrand(e.target.value);
  fetchProducts({ brand: e.target.value });
};


const showColors = () =>
colors.map((c) => (
  <Radio
    value={c}
    name={c}
    checked={c === color}
    onChange={handleColor}
    className="pb-1 pl-4 pr-4"
  >
    {c}
  </Radio>
));

const handleColor = (e) => {
setSub("");
dispatch({
  type: "SEARCH_QUERY",
  payload: { text: "" },
});
// setPrice([0, 0]);
// setCategoryIds([]);
// setStar("");
// setBrand("");
setColor(e.target.value);
// setShipping("");
fetchProducts({ color: e.target.value });
};


// 9. show products based on shipping yes/no
const showShipping = () => (
  <>
    <Checkbox
      className="pb-2 pl-4 pr-4"
      onChange={handleShippingchange}
      value="Yes"
      checked={shipping === "Yes"}
    >
      Yes
    </Checkbox>

    <Checkbox
      className="pb-2 pl-4 pr-4"
      onChange={handleShippingchange}
      value="No"
      checked={shipping === "No"}
    >
      No
    </Checkbox>
  </>
);

const handleShippingchange = (e) => {
  setSub("");
  dispatch({
    type: "SEARCH_QUERY",
    payload: { text: "" },
  });
  setPrice([0, 0]);
  setCategoryIds([]);
  setStar("");
  setBrand("");
  setColor("");
  setShipping(e.target.value);
  fetchProducts({ shipping: e.target.value });
};


    return (
        <div className="container-fluid">
        <div className="row">
          <div className="col-md-3 pt-2">
            <h4>Search/Filter</h4>
            <hr />
  
            <Menu defaultOpenKeys={["1", "2", "3", "4", "5", "6", "7", "8"]} mode="inline">
              price
              <SubMenu
                key="1"
                title={
                  <span className="h6">
                    <DollarOutlined /> Price
                  </span>
                }
              >
                <div>
                  <Slider
                    className="ml-4 mr-4"
                    tipFormatter={(v) => `${v} VNĐ`}
                    range
                    value={price}
                    onChange={handleSlider}
                    max="50000000"
                  />
                </div>
              </SubMenu>
  
              {/* category */}
              <SubMenu
                key="2"
                title={
                  <span className="h6">
                    <DownSquareOutlined /> Categories
                  </span>
                }
              >
                <div style={{ maringTop: "-10px" }}>{showCategories()}</div>
              </SubMenu>

                  {/* star */}
              <SubMenu
                key="3"
                title={
                  <span className="h6">
                    <StarOutlined /> Rating
                  </span>
                }
                
              >
                <div style={{ maringTop: "-10px" }}>{showStar()}</div>
              </SubMenu>


                {/* sub category */}
             <SubMenu
              key="4"
              title={
                <span className="h6">
                  <DownSquareOutlined /> Sub Category
                </span>
              }
            >
              <div style={{ maringTop: "-10px" }} className="pl-4 pr-4">
                {showSubs()}
              </div>
            </SubMenu>

            <SubMenu
              key="5"
              title={
                <span className="h6">
                  <DownSquareOutlined /> Brands
                </span>
              }
            >
              <div style={{ maringTop: "-10px" }} className="pr-5">
                {showBrands()}
              </div>
            </SubMenu>


            
            {/* colors */}
            <SubMenu
              key="6"
              title={
                <span className="h6">
                  <DownSquareOutlined /> Colors
                </span>
              }
            >
              <div style={{ maringTop: "-10px" }} className="pr-5">
                {showColors()}
              </div>
            </SubMenu>

              {/* shipping */}
              <SubMenu
              key="7"
              title={
                <span className="h6">
                  <DownSquareOutlined /> Shipping
                </span>
              }
            >
              <div style={{ maringTop: "-10px" }} className="pr-5">
                {showShipping()}
              </div>
            </SubMenu>
       

            </Menu>
          </div>
  
          <div className="col-md-9 pt-2">
            {loading ? (
              <h4 className="text-danger">Loading...</h4>
            ) : (
              <h4 className="text-danger">Products</h4>
            )}
  
            {products.length < 1 && <p>No products found</p>}
  
            <div className="row pb-5">
              {products.map((p) => (
                <div key={p._id} className="col-md-4 mt-3">
                  <ProductCard product={p} />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    )
 
}

export default Shop;
