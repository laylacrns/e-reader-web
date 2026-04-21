const fs = require('fs');
const path = require('path');

async function convertFile(filePath, ext) {
    console.log('convertFile recebeu:', filePath);
    console.log('Extensão:', ext);
    
    try {
        if (ext === '.txt') {
            return fs.readFileSync(filePath, 'utf-8');
        } else if (ext === '.pdf') {
            try {
                const pdfParse = require('pdf-parse');
                const dataBuffer = fs.readFileSync(filePath);
                const data = await pdfParse(dataBuffer);
                return data.text || 'PDF carregado';
            } catch(e) {
                return 'PDF detectado mas extração não disponível. Converta para TXT.';
            }
        } else if (ext === '.epub') {
            return 'EPUB detectado mas extração em desenvolvimento. Converta para TXT.';
        } else if (ext === '.mobi' || ext === '.azw') {
            return 'MOBI/AZW detectado mas extração em desenvolvimento. Converta para TXT.';
        } else {
            throw new Error(`Extensão não reconhecida: ${ext}`);
        }
    } catch (error) {
        console.error('Erro ao converter:', error.message);
        return `Erro ao processar arquivo: ${error.message}`;
    }
}

module.exports = { convertFile };