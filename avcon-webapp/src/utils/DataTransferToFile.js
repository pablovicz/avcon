function DataTransferToFile(dataTransfer){

    const mediaType = dataTransfer.type.split("/")[0];
    const extension = dataTransfer.type.split("/")[1];
    const file = dataTransfer.getAsFile();
    const data = {"mediaType":mediaType, "extension":extension, "file":file}
    return data
}

export default DataTransferToFile;