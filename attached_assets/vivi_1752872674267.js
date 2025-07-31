
const express = require("express");
const router = express.Router();
const { Configuration, OpenAIApi } = require("openai");

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

router.post("/generate", async (req, res) => {
  const { prompt } = req.body;
  try {
    const completion = await openai.createChatCompletion({
      model: "gpt-4",
      messages: [
        { role: "system", content: "You are ViVi, an AI marketing assistant." },
        { role: "user", content: prompt },
      ],
    });
    res.json({ text: completion.data.choices[0].message.content });
  } catch (error) {
    console.error(error);
    res.status(500).send("Error generating content");
  }
});

module.exports = router;
