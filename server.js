const express = require('express');
const multer = require('multer');
const path = require('path');
const { convertFile } = require('./src/file-converter');

const app = express();
const upload = multer({ dest: 'uploads/' });

app.use(express.static('src'));
app.use(express.json());

app.post('/api/convert', upload.single('file'), async (req, res) => {
    try {
        if (!req.file) {
            return res.json({ success: false, error: 'Nenhum arquivo enviado' });
        }

        const filePath = req.file.path;
        const fileName = req.file.originalname;
        const ext = path.extname(fileName).toLowerCase();

        console.log('Arquivo recebido:', fileName);
        console.log('Extensão:', ext);

        // Verifica formato
        if (!['.txt', '.pdf', '.epub', '.mobi', '.azw'].includes(ext)) {
            return res.json({ success: false, error: `Formato não suportado: ${ext}` });
        }

        const text = await convertFile(filePath, ext);

        // Remove arquivo temporário
        const fs = require('fs');
        fs.unlinkSync(filePath);

        res.json({
            success: true,
            text: text,
            fileName: fileName
        });
    } catch (error) {
        console.error('Erro:', error);
        res.json({ success: false, error: error.message });
    }
});

app.listen(8000, () => {
    console.log('Servidor rodando em http://localhost:8000');
});