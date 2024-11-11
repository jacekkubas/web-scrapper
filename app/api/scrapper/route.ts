import fetch from "node-fetch";
import * as cheerio from "cheerio";
// import { writeFileSync } from "fs";
import path from "path";
import AdmZip from "adm-zip";

type Link = {
  url: string;
  name: string;
  ext: string;
};

export async function GET() {
  const url = "https://play.pokemonshowdown.com/audio/cries/";
  const response = await fetch(url);
  const re = /(?:\.([^.]+))?$/;

  const $ = cheerio.load(await response.text());

  const tags = $("a");
  const links: Link[] = [];

  tags.each((index, value) => {
    const ext = re.exec($(value).text());

    if (!ext && !Array.isArray(ext)) return;
    if (!ext[1]) return;

    links.push({
      url: url + $(value).attr("href"),
      name: $(value).text(),
      ext: ext[1],
    });
  });

  const zip = new AdmZip();

  for (let i = 0; i < 20; i++) {
    const item = links[i];
    await fetch(item.url)
      .then((res) => res.arrayBuffer())
      .then((arrayBuffer) => Buffer.from(arrayBuffer))
      .then((buffer) => {
        console.log(`${i}: adding ${item.name} to zip...`);
        zip.addFile(item.name, buffer, item.name);
        return console.log(`${item.name} added to zip`);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  // zip.writeZip(path.join(process.cwd(), "public/assets/sounds.zip"));

  console.log("DONE!!!");

  return Response.json({ message: "Thank you for using web scrapper." });
}
