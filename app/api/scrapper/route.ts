import fetch from "node-fetch";
import * as cheerio from "cheerio";
import AdmZip from "adm-zip";
// import { writeFileSync } from "fs";
// import path from "path";

type Link = {
  url: string;
  name: string;
  ext: string;
};

export async function POST(request: Request) {
  const reqData = await request.json();

  // const url = "https://play.pokemonshowdown.com/audio/cries/";
  const url = reqData.url;
  const extensionsToDownload = reqData.media;
  const response = await fetch(url);
  const re = /(?:\.([^.]+))?$/;

  const $ = cheerio.load(await response.text());

  const tags = $("a");
  const links: Link[] = [];

  tags.each((index, value) => {
    const ext = re.exec($(value).text());

    if (!ext && !Array.isArray(ext)) return;
    if (!ext[1]) return;

    if (extensionsToDownload.includes(ext[1])) {
      links.push({
        url: url + $(value).attr("href"),
        name: $(value).text(),
        ext: ext[1],
      });
    }
  });

  const zip = new AdmZip();

  if (links.length === 0) {
    return Response.json({ message: "no links found" });
  }

  for (let i = 0; i < links.length; i++) {
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
  const willSendthis = zip.toBuffer();

  return new Response(willSendthis, {
    status: 200,
    headers: {
      "content-disposition": `attachment; filename=sounds.zip`,
      "Content-Type": "application/zip",
      "Content-Length": `${willSendthis.byteLength}`,
    },
  });
}
