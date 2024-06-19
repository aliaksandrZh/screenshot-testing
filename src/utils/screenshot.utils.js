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

const autoScroll = async (page) => {
  await page.evaluate(async () => {
    await new Promise((resolve, reject) => {
      let totalHeight = 0;
      const distance = 100;
      const timer = setInterval(() => {
        const scrollHeight = document.documentElement.scrollHeight;
        window.scrollBy(0, distance);
        totalHeight += distance;

        if (totalHeight >= scrollHeight || totalHeight >= 2000) {
          clearInterval(timer);
          resolve();
        }
      }, 100);
    });
  });
};

const captureFullPageMobile = async (page) => {
  await autoScroll(page);
  return await captureFullPage(page);
};

module.exports = {
  skipElement,
  captureFullPage,
  captureElement,
  interceptLocale,
  captureFullPageMobile,
};
