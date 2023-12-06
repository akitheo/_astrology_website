const express = require('express');
const axios = require('axios');

const app = express();
const port = 3000;

app.use(express.json());

app.post('/zoom-api', async (req, res) => {
  try {
    const response = await axios.post('https://api.zoom.us/v2/users/me/meetings', req.body, {
      headers: {
        'Content-Type': 'application/json',
        // Add any other necessary headers
      },
      auth: {
        username: '7U2vwSGGTkej1mvdGmC5TQ',
        password: 'BmyzhK4Op88R66KRgouHGhMgPVdJcZA8',
      },
    });

    res.json(response.data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
