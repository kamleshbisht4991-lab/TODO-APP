// Runs when no route matched
const notFound = (req, res, next) => {
  res.status(404);
  next(new Error(`Route not found: ${req.originalUrl}`));
};

// Runs whenever an error is passed with next(err). Has 4 parameters!
const errorHandler = (err, req, res, next) => {
  let status = res.statusCode && res.statusCode !== 200 ? res.statusCode : 500;

  // Mongoose validation error (e.g. empty text)
  if (err.name === "ValidationError") {
    status = 400;
  }

  res.status(status).json({
    error: err.message,
    ...(process.env.NODE_ENV !== "production" && { stack: err.stack }),
  });
};

module.exports = { notFound, errorHandler };