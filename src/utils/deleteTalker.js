const fs = require('fs').promises;
const path = require('path');

const deleteTalker = async (dataFiltered) => {
  try {
    fs.writeFile(path.resolve(__dirname, '..', 'talker.json'), JSON.stringify(dataFiltered));
  } catch (err) {
    console.log(`Erro ao escrever no arquivo: ${err.message}`);
  }
};

module.exports = deleteTalker;