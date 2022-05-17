import {_Nav} from "../../components/Nav/_Nav";
import {Container} from "react-bootstrap";
import "./Locations.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import {useState} from "react";
import {MyDatepicker} from "../../components/Datepicker/MyDatepicker";

export const Locations = (props) => {

    const [opened, setOpened] = useState(
        {
            index: null,
            open: false
        });

    const inputs = [
        {
            id: 1,
            title: "Location",
            value: ["Tel-Aviv"],
            status: false
        },
        {
            id: 2,
            title: "Date",
            value: [new Date(Date.now()).toDateString()],
            status: false
        },
        {
            id: 3,
            title: "Time",
            value: ["2am"],
            status: false
        }
    ];


    const handleClickedDropdown = (inputId) => {
        if (inputId === opened.index) {
            setOpened({index: null, open: false});
        } else {
            setOpened({index: inputId, open: true});
        }
    };


    return (
        <>
            {props.title ? <_Nav/> : null}
            <div>
                <Container className="mb-5 mt-5 myContainer">
                    <div className="myDropdownButton">

                        {inputs.map((input, index) => (
                            <div key={input.id} className="myButtonWrapper">
                                {input.title === "Date" ?
                                    //if object.title is "Time" => return MyDatepicker component but with dropdown functionality
                                    <MyDatepicker onClose={() => handleClickedDropdown(index) } calendarOpened={opened.index === index}
                                        onClick={() => handleClickedDropdown(index)}
                                                  placeholder={input.value}
                                                  className="myButton"
                                                  title={input.title} /> :

                                    //in other case return regular div with dropdown
                                    <div onClick={() => handleClickedDropdown(index)}
                                         placeholder={input.value}
                                         className="myButton">
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
                                }
                                {/*{input.title === "Location" ?*/}
                                {/*    <div className={opened.index === index ? "myDropdown" : "dropHidden"}>*/}
                                {/*        /!*disabled until we have just one location*!/*/}

                                {/*        /!*<div className="myDropdownInnerWrapper">*!/*/}
                                {/*        /!*    <div className="myDropdownInner">*!/*/}
                                {/*        /!*        /!* show all locations *!/*!/*/}
                                {/*        /!*        {input.value.map((dropdownItem,index) => <div key={index} className="myLocationOptions">{dropdownItem}</div>)}*!/*/}
                                {/*        /!*    </div>*!/*/}
                                {/*        /!*</div>*!/*/}
                                {/*    </div> : null}*/}
                                {input.title === "Time" ?
                                    <div className={opened.index === index ? "myDropdown" : "dropHidden"}>
                                        <div className="calendarWrapper">
                                            <div className="calendarWrapperInner">
                                            </div>
                                        </div>
                                    </div> : null}
                            </div>
                        ))}
                    </div>
                </Container>
            </div>
        </>
    )
}