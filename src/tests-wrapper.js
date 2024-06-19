const it = (name, action) => async () => {
  console.log("Running: ", name);
  try {
    await action();
    console.log("Done: ", name);
  } catch (error) {
    console.log("Failed: ", name);
    console.error(error);
  }
};

const describe = async (name, suites) => {
  console.log(suites);
  if (!Array.isArray(suites)) {
    throw Error("No tests suites are found");
  }

  console.log("Running:", name);
  await Promise.allSettled(suites.map((t) => t()));
};

module.exports = {
  it,
  describe,
};
