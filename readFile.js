import fs from 'fs';


export const readFile = ()=> {
    
    const stats = fs.statSync('./index.html');
    const fileSizeInBytes = stats.size;

    const fileChunks = {
      chunks: [],
      fileSize: 0,
      fileName: ''
    }

    fileChunks.fileSize = fileSizeInBytes;

    const HEADER = {
     'Content-Type': 'text/html',
     'Content-Length': fileSizeInBytes
    };

    const chunksAndHeader = {
      fileChunks: fileChunks,
      header: HEADER
    };
    
    const readStream = fs.createReadStream('./index.html', {
      flag: 'a+',
      encoding: 'UTF-8',
      highWaterMark: 64,
      autoClose: true
    });
    
    readStream.on('data', (chunk) => {      
      fileChunks.chunks.push(chunk.toString());      
    });
    
    return chunksAndHeader;

}



