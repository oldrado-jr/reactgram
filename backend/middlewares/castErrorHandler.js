const castErrorHandler = (err, req, res, next) => {
  if (err.name === 'CastError') {
    res.status(400).json({
      errors: [
        'Id inválido!',
      ],
    });
    return;
  }

  next(err);
};

module.exports = castErrorHandler;
