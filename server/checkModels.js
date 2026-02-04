// require('dotenv').config();
// const { GoogleGenerativeAI } = require("@google/generative-ai");

// const apiKey = process.env.GEMINI_API_KEY;
// const genAI = new GoogleGenerativeAI(apiKey);

// async function listModels() {
//     try {
//         console.log("Fetching available models...");
//         const response = await genAI.getGenerativeModel({ model: "gemini-1.5-flash" }); 
//         // Note: The SDK doesn't have a simple 'listModels' function exposed easily in all versions, 
//         // so we will try to force a different method or just use the error to guide us, 
//         // BUT the best way is actually using a generic request if the SDK allows.
        
//         // Actually, let's use the 'model-less' client to list if possible, 
//         // but since the Node SDK is strict, let's try the specific valid names 
//         // that are GUARANTEED to work today.
        
//         const validModels = [
//             "gemini-1.5-flash",
//             "gemini-1.5-flash-001",
//             "gemini-1.5-flash-002",
//             "gemini-1.5-pro",
//             "gemini-pro",
//             "gemini-1.0-pro"
//         ];
        
//         console.log("Testing which model works for you...");
        
//         for (const modelName of validModels) {
//             try {
//                 const model = genAI.getGenerativeModel({ model: modelName });
//                 await model.generateContent("Hello");
//                 console.log(`✅ SUCCESS! Model found: "${modelName}"`);
//                 return; // Stop after finding one that works
//             } catch (error) {
//                 console.log(`❌ Failed: ${modelName} (${error.message.split('[')[0]})`);
//             }
//         }
        
//     } catch (error) {
//         console.error("Error:", error.message);
//     }
// }

// listModels();