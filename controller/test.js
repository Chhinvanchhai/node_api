
exports.test = async (req, res, next) => {
  try {
    res.status(200).json({
      status: "SUCCESS",
      data: "data",
    });
  } catch (err) {
    res.status(400).json({
      status: "errors",
      error: err,
    });
  }
};
