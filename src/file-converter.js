const fs = require('fs');
const path = require('path');

async function convertFile(filePath, ext) {
    console.log('convertFile recebeu:', filePath);
    console.log('Extensão:', ext);
    
    try {
        if (ext === '.txt') {
            return fs.readFileSync(filePath, 'utf-8');
        } else if (ext === '.pdf') {
            return 'PDF detectado. Conteúdo em desenvolvimento.';
        } else if (ext === '.epub' || ext === '.mobi' || ext === '.azw') {
            return 'Formato detectado. Conteúdo em desenvolvimento.';
        } else {
            throw new Error(`Extensão não reconhecida: ${ext}`);
        }
    } catch (error) {
        console.error('Erro ao converter:', error);
        throw error;
    }
}

module.exports = { convertFile };