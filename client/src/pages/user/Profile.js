import React from "react";
import Layout from "../../components/Layout/Layout";
import UserMenu from "../../components/Layout/UserMenu";
import { useState, useEffect } from "react";
import { message } from "antd";
import axios from "axios";
const Profile = () => {
  const data = localStorage.getItem("auth");
  const data1 = JSON.parse(data);
  const [name, setname] = useState("");
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const [phone, setphone] = useState("");
  const [address, setaddress] = useState("");
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.put(
        `http://localhost:8000/api/auth/profile`,
        {
          name,
          email,
          password,
          phone,
          address,
        }
      );
      if (data?.success) {
        let ls = localStorage.getItem("auth");
        ls = JSON.parse(ls);
        ls.USER = data?.updateUser;
        localStorage.setItem("auth", JSON.stringify(ls));
        message.success(data?.message);
      } else {
        message.error(data?.error);
      }
    } catch (error) {
      console.log(error.message);
    }
  };
  useEffect(() => {
    const { name, email, phone, address } = data1?.USER;
    setname(name);
    setemail(email);
    setphone(phone);
    setaddress(address);
  }, []);
  return (
    <>
      <Layout>
        <div className="container-fluid m-3 p-4 ">
          <div className="row ">
            <div className="col-md-3">
              <UserMenu />
            </div>
            <div className="col-md-9 flex justify-center align-items-center pr-36">
              <div className="card lg:w-[450px] md:w-[300px] ">
                <div className="card-body lg:h-[500px]">
                  <h1 className="card-title lg:text-2xl text-center pt-8">
                    USER PROFILE
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
                          value={email}
                          onChange={(e) => setemail(e.target.value)}
                          disabled
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
                          value={address}
                          onChange={(e) => setaddress(e.target.value)}
                        />
                      </div>
                      <div className="flex justify-end lg:pt-8">
                        <button className="btn btn-primary btn-lg ">
                          UPDATE
                        </button>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Layout>
    </>
  );
};

export default Profile;
