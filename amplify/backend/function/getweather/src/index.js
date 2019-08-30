const axios = require("axios");

const buildDarkSkyUrl = (lat, lon) =>
  `https://api.darksky.net/forecast/[key]/${lat},${lon}`;

const buildGiphyUrl = tag =>
  encodeURI(
    `https://api.giphy.com/v1/gifs/random?api_key=[key]&tag=${tag}&rating=G`
  );

const TAG_MAP = {
  rain: "raining",
  sleet: "slushy",
  "clear-day": "sunny landscape",
  "clear-night": "moon",
  snow: "snowing",
  wind: "windy",
  fog: "san francisco fog",
  cloudy: "clouds",
  "partly-cloudy-day": "some clouds",
  "partly-cloudy-night": "cloudy night",
  hail: "things being destroyed by hail",
  thunderstorm: "thunderstorm",
  tornado: "tornado"
};

const buildResponse = (darkSkyData, giphyData) => ({
  gif: giphyData.image_url,
  timezone: darkSkyData.timezone,
  temperature: Math.round(darkSkyData.currently.temperature),
  feelsLike: Math.round(darkSkyData.currently.apparentTemperature),
  icon: darkSkyData.currently.icon,
  current: {
    icon: darkSkyData.currently.icon,
    summary: darkSkyData.currently.summary
  },
  hourly: {
    icon: darkSkyData.hourly.icon,
    summary: darkSkyData.hourly.summary
  },
  weekly: {
    icon: darkSkyData.daily.icon,
    summary: darkSkyData.daily.summary
  }
});

exports.handler = async function(event, context) {
  try {
    const { lat, lon } = event.arguments;

    const { data: darkSkyData } = await axios.get(buildDarkSkyUrl(lat, lon));

    const tag =
      darkSkyData.currently.temperature < 32
        ? "frozen"
        : TAG_MAP[darkSkyData.currently.icon];

    const { data: giphyData } = await axios.get(buildGiphyUrl(tag));

    context.done(null, buildResponse(darkSkyData, giphyData.data));
  } catch (error) {
    context.done(error);
  }
};
