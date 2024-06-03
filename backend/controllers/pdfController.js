const Pdf = require('../models/Pdf');
const { generatePDF } = require('../utils/pdfGenerator');

const createPdf = async (req, res) => {
  const { author, title, pages } = req.body;
  const frontCoverImage = req.files.frontCoverImage[0].path;
  const backCoverImage = req.files.backCoverImage[0].path;

  const pdf = new Pdf({
    author,
    title,
    frontCoverImage,
    backCoverImage,
    pages,
  });

  await pdf.save();
  const pdfBuffer = await generatePDF(pdf);
  
  res.setHeader('Content-Type', 'application/pdf');
  res.send(pdfBuffer);
};

const getPdfs = async (req, res) => {
  const pdfs = await Pdf.find();
  res.json(pdfs);
};

const downloadPdf = async (req, res) => {
  const pdf = await Pdf.findById(req.params.id);
  const pdfBuffer = await generatePDF(pdf);
  
  res.setHeader('Content-Type', 'application/pdf');
  res.setHeader('Content-Disposition', `attachment; filename=${pdf.title}.pdf`);
  res.send(pdfBuffer);
};

module.exports = { createPdf, getPdfs, downloadPdf };
