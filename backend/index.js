import express from "express";
import { PORT, mongoDBURl } from "./config.js";
import mongoose from "mongoose";
import { Book } from "./models/bookModel.js";

const app = express();
app.use(express.json());

app.get("/", (req, res) => {
  console.log(req);
  return res.status(234).send("Selamat datang di MERN Stack");
});

// rute untuk menyimpan buku
app.post("/books", async (req, res) => {
  try {
    if (!req.body.title || !req.body.author || !req.body.publishYear) {
      return res
        .status(400)
        .send({ message: "kirim semua data: title, author dan publishYear" });
    }

    // jika data diisi
    const newBook = {
      title: req.body.title,
      author: req.body.author,
      publishYear: req.body.publishYear,
    };
    const book = await Book.create(newBook);
    return res.status(201).send(book);
  } catch (error) {
    console.log(error.message);
    return res.status(500).send({ message: error.message });
  }
});

// GET all book
app.get("/books", async (req, res) => {
  try {
    const books = await Book.find({})

    return res.status(201).send(books)
  } catch (error) {
    console.log(error.message);
    return res.status(500).send({ message: error.message });
  }
});

mongoose
  .connect(mongoDBURl)
  .then(() => {
    console.log("koneksi ke mongodb sukses");
    app.listen(PORT, () => {
      console.log("Aplikasi berjalan di PORT = ", PORT);
    });
  })
  .catch((error) => {
    console.log(error);
  });
