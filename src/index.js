const express = require('express');
const readTalker = require('./utils/readTalker');
const validateEmail = require('./middlewares/validateEmail');
const generateToken = require('./utils/generateToken');
const validatePassword = require('./middlewares/validatePassword');
const validateAuth = require('./middlewares/validateAuth');
const validateName = require('./middlewares/validateName');
const validateAge = require('./middlewares/validateAge');
const validateWatchedAt = require('./middlewares/validateWatchedAt');
const validateRate = require('./middlewares/validateRate');
const validateTalk = require('./middlewares/validateTalk');
const writeTalker = require('./utils/writeTalker');
const updateTalker = require('./utils/updateTalkers');
const deleteTalker = require('./utils/deleteTalker');

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

app.post('/talker',
  validateAuth,
  validateName,
  validateAge,
  validateTalk,
  validateWatchedAt,
  validateRate,
  async (req, res) => {
  const personSignup = req.body;
  const talkers = await readTalker();
  personSignup.id = talkers[talkers.length - 1].id + 1;

  await writeTalker(personSignup);
  res.status(201).json(personSignup);
});

app.put('/talker/:id',
  validateAuth,
  validateName,
  validateAge,
  validateTalk,
  validateWatchedAt,
  validateRate,
  async (req, res) => {
    const { id } = req.params;
    const talkers = await readTalker();
    const newTalker = req.body;
    newTalker.id = Number(id);

    const filteredTalker = talkers.filter((talker) => talker.id !== Number(id));
    const haveTalkerWithId = talkers.find((talker) => talker.id === Number(id));

    if (haveTalkerWithId === undefined) {
      return res.status(404).json({ message: 'Pessoa palestrante não encontrada' });
    }
    
    await updateTalker(filteredTalker, newTalker);
    
    res.status(200).json(newTalker);
});

app.delete('/talker/:id', validateAuth, async (req, res) => {
  const { id } = req.params;
  const talkers = await readTalker();

  const filteredTalkers = talkers.filter((talker) => talker.id !== Number(id));
  await deleteTalker(filteredTalkers);
  return res.status(204).json();
});
