const express = require('express');
const cors = require('cors');
const { OpenAI } = require('openai');

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.static('public'));

// Instantiate OpenAI client if API key is set
let openai;
if (process.env.OPENAI_API_KEY) {
  openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
}

app.post('/api/generate', async (req, res) => {
  const { name, contact, experience, skills, education } = req.body;

  const prompt = `Create a polished resume section with the following details:\n\nName: ${name}\nContact: ${contact}\nWork Experience: ${experience}\nSkills: ${skills}\nEducation: ${education}`;

  try {
    if (!openai) {
      // Fallback when no API key is provided
      return res.json({ text: `Resume for ${name}\nContact: ${contact}\nExperience: ${experience}\nSkills: ${skills}\nEducation: ${education}` });
    }

    const completion = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: [
        { role: 'system', content: 'You are a helpful assistant that writes professional resumes.' },
        { role: 'user', content: prompt }
      ]
    });

    const text = completion.choices[0].message.content;
    res.json({ text });
  } catch (err) {
    res.status(500).json({ error: 'Failed to generate resume text.' });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`ResumeGenie server running on port ${PORT}`));
