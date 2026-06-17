// Async handler
const asyncHandler = (fn) => {
  return (req, res, next) => {
    Promise.resolve(fn(req, res, next)).catch(next);
  };
};

module.exports = asyncHandler;

// Sync functions throws errors immediately.
// Async functions return a rejected promise.
/* Async handler catches errors and passes 
them to the error middleware.*/
