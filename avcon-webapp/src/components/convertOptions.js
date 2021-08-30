import "../styles/components/convertOptions.css";

import { useState, useEffect } from "react";

function ConvertOptions(props){

    // eslint-disable-next-line
    const {options, actualExtension, id} = props

    const [selectedOption, setSelectedOption] = useState('');
    var [optionsList, setOptionsList] = useState([]);

    // eslint-disable-next-line
    useEffect(() => {
        setOptionsList(options);
        if(options[0] === '' || options.indexOf(selectedOption) === -1){
            setSelectedOption(options[0]);
        }       
    });

    function handleBtnStyle(btnOption){
        const btnState = btnOption === selectedOption ? " active": " disabled";

        return "op-btn".concat(btnState)
    }

    function handleClick(option){
        setSelectedOption(option);
        props.parentCallback(option);
    }

    return (
        <div className="convert-op-container">
            {
                optionsList.map((option) => {
                    return (
                        <button 
                            key={option}
                            className={handleBtnStyle(option)}
                            onClick={() => handleClick(option)}
                        >
                            {option.toUpperCase()}
                        </button>
                    )
                })

            }
        </div>
    );
}

export default ConvertOptions;