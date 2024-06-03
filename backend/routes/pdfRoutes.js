const express = require('express');
const { createPdf, getPdfs, downloadPdf } = require('../controllers/pdfController');
const multer = require('multer');
const upload = multer({ dest: 'uploads/' });

const router = express.Router();

router.post('/create', upload.fields([{ name: 'frontCoverImage' }, { name: 'backCoverImage' }]), createPdf);
router.get('/', getPdfs);
router.get('/:id', downloadPdf);

module.exports = router;
