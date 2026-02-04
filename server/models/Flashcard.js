const mongoose = require('mongoose');

const FlashcardSchema = new mongoose.Schema({
  // Group cards by the filename (e.g. "Lecture1.pdf")
  deckName: { 
    type: String, 
    required: true 
  },
  
  question: { 
    type: String, 
    required: true 
  },
  
  answer: { 
    type: String, 
    required: true 
  },

  // --- SPACED REPETITION FIELDS ---
  // Box 1 = New/Hard, Box 5 = Mastered
  box: { 
    type: Number, 
    default: 1 
  }, 
  
  // When should the user see this card next? Default = Now.
  nextReviewDate: { 
    type: Date, 
    default: Date.now 
  }
});

module.exports = mongoose.model('Flashcard', FlashcardSchema);