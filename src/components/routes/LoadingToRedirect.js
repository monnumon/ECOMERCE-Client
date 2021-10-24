import React, {useState,useEffect}  from "react";
import { useHistory } from "react-router-dom";

const LoadingToRedirect = () =>{
    const [count, setCount] = useState(5)
    let history = useHistory()
    useEffect (() => {
        const interval = setInterval(()=> {
            setCount((currentCount) => --currentCount);
        }, 1000);
        //redirect once count is equal to 0
        count === 0 && history.push('/')
        return () => clearInterval(interval)
    }, [count,history]);

        return(
            <div className="contianer p-5 text-center">
                <p>Chuyển hướng bạn trong {count} giây </p>
            </div>
        );
};

export default LoadingToRedirect;
