const validateWatchedAt = (req, res, next) => {
  const { talk: { watchedAt } } = req.body;
  const regex = /^(0?[1-9]|[12][0-9]|3[01])[/](0?[1-9]|1[012])[/]\d{4}$/;
  if (!watchedAt) res.status(400).json({ message: 'O campo "watchedAt" é obrigatório' });
  if (!regex.test(watchedAt)) {
    return res.status(400).json({ message: 'O campo "watchedAt" deve ter o formato "dd/mm/aaaa"' });
  }
  
  return next();
};

module.exports = validateWatchedAt;