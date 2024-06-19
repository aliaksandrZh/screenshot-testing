const skipElement = async (page, selector) => {
  await page.evaluate((selector) => {
    const element = document.querySelector(selector);
    if (element) {
      element.style.visibility = "hidden";
    }
  }, selector);
};

const captureFullPage = async (page) =>
  await page.screenshot({ fullPage: true });

const captureElement = async (page, selector) => {
  const element = await page.$(selector);
  if (!element) {
    return;
  }
  const boundingBox = await element.boundingBox();

  if (!boundingBox) {
    return;
  }

  return await page.screenshot({
    clip: {
      x: boundingBox.x,
      y: boundingBox.y,
      width: boundingBox.width,
      height: boundingBox.height,
    },
  });
};

const interceptLocale = async (page, options) => {
  await page.setRequestInterception(true);

  page.on("request", (request) => {
    debugger;
    const headers = request.headers();
    headers["accept-language"] = options.locale;
    request.continue({ headers });
  });

  await page.evaluateOnNewDocument((locale) => {
    Object.defineProperty(navigator, "language", {
      get: function () {
        return locale;
      },
    });
    Object.defineProperty(navigator, "languages", {
      get: function () {
        return [locale];
      },
    });
  }, options.locale || "en-US");
};

module.exports = {
  skipElement,
  captureFullPage,
  captureElement,
  interceptLocale,
};
