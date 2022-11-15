const fetch = require("node-fetch");
const { createWriteStream } = require("fs");

fetch(
  "https://cdn.jsdelivr.net/gh/annexare/Countries@2.6.1/dist/countries.emoji.min.json"
)
  .then((res) => res.json())
  .then((countries) => {
    Object.entries(countries).forEach((country) => {
      console.log(`Downloading ${country[1].name}`);
      fetch(
        `https://cdn.jsdelivr.net/gh/twitter/twemoji@gh-pages/v/14.0.2/svg/${country[1].emojiU
          .replaceAll("U+", "")
          .replace(" ", "-")
          .toLowerCase()}.svg`
      ).then((res) => {
        res.body.pipe(createWriteStream(`./flags/${country[0]}.svg`));
      });
    });
  });
