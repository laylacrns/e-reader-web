const fs = require('fs');
const path = require('path');

async function convertFile(filePath, ext) {
    console.log('convertFile recebeu:', filePath);
    console.log('Extensão:', ext);
    
    try {
        if (ext === '.txt') {
            return fs.readFileSync(filePath, 'utf-8');
        } else if (ext === '.pdf') {
            return 'NOTA: Extração de PDF em desenvolvimento.\n\nPor enquanto, use arquivos .txt para melhor compatibilidade.\n\nPara converter seu PDF para texto:\n1. Use um conversor online como pdftotext.com\n2. Ou instale pdftotext: sudo apt install poppler-utils\n3. Então: pdftotext seu_arquivo.pdf seu_arquivo.txt';
        } else if (ext === '.epub' || ext === '.mobi' || ext === '.azw') {
            return 'Formato em desenvolvimento. Use TXT ou PDF por enquanto.';
        } else {
            throw new Error(`Extensão não reconhecida: ${ext}`);
        }
    } catch (error) {
        console.error('Erro ao converter:', error.message);
        throw error;
    }
}

module.exports = { convertFile };