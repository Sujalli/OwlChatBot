const express = require('express');
const path = require('path');
const app = express();
const getBotResponse = require('./chatbot');

app.use(express.static('public'));
app.use(express.json());

app.post('/chat', (req, res) => {
  const userChoice = req.body.message;
  const botReply = getBotResponse(userChoice);
  res.json(botReply);
});

app.listen(3000, () => console.log('✅ Chatbot running at http://localhost:3000'));
