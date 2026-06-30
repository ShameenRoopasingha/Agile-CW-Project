import { PDFDocument } from 'pdf-lib';
import fs from 'fs/promises';

async function run() {
  try {
    const jpgImageBytes = await fs.readFile('C:\\Users\\shame\\.gemini\\antigravity-ide\\brain\\1aacae00-23e8-4d40-82e8-f4a5a6790fb1\\media__1782234729957.jpg');
    const pdfDoc = await PDFDocument.create();
    const jpgImage = await pdfDoc.embedJpg(jpgImageBytes);
    const jpgDims = jpgImage.scale(1);

    const page = pdfDoc.addPage([jpgDims.width, jpgDims.height]);
    page.drawImage(jpgImage, {
      x: 0,
      y: 0,
      width: jpgDims.width,
      height: jpgDims.height,
    });

    const pdfBytes = await pdfDoc.save();
    await fs.writeFile('E:\\Academic\\Bsc CAAI\\Agile\\CW\\waste management\\mwm\\public\\Waste_Segregation_Guide.pdf', pdfBytes);
    console.log('PDF created successfully!');
  } catch(e) {
    console.error(e);
  }
}
run();
