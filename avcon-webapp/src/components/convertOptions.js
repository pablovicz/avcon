import "../styles/components/convertOptions.css";

import { useState } from "react";

function ConvertOptions(props){

    const {options} = props

    const [selectedOption, setSelectedOption] = useState(options[0]);

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
                options.map((option) => {
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