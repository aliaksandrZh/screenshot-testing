const pixelmatch = require("pixelmatch");
const Jimp = require("jimp");
const {
  adjustSizeForImages,
  getDiffFilename,
  deleteFileSync,
} = require("./utils/utils");

const compare = async (base, actual) => {
  const img1 = await Jimp.read(actual);
  const img2 = await Jimp.read(base);

  const { width, height } = adjustSizeForImages(img1, img2);

  const diff = new Jimp(width, height);

  const numDiffPixels = pixelmatch(
    img1.bitmap.data,
    img2.bitmap.data,
    diff.bitmap.data,
    width,
    height,
    { threshold: 0.2 }
  );

  if (numDiffPixels > 0) {
    await diff.writeAsync(getDiffFilename(base, actual));
    throw Error(`Visual difference detected: ${numDiffPixels} pixels`);
  } else {
    deleteFileSync(actual);
  }
};

module.exports = {
  compare,
};
