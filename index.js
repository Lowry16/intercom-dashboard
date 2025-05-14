const express = require('express');
const axios = require('axios');
require('dotenv').config();

const app = express();
const PORT = 3000;

app.get('/api/performance', async (req, res) => {
  try {
    const response = await axios.get('https://api.intercom.io/conversations', {
      headers: {
        Authorization: `Bearer ${process.env.INTERCOM_TOKEN}`,
        Accept: 'application/json'
      }
    });

    const conversations = response.data.conversations.map(conv => ({
      id: conv.id,
      created_at: conv.created_at,
      user: conv.user,
      assignee: conv.assignee
    }));

    res.json(conversations);
  } catch (error) {
    console.error('Error:', error.message);
    res.status(500).json({ error: 'Failed to fetch data' });
  }
});

app.listen(PORT, () => {
  console.log(`Running at http://localhost:${PORT}`);
});
