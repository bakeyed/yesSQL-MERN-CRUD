import axios from "axios";
import React from "react";
import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";

const Update = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const bookId = location.pathname.split("/")[2]; // location : pathname:"/update/12"

  const [book, setBooks] = useState({
    title: "",
    desc: "",
    cover: "",
    price: null,
  });

  const handleChange = (e) => {
    setBooks((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleClick = async (e) => {
    e.preventDefault(); //Prevent page from refreshing
    try {
      await axios.put("http://localhost:5555/books/" + bookId, book);
      navigate("/");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <div className="form">
        <h1>Update the book</h1>
        <input
          type="text"
          placeholder="title"
          onChange={handleChange}
          name="title"
        />
        <input
          type="text"
          placeholder="description"
          onChange={handleChange}
          name="desc"
        />
        <input
          type="text"
          placeholder="cover"
          onChange={handleChange}
          name="cover"
        />
        <input
          type="number"
          placeholder="price"
          onChange={handleChange}
          name="price"
        />
      </div>
      <button onClick={handleClick}>Update</button>
    </>
  );
};
export default Update;
