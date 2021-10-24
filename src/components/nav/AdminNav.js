import React, {useState} from "react";
import {Link} from "react-router-dom"
import {Menu, Button} from 'antd'
import { 
   WalletOutlined,
   ShopOutlined, 
   GiftOutlined,
   KeyOutlined,
   ForkOutlined, } 
   from '@ant-design/icons';

const { SubMenu } = Menu;

const AdminNav = () =>  {

  const [current, setCurrent] = useState('')

  const handleClick = (e) => { 
    setCurrent(e.key);
  }

  return (

       <Menu
        onClick={handleClick}
        style={{ width: 256 }}
        SelectedKeys={[current]}
        defaultOpenKeys={['sub1', 'sub2', 'sub3', 'sub4', 'sub5']}
        mode="inline"
       
      >


        <SubMenu key="sub1" icon={<WalletOutlined />} title="Admin Dash Board">
          <Menu.Item>
            <Link to="/admin/dashboard" className="nav-link">
                Dashboard
            </Link>
          </Menu.Item>
        </SubMenu>

        <SubMenu key="sub2" icon={<ShopOutlined />} title="Product">
          <Menu.Item>
            <Link to="/admin/product" className="nav-link" style={{ textDecoration: 'none'}} >
                Create Product
          </Link>
          </Menu.Item>

          <Menu.Item>
            <Link to="/admin/products" className="nav-link">
                Products List
            </Link>
          </Menu.Item>
        </SubMenu>


        

        <SubMenu key="sub3" icon={<ForkOutlined />} title="Category">
          <Menu.Item>
            <Link to="/admin/category" className="nav-link">
                Manager Category
          </Link>
          </Menu.Item>

          <Menu.Item>
          <Link to="/admin/sub" className="nav-link">
              Manager Sub Category
         </Link>
          </Menu.Item>
        </SubMenu>


        <SubMenu key="sub4" icon={<GiftOutlined />} title="Coupon">
          <Menu.Item>
          <Link to="/admin/coupon" className="nav-link">
             Manager Coupon
          </Link>
          </Menu.Item>
        </SubMenu>

        <SubMenu key="sub4" icon={<KeyOutlined />} title="Password">
          <Menu.Item>
          <Link to="/user/password" className="nav-link">
            Change Password
          </Link>
          </Menu.Item>
        </SubMenu>
      </Menu>

  )
  
    //   <nav>
    //   <ul className="nav flex-column">
    //     <li className="nav-item">
    //       <Link to="/admin/dashboard" className="nav-link">
    //         DASHBOARD
    //       </Link>
    //     </li>
    
    //     <li className="nav-item">
    //       <Link to="/admin/product" className="nav-link">
    //         PRODUCT
    //       </Link>
    //     </li>
    
    //     <li className="nav-item">
    //         <Link to="/admin/products" className="nav-link">
    //           PRODUCTS
    //         </Link>
    //       </li>
    
    //     <li className="nav-item">
    //       <Link to="/admin/category" className="nav-link">
    //        CATEGORY
    //       </Link>
    //     </li>
    
    //     <li className="nav-item">
    //       <Link to="/admin/sub" className="nav-link">
    //        SUB CATEGORY
    //       </Link>
    //     </li>
    
    //     <li className="nav-item">
    //       <Link to="/admin/coupon" className="nav-link">
    //        COUPON
    //       </Link>
    //     </li>
    
    //     <li className="nav-item">
    //       <Link to="/user/password" className="nav-link">
    //         PASSWORD
    //       </Link>
    //     </li>
    //   </ul>
    // </nav>
    // );

}
export default AdminNav;

















