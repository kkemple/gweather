# Gweather

#### Deploy a full stack app that gives you realtime weather updates with style.

🛠 Built with React Native, Expo, GraphQL, AWS Amplify, AWS AppSync, Dark Sky API, Giphy API

### Features

- 🌎 Uses geolocation to get weather data
- ⛈ Micro weather updates
- 🌠 Weather related Giphy images
- 👮‍ Authenticated
- 🔥 Serverless back end
- 🚀 GraphQL
- 💻 Deploy back end in minutes

![](./example.jpg)

## Deploy the App

In order to run the app you will need an API key for both the [Giphy API](https://developers.giphy.com/) and the [Dark Sky API](https://darksky.net/dev). Both have a free plan that should be more than enough to run this app.

### Deploy the back end and run the app

1. Clone the repo & install the dependencies

```sh
~ git clone https://github.com/kkemple/qweather.git
~ cd qweather
~ npm install
```

2. Update the serverless function with your Dark Sky API and Giphy API keys in `amplify/backend/function/getweather/src/index.js`

```javascript
const buildDarkSkyUrl = (lat, lon) =>
  `https://api.darksky.net/forecast/[key]/${lat},${lon}`;

const buildGiphyUrl = tag =>
  encodeURI(
    `https://api.giphy.com/v1/gifs/random?api_key=[key]S&tag=${tag}&rating=G`
  );
```

3. Initialize the Amplify project

```sh
~ amplify init
? Enter a name for the environment: dev (or whatever you would like to call this env)
? Choose your default editor: <YOUR_EDITOR_OF_CHOICE>
? Do you want to use an AWS profile? Y
```

4. Mock the backend to ensure app is working properly

```sh
amplify mock
```

5. Start the app

```sh
~ expo start
```

6. Push to AWS

```sh
~ amplify push
? Are you sure you want to continue? Y
? Do you want to generate code for your newly created GraphQL API? N
> We already have the GraphQL code generated for this project, so generating it here is not necessary.
```

---

## Expo App Instructions

For instructions on using the Expo app, check out the Expo docs [here](https://docs.expo.io/versions/latest/).
