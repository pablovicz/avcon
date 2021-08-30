import "../styles/pages/convertPage.css";

import { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { toast } from "react-toastify";
// eslint-disable-next-line
import ReactLoading from "react-loading";
import {HiOutlineDownload} from "react-icons/hi"

import ConvertAnimation from "../components/convertAnimation.js";
import ConvertOptions from "../components/convertOptions.js";

function ConvertPage(props) {

  // eslint-disable-next-line
  const [isAbleToLoad, setIsAbleToLoad] = useState(false);
  // eslint-disable-next-line
  var [audioOptions, setAudioOptions] = useState(["MP3", "WAV", "WMA", "MPEG", "AAC"]);
  // eslint-disable-next-line
  var [videoOptions, setVideoOptions] = useState(["MP4", "WMV", "AVI", "MOV", "MKV"]);
  // eslint-disable-next-line
  const [targetExtension, setTargetExtension] = useState('');

  const file = props.file;
  const history = useHistory();

  // eslint-disable-next-line
  useEffect(() => {
    if (file === null) {
      toast.error("Impossible get the inserted file. Please insert again :)");
      history.push("/");
    }
    handleAvailableOptions()
    setIsAbleToLoad(true);
  });

  function handleAvailableOptions(){
    if(file.mediaType === 'audio'){
      delete audioOptions[audioOptions.indexOf(file.extension)];
      setTargetExtension(audioOptions[0]);
    }
    if(file.mediaType === 'video'){
      delete videoOptions[videoOptions.indexOf(file.extension)];
      setTargetExtension(videoOptions[0]);
      audioOptions.splice(4,5);
    }
  }

  // eslint-disable-next-line
  async function handleFileExtesionCallback(option) {
    setTargetExtension(option);
  }



  return (
    <div id="convert-page">
      <div className="text-container">
        <h2>Select the derired file type</h2>
      </div>
      <div className="options-container">
        <div className="convert-op-container">
          <ConvertOptions parentCallback={handleFileExtesionCallback} options={audioOptions}/>
        </div>
        <ConvertAnimation
          origin={file.extension}
          target={targetExtension}
          mediaType={file.mediaType}
          isConverting={false}
        />
        <button type="button" className="btn-convert">
          <HiOutlineDownload className="btn-icon" size={30}/>
          <h3>Convert</h3>
        </button>
      </div>
    </div>
  );
}

export default ConvertPage;
