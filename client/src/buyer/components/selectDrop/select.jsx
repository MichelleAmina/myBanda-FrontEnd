import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { ClickAwayListener } from '@mui/base/ClickAwayListener';


import '../selectDrop/select.css'
import { useState } from 'react'


function Select({data, placeholder, icon}){

    const [isOpenSelect, setIsOpenSelet] = useState(false);
    const [selectedIndex, setSelectedIndex] = useState(0);
    const [selectedItem, setSelectedItem] = useState(placeholder);

    const [listData, setListData] = useState(data)
    const [listData2, setListData2] = useState(data)

    const openSelect = () => {
        setIsOpenSelet(!isOpenSelect)
    }

    const closeSelect = (index, name) => {
        setSelectedItem(name)
        setSelectedIndex(index)
        setIsOpenSelet(!isOpenSelect)
        
    }

    const filterList = (e) => {
        const keyword = e.target.value.toLowerCase();
        const list = listData2.filter((item) => {
            return item.toLowerCase().includes(keyword);
        })

        // remove duplicate data
        const list2 = list.filter((item, index) => list.indexOf(item) === index)
        //console.log(list)
        setListData(list2)

    }

    return(
        <ClickAwayListener onClickAway={()=> setIsOpenSelet(false)}>
        <div className="selectDropWrapper cursor position-relative">
            {icon}
            <span className='openSelect' onClick={openSelect}>{selectedItem.length > 14 ? selectedItem.substr(0,14)+ '...' : selectedItem} <KeyboardArrowDownIcon className='arrow'/></span>
            {
                isOpenSelect==true &&
                <div className="selectDrop">
                    <div className="searchField">
                        <input type="text" placeholder='Search here...' onChange={filterList} />
                    </div>
                    {/*map items into a list of categories*/}
                    <ul className='searchResults'>
                    <li key={0} onClick={() => closeSelect(0, placeholder)} className={`${selectedIndex=== 0 ? 'active' : '' }`}>{placeholder}</li>
                    
                        {listData.map((item, index) => {
                            return(
                                <li key={index+1} onClick={() => closeSelect(index+1, item)} className={`${selectedIndex=== index+1 ? 'active' : '' }`}>{item}</li>
                                
                            )
                        })}
                    </ul>

                </div>
            }
                                
        </div>
        </ClickAwayListener>
        
    )
}

export default Select