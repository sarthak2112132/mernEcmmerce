import React, { useState } from "react";
import Layout from "../../components/Layout/Layout";
import { useNavigate } from "react-router-dom";
import { message } from "antd";
const ForgotPassword = () => {
  const [email, setemail] = useState("");
  const [answer, setanswer] = useState("");
  const [newPassWord, setnewPassWord] = useState("");
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      let response = await fetch(
        `https://backendmern-l4zx.onrender.com/api/auth/forgot-password`,
        {
          method: "post",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email, answer, newPassWord }),
        }
      );
      response = await response.json();
      console.log(response);
      if (response.success) {
        message.success(response.message);
        navigate("/login");
      } else {
        message.error(response.message);
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <Layout>
        <div className="Login">
          <div className="card w-[400px]">
            <div className="card-body h-[300px]">
              <div className="card-title">
                <h1 className="lg:text-3xl lg:text-center">RESET PASSWORD</h1>
                <form method="post" onSubmit={handleSubmit}>
                  <div className="form-group">
                    <div className="lg:pt-16 pt-3">
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
                    <div className="lg:pt-16 pt-3">
                      <input
                        type="password"
                        className="form-control"
                        id="exampleInputEmail1"
                        aria-describedby="emailHelp"
                        placeholder="Enter Password"
                        autoComplete="false"
                        required
                        value={newPassWord}
                        onChange={(e) => setnewPassWord(e.target.value)}
                      />
                    </div>
                    <div className="lg:pt-16 pt-3">
                      <input
                        type="text"
                        className="form-control"
                        id="exampleInputEmail1"
                        aria-describedby="emailHelp"
                        placeholder="Enter Your Sport"
                        autoComplete="false"
                        required
                        value={answer}
                        onChange={(e) => setanswer(e.target.value)}
                      />
                    </div>
                    <div className="lg:pt-8 lg:pl-60 login">
                      <button className="btn btn-primary btn-lg " type="submit">
                        Reset
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </Layout>
    </>
  );
};

export default ForgotPassword;
