import { diff, detailedDiff } from "deep-object-diff";

let chrome = {};
let puppeteer;
if (process.env.AWS_LAMBDA_FUNCTION_VERSION) {
  // running on the Vercel platform.
  chrome = require('chrome-aws-lambda');
  puppeteer = require('puppeteer-core');
} else {
  // running locally.
  puppeteer = require('puppeteer');
}

const getSchema = ({ browser }) => async ({ url }) => {
  const page = await browser.newPage();
  await page.goto(url);
  return await page.evaluate(() =>
    // Read all script tags and find schema
    Array.from(document.querySelectorAll("script"))
      .filter((script) => script.type === "application/ld+json")
      .map((script) => {
        // parse
        try {
          return JSON.parse(script.innerText);
        } catch (e) {
          console.error("failed to parse json");
          return {};
        }
      })
      .find((json) => json["@context"] === "http://schema.org")
  );
};

export default async function handler(req, res) {
  const { srcUrl, targetUrl } = req.body;
  console.log({ srcUrl, targetUrl });

  const browser = await puppeteer.launch();

  const srcSchema = await getSchema({ browser })({ url: srcUrl });
  const targetSchema = await getSchema({ browser })({ url: targetUrl });
  const difference = diff(srcSchema, targetSchema);
  const detailedDifference = detailedDiff(srcSchema, targetSchema);
  await browser.close();
  console.log("result", {
    srcSchema,
    targetSchema,
    difference,
    detailedDifference,
  });
  res
    .status(200)
    .json({ srcSchema, targetSchema, difference, detailedDifference });
}
