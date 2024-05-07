const { constants } = require("../constants/constants");
const { VALIDATION_ERROR, NOT_FOUND, UNAUTHORIZED, FORBIDDEN, SERVER_ERROR } =
  constants;

const errorHandler = (err, req, res, next) => {
  const statusCode = res.statusCode ? res.statusCode : 500;
  switch (statusCode) {
    case NOT_FOUND:
      res.json({
        title: "Not Found",
        message: err.message,
        stackTrace: err.stack,
      });
      break;
    case VALIDATION_ERROR:
      res.json({
        title: "Validation Error",
        message: err.message,
        stackTrace: err.stack,
      });
      break;
    case UNAUTHORIZED:
      res.json({
        title: "Unauthorized User",
        message: err.message,
        stackTrace: err.stack,
      });
      break;
    case FORBIDDEN:
      res.json({
        title: "Forbidden",
        message: err.message,
        stackTrace: err.stack,
      });
      break;
    case SERVER_ERROR:
      res.json({
        title: "Server Error",
        message: err.message,
        stackTrace: err.stack,
      });
      break;
    default:
      console.log("No Error, All Good!!");
      break;
  }
};

module.exports = errorHandler;
