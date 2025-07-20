import dotenv from "dotenv";
import {ChatOpenAI} from "@langchain/openai";
import express from "express";
import { initAgent, askAgent } from "./agent";

dotenv.config();
const model = new ChatOpenAI({
        openAIApiKey: process.env.OPENAI_API_KEY,
        modelName:"gpt-4.o",
        temperature: 0 //kitna jaldi response chahiye
    });

const app = express();
app.use(express.json());

app.post("/ask", async (req, res) => {
  const { question } = req.body;

  if (!question) {
    return res.status(400).json({ error: "Question is required" });
  }

  try {
    const answer = await askAgent(question);
    return res.status(200).json({ answer });
  } catch (error) {
    console.error("Error in /ask route:", error);
    return res.status(500).json({ error: "Something went wrong" });
  }
});



app.listen(3000, async () => {
  console.log("Server is running on port 3000");
  await initAgent();
});
