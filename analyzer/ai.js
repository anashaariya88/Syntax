require("dotenv").config();

const { GoogleGenAI } = require("@google/genai");


const ai = new GoogleGenAI({
    apiKey: process.env.GEMINI_API_KEY,
});


async function getAIAnalysis(code) {

    const response =
        await ai.models.generateContent({

            model: "gemini-3.6-flash",

            contents: `
You are SyntaxX, a green-coding AI assistant.

Analyze this JavaScript code:

${code}

Explain:

1. WHY it is inefficient
2. Give an ALTERNATIVE optimized version
3. Explain the BENEFIT

Keep the response short and easy to understand.

Focus on computational efficiency, unnecessary operations,
time complexity, memory usage, and unnecessary I/O.
`,
        });


    return response.text;
}


module.exports = {
    getAIAnalysis,
};