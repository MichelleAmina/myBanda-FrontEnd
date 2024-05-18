import React from "react";
import { useState } from "react";
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';

const QuatityBox = () => {

    const [inputValue, setInputValue] = useState(1)

    const plus=()=>{
        setInputValue(inputValue+1)

    }

    const minus=()=>{
        if(inputValue!==1){
            setInputValue(inputValue-1)
        }
    }

    return ( 
        <div className="addCartSection pt-4 pb-4 d-flex align-items-center">
             <div className="counterSec me-4">
                 <input type="number"  value={inputValue}/>
                 <span className='arrow plus' onClick={plus}><KeyboardArrowUpIcon/></span>
                 <span className='arrow minus' onClick={minus}><KeyboardArrowDownIcon/></span>

            </div>

        </div>

     );
}
 
export default QuatityBox;