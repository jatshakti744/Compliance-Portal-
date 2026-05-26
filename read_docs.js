const fs = require('fs');
const mammoth = require('mammoth');
const xlsx = require('xlsx');

async function readFiles() {
    try {
        console.log("\n=== DOCX ===");
        try {
            const docxResult = await mammoth.extractRawText({path: '_file6a13d03de2805-RAGCP_Detailed_Functionality_Workflow.docx'});
            console.log(docxResult.value.substring(0, 3000));
        } catch (e) { console.error(e) }

        console.log("\n=== XLSX ===");
        try {
            const workbook = xlsx.readFile('_file6a13d03de9db8-RA_Compliance_Penalty_Matrix.xlsx');
            const sheetName = workbook.SheetNames[0];
            const sheet = workbook.Sheets[sheetName];
            const xlsxData = xlsx.utils.sheet_to_json(sheet);
            console.log(JSON.stringify(xlsxData).substring(0, 3000));
        } catch (e) { console.error(e) }
    } catch (err) {
        console.error(err);
    }
}
readFiles();
