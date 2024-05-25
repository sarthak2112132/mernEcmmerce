import React, { useEffect, useState } from "react";
import Layout from "../../components/Layout/Layout";
import AdminMenu from "../../components/Layout/AdminMenu";
import { message, Select } from "antd";
import { useNavigate } from "react-router-dom";
import axios from "axios";
const { Option } = Select;
const CreateProduct = () => {
  const [Categories, setCategories] = useState([]);
  const [name, setname] = useState("");
  const [category, setcategory] = useState("");
  const [description, setdescription] = useState("");
  const [price, setprice] = useState("");
  const [quantity, setquantity] = useState("");
  const [shipping, setshipping] = useState("");
  const [photo, setphoto] = useState("");
  const navigate = useNavigate();
  //get category
  const getCategory = async () => {
    try {
      let response = await fetch(
        `http://localhost:8000/api/category/get-category`,
        {
          method: "get",
        }
      );
      response = await response.json();
      if (response?.success) {
        setCategories(response?.category);
      } else {
        message.error(response.message);
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getCategory();
  }, []);
  //create product
  const handleCreate = async (e) => {
    e.preventDefault();
    try {
      const productData = new FormData();
      productData.append("name", name);
      productData.append("description", description);
      productData.append("price", price);
      productData.append("quantity", quantity);
      productData.append("category", category);
      productData.append("photo", photo);
      const { data } = await axios.post(
        "http://localhost:8000/api/products/create-product",
        productData
      );
      if (data?.success) {
        message.success("Product Created SuccessFully");
        navigate(`/dashboard/admin/products`);
      } else {
        message.error(data.message);
      }
    } catch (error) {
      console.log(error);
      message.error("Something Went Wrong");
    }
  };
  return (
    <>
      <Layout>
        <div className="container-fluid m-3 p-4">
          <div className="row ">
            <div className="col-md-3">
              <AdminMenu />
            </div>
            <div className="col-md-9 lg:pl-8 lg:font-bold lg:text-2xl font-bold">
              Create Products
              <div className="m-1 w-75">
                <Select
                  bordered={false}
                  placeholder="Select a Category"
                  showSearch
                  className="form-select mb-3"
                  size="large"
                  onChange={(value) => {
                    setcategory(value);
                  }}
                >
                  {Categories.map((item) => {
                    return (
                      <>
                        <Option key={item._id} value={item._id}>
                          {item.name}
                        </Option>
                      </>
                    );
                  })}
                </Select>
                <div className="mb-3">
                  <label className="btn btn-outline-secondary col-md-12">
                    {photo ? photo.name : "Upload Photo"}
                    <input
                      type="file"
                      name="photo"
                      accept="image/*"
                      onChange={(e) => setphoto(e.target.files[0])}
                      hidden
                    />
                  </label>
                </div>
                <div className="mb-3">
                  {photo && (
                    <div className="flex justify-center align-items-center">
                      <img
                        src={URL.createObjectURL(photo)}
                        alt="..."
                        className="img img-responsive"
                      />
                    </div>
                  )}
                </div>
                <div className="mb-3">
                  <input
                    type="text"
                    placeholder="Write Name"
                    value={name}
                    onChange={(e) => setname(e.target.value)}
                    className="form-control"
                    required
                  />
                </div>
                <div className="mb-3">
                  <textarea
                    rows="3"
                    placeholder="Write Description"
                    value={description}
                    onChange={(e) => setdescription(e.target.value)}
                    className="form-control"
                  ></textarea>
                </div>
                <div className="mb-3">
                  <input
                    type="number"
                    placeholder="Write Price"
                    value={price}
                    onChange={(e) => setprice(e.target.value)}
                    className="form-control"
                  />
                </div>
                <div className="mb-3">
                  <input
                    type="number"
                    placeholder="Write Quantity"
                    value={quantity}
                    onChange={(e) => setquantity(e.target.value)}
                    className="form-control"
                  />
                </div>
                <div className="mb-3">
                  <Select
                    bordered={false}
                    placeholder="Select Shipping"
                    showSearch
                    className="form-select mb-3"
                    size="large"
                    onChange={(value) => {
                      setshipping(value);
                    }}
                  >
                    <Option value="0"> No</Option>
                    <Option value="1">Yes</Option>
                  </Select>
                </div>
                <div className="mb-3">
                  <button className="btn btn-primary" onClick={handleCreate}>
                    CREATE PRODUCT
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Layout>
    </>
  );
};

export default CreateProduct;
