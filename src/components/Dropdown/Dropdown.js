import { useState } from "react";
import OutsideClickHandler from "react-outside-click-handler/esm/OutsideClickHandler";
import './Dropdown.css';


export function DropdownLink({children}) {
    const [showDropdown, setShowDropdown] = useState(false);

    const handleClick = () => {

    };

    return (
        <OutsideClickHandler className="myButton" onOutsideClick={() => {
        console.log('You clicked outside of this component!!!');}}>
            {children}
        </OutsideClickHandler>
    )
}