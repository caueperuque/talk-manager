const fs = require('fs').promises;
const path = require('path');

const updateTalker = async (dataFiltered, talker) => {
  const newData = [...dataFiltered, talker];
  try {
    fs.writeFile(path.resolve(__dirname, '..', 'talker.json'), JSON.stringify(newData));
  } catch (err) {
    console.log(`Erro ao escrever no arquivo: ${err.message}`);
  }
};

module.exports = updateTalker;