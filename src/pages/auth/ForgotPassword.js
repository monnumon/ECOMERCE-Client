import React, {useState, useEffect} from "react";
import {auth} from "../../firebase";
import {toast} from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import { useSelector } from "react-redux";

const ForgotPassword = (history) => {
    const [email,setEmail] = useState('');
    const [loading, setLoading] = useState(false)

    const {user} = useSelector((state) => ({...state}))

    useEffect(()=>{
        if(user && user.token) history.push("/")
    },[user, history]);


    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        const config = {
            url: process.env.REACT_APP_FORGOT_PASSWORD_REDIRECT,
            handleCodeInApp: true,
        }


        await auth.sendPasswordResetEmail(email,config)
        .then(()=>{
            setEmail('')
            setLoading(false);
            toast.success('Check your email for password reset Link');
        }).catch((err) => {
            setLoading(false);
            toast.error(err.message);
        })

    }
    return <div className="container col-md-6 offset-md-3 p-5">
      {loading ?(
             <h4 className="text-danger">Loading...</h4>
             ) : ( 
            <h4>Lấy lại mật khẩu của bạn</h4>
       )}
       <form onSubmit={handleSubmit}>
            <input 
            type="email" 
            className="form-control"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Nhập Email của bạn"
            autoFocus
            />     
            <br/>   
            <button className="btn btn-outline-primary" disabled={!email}>
                Gửi
            </button>  
          
       </form>
    </div>
}

export default ForgotPassword


