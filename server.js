const http = require('http');
const fs = require('fs');
const path = require('path');

// Função para ler o arquivo offsets.json
const readOffsetsFile = () => {
    const filePath = path.join(__dirname, 'offsets.json');
    const fileContent = fs.readFileSync(filePath, 'utf8');
    return JSON.parse(fileContent);
};

// Criar o servidor HTTP
const server = http.createServer((req, res) => {
    if (req.url === '/offsets' && req.method === 'GET') {
        const offsets = readOffsetsFile();

        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify(offsets));
    } else {
        res.writeHead(404, { 'Content-Type': 'text/plain' });
        res.end('Página não encontrada');
    }
});

// Iniciar o servidor na porta 3000
const PORT = 3000;
server.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
});