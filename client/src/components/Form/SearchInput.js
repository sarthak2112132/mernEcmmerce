import React from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useSearch } from "../../context/search";
import { message } from "antd";
const SearchInput = () => {
  const [values, setValues] = useSearch();
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.get(
        `http://localhost:8000/api/products/search/${values.keyword}`
      );
      console.log(data);
      setValues({ ...values, results: data?.result });
      if (values) console.log(values);
      navigate("/search");
    } catch (error) {
      message.error("Something Went Wrong");
    }
  };
  return (
    <>
      <form
        className="form-inline flex gap-8"
        role="search"
        onSubmit={handleSubmit}
      >
        <input
          className="form-control mr-sm-2"
          style={{
            width: "25rem",
          }}
          type="search"
          placeholder="Search"
          aria-label="Search"
          value={values.keyword}
          onChange={(e) => setValues({ ...values, keyword: e.target.value })}
        />
        <button className="btn btn-outline-success my-2 my-sm-0" type="submit">
          Search
        </button>
      </form>
    </>
  );
};

export default SearchInput;
