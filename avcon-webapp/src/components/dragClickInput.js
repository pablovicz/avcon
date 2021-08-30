import "../styles/components/dragClickInput.css";

import { AiFillFileAdd } from "react-icons/ai";
import { useState } from "react";
import { toast } from "react-toastify";


import DataTransferToFile from  "../utils/DataTransferToFile.js";

function DragClickInput(props) {
  const [dragging, setDragging] = useState(false);

  const handleClick = (e) => {
    console.log("clicou!!!");
  };

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
      const data = DataTransferToFile(e.dataTransfer.items[0]);
      if (["video", "audio"].includes(data.mediaType)) {
        props.parentCallback(data);
      } else {
        toast.error("Invalid file type inserted! Please insert a media file.");
      }
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
    </div>
  );
}

export default DragClickInput;
