import fs from "fs";
import pdfParse from "pdf-parse";
import {RecursiveCharacterTextSplitter} from "langchain/text_splitter";
import {MemoryVectorStore} from "langchain/vectorstores/memory";
import {OpenAIEmbeddings} from "@langchain/openai";
export const loadPdf = async (path: string): Promise<string> => {
  const dataBuffer = fs.readFileSync(path);
  const pdfData = await pdfParse(dataBuffer);
  return pdfData.text;
};

export const embedPdf = async () =>{
    const text = await loadPdf("data/Resume_web.pdf");
    const splitter = new RecursiveCharacterTextSplitter({
        chunkSize:1000,
        chunkOverlap:100
    });

    const chunks =  await splitter.createDocuments([text]);

    //genrate embeddings and store in vector DB
    const vectorstore = await MemoryVectorStore.fromDocuments(
        chunks,
        new OpenAIEmbeddings()
    )
    return vectorstore;
}