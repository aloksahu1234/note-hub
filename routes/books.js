const express = require("express");
const router = express.Router();
const Book = require("../models/Book");
const multer = require("multer");

// File storage config
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "uploads/");
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + "-" + file.originalname);
    }
});

const upload = multer({ storage });

// UPLOAD BOOK
router.post("/upload", upload.single("file"), async (req, res) => {
    const { title, author, userId } = req.body;

    try {
        const newBook = new Book({
            title,
            author,
            file: req.file.filename,
            userId
        });

        await newBook.save();
        res.json({ msg: "Book uploaded" });

    } catch (err) {
        res.status(500).send("Error uploading");
    }
});

// GET BOOKS
router.get("/", async (req, res) => {
    try {
        const books = await Book.find();
        res.json(books);
    } catch {
        res.status(500).send("Error");
    }
});

// DELETE BOOK
router.delete("/:id", async (req, res) => {
    try {
        await Book.findByIdAndDelete(req.params.id);
        res.json({ msg: "Deleted" });
    } catch {
        res.status(500).send("Error");
    }
});

module.exports = router;