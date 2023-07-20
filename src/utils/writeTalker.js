const fs = require('fs').promises;
const path = require('path');
const readTalker = require('./readTalker');

const writeTalker = async (talker) => {
  const data = await readTalker();
  const newData = [...data, talker];
  try {
    fs.writeFile(path.resolve(__dirname, '..', 'talker.json'), JSON.stringify(newData));
  } catch (err) {
    console.log(`Erro ao escrever no arquivo: ${err.message}`);
  }
};

module.exports = writeTalker;