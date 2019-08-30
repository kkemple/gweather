/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const weather = `query Weather($lat: Float!, $lon: Float!) {
  weather(lat: $lat, lon: $lon) {
    timezone
    current {
      summary
      icon
    }
    hourly {
      summary
      icon
    }
    weekly {
      summary
      icon
    }
    icon
    temperature
    feelsLike
    gif
  }
}
`;
