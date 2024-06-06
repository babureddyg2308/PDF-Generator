const Book = require('../models/Book');
const PDFDocument = require('pdfkit');
const fs = require('fs');
const path = require('path');

exports.createBook = async (req, res) => {
    const { title, author, pages } = req.body;
    const frontCover = req.files['frontCover'][0].path;
    const backCover = req.files['backCover'][0].path;
    
    try {
        const book = new Book({ title, author, frontCover, backCover, pages });
        await book.save();

         const doc = new PDFDocument();

        doc.pipe(fs.createWriteStream(`./pdfs/${book._id}.pdf`));

         doc.image(frontCover, 0, 0, { width: doc.page.width, height: doc.page.height });
        doc.addPage();

         pages.forEach(page => {
            if (page.backgroundImage) {
                doc.image(page.backgroundImage, 0, 0, { width: doc.page.width, height: doc.page.height });
            }
            doc.text(page.content, { align: 'center' });
            doc.addPage();
        });

        // Add back cover
        doc.image(backCover, 0, 0, { width: doc.page.width, height: doc.page.height });

        doc.end();

        res.status(201).json({ message: 'Book created successfully', book });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

exports.getBooks = async (req, res) => {
    try {
        const books = await Book.find().select('title author createdAt');
        res.status(200).json(books);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

exports.downloadPDF = async (req, res) => {
    const { id } = req.params;
    const filePath = path.resolve(__dirname, `../../pdfs/${id}.pdf`);

    if (fs.existsSync(filePath)) {
        res.download(filePath);
    } else {
        res.status(404).json({ message: 'PDF not found' });
    }
};
