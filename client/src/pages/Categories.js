import React, { useState, useEffect } from "react";
import Layout from "../components/Layout/Layout";
import useCatergory from "../hooks/useCategory";
import { Link } from "react-router-dom";

const Categories = () => {
  const categories = useCatergory();
  return (
    <>
      <Layout>
        <div className="container">
          <div className="row">
            {categories.map((c) => {
              return (
                <>
                  <div className="col-md-6 mt-5 mb-3 gap-x-3 gy-3 ">
                    <Link
                      className="btn btn-primary"
                      to={`/category/${c.slug}`}
                      key={c._id}
                    >
                      {c.name}
                    </Link>
                  </div>
                </>
              );
            })}
          </div>
        </div>
      </Layout>
    </>
  );
};

export default Categories;
