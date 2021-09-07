function DataTransferToFile(inputFile) {
  const data = {
    name: inputFile.name,
    mediaType: inputFile.type.split("/")[0],
    extension: inputFile.name.split(".").at(-1).toUpperCase(),
    file: inputFile,
  };
  return data;
}

export default DataTransferToFile;
