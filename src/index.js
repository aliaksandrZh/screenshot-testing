const { compare } = require("./compare");
const { it, describe } = require("./tests-wrapper");
const { screenshot } = require("./screenshot");

const url = "https://aliaksandrzh.github.io/cv/";

describe("screenshot testing", [
  it("test en layout", async () => {
    const path = "screenshots/actual/actual-en.png";

    await screenshot(url, {
      fullPage: true,
      savePath: path,
      skipSelector: "header h2",
      locale: "en-US",
    });

    await compare("screenshots/base/base-en.png", path);
  }),

  it("test ru layout", async () => {
    const path = "screenshots/actual/actual-ru.png";

    await screenshot(url, {
      fullPage: true,
      savePath: path,
      skipSelector: "header h2",
      locale: "ru-Ru",
    });

    await compare("screenshots/base/base-ru.png", path);
  }),

  it("test en mobile layout", async () => {
    const path = "screenshots/actual/actual-en-mobile.png";

    await screenshot(url, {
      fullPage: true,
      savePath: path,
      skipSelector: "header h2",
      locale: "en-US",
      isMobile: true,
    });

    await compare("screenshots/base/base-en-mobile.png", path);
  }),

  it("test ru mobile layout", async () => {
    const path = "screenshots/actual/actual-ru-mobile.png";

    await screenshot(url, {
      fullPage: true,
      savePath: path,
      skipSelector: "header h2",
      locale: "ru-Ru",
      isMobile: true,
    });

    await compare("screenshots/base/base-ru-mobile.png", path);
  }),
]);
