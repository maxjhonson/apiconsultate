const SendErrorDev = (error, res) => {
  return res.status(error.statusCode).json({
    status: error.status,
    data: {
      message: error.message,
      stack: error.stack,
    },
  });
};

SendErrorProdu = (error, res) => {
  if (err.isOperational) {
    return res.status(error.statusCode).json({
      status: error.status,
      data: {
        message: error.message,
      },
    });
  } else {
    return res.status(error.statusCode).json({
      status: "error",
      data: {
        message: "Una operacion no se pudo ejecutar",
      },
    });
  }
};

module.exports = (error, req, res, next) => {
  error.statusCode = error.statusCode || 500;
  error.status = error.status || "error";

  if (process.env.NODE_ENV === "develoment") {
    SendErrorDev(error, res);
  } else {
    SendErrorProdu(error, res);
  }
};
