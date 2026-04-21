const express = require('express');
const cors = require('cors');
const http = require('http');
const path = require('path');
const app = express();

app.use(cors());
app.use(express.static(path.join(__dirname)));

const ESP32_IP = '192.168.68.106';

app.get('/api/esp32/next', (req, res) => {
    console.log('Chamando /api/next do ESP32...');
    http.get(`http://${ESP32_IP}/api/next`, (resp) => {
        console.log('Resposta recebida do ESP32');
        resp.pipe(res);
    }).on('error', (err) => {
        console.log('Erro ao conectar ao ESP32:', err.message);
        res.status(500).send('Erro ao conectar ao ESP32');
    });
});

app.get('/api/esp32/prev', (req, res) => {
    console.log('Chamando /api/prev do ESP32...');
    http.get(`http://${ESP32_IP}/api/prev`, (resp) => {
        console.log('Resposta recebida do ESP32');
        resp.pipe(res);
    }).on('error', (err) => {
        console.log('Erro ao conectar ao ESP32:', err.message);
        res.status(500).send('Erro ao conectar ao ESP32');
    });
});

app.listen(3000, () => console.log('Proxy rodando em http://localhost:3000'));