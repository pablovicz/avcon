  
function byteArrayToBlob(fileByteArray) {
    var byteCharacters = atob(fileByteArray);
    var byteNumbers = new Array(byteCharacters.length);
    for (var i = 0; i < byteCharacters.length; i++) {
      byteNumbers[i] = byteCharacters.charCodeAt(i);
    }
    var byteArray = new Uint8Array(byteNumbers);
    var blob = new Blob([byteArray], { type: "application/octet-stream" });
    return blob;
  }
  
  function browserFileDownloader(response, filename) {
    var blob = byteArrayToBlob(response.data);
  
    var url = window.URL.createObjectURL(blob);
  
    var anchorElem = document.createElement("a");
    anchorElem.style = "display: none";
    anchorElem.href = url;
    anchorElem.download = filename;
  
    document.body.appendChild(anchorElem);
    anchorElem.click();
  
    document.body.removeChild(anchorElem);
    setTimeout(function () {
      window.URL.revokeObjectURL(url);
    }, 1000);
  }
  
  export default browserFileDownloader;