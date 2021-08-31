import "../styles/pages/convertPage.css";

import { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { toast } from "react-toastify";
// eslint-disable-next-line
import ReactLoading from "react-loading";
import {HiOutlineDownload} from "react-icons/hi";
import {CgArrowsExchangeV} from "react-icons/cg";

import ConvertAnimation from "../components/convertAnimation.js";
import ConvertOptions from "../components/convertOptions.js";

function ConvertPage(props) {

  const file = props.file;
  const history = useHistory();

  // eslint-disable-next-line
  const [isAbleToLoad, setIsAbleToLoad] = useState(false);
  // eslint-disable-next-line
  var [audioOptions, setAudioOptions] = useState(["MP3", "WAV", "OGG", "FLAC", "AC3"]);
  // eslint-disable-next-line
  var [videoOptions, setVideoOptions] = useState(["MP4", "WMV", "AVI", "MOV", "MKV"]);
  // eslint-disable-next-line
  const [isAudioMedia, setIsAudioMedia] = useState(true);
  const [targetExtension, setTargetExtension] = useState(handleFirstTargetValue());
  const [loadCounter, setLoadCounter] = useState(0);

  // eslint-disable-next-line
  useEffect(() => {
    if (file === null) {
      toast.error("Impossible get the inserted file. Please insert again :)");
      history.push("/");
    }
    handleMediaTypeShuffle();
    //handleAvailableOptions();
    setIsAbleToLoad(true);
  });

  function handleOptions(optionsList){
    const currentExtension = file.extension.toUpperCase();
    if(optionsList.indexOf(currentExtension) !== -1){
      return optionsList.filter((e) => {return e !== currentExtension})
    } else {
      return optionsList.slice(0,4)
    }  
  }

  function handleFirstTargetValue(){
    var audioList = ["MP3", "WAV", "OGG", "FLAC", "AC3"];
    var videoList = ["MP4", "WMV", "AVI", "MOV", "MKV"];
    const currentExtension = file.extension.toUpperCase();
    if(audioList.indexOf(currentExtension) !== -1){
      const audioListResult = audioList.filter((e) => {return e !== currentExtension})
      return audioListResult[0]
    }
    if(videoList.indexOf(currentExtension) !== -1) {
      const videoListResult = videoList.filter((e) => {return e !== currentExtension})
      return videoListResult[0]
    }
  }

  function handleUpdateTargetValue(){
    var audioList = ["MP3", "WAV", "OGG", "FLAC", "AC3"];
    var videoList = ["MP4", "WMV", "AVI", "MOV", "MKV"];
    const currentExtension = targetExtension.toUpperCase();

    const isAudio = audioList.indexOf(currentExtension) === -1 || videoList.indexOf(currentExtension) !== -1;
    const isVideo = videoList.indexOf(currentExtension) === -1 || audioList.indexOf(currentExtension) !== -1;

    if(isAudio){
      const audioListResult = audioList.filter((e) => {return e !== currentExtension})
      return audioListResult[0]
    }
    if(isVideo) {
      const videoListResult = videoList.filter((e) => {return e !== currentExtension})
      return videoListResult[0]
    }
  }

  function handleMediaTypeShuffle(){
    if(file.mediaType === 'video' && loadCounter === 0){
      setIsAudioMedia(false);
    }
    
  }

  // eslint-disable-next-line
  function handleFileExtesionCallback(option) {
    setTargetExtension(option);
  }

  function handlePivotateClick(){
    setIsAudioMedia(!isAudioMedia);
    setLoadCounter(loadCounter + 1)
    const newOptionsList = handleUpdateTargetValue()
    setTargetExtension(newOptionsList);
  }

  return (
    <div id="convert-page">
      <div className="text-container">
        <h2>Select the derired file type</h2>
      </div>
      <div className="options-container">
        <div className="convert-op-container">
          {isAudioMedia ? (
            <ConvertOptions 
              parentCallback={handleFileExtesionCallback} 
              options={handleOptions(audioOptions)}
            />
          ) : (
            <ConvertOptions 
              parentCallback={handleFileExtesionCallback} 
              options={handleOptions(videoOptions)}
            />
          )}
          {file.mediaType === "video" ? (
            <button type="button" className="btn-pivotate" onClick={()=>handlePivotateClick()}>
              <CgArrowsExchangeV size={25} />
            </button>
          ) : (
          <></>
          )}
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
