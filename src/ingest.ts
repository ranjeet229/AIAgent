import fs from "fs";
import pdfParse from "pdf-parse";

export const loadPdf = async (path:string) : Promise<string> =>{
    const dataBuffer = fs.readFileSync(path);

    const pdfData = await pdfParse(dataBuffer);
    console.log(pdfData);

    return "Dafa";
}
loadPdf("data/Resume_web.pdf");
