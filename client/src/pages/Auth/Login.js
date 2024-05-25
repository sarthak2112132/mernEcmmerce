import React, { useState } from "react";
import Layout from "../../components/Layout/Layout";
import { useNavigate, useLocation, Link } from "react-router-dom";
import { message } from "antd";
const Login = () => {
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const navigate = useNavigate();
  const location = useLocation();
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      let response = await fetch(
        `https://backendmern-l4zx.onrender.com/api/auth/login`,
        {
          method: "post",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email, password }),
        }
      );
      response = await response.json();
      if (response.success) {
        message.success(response.message);
        localStorage.setItem("token", response.token);
        localStorage.setItem("auth", JSON.stringify(response));
        navigate(location.state || "/");
      } else {
        message.error(response.message);
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <Layout>
      <div className="Login">
        <div className="card w-[400px]">
          <div className="card-body h-[300px]">
            <div className="card-title">
              <h1 className="lg:text-3xl lg:text-center">Login Page</h1>
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
                      autoSave="off"
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
                      autoSave="off"
                      required
                      value={password}
                      onChange={(e) => setpassword(e.target.value)}
                    />
                  </div>
                  <div className="lg:pt-0 lg:pl-8 lg:absolute lg:left-0 lg:top-48 Forgot ">
                    <Link to="/forgot-password">
                      <button className="btn btn-primary btn-lg " type="submit">
                        Forgot Password
                      </button>
                    </Link>
                  </div>
                  <div className="lg:pt-8 lg:pl-60 login">
                    <button className="btn btn-primary btn-lg " type="submit">
                      Login
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Login;
