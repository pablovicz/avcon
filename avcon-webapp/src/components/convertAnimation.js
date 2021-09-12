import defaultIcon from "../assets/undefined-media-icon.svg";
import cancelIcon from "../assets/cancel-media-icon.svg";

import "../styles/components/convertAnimation.css";

import { toast } from "react-toastify";
import {useState, useEffect} from "react"; 
import {FaLongArrowAltRight} from "react-icons/fa"
import ReactLoading from 'react-loading';
import { useHistory } from "react-router";


function ConvertAnimation(props){

    const {origin, target, mediaType, isConverting, filename} = props

    const history = useHistory();

    const [originImg, setOriginImg] = useState("");
    const [targetImg, setTargetImg] = useState("");
    const [hover, setHover] = useState(false);

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

    function onMouseEnterHandler(e) {
        e.preventDefault();
        e.stopPropagation();
        setHover(true);
    }

    function onMouseLeaveHandler(e) {
        e.preventDefault();
        e.stopPropagation();
        setHover(false);
    }

    function handleCancel() {
        history.push('/');
        toast.warning('Cancelled operation!')
    }


    return (
        <div className="ca-container">
            <div 
                className="image-container" 
                onMouseEnter={(e) => onMouseEnterHandler(e)}
                onMouseLeave={(e) => onMouseLeaveHandler(e)}
                onClick={() => handleCancel()}
            >
                {!hover ? (
                    <img alt={filename} src={originImg !== "" ? originImg : defaultIcon} />
                ) : (
                    <>
                    <img alt={filename} src={cancelIcon} />
                    <p className="filename">{filename}</p>
                    </>
                )}
            </div>
            <div className='convert-symbol'>
            {isConverting ? (
                <ReactLoading type='bars' color='#5a8ced' height={40} width={40} className='loading-animation'/>
            ) : (
                <FaLongArrowAltRight className='convert-arrow'/>
            )}
            </div>
            <div className="image-container">
                <img alt="target" src={targetImg !== "" ? targetImg : defaultIcon} />
            </div>
        </div>
    );
}

export default ConvertAnimation;