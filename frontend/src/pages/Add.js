import axios from "axios";
import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Add = () => {
  const navigate = useNavigate();

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
  console.log(book);

  const handleClick = async (e) => {
    e.preventDefault(); //Prevent page from refreshing
    console.log("button clicked");
    try {
      await axios.post("http://localhost:5555/books", book);
      navigate("/");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <div className="form">
        <h1>Add new book</h1>
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
      <button onClick={handleClick}>Add</button>
    </>
  );
};
export default Add;
