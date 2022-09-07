import OutsideClickHandler from "react-outside-click-handler/esm/OutsideClickHandler";


export function DropdownLink({stateChanger, children, disabled}) {
    const handleCloseDropdown = () => {
        stateChanger(false);
    };
    return (
        <OutsideClickHandler
            disabled={!disabled}
            onOutsideClick={handleCloseDropdown}>
            {children}
        </OutsideClickHandler>
    )
}