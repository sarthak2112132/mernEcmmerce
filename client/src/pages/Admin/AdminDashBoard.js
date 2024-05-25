import React from "react";
import Layout from "../../components/Layout/Layout";
import AdminMenu from "../../components/Layout/AdminMenu";
const AdminDashBoard = () => {
  const data = localStorage.getItem("auth");
  const data1 = JSON.parse(data);
  return (
    <>
      <Layout>
        <div className="container-fluid m-3 p-3">
          <div className="row">
            <div className="col-md-3">
              <AdminMenu />
            </div>
            <div className="col-md-9">
              <div className="card w-75 p-8">
                <h3 className="uppercase font-medium">
                  Admin Name: {data1?.USER.name}
                </h3>
                <h3 className="uppercase font-medium">
                  Admin Email: {data1?.USER.email}
                </h3>
                <h3 className="uppercase font-medium">
                  Admin Phone: {data1?.USER.phone}
                </h3>
              </div>
            </div>
          </div>
        </div>
      </Layout>
    </>
  );
};

export default AdminDashBoard;
