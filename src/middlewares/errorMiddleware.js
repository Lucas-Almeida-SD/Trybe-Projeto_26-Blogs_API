const errorMiddleware = (err, _req, res, _next) => {
  const { code, message } = err;

  if (code) return res.status(code).json({ message });

  res.status(500).json({ message });
};

module.exports = errorMiddleware;
