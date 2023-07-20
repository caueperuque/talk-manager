const fs = require('fs').promises;

const readTalker = async () => {
  const talkers = await fs.readFile('src/talker.json', 'utf-8');

  return JSON.parse(talkers);
};

module.exports = readTalker;