const errorHandler = (err, req, res, next) => {
  res.status(500).json({
    errors: [
      'Ocorreu um erro! Por favor, tente novamente mais tarde.',
    ],
  });
};

module.exports = errorHandler;
