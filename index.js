const express = require('express');
const fetch = require('node-fetch');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());

app.get('/', (req, res) => {
  res.send('✅ Wehewehe Proxy Server is running.');
});

app.get('/define', async (req, res) => {
  const word = req.query.word;
  if (!word) return res.status(400).send("Missing 'word' query parameter.");

  console.log(`🔍 Looking up: ${word}`);

  try {
    const response = await fetch(`https://www.wehewehe.org/gsdl2.7/cgi-bin/hdict?e=q-0-0-0--off-0--20--1--txt---0-1l--1-en-50--20-home-url-1-00010utfZz-1&a=q&h=${encodeURIComponent(word)}&d=D1`);
    const html = await response.text();
    res.send(html);
  } catch (error) {
    console.error('❌ Proxy error:', error);
    res.status(500).send('Internal error');
  }
});

app.listen(PORT, () => {
  console.log(`✅ Server is running on port ${PORT}`);
});
