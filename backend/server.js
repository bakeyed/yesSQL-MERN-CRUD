import express from "express";
import mysql, { createConnection } from "mysql";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config(); // Load environment variables

const app = express();
const PORT = 5555;

app.use(express.json()); //Express body middleware
app.use(cors());

const db = createConnection({
  host: "localhost",
  user: "root",
  password: process.env.MYSQL_PASSWORD,
  database: "bookstore",
});

app.get("/", (req, res) => {
  res.send("Hello world");
});

//database: bookstore table: books

app.get("/books", (req, res) => {
  const q = "SELECT * FROM books";
  db.query(q, (err, data) => {
    if (err) return res.json(err);
    return res.json(data);
  });
});
//Auth problem use this in mysql server:
//ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY '<your-password>';

app.post("/books", (req, res) => {
  const q = "INSERT INTO books (title, `desc`, cover, price) VALUES (?)";
  const values = [
    req.body.title,
    req.body.desc,
    req.body.cover,
    req.body.price,
  ];

  db.query(q, [values], (err, data) => {
    if (err) return res.json(err);
    return res.json("Book has been created");
  });
});

app.delete("/books/:id", (req, res) => {
  const bookId = req.params.id;
  const q = "DELETE FROM books WHERE id=?";
  db.query(q, [bookId], (err, data) => {
    if (err) return res.json(err);
    return res.json("Book has been deleted");
  });
});

app.put("/books/:id", (req, res) => {
  const bookId = req.params.id;
  const q = "UPDATE books SET title=?, `desc`=?, cover=?, price=? WHERE id=?";
  const values = [
    req.body.title,
    req.body.desc,
    req.body.cover,
    req.body.price,
  ];
  db.query(q, [...values, bookId], (err, data) => {
    if (err) return res.json(err);
    return res.json("Book has been updated");
  });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
