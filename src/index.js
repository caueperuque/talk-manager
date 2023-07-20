const express = require('express');
const readTalker = require('./utils/readTalker');
const validateEmail = require('./middlewares/validateEmail');
const generateToken = require('./utils/generateToken');
const validatePassword = require('./middlewares/validatePassword');

const app = express();
app.use(express.json());

const HTTP_OK_STATUS = 200;
const PORT = process.env.PORT || '3001';

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(HTTP_OK_STATUS).send();
});

app.listen(PORT, () => {
  console.log('Online');
});

app.get('/talker', async (req, res) => {
  const talkers = await readTalker();

  res.status(200).json(talkers);
});

app.get('/talker/:id', async (req, res) => {
  const { id } = req.params;
  const talkers = await readTalker();

  const findTalker = talkers.find((talker) => talker.id === Number(id));

  if (!findTalker) res.status(404).json({ message: 'Pessoa palestrante não encontrada' });

  res.status(200).json(findTalker);
});

app.post('/login', validateEmail, validatePassword, (req, res) => {
  const token = generateToken();
  res.status(200).json({ token });
});
