
const express = require('express');
const router = express.Router();
const { Configuration, OpenAIApi } = require('openai');

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY
});
const openai = new OpenAIApi(configuration);

router.post('/generate', async (req, res) => {
  const { prompt } = req.body;

  try {
    const completion = await openai.createChatCompletion({
      model: "gpt-4",
      messages: [
        { role: "system", content: "You are ViVi, an AI marketing strategist..." },
        { role: "user", content: prompt }
      ]
    });

    const output = completion.data.choices[0].message.content;
    res.json({ result: output });
  } catch (err) {
    console.error("ViVi GPT-4 Error:", err);
    res.status(500).json({ error: "ViVi failed to respond." });
  }
});

module.exports = router;
