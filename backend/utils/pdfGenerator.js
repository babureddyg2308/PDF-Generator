const { PDFDocument, rgb } = require('pdf-lib');
const fs = require('fs');

const generatePDF = async (pdfData) => {
  const pdfDoc = await PDFDocument.create();

   const frontCoverPage = pdfDoc.addPage();
  const { width, height } = frontCoverPage.getSize();
  if (pdfData.frontCoverImage) {
    const imgBytes = fs.readFileSync(pdfData.frontCoverImage);
    const img = await pdfDoc.embedJpg(imgBytes);
    frontCoverPage.drawImage(img, { x: 0, y: 0, width, height });
  }
  frontCoverPage.drawText(pdfData.title, { x: 50, y: height - 100, size: 50, color: rgb(0, 0, 0) });
  frontCoverPage.drawText(`by ${pdfData.author}`, { x: 50, y: height - 150, size: 25, color: rgb(0, 0, 0) });

   for (const page of pdfData.pages) {
    const pdfPage = pdfDoc.addPage();
    if (page.backgroundImage) {
      const imgBytes = fs.readFileSync(page.backgroundImage);
      const img = await pdfDoc.embedJpg(imgBytes);
      pdfPage.drawImage(img, { x: 0, y: 0, width, height });
    }
    pdfPage.drawText(page.content, { x: 50, y: height - 100, size: 20, color: rgb(0, 0, 0), align: page.alignment });
  }

   const backCoverPage = pdfDoc.addPage();
  if (pdfData.backCoverImage) {
    const imgBytes = fs.readFileSync(pdfData.backCoverImage);
    const img = await pdfDoc.embedJpg(imgBytes);
    backCoverPage.drawImage(img, { x: 0, y: 0, width, height });
  }

  const pdfBytes = await pdfDoc.save();
  return pdfBytes;
};

module.exports = { generatePDF };
