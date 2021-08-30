import "../styles/pages/landingPage.css";

import DragClickInput from "../components/dragClickInput.js";


import {useState} from "react";
import ReactLoading from "react-loading";
import { useHistory } from "react-router-dom";


function Landing(props){

    const history = useHistory();
    const [loading, setLoading] = useState(false);


    function handleChildCallback(file) { 
        props.routerCallback(file);
        setLoading(true);
        setTimeout(() => {
            history.push('/convert');
        }, 100);

        //console.log(file);
    }

    return (
        <div id="landing-page">
            {!loading ? 
            <DragClickInput parentCallback={handleChildCallback} />
            :
            <ReactLoading type="cylon" color="#5a8ced"/>
            }
        </div>
    );
}

export default Landing;