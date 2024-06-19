const { screenshot } = require("./screenshot");

const initScreenshots = async () => {
  const url = "https://aliaksandrzh.github.io/cv/";
  await screenshot(url, {
    fullPage: true,
    savePath: "screenshots/base/base-en-mobile.png",
    skipSelector: "header h2",
    locale: "en-US",
    isMobile: true,
  });
  await screenshot(url, {
    fullPage: true,
    savePath: "screenshots/base/base-en.png",
    skipSelector: "header h2",
    locale: "en-US",
  });
  await screenshot(url, {
    fullPage: true,
    savePath: "screenshots/base/base-ru-mobile.png",
    skipSelector: "header h2",
    locale: "ru-RU",
    isMobile: true,
  });
  await screenshot(url, {
    fullPage: true,
    savePath: "screenshots/base/base-ru.png",
    skipSelector: "header h2",
    locale: "ru-RU",
  });
};

initScreenshots();
