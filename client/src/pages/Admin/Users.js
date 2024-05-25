import React from "react";
import Layout from "../../components/Layout/Layout";
import AdminMenu from "../../components/Layout/AdminMenu";
const Users = () => {
  return (
    <>
      <Layout>
        <div className="container-fluid m-3 p-4">
          <div className="row ">
            <div className="col-md-3">
              <AdminMenu />
            </div>
            <div className="col-md-9 lg:pl-8 lg:font-bold lg:text-2xl ">
              All Users
            </div>
          </div>
        </div>
      </Layout>
    </>
  );
};

export default Users;
