const express = require('express');
const axios = require('axios');
const sharp = require('sharp');
const app = express();
const port = 3000;

app.use(express.json());

app.get('/up', async (req, res) => {
    res.status(200).json({ status: 'ok' });
})

app.post('/webp_to_jpeg', async (req, res) => {
    try {
        if(req.headers.apikey != 'xGU155ba4rU3') {
            res.status(403).json({ error: 'Unauthorized' });
        }

        const { image_url } = req.body;

        // Baixar a imagem da URL
        const response = await axios.get(image_url, { responseType: 'arraybuffer' });
        
        // Converter a imagem de WEBP para JPEG usando Sharp
        const jpegBuffer = await sharp(response.data)
            .toFormat('jpeg')
            .toBuffer();
        
        // Converter buffer para Base64
        const base64Image = jpegBuffer.toString('base64');
        
        res.json({ base64Image: `data:image/jpeg;base64,${base64Image}` });
        
    } catch (error) {
        res.status(500).json(error);
    }
});

// Iniciar o servidor
app.listen(port, () => console.log(`Servidor rodando`));
