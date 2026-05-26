const fs = require('fs');
const PDFParser = require("pdf2json");

const pdfParser = new PDFParser(this, 1);

pdfParser.on("pdfParser_dataError", errData => console.error(errData.parserError) );
pdfParser.on("pdfParser_dataReady", pdfData => {
    console.log(pdfParser.getRawTextContent().substring(0, 5000));
});

pdfParser.loadPDF("ACFrOgAlbbf6lh35E-jEHUHb__RTPA3zdLFZDUBC3Z8E8x3lAm-GGZZ_-FI_825r1cQIf3Co-OmVDfTg11yIJP2Vr-HU6QrcwadwwYzHPR8LICKPyDGHG_ScPIaNGREogmdLyo36fDuKngIcJBO3.pdf");
