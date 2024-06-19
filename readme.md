# Set of the methods for screenshot testing

### How to use

```
npm run snap
```

## Images

### Base

`screenshots/base` - The source image should be located in.

### Actual

`screenshots/actual` - Images generated during the tests are temporarily stored here. They are removed if the test passes.

### Diff

`screenshots/diff` - Any differences between the base and actual images will stored here.

## Example of tests

```
const { compare } = require("./compare");
const { it, describe } = require("./tests-wrapper");
const { screenshot } = require("./screenshot");

const url = "http://localhost:5173/cv";

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
]);

```

#### Future upgrades

- [ ] - Composite into a package

- [ ] - Docker support
