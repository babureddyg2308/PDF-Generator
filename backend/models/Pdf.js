const mongoose = require('mongoose');

const pdfSchema = new mongoose.Schema({
  author: { type: String, required: true },
  title: { type: String, required: true },
  frontCoverImage: String,
  backCoverImage: String,
  pages: [
    {
      content: String,
      alignment: String,
      backgroundImage: String,
    },
  ],
});

const Pdf = mongoose.model('Pdf', pdfSchema);

module.exports = Pdf;
