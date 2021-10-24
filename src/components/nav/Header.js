import React, { useState } from "react";
import { Menu, Badge } from "antd";
import {
  HomeFilled,
  SettingOutlined,
  UserOutlined,
  UserAddOutlined,
  PoweroffOutlined,
  ShopOutlined,
  ShoppingCartOutlined,
} from "@ant-design/icons";

import {Link} from 'react-router-dom';
import firebase from "firebase/compat/app";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import Search from "../forms/Search";

const { SubMenu, Item } = Menu;


const Header = () => {
  const [current, setCurrent] = useState("home");
  let dispatch = useDispatch();
  let {user, cart} = useSelector((state) => ({...state}))


  let history = useHistory();

  const handleClick = (e) => {
    // console.log(e.key);
    setCurrent(e.key);
  };

  const logout = () => {
    firebase.auth().signOut();
    dispatch({
      type: "LOGOUT",
      payload: null,
    })
    history.push('/login')
  }

  return (
    

    <Menu onClick={handleClick} selectedKeys={[current]} mode="horizontal">
      
      
      <Item key="home" icon={<HomeFilled />} className="float-end" >
         <Link to="/">Home</Link>
      </Item>
    
          

      <Item key="shop" icon={<ShopOutlined />} >
         <Link to="/shop">Shop</Link>
      </Item>

      
      <Item key="cart" icon={<ShoppingCartOutlined />} >
         <Link to="/cart">
           <Badge count={cart.length} offset={[9, 0]} >
              Cart
           </Badge>
         </Link>
      </Item>



      <Item key="search" className="p-1 search" style={{ marginLeft: 'auto' }}>
          <Search />
      </Item>
      


      {user && (
        <SubMenu 
          className="submenu-profile"
          key = "submenu" 
          icon={<SettingOutlined />} 
          title= {user.email && user.email.split('@')[0]} 
        >
            
           {user && user.role === 'subscriber' &&  (
            <Item>
              <Link to='/user/dashboard'>Dashboard</Link>
            </Item>
            )}


           {user && user.role === 'admin' &&  (
            <Item>
              <Link to='/admin/dashboard'>Dashboard</Link>
            </Item>
            )}
         
            <Item icon={<PoweroffOutlined />} onClick={logout}>
              Sign out
            </Item>

            </SubMenu>
            )}
            
            {!user && (
              <Item key="login" icon={<UserOutlined />} className="float-right" >
                <Link to="/login">Login</Link>
              </Item>
            )}
            
            {!user && (
              <Item key="register" icon={<UserAddOutlined />} className="float-right">
                <Link to="/register">Register</Link>
              </Item>
            )}

          
    
            
    </Menu>
    
    
  );
};


export default Header;
