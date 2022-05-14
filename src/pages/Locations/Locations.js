import {_Nav} from "../../components/Nav/_Nav";
import {InputGroup, DropdownButton, Dropdown, FormControl, Container, ButtonGroup} from "react-bootstrap";
import "./Locations.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import {useState} from "react";

export const Locations = (props) => {

    const [opened, setOpened] = useState(0);

    const inputs = [
        {
            id: 1,
            title: "Location",
            value: ["Tel-Aviv"],
            type: "list"
        },
        {
            id: 2,
            title: "Date",
            value: ["Sunday"],
            type: "calendar"
        },
        {
            id: 3,
            title: "Time",
            value: ["2am"],
            type: "time"
        }
    ];


    const handleClickedDropdown = (inputId) => {
        setOpened(inputId);
    };

    return (
        <>
            {props.title ? <_Nav/> : null}
            <div>
                <Container className="mb-5 mt-5 myContainer">
                    <div className="myDropdownButton">
                        {inputs.map(input => (
                            <div className="myButtonWrapper">
                                <div onClick={() => handleClickedDropdown(input.id)}
                                     placeholder={"papa"}
                                     className={"myButton"}>
                                    <div className="myButtonInner">
                                        <div>
                                            <label htmlFor="input" className="myLabel">{input.title}</label>
                                            <input placeholder={input.value}
                                                   value={input.value}
                                                   className="myInput"
                                                   type="text"
                                                   readOnly/>
                                        </div>
                                        <span>▼</span>
                                    </div>
                                </div>
                                <div className={opened === input.id ? "myDropdown" : "dropHidden"}>
                                    <div className="myDropdownInnerWrapper">
                                        <div className="myDropdownInner">
                                            <div className="myLocationOptions">{input.id}</div>
                                            <div className="myLocationOptions">{input.id}</div>
                                            <div className="myLocationOptions">{input.id}</div>
                                            <div className="myLocationOptions">{input.id}</div>
                                            <div className="myLocationOptions">{input.id}</div>
                                            <div className="myLocationOptions">{input.id}</div>
                                            <div className="myLocationOptions">{input.id}</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                        {/*<div className={opened ? "myDropdown" : "dropHidden"}>*/}
                        {/*    <div className="myDropdownInnerWrapper">*/}
                        {/*        <div className="myDropdownInner">*/}
                        {/*            <div className="myLocationOptions">test option</div>*/}
                        {/*            <div className="myLocationOptions">test option</div>*/}
                        {/*            <div className="myLocationOptions">test option</div>*/}
                        {/*            <div className="myLocationOptions">test option</div>*/}
                        {/*            <div className="myLocationOptions">test option</div>*/}
                        {/*            <div className="myLocationOptions">test option</div>*/}
                        {/*            <div className="myLocationOptions">test option</div>*/}
                        {/*        </div>*/}
                        {/*    </div>*/}
                        {/*</div>*/}
                        {/*<div className={opened ? "myDropdown" : "dropHidden"}>*/}
                        {/*    <div className="myDropdownInnerWrapper">*/}
                        {/*        <div className="myDropdownInner">*/}
                        {/*            <div className="myLocationOptions">test option2</div>*/}
                        {/*            <div className="myLocationOptions">test option2</div>*/}
                        {/*            <div className="myLocationOptions">test option2</div>*/}
                        {/*            <div className="myLocationOptions">test option2</div>*/}
                        {/*            <div className="myLocationOptions">test option2</div>*/}
                        {/*            <div className="myLocationOptions">test option2</div>*/}
                        {/*            <div className="myLocationOptions">test option2</div>*/}
                        {/*        </div>*/}
                        {/*    </div>*/}
                        {/*</div>*/}
                        {/*<div className={opened ? "myDropdown" : "dropHidden"}>*/}
                        {/*    <div className="myDropdownInnerWrapper">*/}
                        {/*        <div className="myDropdownInner">*/}
                        {/*            <div className="myLocationOptions">test option3</div>*/}
                        {/*            <div className="myLocationOptions">test option3</div>*/}
                        {/*            <div className="myLocationOptions">test option3</div>*/}
                        {/*            <div className="myLocationOptions">test option3</div>*/}
                        {/*            <div className="myLocationOptions">test option3</div>*/}
                        {/*            <div className="myLocationOptions">test option3</div>*/}
                        {/*            <div className="myLocationOptions">test option3</div>*/}
                        {/*        </div>*/}
                        {/*    </div>*/}
                        {/*</div>*/}
                    </div>
                </Container>
            </div>
        </>
    )
}