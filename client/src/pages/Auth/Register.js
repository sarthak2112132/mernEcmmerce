import React from "react";
import Layout from "../../components/Layout/Layout";
import { message } from "antd";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
const Register = () => {
  const [name, setname] = useState("");
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const [phone, setphone] = useState("");
  const [address, setaddress] = useState("");
  const [answer, setanswer] = useState("");
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      let response = await fetch(`http://localhost:8000/api/auth/register`, {
        method: "post",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, email, password, phone, address, answer }),
      });
      response = await response.json();
      if (response.success) {
        message.success(response.message);
        navigate("/login");
      } else {
        message.error(response.message);
      }
    } catch (error) {
      alert(error.message);
    }
  };
  return (
    <>
      <Layout>
        <div className="register pt-12">
          <div className="card lg:w-[450px] md:w-[300px]">
            <div className="card-body lg:h-[500px]">
              <h1 className="card-title lg:text-2xl text-center pt-8">
                Register Here
              </h1>
              <form method="post" onSubmit={handleSubmit}>
                <div className="form-group">
                  <div className="lg:pt-4 pt-3">
                    <input
                      type="text"
                      className="form-control"
                      id="exampleInputEmail1"
                      aria-describedby="emailHelp"
                      placeholder="Enter name"
                      autoComplete="false"
                      required
                      value={name}
                      onChange={(e) => setname(e.target.value)}
                    />
                  </div>
                  <div className="lg:pt-4 pt-3">
                    <input
                      type="email"
                      className="form-control"
                      id="exampleInputEmail1"
                      aria-describedby="emailHelp"
                      placeholder="Enter email"
                      autoComplete="false"
                      required
                      value={email}
                      onChange={(e) => setemail(e.target.value)}
                    />
                  </div>
                  <div className="lg:pt-4 pt-3">
                    <input
                      type="password"
                      className="form-control"
                      id="exampleInputEmail1"
                      aria-describedby="emailHelp"
                      placeholder="Enter Password"
                      autoComplete="false"
                      required
                      value={password}
                      onChange={(e) => setpassword(e.target.value)}
                    />
                  </div>
                  <div className="lg:pt-4 pt-3">
                    <input
                      type="text"
                      className="form-control"
                      id="exampleInputEmail1"
                      aria-describedby="emailHelp"
                      placeholder="Enter Phone"
                      autoComplete="false"
                      required
                      value={phone}
                      onChange={(e) => setphone(e.target.value)}
                    />
                  </div>
                  <div className=" lg:pt-4 pt-3">
                    <input
                      type="text"
                      className="form-control"
                      id="exampleInputEmail1"
                      aria-describedby="emailHelp"
                      placeholder="Enter Address"
                      autoComplete="false"
                      required
                      value={address}
                      onChange={(e) => setaddress(e.target.value)}
                    />
                  </div>
                  <div className="lg:pt-4 pt-3">
                    <input
                      type="text"
                      className="form-control"
                      id="exampleInputEmail1"
                      aria-describedby="emailHelp"
                      placeholder="Enter Answer"
                      autoComplete="false"
                      required
                      value={answer}
                      onChange={(e) => setanswer(e.target.value)}
                    />
                  </div>
                  <div className="flex justify-end pl-4 lg:pt-6 pt-1">
                    <Link
                      to="/login "
                      className="Button lg:absolute lg:top-96 lg:left-0 lg:pl-16 lg:pt-2"
                    >
                      <div className="lg:pt-8">
                        <button className="lg:text-xl btn btn-success btn-sm">
                          Already User
                        </button>
                      </div>
                    </Link>
                    <div className="lg:pt-2">
                      <button className="btn btn-primary btn-lg ">
                        Register
                      </button>
                    </div>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </Layout>
    </>
  );
};

export default Register;
