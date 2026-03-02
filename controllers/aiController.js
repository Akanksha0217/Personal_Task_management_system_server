import OpenAI from "openai";
import Task from "../models/Task.js";
import mongoose from "mongoose";

export const chatWithAI = async (req, res) => {

  const { message, userId } = req.body;

  const client = new OpenAI({
    apiKey: process.env.GROQ_API_KEY,
    baseURL: "https://api.groq.com/openai/v1",
  });

  try {

    if (!message) {
      return res.json({
        reply: "Hello 👋 I am your AI assistant. How can I help you?",
      });
    }

    console.log("USER ID:", userId);

    let tasks = [];

    if (userId && mongoose.Types.ObjectId.isValid(userId)) {
      tasks = await Task.find({ userId });
    }

    console.log("TASKS:", tasks);

    const aiResponse = await client.chat.completions.create({
      model: "llama-3.1-8b-instant",
      messages: [
        {
          role: "system",
          content:
            "You are a task manager assistant. Give short and simple replies.",
        },
        {
          role: "user",
          content: `
User message: ${message}
Tasks: ${JSON.stringify(tasks)}
`,
        },
      ],
      temperature: 0.3,
      max_tokens: 120, 
    });

    res.json({
      reply: aiResponse.choices[0].message.content,
    });

  } catch (err) {
    console.log(err.message);
    res.status(500).json({ error: err.message });
  }
};