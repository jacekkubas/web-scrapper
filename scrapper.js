/**
 * scraper.js
 * To run this script, copy and paste `node scraper.js` in the terminal
 */

const fetch = require("node-fetch");
const cheerio = require("cheerio");
const fs = require("fs");

(async () => {
  const url = "https://play.pokemonshowdown.com/audio/cries/";
  const response = await fetch(url);
  const re = /(?:\.([^.]+))?$/;

  const $ = cheerio.load(await response.text());

  const tags = $("a");
  const links = [];

  tags.each((index, value) => {
    const ext = re.exec($(value).text())[1];

    if (!ext) return;

    links.push({
      url: url + $(value).attr("href"),
      name: $(value).text(),
      ext,
    });
  });

  links.forEach((item) => {
    fetch(item.url)
      .then((res) => res.buffer())
      .then((buffer) => {
        console.log(`writing ${item.name}...`);
        return fs.promises.writeFile(`sounds/${item.name}`, buffer);
      })
      .then(() => {
        console.log(`done writing ${item.name}`);
      })
      .catch((err) => {
        console.log(err);
      });
  });
})();
