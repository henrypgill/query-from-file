export function checkValidFilePath(path: string): string | unknown {
  try {
    if (path.match(/[~"#%&*:<>?/\\{|}]+/)) {
      throw new Error("invalid file path provided for query file");
    }
    if (path.match(/(\.sql)/g))
      throw new Error(
        "filename includes file type ending, remove file endings from path string."
      );
    return true;
  } catch (error) {
    console.log(error);
    return false;
  }
}
