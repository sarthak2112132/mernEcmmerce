import React, { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { AiOutlineMenu, AiOutlineClose } from "react-icons/ai";
import { FaHome, FaShoppingCart } from "react-icons/fa";
import { FcAbout } from "react-icons/fc";
import { RiContactsFill, RiLoginCircleLine } from "react-icons/ri";
import { FaRegistered } from "react-icons/fa6";
import { message, Badge, Avatar } from "antd";
import { useCart } from "../../context/cart";
import Search from "../../pages/Search";
import useCatergory from "../../hooks/useCategory";
import SearchInput from "../Form/SearchInput";
const Header = () => {
  const [cart] = useCart();
  const [nav, setnav] = useState(false);
  const data = localStorage.getItem("auth");
  const categories = useCatergory();
  const data1 = JSON.parse(data);
  const handleLogOut = async (e) => {
    localStorage.removeItem("token");
    localStorage.removeItem("auth");
    localStorage.removeItem("result");
    message.success("Logout SuccessFully");
  };
  return (
    <>
      <nav className="Navbar">
        <ul className="FlexBox">
          <Link to="/">
            <h4 className="E-commerce">E-commerce App</h4>
          </Link>
          <SearchInput />
          <Link to="/">
            <li className="">Home</li>
          </Link>
          <li class="nav-item dropdown">
            <Link
              className="nav-link dropdown-toggle"
              id="navbarDropdown"
              role="button"
              data-bs-toggle="dropdown"
              aria-expanded="false"
              to={`/category`}
            >
              Categories
            </Link>
            <ul className="dropdown-menu ">
              <li>
                <Link to="/category">All Categories</Link>
              </li>
              {categories.map((c) => {
                return (
                  <>
                    <li>
                      <Link to={`/category/${c.slug}`} key={c._id}>
                        {c.name}
                      </Link>
                    </li>
                  </>
                );
              })}
            </ul>
          </li>
          {!data1 ? (
            <>
              <Link to="/register">
                <li className="">Register</li>
              </Link>
              <Link to="/login">
                <li className="">Login</li>
              </Link>
            </>
          ) : (
            <>
              <div className="dropdown">
                <div className="button">
                  <NavLink className="dropbtn uppercase pt-4">
                    {data1?.USER.name}
                  </NavLink>
                </div>
                <div className="dropdown-content">
                  <NavLink
                    to={`/dashboard/${
                      data1?.USER.role == "1" ? "admin" : "user"
                    }`}
                    className="uppercase"
                  >
                    DASHBOARD
                  </NavLink>
                  <Link to="/login" onClick={handleLogOut}>
                    <li className="">LogOut</li>
                  </Link>
                </div>
              </div>
            </>
          )}
          <Badge count={cart?.length}>
            <Link to="/cart" className="">
              <li className="">CART</li>
            </Link>
          </Badge>
        </ul>
      </nav>
      <div>
        <nav className=" navbar">
          <h1 className="ECOMMERCE min-[798px]: text-3xl">E-commerce App</h1>
          <ul className="responsive" onClick={() => setnav(!nav)}>
            <AiOutlineMenu size={35} />
          </ul>
          {nav ? (
            <div className="bg-black/80 w-full h-screen  z-10 fixed top-0 left-0 "></div>
          ) : (
            " "
          )}
          <div
            className={
              nav
                ? "fixed top-0 right-0 w-[220px] h-screen bg-white z-10 duration-300 "
                : "fixed top-0 right-[-100%] w-[300px] h-screen bg-white z-10 duration-300"
            }
          >
            <AiOutlineClose
              size={40}
              className="absolute right-4 top-4 cursor-pointer"
              onClick={() => setnav(!nav)}
            />
            <nav className="pt-24">
              <ul className="flex flex-col p-4 text-gray-800 ">
                <Link to="/">
                  <li className="text-3xl py-4  flex ">
                    <FaHome className="mr-4" /> Home
                  </li>
                </Link>
                <Link to="/category">
                  <li className="text-3xl py-4 flex ">
                    <RiContactsFill className="mr-4" />
                    Category
                  </li>
                </Link>
                <Link to="/about">
                  <li className="text-3xl py-4 flex ">
                    <FcAbout className="mr-4" />
                    About
                  </li>
                </Link>
                {!data1 ? (
                  <>
                    <Link to="/register">
                      <li className="text-3xl py-4 flex ">
                        <FaRegistered className="mr-4" />
                        Register
                      </li>
                    </Link>
                    <Link to="/login">
                      <li className="text-3xl py-4 flex ">
                        <RiLoginCircleLine className="mr-4" />
                        Login
                      </li>
                    </Link>
                  </>
                ) : (
                  <>
                    <Link to="/login">
                      <li
                        className="text-3xl py-4 flex "
                        onClick={handleLogOut}
                      >
                        <RiLoginCircleLine className="mr-4" />
                        LogOut
                      </li>
                    </Link>
                  </>
                )}
                <Link to="/cart">
                  <li className="text-3xl py-4 flex ">
                    <FaShoppingCart className="mr-4" />
                    Cart{cart?.length}
                  </li>
                </Link>
              </ul>
            </nav>
          </div>
        </nav>
      </div>
    </>
  );
};

export default Header;
