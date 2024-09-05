const defaultOptions = {
    flag: 'a+',
    encoding: 'UTF-8',
    highWaterMark: 64,
    autoClose: true
  };

export const readFileChunks = async (filePath)=> {
    const chunks = [];
    const readStream = fs.createReadStream(filePath, defaultOptions);
    
    await readStream.on('data', (chunk) => {      
      chunks.push(chunk.toString());      
    });
    
    return chunks;
};

export const readFile = async (filePath) => {     
    const result = await fs.readFileSync(filePath, 'utf8')
      .catch(e => console.log(e));
    return result;
};

export const getFileProperties = async (filePath) => {
    return await fs.statSync(filePath);
};
