import React from "react";
import UserNav from "../../components/nav/UserNav"


const UserDashboard = () => {


    return (
        <div className="container-fluid">
        <div className="row">
          <div className="col-md-2">
            <UserNav />
          </div>
  
          <div className="col">
          
              <h4>User Dashboard</h4>
          
          </div>
        </div>
      </div>
 )
}

export default UserDashboard;