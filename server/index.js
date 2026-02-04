require('dotenv').config();
const connectDB = require('./config/db');
const Flashcard = require('./models/Flashcard');
const express = require('express');
const cors = require('cors');
const multer = require('multer');
const pdfParse = require('pdf-parse');
const { generateFlashcards } = require('./services/aiService');

const app = express();
app.use(cors());
app.use(express.json());
connectDB();

const upload = multer({ storage: multer.memoryStorage() });

app.post('/api/upload', upload.single('file'), async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).send("No file uploaded");
        }

        console.log("File received:", req.file.originalname);

        // Extract Text from PDF
        const data = await pdfParse(req.file.buffer);
        const extractedText = data.text;

        if (!text || text.length < 10) {
            return res.status(400).json({ error: "PDF has no readable text." });
        }

        console.log("Extracted Text Length:", extractedText.length);
        console.log("Text extracted. Sending to AI...");

        // 2. Generate Flashcards (Limit text to 3000 chars for speed/safety)
        const generatedCards = await generateFlashcards(extractedText.substring(0, 3000));
        console.log("AI success! Generated", generatedCards.length, "cards.");

        // 3. Prepare Data for Database
        // We add the 'deckName' to every card so we know which PDF they came from
        const cardsWithDeck = generatedCards.map(card => ({
            deckName: req.file.originalname,
            question: card.question,
            answer: card.answer
        }));

        // 4. Save to MongoDB
        await Flashcard.insertMany(cardsWithDeck);
        console.log(`Saved ${cardsWithDeck.length} cards to database.`);
       
    } catch (error) {
        console.error("Error processing PDF:", error);
        res.status(500).send("Server Error");
    }
});

app.listen(5000, () => {
    console.log('Server is running on port 5000');
});