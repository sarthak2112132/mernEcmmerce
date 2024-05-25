import { useState, useEffect } from "react";
import { Outlet } from "react-router-dom";
import Spinner from "../Spinner";

export default function PrivateRoute() {
  const [ok, setOk] = useState(false);
  const data = localStorage.getItem("auth");
  const data1 = JSON.parse(data);
  useEffect(() => {
    const authCheck = async () => {
      try {
        let response = await fetch(`http://localhost:8000/api/auth/user-auth`, {
          method: "get",
          headers: {
            Authorization: data1?.token,
          },
        });
        response = await response.json();
        console.log(response);
        if (response.ok) {
          setOk(true);
        } else {
          setOk(false);
        }
      } catch (error) {
        console.log(error);
      }
    };
    if (data1?.token) authCheck();
  }, [data1?.token]);

  return ok ? <Outlet /> : <Spinner />;
}
