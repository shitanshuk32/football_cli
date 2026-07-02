// Error middleware
const errorHandler = (error, req, res, next) => {
  const statusCode = error.statusCode || 500;

  return res.status(statusCode).json({
    success: false,
    message: error.message || "Internal Server Error",
  });
};

// Export the error handler
module.exports = errorHandler;
