const express = require('express');
const multer = require('multer');
const { createBook, getBooks, downloadPDF } = require('../controllers/bookController');

const router = express.Router();
const upload = multer({ dest: 'uploads/' });

router.post('/', upload.fields([{ name: 'frontCover' }, { name: 'backCover' }]), createBook);
router.get('/', getBooks);
router.get('/download/:id', downloadPDF);

module.exports = router;
