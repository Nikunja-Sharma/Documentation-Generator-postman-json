import OpenAI from "openai";
import dotenv from "dotenv";
dotenv.config();
const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
    baseURL: "https://openrouter.ai/api/v1",
});

const completion = await openai.chat.completions.create({
    model: "google/gemini-2.0-flash-exp:free",
    messages: [
        { role: "system", content: "You are a helpful assistant." },
        {
            role: "user",
            content: "who is the president of the united states?",
        },
    ],
});

console.log(completion.choices[0].message);