import React, {useState,useEffect} from "react";
import {auth} from "../../firebase";
import {toast} from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
// import { async } from "@firebase/util";
import { useSelector } from "react-redux";




const Register = ({history}) =>{

    const [email, setEmail] = useState("");
    const {user} = useSelector((state) => ({...state}))

    useEffect(()=>{
        if(user && user.token) history.push("/")
    },[user,history]);
    const handleSubmit = async (e) => {
        e.preventDefault();
        //    console.log("ENV --->", process.env.REACT_APP_REGISTER_REDIRECT_URL);
        const config = {
            url: process.env.REACT_APP_REGISTER_REDIRECT_URL,
            handleCodeInApp: true,
        }

        await auth.sendSignInLinkToEmail(email, config)
        toast.success(`Email is sent to ${email}. Click the link to complete your registration`)

           //save email
           window.localStorage.setItem('emailForRegistration',email)
           setEmail("")
        
    };
 
  
    const registerForm = () =>(
     <form onSubmit={handleSubmit}> 
        <input 
        type="email" 
        className="form-control" 
        value={email} 
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Nhập email của bạn"
        autoFocus
        />
        <br/>
         <button type="submit" className="btn btn-outline-primary">
            Đăng ký
         </button>
    </form>
    );
    return(
        <div className="container p-5">
            <div className="row">
               <div className="col-md-6 offset-md-3">
               <h4>Đăng ký</h4>
             
                {registerForm()}
               
               </div>
            </div>
           
        </div>
    )
}

export default Register