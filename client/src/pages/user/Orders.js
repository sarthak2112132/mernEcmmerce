import React, { useState, useEffect } from "react";
import Layout from "../../components/Layout/Layout";
import UserMenu from "../../components/Layout/UserMenu";
import axios from "axios";
import moment from "moment";
const Orders = () => {
  const [orders, setorders] = useState([]);
  const data = localStorage.getItem("auth");
  const data1 = JSON.parse(data);
  const getOrders = async () => {
    try {
      const id = data1?.USER?._id;
      const { data } = await axios.post(
        `http://localhost:8000/api/auth/orders`,
        {
          id,
        }
      );
      console.log(data);
      setorders(data);
    } catch (error) {}
  };
  useEffect(() => {
    getOrders();
  }, []);
  return (
    <>
      <Layout>
        <div className="container-fluid m-3 p-4">
          <div className="row ">
            <div className="col-md-3">
              <UserMenu />
            </div>
            <div className="col-md-9 lg:pl-8 lg:font-bold lg:text-2xl lg:text-center">
              All Orders
              {orders?.order?.map((o, i) => {
                return (
                  <>
                    <div className="border shadow  ">
                      <table className="table  lg:justify-center">
                        <thead>
                          <tr>
                            <td scope="col">#</td>
                            <td scope="col">Buyers</td>
                            <td scope="col">Orders</td>
                            <td scope="col">Payment</td>
                            <td scope="col">Quantity</td>
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <th>{i + 1}</th>
                            <th>{o?.buyer?.name}</th>
                            <th>{moment(o?.createdAt).fromNow()}</th>
                            <th>
                              {o?.params?.transaction?.options
                                ?.submitForSettlement
                                ? "Failed"
                                : "Success"}
                            </th>
                            <th>{o?.products?.length}</th>
                          </tr>
                        </tbody>
                      </table>
                      <div className="container">
                        {o?.products?.map((p) => {
                          return (
                            <>
                              <div className="row mb-2 card flex-row">
                                <div className="col-md-4">
                                  <img
                                    src={`http://localhost:8000/api/products/product-photo/${p.slug}`}
                                    className="card-img-top"
                                    alt={p.name}
                                    style={{ height: "220px", width: "380px" }}
                                  />
                                </div>
                                <div className="col-md-8 ">
                                  <h4>Name :{p.name}</h4>
                                  <h4> Description:{p.description}</h4>
                                  <h4>Price :{p.price}</h4>
                                </div>
                              </div>
                            </>
                          );
                        })}
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

export default Orders;
