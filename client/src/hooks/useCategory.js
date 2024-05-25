import { useEffect, useState } from "react";
import axios from "axios";
import { message } from "antd";

export default function useCatergory() {
  const [category, setcategory] = useState([]);

  //get-category
  const getCategories = async (e) => {
    try {
      const { data } = await axios.get(
        `http://localhost:8000/api/category/get-category`
      );
      setcategory(data?.category);
    } catch (error) {
      message.error("Error in useCategory Hook");
    }
  };
  useEffect(() => {
    getCategories();
  }, []);

  return category;
}
