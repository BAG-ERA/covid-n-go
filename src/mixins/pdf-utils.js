/* eslint-disable no-alert */
import { PDFDocument, StandardFonts } from 'pdf-lib';

const ys = {
  travail: 578,
  achats: 533,
  sante: 477,
  famille: 435,
  handicap: 396,
  sport_animaux: 358,
  convocation: 295,
  missions: 255,
  enfants: 211,
};

function getIdealFontSize(font, text, maxWidth, minSize, defaultSize) {
  let currentSize = defaultSize;
  let textWidth = font.widthOfTextAtSize(text, defaultSize);

  while (textWidth > maxWidth && currentSize > minSize) {
    // eslint-disable-next-line no-plusplus
    textWidth = font.widthOfTextAtSize(text, --currentSize);
  }

  return textWidth > maxWidth ? null : currentSize;
}

async function generatePdf(profile, reasons, pdfBase, qrcode, qrdata) {
  const {
    lastname,
    firstname,
    birthday,
    placeofbirth,
    address,
    zipcode,
    city,
    datesortie,
    heuresortie,
  } = profile;

  const existingPdfBytes = await fetch(pdfBase).then((res) => res.arrayBuffer());

  const pdfDoc = await PDFDocument.load(existingPdfBytes);

  // set pdf metadata
  pdfDoc.setTitle('COVID-19 - Déclaration de déplacement');
  pdfDoc.setSubject('Attestation de déplacement dérogatoire');
  pdfDoc.setKeywords([
    'covid19',
    'covid-19',
    'attestation',
    'déclaration',
    'déplacement',
    'officielle',
    'gouvernement',
  ]);
  pdfDoc.setProducer('DNUM/SDIT');
  pdfDoc.setCreator('');
  pdfDoc.setAuthor("Ministère de l'intérieur");
  const page1 = pdfDoc.getPages()[0];

  const font = await pdfDoc.embedFont(StandardFonts.Helvetica);
  const drawText = (text, x, y, size = 11) => {
    page1.drawText(text, {
      x, y, size, font,
    });
  };

  drawText(`${firstname} ${lastname}`, 119, 696);
  drawText(birthday, 119, 674);
  drawText(placeofbirth, 297, 674);
  drawText(`${address} ${zipcode} ${city}`, 133, 652);

  reasons
    .split(', ')
    .forEach((reason) => {
      drawText('x', 78, ys[reason], 18);
    });

  let locationSize = getIdealFontSize(font, city, 83, 7, 11);

  if (!locationSize) {
    alert(
      'Le nom de la ville risque de ne pas être affiché correctement en raison de sa longueur. '
        + 'Essayez d\'utiliser des abréviations ("Saint" en "St." par exemple) quand cela est possible.',
    );
    locationSize = 7;
  }

  drawText(city, 105, 177, locationSize);
  drawText(`${datesortie}`, 91, 153, 11);
  drawText(`${heuresortie}`, 264, 153, 11);

  // Date création
  drawText('Date de création:', 479, 120, 6);
  drawText(qrdata[0], 470, 124, 6);
  const qrImage = await pdfDoc.embedPng(qrcode);
  page1.drawImage(qrImage, {
    x: page1.getWidth() - 156,
    y: 100,
    width: 92,
    height: 92,
  });

  pdfDoc.addPage();
  const page2 = pdfDoc.getPages()[1];
  page2.drawImage(qrImage, {
    x: 50,
    y: page2.getHeight() - 350,
    width: 300,
    height: 300,
  });

  const pdfBytes = await pdfDoc.save();

  return new Blob([pdfBytes], { type: 'application/pdf' });
}

export default generatePdf;
