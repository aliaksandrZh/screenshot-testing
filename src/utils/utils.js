const path = require("path");
const fs = require("fs-extra");

const getFilenameWithoutExtension = (filepath) => {
  const basename = path.basename(filepath);
  return basename.replace(/\.[^/.]+$/, "");
};

const adjustSizeForImages = (img1, img2) => {
  const width = Math.max(img1.getWidth(), img2.getWidth());
  const height = Math.max(img1.getHeight(), img2.getHeight());

  if (img1.getWidth() !== width || img1.getHeight() !== height) {
    img1.resize(width, height);
  }
  if (img2.getWidth() !== width || img2.getHeight() !== height) {
    img2.resize(width, height);
  }

  return { width, height };
};

const getDiffFilename = (base, actual) =>
  `screenshots/diff/diff-${getFilenameWithoutExtension(
    actual
  )}-${getFilenameWithoutExtension(base)}.png`;
const deleteFileSync = (file) => fs.unlinkSync(file);
module.exports = {
  getFilenameWithoutExtension,
  adjustSizeForImages,
  getDiffFilename,
  deleteFileSync,
};
