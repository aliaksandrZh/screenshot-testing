const puppeteer = require("puppeteer");
const Jimp = require("jimp");
const {
  skipElement,
  captureFullPage,
  captureElement,
  interceptLocale,
} = require("./utils/screenshot.utils");

async function makeScreenshot(url, options = {}) {
  const browser = await puppeteer.launch({
    // headless: false, // Run in non-headless mode
    // devtools: true, // Open DevTools
  });

  const page = await browser.newPage();

  if (options.locale) {
    await interceptLocale(page, options);
  }

  try {
    await page.goto(url, { waitUntil: "networkidle0" });
    if (options.skipSelector) {
      await skipElement(page, options.skipSelector);
    }

    if (options.fullPage) {
      return await captureFullPage(page);
    }
    if (options.elementSelector) {
      return await captureElement(page, options.elementSelector);
    }

    throw Error("Element selector for capturing is not provided");
  } catch (error) {
    console.log(error);
    throw error;
  } finally {
    await browser.close();
  }
}

const saveScreenshot = async (screenshotBuffer, path) => {
  if (!screenshotBuffer || !path) {
    throw Error("Image or path is not provided for saving");
  }

  const image = await Jimp.read(screenshotBuffer);
  await image.writeAsync(path);
};

const screenshot = async (url, options = {}) => {
  try {
    const screenshotBuffer = await makeScreenshot(url, options);
    await saveScreenshot(screenshotBuffer, options.savePath);
  } catch (error) {
    console.error(error);
    throw error;
  }
};

module.exports = {
  screenshot,
};
