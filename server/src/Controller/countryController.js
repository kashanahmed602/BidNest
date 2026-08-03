const axios = require("axios");

const getCountries = async (req, res) => {
  try {
    const response = await axios.get(
      "https://countriesnow.space/api/v0.1/countries"
    );

    const countries = response.data.data
      .map(item => item.country)
      .sort();

    res.json({
      success: true,
      countries
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

module.exports = {getCountries}