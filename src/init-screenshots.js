const { screenshot } = require("./screenshot");
const { getBaseFilePath } = require("./utils/utils");

const initScreenshots = async () => {
  const url = "https://aliaksandrzh.github.io/cv/";

  await Promise.allSettled([
    screenshot(url, {
      fullPage: true,
      savePath: getBaseFilePath("base-en-mobile.png"),
      skipSelector: "header h2",
      locale: "en-US",
      isMobile: true,
    }),

    screenshot(url, {
      fullPage: true,
      savePath: getBaseFilePath("base-en.png"),
      skipSelector: "header h2",
      locale: "en-US",
    }),

    screenshot(url, {
      fullPage: true,
      savePath: getBaseFilePath("base-ru-mobile.png"),
      skipSelector: "header h2",
      locale: "ru-RU",
      isMobile: true,
    }),

    screenshot(url, {
      fullPage: true,
      savePath: getBaseFilePath("base-ru.png"),
      skipSelector: "header h2",
      locale: "ru-RU",
    }),
  ]);
};

initScreenshots();
