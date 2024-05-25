import React, { useEffect, useState } from "react";
import Layout from "../components/Layout/Layout";
import { useParams } from "react-router-dom";
import axios from "axios";
const ProductDetails = () => {
  const [products, setProducts] = useState({});
  const [relatedproducts, setRelatedProducts] = useState([]);
  const params = useParams();
  useEffect(() => {
    if (params?.slug) getProduct();
  }, [params?.slug]);
  const getRelatedProduct = async (pid, cid) => {
    const { data } = await axios.get(
      `http://localhost:8000/api/products/related-product/${pid}/${cid}`
    );
    console.log(data);
    setRelatedProducts(data?.products);
  };
  const getProduct = async () => {
    try {
      const { data } = await axios.get(
        `http://localhost:8000/api/products/get-product/${params.slug}`
      );
      console.log(data);
      setProducts(data?.product);
      getRelatedProduct(data?.product._id, data?.product?.category._id);
    } catch (error) {}
  };
  return (
    <>
      <Layout>
        <div className="row container mt-2">
          <div className="col-md-6">
            <img
              src={`http://localhost:8000/api/products/product-photo/${params.slug}`}
              className="card-img-top mt-10 ml-8"
              alt={products?.name}
              style={{ width: "510px", height: "500px" }}
            />
            <div className="row">
              <h1 className="lg:text-2xl mt-6 lg:pl-10">Similar Products</h1>
              {relatedproducts.length < 1 && <p>No similar Products Found </p>}
              {relatedproducts?.map((p) => (
                <div
                  className="card m-2"
                  style={{ width: "20rem" }}
                  key={p._id}
                >
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
                    <button className="btn btn-secondary ms-1">
                      ADD TO CART
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="col-md-6 ">
            <h1 className="lg:text-3xl  text-center"> Product Details</h1>
            <h6 className="text-xl lg:pl-8 font-semibold">
              Name:{products?.name}
            </h6>
            <h6 className="text-xl lg:pl-8 font-semibold">
              Description:{products?.description}
            </h6>
            <h6 className="text-xl lg:pl-8 font-semibold">
              Price:{products?.price}
            </h6>
            <h6 className="text-xl lg:pl-8 font-semibold">
              Category:{products?.category?.name}
            </h6>
            <div className="pl-6">
              <button className="btn btn-secondary m-1">ADD TO CART</button>
            </div>
          </div>
        </div>
      </Layout>
    </>
  );
};

export default ProductDetails;
