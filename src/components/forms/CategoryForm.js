import React from "react";


const CategoryForm = (props) =>( // chỗ này khai báo props để đẩy dữ liệu hoặc truyền tất cả những gì cần đẩy vào const CategoryForm = (handlerSubmit,name,setName) nếu đã truyền vào hết thì các element ở dưới không cần truyền props. nữa
    <form onSubmit={props.handleSubmit}> 
        <div className="form-group">
            <label></label>
            <input 
                type="text"
                className="form-control"       
                onChange={e =>props.setName(e.target.value)}
                value = {props.name}
                autoFocus
                required> 
            </input>
            <br/>
            <button className="btn btn-outline-primary">Save</button>
        </div>
    </form>
);
// const CategoryForm = ({ handleSubmit, name, setName }) => (
//     <form onSubmit={handleSubmit}>
//       <div className="form-group">
//         <label>Name</label>
//         <input
//           type="text"
//           className="form-control"
//           onChange={(e) => setName(e.target.value)}
//           value={name}
//           autoFocus
//           required
//         />
//         <br />
//         <button className="btn btn-outline-primary">Save</button>
//       </div>
//     </form>
//   );

export default CategoryForm;