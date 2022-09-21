const Url = require("../models/url");

const getUrl = async (req, res, next) => {
  const urlKey = req.params.ukey;

  let url;

  try {
    url = await Url.findOne({ key: urlKey });
  } catch (error) {
    res
      .json({
        errorMessage: "Something went wrong, Could'nt find the url.",
        status: "error",
      })
      .status(500);
    return next(new Error("Something Went Wrong."));
  }

  if (!url) {
    res
      .json({
        errorMessage: "Something went wrong, Could'nt find the url.",
        status: "error",
      })
      .status(404);
    return next(new Error("Something Went Wrong."));
  }

  res.redirect(url.url.toString());
};

exports.getUrl = getUrl;
