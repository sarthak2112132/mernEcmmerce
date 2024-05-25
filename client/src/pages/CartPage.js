import React, { useState, useEffect } from "react";
import Layout from "../components/Layout/Layout";
import DropIn from "braintree-web-drop-in-react";
import { useCart } from "../context/cart";
import { useNavigate } from "react-router-dom";
import { message } from "antd";
import axios from "axios";
const CartPage = () => {
  const navigate = useNavigate();
  const [cart, setCart] = useCart();
  const [clientToken, setclientToken] = useState("");
  const [instance, setInstance] = useState("");
  const [loading, setLoading] = useState(false);
  const auth = localStorage.getItem("auth");
  const Data = JSON.parse(auth);
  //total currency
  const totalCount = () => {
    try {
      let total = 0;
      cart?.map((item) => {
        total = total + item.price;
      });
      return total.toLocaleString("en-US", {
        style: "currency",
        currency: "USD",
      });
    } catch (error) {
      console.log(error);
    }
  };
  //get Payment GateWay Token

  const getToken = async () => {
    try {
      const { data } = await axios.get(
        `http://localhost:8000/api/products/braintree/token`
      );
      setclientToken(data?.clientToken);
    } catch (error) {
      console.log(error);
    }
  };

  const handlePayment = async () => {
    try {
      setLoading(true);
      const id = Data?.USER?._id;
      const { nonce } = instance.requestPaymentMethod();
      const { data } = await axios.post(
        `http://localhost:8000/api/products/braintree/payment`,
        {
          nonce,
          cart,
          id,
        }
      );
      console.log(data);
      setLoading(false);
      localStorage.removeItem("cart");
      setCart([]);
      navigate(`/dashboard/user/orders`);
      message.success("Payment Completed SuccessFully");
    } catch (error) {
      console.log(error.message);
      setLoading(false);
    }
  };
  //removeItem
  const removeItem = (pid) => {
    let myCart = [...cart];
    let index = myCart.findIndex((item) => item._id === pid);
    myCart.splice(index, 1);
    setCart(myCart);
    localStorage.setItem("cart", JSON.stringify(myCart));
    message.success("Item Removed SuccessFully");
  };
  useEffect(() => {
    getToken();
  }, [Data?.token]);
  return (
    <>
      <Layout>
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <h4 className=" p-2 text-center mb-1 capitalize">
                {`Hello ${Data?.USER?.name}`}
              </h4>
              <h3 className="text-center">
                {cart?.length >= 1
                  ? `You have ${cart.length} item in Cart ${
                      Data?.token ? "" : "Please Login To CheckOut"
                    }`
                  : "Your Cart is Empty"}
              </h3>
            </div>
          </div>
          <div className="row">
            <div className="col-md-6 lg:pt-12">
              {cart?.map((p) => {
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
                        <button
                          className="btn btn-danger"
                          onClick={() => removeItem(p._id)}
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                  </>
                );
              })}
            </div>
            <div className="col-md-4 text-center ml-14 lg:pt-12">
              <h4 className="lg:text-3xl ">Cart Summary</h4>
              <p className="lg:text-xl">Total | CheckOut | Payment</p>
              <hr />
              <h4 className="lg:text-2xl lg:pt-6">Total :{totalCount()} </h4>
              {Data?.USER?.address ? (
                <>
                  <div className="mb-4">
                    <h4>Current Address</h4>
                    <h5>{Data?.USER?.address}</h5>
                    <button
                      className="btn btn-outline-warning"
                      onClick={() => navigate(`/dashboard/user/profile`)}
                    >
                      Update Address
                    </button>
                  </div>
                </>
              ) : (
                <>
                  <div className="mb-3">
                    {Data?.token ? (
                      <>
                        <button
                          className="btn btn-outline-warning"
                          onClick={() => navigate(`/dashboard/user/profile`)}
                        >
                          Update Address
                        </button>
                      </>
                    ) : (
                      <>
                        <button
                          className="btn btn-outline-warning"
                          onClick={() =>
                            navigate(`/login`, {
                              state: "/cart",
                            })
                          }
                        >
                          Please Login To CheckOut
                        </button>
                      </>
                    )}
                  </div>
                </>
              )}
              <div className="mt-2">
                {!clientToken || !cart.length ? (
                  " "
                ) : (
                  <>
                    <DropIn
                      options={{
                        authorization: clientToken,
                      }}
                      onInstance={(instance) => setInstance(instance)}
                    />
                  </>
                )}
                <button
                  className="btn btn-primary"
                  disabled={loading || !Data?.USER?.address || !instance}
                  onClick={handlePayment}
                >
                  {loading ? "Processing...." : "Make Payment"}
                </button>
              </div>
            </div>
          </div>
        </div>
      </Layout>
    </>
  );
};

export default CartPage;
