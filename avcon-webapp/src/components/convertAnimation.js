import defaultIcon from "../assets/undefined-media-icon.svg";

import "../styles/components/convertAnimation.css";

import {useState, useEffect} from "react"; 
import {FaLongArrowAltRight} from "react-icons/fa"


function ConvertAnimation(props){

    // eslint-disable-next-line
    const {origin, target, mediaType, isConverting} = props

    const [originImg, setOriginImg] = useState("");
    const [targetImg, setTargetImg] = useState("");

    useEffect(() => {

        import(`../assets/${mediaType.toLowerCase()}-icons/${origin.toLowerCase()}-icon.svg`)
        .then((image) => setOriginImg(image.default))
        .catch(() => {console.log("erro!")});


        import(`../assets/${handleMediaType(target)}-icons/${target.toLowerCase()}-icon.svg`)
        .then((image) => setTargetImg(image.default))
        .catch(() => {console.log("erro!")});
    });
    
    function handleMediaType(extension){
        const audioList = ["MP3", "WAV", "OGG", "FLAC", "AC3"];
        const videoList = ["MP4", "WMV", "AVI", "MOV", "MKV"];
        if(audioList.indexOf(extension) !== -1){
            return "audio"
        }
        if(videoList.indexOf(extension) !== -1){
            return "video"
        }
    }

    return (
        <div className="ca-container">
            <img alt="origin" src={originImg !== "" ? originImg : defaultIcon} />
            <FaLongArrowAltRight className="convert-arrow"/>
            <img alt="target" src={targetImg !== "" ? targetImg : defaultIcon} />
        </div>
    );
}

export default ConvertAnimation;