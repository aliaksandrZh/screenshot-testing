const { compare } = require("./compare");
const { it, describe } = require("./tests-wrapper");
const { screenshot } = require("./screenshot");
const { getActualFilePath, getBaseFilePath } = require("./utils/utils");

const url = "https://aliaksandrzh.github.io/cv/";

describe("screenshot testing", [
  it("test en layout", async () => {
    const actual = getActualFilePath("actual-en.png");
    const expected = getBaseFilePath("base-en.png");

    await screenshot(url, {
      fullPage: true,
      savePath: actual,
      skipSelector: "header h2",
      locale: "en-US",
    });

    await compare(expected, actual);
  }),

  it("test ru layout", async () => {
    const actual = getActualFilePath("actual-ru.png");
    const expected = getBaseFilePath("base-ru.png");

    await screenshot(url, {
      fullPage: true,
      savePath: actual,
      skipSelector: "header h2",
      locale: "ru-Ru",
    });

    await compare(expected, actual);
  }),

  it("test en mobile layout", async () => {
    const actual = getActualFilePath("actual-en-mobile.png");
    const expected = getBaseFilePath("base-en-mobile.png");

    await screenshot(url, {
      fullPage: true,
      savePath: actual,
      skipSelector: "header h2",
      locale: "en-US",
      isMobile: true,
    });

    await compare(expected, actual);
  }),

  it("test ru mobile layout", async () => {
    const actual = getActualFilePath("actual-ru-mobile.png");
    const expected = getBaseFilePath("base-ru-mobile.png");

    await screenshot(url, {
      fullPage: true,
      savePath: actual,
      skipSelector: "header h2",
      locale: "ru-Ru",
      isMobile: true,
    });

    await compare(expected, actual);
  }),
]);
