import React, { useState, useEffect } from "react";
import Layout from "../../components/Layout/Layout";
import AdminMenu from "../../components/Layout/AdminMenu";
import { message, Modal } from "antd";
// import axios from "axios";
import CategoryForm from "../../components/Form/CategoryForm";
const CreateCategory = () => {
  const [category, setcategory] = useState([]);
  const [name, setname] = useState("");
  const [visible, setvisible] = useState(false);
  const [selected, setSelected] = useState(null);
  const [updatedName, setUpdatedName] = useState("");
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      let response = await fetch(
        `http://localhost:8000/api/category/create-category`,
        {
          method: "post",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ name }),
        }
      );
      response = await response.json();
      if (response?.success) {
        message.success(`${response.category.name} is created`);
        getCategory();
      } else {
        message.error(response.message);
      }
    } catch (error) {
      console.log(error);
    }
  };
  const getCategory = async () => {
    try {
      let response = await fetch(
        `http://localhost:8000/api/category/get-category`,
        {
          method: "get",
        }
      );
      response = await response.json();
      if (response.success) {
        setcategory(response.category);
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
  //update
  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      let data = await fetch(
        `http://localhost:8000/api/category/update-category/${selected._id}`,
        {
          method: "post",
        }
      );
      data = await data.json();
      console.log(data);
      if (data.success) {
        message.success(data.message);
        setvisible(false);
        setSelected(null);
        setUpdatedName("");
        getCategory();
      } else {
        message.error(data.message);
      }
    } catch (error) {
      message.error("Something Went Wrong");
    }
  };
  const handleDelete = async (piD) => {
    try {
      let data = await fetch(
        `http://localhost:8000/api/category/delete-category/${piD}`,
        {
          method: "delete",
        }
      );
      data = await data.json();
      console.log(data);
      if (data.success) {
        message.success(data.message);
        getCategory();
      } else {
        message.error(data.message);
      }
    } catch (error) {
      message.error("Something Went Wrong");
    }
  };
  return (
    <>
      <Layout>
        <div className="container-fluid m-3 p-4">
          <div className="row ">
            <div className="col-md-3 menu">
              <AdminMenu />
            </div>
            <div className="col-md-9 lg:pl-8  lg:pt-0 pt-6  lg:text-start">
              <h1 className="lg:font-bold  lg: pl-8 lg:text-2xl lg:pt-4 lg:pb-12">
                Manage Category Page
              </h1>
              <CategoryForm
                handleSubmit={handleSubmit}
                setValue={setname}
                value={name}
              />
              <div className="w-75 lg:pl-6 table1 pt-0">
                <table className="table ">
                  <thead>
                    <tr>
                      <th scope="col">Name</th>
                      <th scope="col">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {category?.map((item) => {
                      return (
                        <>
                          <tr>
                            <td key={item._id} className="">
                              {item.name}
                            </td>
                            <td className="">
                              <button
                                className="btn btn-primary ms-2"
                                onClick={() => {
                                  setvisible(true);
                                  setSelected(item);
                                }}
                              >
                                Edit
                              </button>
                              <button
                                className="btn btn-danger ms-2"
                                onClick={() => {
                                  handleDelete(item._id);
                                }}
                              >
                                Delete
                              </button>
                            </td>
                          </tr>
                        </>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
            <Modal
              onCancel={() => setvisible(false)}
              footer={null}
              visible={visible}
            >
              <CategoryForm
                value={updatedName}
                setValue={setUpdatedName}
                handleSubmit={handleUpdate}
              />
            </Modal>
          </div>
        </div>
      </Layout>
    </>
  );
};

export default CreateCategory;
