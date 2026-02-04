const { GoogleGenerativeAI } = require("@google/generative-ai");

// ADD THIS DEBUG LOG:
console.log("Debug: API Key is ->", process.env.GEMINI_API_KEY ? "LOADED" : "MISSING");

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

const model = genAI.getGenerativeModel({ model: "gemini-flash-latest" });

async function generateFlashcards(text)
{
    // 1. The Prompt: We tell the AI exactly what to do and how to format it.
    const prompt =`
        You are a teacher. Create 10 flashcards from the text below. 
        Return strictly a JSON Array of objects in this format:
        [{"question": "...", "answer": "..."}]

        Do not include markdown formatting (like \`\`\`json). 
        Do not include any intro text. Just the array.

        Text to process:
        ${text}`;

    // 2. Call the API
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const textResponse = response.text();

    console.log("Gemini Response:",textResponse);

    // 3. Clean the response (Remove markdown if the AI adds it)
    // This regex removes ```json and ``` from the start/end
    const cleanedText = textResponse.replace(/```json/g,"").replace(/```/g,"");

    // 4. Parse the string into a real JavaScript Array
    return JSON.parse(cleanedText);
}

module.exports = { generateFlashcards };