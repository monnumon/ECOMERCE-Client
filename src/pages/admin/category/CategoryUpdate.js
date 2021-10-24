import React , {useState,useEffect} from "react";
import AdminNav from '../../../components/nav/AdminNav';
import { toast } from "react-toastify";
import {useSelector} from 'react-redux'
import {
    getCategory,
    updateCategory,
   
} from "../../../functions/category"
import CategoryForm from "../../../components/forms/CategoryForm"



// import {useParams} from 'react-router-dom'

const CategoryUpdate = ({history, match}) => {
    const {user} = useSelector(state =>({ ...state }));

    const [name,setName] = useState('');
    const [loading,setLoading] = useState(false);
   

     

    useEffect(() => {
        loadCategory();
      }, []);

 const loadCategory = () =>
      getCategory(match.params.slug).then((c) => setName(c.data.name));


// const loadCategories = () => 
//       getCategory().then(c => setCategories(c.data));

    const handleSubmit = (e) => {
        e.preventDefault();
        // console.log(name)
        setLoading(true);
        updateCategory(match.params.slug, {name}, user.token)
        .then((res) => {
            setLoading(false)
            setName('')
            toast.success(` "${res.data.name}" is updated`)
            history.push("/admin/category");
          
        }).catch((err) => {
            setLoading(false)
            if(err.response.status=== 400) toast.error(err.response.data)
        })
    }

  


    return (
        <div className="container-fluid">
        <div className="row">
            <div className="col-md-2">
                <AdminNav/>
            </div>
            <div className="col-md-10 p-5">
                 {loading? <h4 className="text-danger" >Loading...</h4> : <h4>Sửa Danh Mục</h4> }
                 <CategoryForm 
                    handleSubmit={handleSubmit} 
                    name={name}
                    setName = {setName}
                    />
                 <hr/>
                  
            </div>
        </div>
    </div>
    )
}

export default CategoryUpdate;