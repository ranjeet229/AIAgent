import { embedPdf } from "./ingest";
import {ChatOpenAI} from "@langchain/openai";
import {RetrievalQAChain} from "langchain/chains";


let qaChain : RetrievalQAChain;

export const initAgent = async () =>{
    const vectorstore= await embedPdf();
    //RAG

    const retriever = vectorstore.asRetriever();

    //choose model
    const model = new ChatOpenAI({
        openAIApiKey: process.env.OPENAI_API_KEY,
        modelName:"gpt-4.o",
        temperature: 0 //kitna jaldi response chahiye
    });

    qaChain = RetrievalQAChain.fromLLM(model, retriever);
}

export const askAgent = async (question:string) : Promise<string> =>{
   if(!qaChain){
    throw new Error("Agent not initialized. Please call initAgent first.");
   } 
   const res = await qaChain.invoke({ query: question});
   return res.text;
}