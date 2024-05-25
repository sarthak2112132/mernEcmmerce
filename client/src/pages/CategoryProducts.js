import React, { useState, useEffect } from "react";
import Layout from "../components/Layout/Layout";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

const CategoryProducts = () => {
  const navigate = useNavigate();
  const [products, setproducts] = useState([]);
  const [category, setcategory] = useState([]);
  const params = useParams();
  const getProductCategory = async () => {
    try {
      const { data } = await axios.get(
        `http://localhost:8000/api/products/product-category/${params.slug}`
      );
      console.log(data);
      setproducts(data?.products);
      setcategory(data?.category);
    } catch (error) {}
  };
  useEffect(() => {
    if (params?.slug) getProductCategory();
  }, [params?.slug]);
  return (
    <>
      <Layout>
        <div className="container mt-3 text-center">
          <h4 className="">Category-{category?.name}</h4>
          <h4 className="">{products?.length} products found</h4>
          <div className="d-flex flex-wrap">
            {products?.map((p) => (
              <div className="card m-2 " style={{ width: "20rem" }} key={p._id}>
                <img
                  src={`http://localhost:8000/api/products/product-photo/${p.slug}`}
                  className="card-img-top"
                  alt={p.name}
                />
                <div className="card-body">
                  <h5 className="card-title">{p.name}</h5>
                  <p className="card-text">
                    {p.description.substring(0, 30)}...
                  </p>
                  <p className="card-text"> $ {p.price}</p>
                  <button
                    className="btn btn-primary "
                    onClick={() => navigate(`/product/${p.slug}`)}
                  >
                    More Details
                  </button>
                  <button className="btn btn-secondary ">ADD TO CART</button>
                </div>
              </div>
            ))}
          </div>
          {/* <div className="m-2 p-3">
            {products && products.length < total && (
              <button
                className="btn btn-warning"
                onClick={(e) => {
                  e.preventDefault();
                  setPage(page + 1);
                }}
              >
                {loading ? "Loading ..." : "Loadmore"}
              </button>
            )}
          </div> */}
        </div>
      </Layout>
    </>
  );
};

export default CategoryProducts;
