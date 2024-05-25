import React from "react";
import Layout from "../components/Layout/Layout";
import { useSearch } from "../context/search";

const Search = () => {
  const [values, setValues] = useSearch();
  return (
    <>
      <Layout>
        <div>
          <h1 className="text-center">Searched Results</h1>
          <div className="flex flex-wrap gap-10">
            <span className="absolute left-[40%] right-[50%] pl-14 pt-4">
              {values?.results.length < 1
                ? " No Product Found"
                : `Found ${values?.results.length} product`}
            </span>
            <div className="flex flex-wrap gap-10 -z-10">
              {values?.results.map((p) => {
                return (
                  <>
                    <div
                      className="card m-2"
                      style={{ width: "18rem", height: "25rem" }}
                      key={p._id}
                    >
                      <img
                        src={`http://localhost:8000/api/products/product-photo/${p.slug}`}
                        className="card-img-top"
                        alt={p.name}
                        style={{ width: "310px", height: "200px" }}
                      />
                      <div className="card-body">
                        <h5 className="card-title">{p.name}</h5>
                        <p className="card-text">$ {p.price}</p>
                        <p className="">{p.description.substring(0, 30)}</p>
                        <button className="btn btn-primary m-2">
                          More Details
                        </button>
                        <button className="btn btn-secondary m-2">
                          ADD TO CART
                        </button>
                      </div>
                    </div>
                  </>
                );
              })}
            </div>
          </div>
        </div>
      </Layout>
    </>
  );
};

export default Search;
