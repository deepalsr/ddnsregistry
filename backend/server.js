const express = require('express');
const multer = require('multer');
const { NFTStorage, File } = require('nft.storage');
const dotenv = require('dotenv');
const cors = require('cors');

dotenv.config();
const app = express();
const upload = multer();
app.use(cors());

const client = new NFTStorage({ token: process.env.NFT_STORAGE_KEY });

app.post('/upload', upload.single('file'), async (req, res) => {
  try {
    const file = new File([req.file.buffer], req.file.originalname, {
      type: req.file.mimetype,
    });
    const cid = await client.storeBlob(file);
    res.json({ cid });
  } catch (error) {
    console.error("Upload failed:", error.message);
    res.status(500).json({ error: 'Upload failed' });
  }
});

app.listen(5000, () => {
  console.log('Server running on http://localhost:5000');
});
