const express = require('express')
// const f1 = require('./fonts/Delighter.otf')
// const f2 = require('./fonts/BakingLion.otf')
const app = express()
const PDFDocument = require('pdfkit');
const fs = require('fs');


const port = process.env.PORT || 3000;
app.get('/create-pdf', async (req, res) => {
    const doc = new PDFDocument();
    doc.pipe(fs.createWriteStream('output.pdf'));
    doc
    .image('./images/img.jpg', (doc.page.width - doc.page.margins.left - 50) / 2, doc.y, { width: 100 })
    .moveDown(4)
    .font('./fonts/Delighter.otf')
    .fontSize(20)
    .text('some data under image' , {underline: true , strike: false , link:'https://www.google.com'})

    doc.addPage()
        .fontSize(25)
        .text('Here is some vector graphics...', 100, 100);
    doc.addPage()
        .fillColor("blue")
        .text('Here is a link!', 100, 100)
        .underline(100, 100, 160, 27, { color: "#0000FF" })
        .link(100, 100, 160, 27, 'http://google.com/');
    doc.end();

    res.send('Hello World')
})

app.listen(port, () => {
    console.log(`listen on port ${port}`);
})