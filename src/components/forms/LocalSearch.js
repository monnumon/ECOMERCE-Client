import React from "react";

const LocalSearch = ({keyword, setKeyword}) =>{
    const handleSearchChange = (e) =>{
        e.preventDefault();
        setKeyword(e.target.value.toLowerCase());
    };
    return (
       <div className="pb-4">
        <input 
            type="search" 
            placeholder="Filter by Name"
            value={keyword}
            onChange={handleSearchChange}
            className="form-control md-4"/>
       </div>
    )
}

export default LocalSearch;