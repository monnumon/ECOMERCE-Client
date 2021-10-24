import React, {useState} from "react";
import {Link} from "react-router-dom"
import {Menu, Button} from 'antd'
import { 
  
   AccountBookOutlined, 
   KeyOutlined,
   AntCloudOutlined, } 
   from '@ant-design/icons';

const { SubMenu } = Menu;


const UserNav = () => {

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
     <Menu.Item icon={<AccountBookOutlined />}>
        <Link to="/user/history" className="nav-link">HISTORY</Link>  
     </Menu.Item>

     
     <Menu.Item icon={<KeyOutlined />}>
       <Link to="/user/password" className="nav-link">PASSWORD</Link>    
     </Menu.Item>

     <Menu.Item icon={<AntCloudOutlined />} >
      <Link to="/user/wishlist" className="nav-link">WISHLIST</Link> 
     </Menu.Item>



  </Menu>




    // <nav>
    //  <ul className="nav flex-column">
    //    <li className="nav-item">
    //           <Link to="/user/history" className="nav-link">HISTORY</Link>  
    //         </li>

    //         <li className="nav-item">
    //           <Link to="/user/password" className="nav-link">PASSWORD</Link>   
    //         </li>

    //         <li className="nav-item">
    //           <Link to="/user/wishlist" className="nav-link">WISHLIST</Link>  
    //         </li>
    //     </ul>
    // </nav>
);
}

export default UserNav;