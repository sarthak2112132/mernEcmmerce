import React, { useEffect, useState } from "react";
import Layout from "../../components/Layout/Layout";
import AdminMenu from "../../components/Layout/AdminMenu";
import axios from "axios";
import { message } from "antd";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
const Product = () => {
  const [products, setproducts] = useState([]);
  const navigate = useNavigate();
  const getProducts = async (e) => {
    try {
      const { data } = await axios.get(
        `http://localhost:8000/api/products/get-product`
      );
      if (data?.success) {
        setproducts(data?.Products);
      } else {
        message.error(data?.message);
      }
    } catch (error) {
      console.log(error);
      message.error("Something Went Wrong");
    }
  };
  useEffect(() => {
    getProducts();
  }, []);
  return (
    <>
      <Layout>
        <div>
          <div className="row m-3 p-3">
            <div className="col-md-3">
              <AdminMenu />
            </div>
            <div className="col-md-9">
              <h1 className="font-bold lg:text-2xl lg:pl-14">
                All Products Lists
              </h1>
              <div className="flex flex-wrap">
                {products?.map((p) => {
                  return (
                    <>
                      <Link
                        key={p._id}
                        to={`/dashboard/admin/products/${p.slug}`}
                      >
                        <div
                          className="card m-2"
                          style={{ width: "18rem", height: "20rem" }}
                        >
                          <img
                            src={`http://localhost:8000/api/products/product-photo/${p.slug}`}
                            className="card-img-top"
                            alt={p.name}
                            style={{ width: "310px", height: "200px" }}
                          />
                          <div className="card-body">
                            <h5
                              className="card-title"
                              onClick={() => navigate(`/product`)}
                            >
                              {p.name}
                            </h5>
                            <p className="card-text">{p.description}</p>
                          </div>
                        </div>
                      </Link>
                    </>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </Layout>
    </>
  );
};

export default Product;
