# ResumeGenie

ResumeGenie is a beginner-friendly web application that transforms a few simple inputs into a polished, professional resume. It uses the OpenAI API to expand shorthand notes into full sentences and apply consistent style and grammar.

## Features
- Simple form for name, contact information, experience, skills and education
- AI-powered text generation to polish entries
- Three resume templates with live theme color customization
- Download generated resume using the browser's print-to-PDF feature

## Development

Install dependencies:
```
npm install
```

Start the server:
```
npm start
```

The app is served at [http://localhost:3000](http://localhost:3000).

Set the `OPENAI_API_KEY` environment variable to enable AI-powered text generation. Without it, the app falls back to returning the raw text provided.
