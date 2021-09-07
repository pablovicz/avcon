import "../styles/components/dragClickInput.css";

import { AiFillFileAdd } from "react-icons/ai";
import { useState } from "react";
import { toast } from "react-toastify";


import DataTransferToFile from  "../utils/DataTransferToFile.js";

function DragClickInput(props) {
  const [dragging, setDragging] = useState(false);

  const allowedExtensions = ["MP3", "WAV", "OGG", "FLAC", "AC3", "MP4", "WMV", "AVI", "MOV", "MKV"];

  function handleClick(e) {
    var input = document.getElementById("file-input");
    input.click();
    input.onChange = function(e) {
      handleSelectedFile(e);
    }
  };

  function handleSelectedFile(e) {
    if (!e.target.files) {
      return;
    }
    const files = e.target.files;
    const data = DataTransferToFile(files[0]);
    handleFileUpload(data);
  }

  function handleDrag(e) {
    e.preventDefault();
    e.stopPropagation();
  }
  function handleDragIn(e) {
    e.preventDefault();
    e.stopPropagation();
    if (e.dataTransfer.items && e.dataTransfer.items.length > 0) {
      setDragging(true);
    }
  }
  function handleDragOut(e) {
    e.preventDefault();
    e.stopPropagation();
    setDragging(false);
  }
  function handleDrop(e) {
    e.preventDefault();
    e.stopPropagation();
    setDragging(false);
    if (e.dataTransfer.items && e.dataTransfer.items.length > 0) {
      const data = DataTransferToFile(e.dataTransfer.items[0].getAsFile());
      handleFileUpload(data);
    }
  }

  function handleFileUpload(data) {
    if (["video", "audio"].includes(data.mediaType) && allowedExtensions.includes(data.file.name.split(".").at(-1).toUpperCase())) {
      props.parentCallback(data);
    } else {
      toast.error("Invalid file type inserted! Please insert a media file.");
    }
  }

  return (
    <div
      className={"input-container".concat(dragging ? " dragging" : "")}
      onClick={(e) => handleClick(e)}
      onDrop={(e) => handleDrop(e)}
      onDragOver={(e) => handleDrag(e)}
      onDragEnter={(e) => handleDragIn(e)}
      onDragLeave={(e) => handleDragOut(e)}
    >
      <p>Insert or drag you file here</p>
      <AiFillFileAdd size={30} />
      <input 
        id="file-input" 
        type="file" 
        name="file-input"  
        onChange={(e) => handleSelectedFile(e)} 
        hidden 
      />
    </div>
  );
}

export default DragClickInput;
