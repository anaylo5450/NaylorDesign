import express from 'express';
import axios from 'axios';

const router = express.Router();

// GET /api/assemblyai/token
router.get('/token', async (req, res) => {
  try {
    // Ask AssemblyAI for a short-lived realtime token
    const { data } = await axios.post(
      'https://api.assemblyai.com/v2/realtime/token',
      { expires_in: 3600 }, // seconds (1 hour). You can shorten to e.g. 900.
      {
        headers: {
          authorization: process.env.ASSEMBLYAI_API_KEY,
          'content-type': 'application/json',
        },
      }
    );

    // Typically returns { token: '...', expires_at: '...' }
    res.json(data);
  } catch (err) {
    console.error('AssemblyAI token error:', err?.response?.data || err.message);
    res.status(500).json({ message: 'Failed to get AssemblyAI token' });
  }
});

export default router;
