import React , {useState,useEffect} from "react";
import AdminNav from '../../../components/nav/AdminNav';
import { toast } from "react-toastify";
import {useSelector} from 'react-redux'
import {
    createSub,
    getAllSubs,
    removeSub,
} from "../../../functions/sub"
import {Link} from "react-router-dom"
import {EditOutlined, DeleteOutlined} from "@ant-design/icons"
import CategoryForm from "../../../components/forms/CategoryForm"
import LocalSearch from "../../../components/forms/LocalSearch"
import { getAllCategories } from "../../../functions/category";
const SubCreate = () => {
    const {user} = useSelector(state =>({...state}));

    const [name,setName] = useState('');
    const [loading,setLoading] = useState(false);
    const [categories, setCategories] = useState([]);
    const [category, setCategory] = useState("")
    const [subs,setSubs] = useState([])

    //search 
    //step 1 key word
    const [keyword,setKeyword] = useState("");
    



    useEffect(() =>{
        loadCategories();
        loadSubs();
    },[])

const loadCategories = () => 
    getAllCategories().then((c) => setCategories(c.data));

const loadSubs = () => 
    getAllSubs().then((s) => setSubs(s.data));

    const handleSubmit = (e) => {
        e.preventDefault();
        // console.log(name)
        setLoading(true);
        createSub({name, parent: category}, user.token)
        .then((res) => {
            setLoading(false)
            setName('')
            toast.success(` "${res.data.name}" is create`)
            loadSubs();
            
        }).catch((err) => {
            setLoading(false)
            if(err.response.status=== 400) toast.error(err.response.data)
        })
    }

    const handlerRemove = async (slug) =>{
        if(window.confirm('Bạn có chắc là bạn muốn xóa ?')){
            setLoading(true)
            removeSub(slug, user.token)
            .then((res) => {
                setLoading(false)
                toast.success(`Đã xóa ${res.data.name}`)
                loadSubs();
            })
            .catch((err) => {
                setLoading(false)
                if(err.response.status=== 400) toast.error(err.response.data)     
            }) 
        }
    }

    /// step 3 search 
    
    /// step 4 search 
    const searched = (keyword) => (c) => c.name.toLowerCase().includes(keyword);

    return (
        <div className="container-fluid">
          <div className="row">
            <div className="col-md-2">
                <AdminNav />
            </div>
            <div className="col-md-10 p-5">
                 {loading ? (
                <h4 className="text-danger">Loading..</h4>
              ) : (
                <h4>Create Sub Category</h4>
              )}

                    <div className="form-group">
                        <label> Category</label>
                        <br/>
                        <select
                         name="category"
                         className="form-control" 
                         onChange={e => setCategory(e.target.value)}
                         >
                        <option>Please Select Category</option>
                          {categories.length > 0 && 
                             categories.map((c) => (
                             <option key={c._id} value={c._id}>
                                 {c.name}
                             </option> ))}
                        </select>
                    </div>
                    <CategoryForm 
                        handleSubmit={handleSubmit} 
                        name={name}
                        setName = {setName}
                    />
                    <br/>
                    <hr/>
                    {/* Step 2 search */}
                    <LocalSearch 
                         keyword= {keyword} 
                         setKeyword= {setKeyword}
                    />
            
              {/* Step 5 */}

              {subs.filter(searched(keyword)).map((s) => (
                <div className="alert alert-secondary" key={s._id}>
                  {s.name}
                  <span
                    onClick={() => handlerRemove(s.slug)}
                    className="btn btn-md float-end"
                  >
                    <DeleteOutlined className="text-danger" />
                  </span>
                  <Link to={`/admin/sub/${s.slug}`}>
                    <span className="btn btn-md float-end">
                      <EditOutlined className="text-warning" />
                    </span>
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </div>
      );
}

export default SubCreate;