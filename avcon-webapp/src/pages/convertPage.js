import "../styles/pages/convertPage.css";

import { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { toast } from "react-toastify";
import {HiOutlineDownload} from "react-icons/hi";
import {CgArrowsExchangeV} from "react-icons/cg";

import ConvertAnimation from "../components/convertAnimation.js";
import ConvertOptions from "../components/convertOptions.js";
import api from "../service/api";
import browserFileDownloader from "../service/helper";

function ConvertPage(props) {

  const file = props.file;
  const currentExtension = file.extension;
  
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
  const [isConverting, setIsConverting] = useState(false);

  useEffect(() => {
    if (file == null) {
      toast.error("Impossible get the inserted file. Please insert again :)");
      history.push("/");
    }
    if(file.mediaType === 'video' && loadCounter === 0){
      setIsAudioMedia(false);
    }
    setIsAbleToLoad(true);
  }, [file, history, loadCounter]);

  

  function handleOptions(optionsList){
    if(optionsList.indexOf(currentExtension) !== -1){
      return optionsList.filter((e) => {return e !== currentExtension})
    } else {
      return optionsList.slice(0,4)
    }  
  }

  function handleFirstTargetValue(){
    var audioList = ["MP3", "WAV", "OGG", "FLAC", "AC3"];
    var videoList = ["MP4", "WMV", "AVI", "MOV", "MKV"];
    
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

  function handleFileExtesionCallback(option) {
    setTargetExtension(option);
  }

  function handlePivotateClick(){
    setIsAudioMedia(!isAudioMedia);
    setLoadCounter(loadCounter + 1)
    const newOptionsList = handleUpdateTargetValue()
    setTargetExtension(newOptionsList);
  }

  async function handleSubmit(){

    setIsConverting(true);

    const data = new FormData();
    data.append('media_type', file.mediaType);
    data.append('source', currentExtension);
    data.append('target', targetExtension);
    data.append('filename', file.name)
    data.append('file', file.file);

    const convertedName = file.name.split(".")[0].concat(`.${targetExtension.toLowerCase()}`)

    await api
      .post('/convert', data)
      .then(response => {
        browserFileDownloader(response, convertedName);
        setIsConverting(false);
        toast.success('Successfully converted file!');
        history.push('/')
      })
      .catch(() => {
        setIsConverting(false);
        toast.error("Error while file conversion!");
      });
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
          filename={file.name}
          origin={currentExtension}
          target={targetExtension}
          mediaType={file.mediaType}
          isConverting={isConverting}
        />
        <button 
          type="button" 
          className={`btn-convert ${isConverting ? 'cv-disabled' : ''}`}
          onClick={() => handleSubmit()}
        >
          <HiOutlineDownload className="btn-icon" size={30}/>
          <h3>Convert</h3>
        </button>
      </div>
    </div>
  );
}

export default ConvertPage;
