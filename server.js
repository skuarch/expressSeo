import express from 'express';
import fs from 'fs';
import { readFile } from './readFile.js';


const HTTP_OK = 200;
const chunksAndHeader = readFile();
const html = fs.readFileSync('./index.html', 'utf8');


const app = express();

app.get('/**', async (req, res) => {

  console.log(req.method);
  console.log(req.body);
  console.log(req.url);
  console.log(req.baseUrl);
  console.log(req);  

  res.writeHead(HTTP_OK, chunksAndHeader.header);
  chunksAndHeader.fileChunks.chunks.forEach(data => {
    res.write(data);
  });
  
  res.end();
});

app.get('/two', (req, res) => {
  res.writeHead(HTTP_OK, {
    'Content-Type': 'text/html',
    'Content-Length': html.length
   });
  res.write(html);
  
  
  res.end();
});

app.listen(3001, _ => {
  console.log('server running http://localhost:3001');
});
