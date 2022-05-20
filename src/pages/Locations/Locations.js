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

    const [timepicker, setTimepicker] = useState({
        time: 13,
        timeDuration: 2
    });

    const [date, setDate] = useState(
        {
            startDate: new Date(new Date().setHours(0,0,0,0)),
            finishDate: undefined
        }
    );

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
            value: [new Date()],
            status: false
        },
        {
            id: 3,
            title: "Time",
            value: ["2am"],
            status: false
        }
    ];

    const times = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23];
    const timeDuration = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 24];
    const timePrefix = (hour) => ((hour + 11) % 12 + 1) + (hour >= 12? "pm": "am");


    const handleClickedDropdown = (inputId) => {
        if (inputId === opened.index) {
            setOpened({index: null, open: false});
        } else {
            setOpened({index: inputId, open: true});
        }
    };

    const handleDateSelect = (selectedDate) => {
        setDate({...date, startDate: selectedDate});
    };

    const handleTimeSelect = (selectedTime) => {
        setTimepicker({...timepicker, time: selectedTime});
        setDate(prev=> {
            prev.startDate.setHours(selectedTime);
            return prev;
        });
    };

    const handleDurationSelect = (selectedDuration) => {
        setTimepicker({...timepicker, timeDuration: selectedDuration});
        setDate(prev => {
            const startDateCloned = new Date(prev.startDate.getTime());
            startDateCloned.setHours((prev.startDate.getHours() + selectedDuration));

            return {...prev, finishDate : startDateCloned};
    })
    }

    return (
        <>
            {props.title ? <_Nav/> : null}
            <div>
                <Container className="mb-5 mt-5 myContainer">
                    <div className="myDropdownButton">

                        {inputs.map((input, index) => (
                            <div key={input.id} className="myButtonWrapper">
                                {input.title === "Date" ?
                                    <MyDatepicker
                                        value={date.startDate}
                                        onClose={() => handleClickedDropdown(index)}
                                        calendarOpened={opened.index === index}
                                        onClick={() => handleClickedDropdown(index)}
                                        placeholder={date.startDate}
                                        className="myButton"
                                        title={input.title}
                                        onChange={(date) => handleDateSelect(date)}
                                    />
                                    :
                                    //in other case return regular div with dropdown
                                    <div onClick={() => handleClickedDropdown(index)}
                                         className="myButton">
                                        <div className="myButtonInner">
                                            <div>
                                                <label htmlFor="input" className="myLabel">{input.title}</label>
                                                <input placeholder="choose time and duration"
                                                       value={timePrefix(timepicker.time) +  (date.finishDate? ' - ' + timePrefix(date.finishDate.getHours()): "")}
                                                       className="myInput"
                                                       type="text"
                                                       readOnly/>
                                            </div>
                                            <span>▼</span>
                                        </div>
                                    </div>
                                }
                                {/*{input.title === "Location" ?*/}
                                {/*    <div className={opened.index === index ? "myDropdownDate" : "dropHidden"}>*/}
                                {/*        /!*disabled until we have just one location*!/*/}

                                {/*        <div className="DateTimeWrapper">*/}
                                {/*            /!*<div className="myDropdownInner">*!/*/}
                                {/*                /!* show all locations *!/*/}
                                {/*{input.value.map((dropdownItem,index) => <div key={index}*/}
                                {/*className="myLocationOptions">{dropdownItem}</div>)}*/}
                                {/*            /!*</div>*!/*/}
                                {/*        </div>*/}
                                {/*    </div> : null}*/}
                                {input.title === "Time" ?
                                    <div className={opened.index === index ? "myDropdownTime" : "dropHidden"}>
                                        <div className="DateTimeWrapper">
                                            <div className="timepickerContainer">
                                                <div className="timepickerColumnContainer">
                                                    <strong><span>Start Time</span></strong>
                                                    <div className="timepickerTimeContainer">
                                                        {times.map(time =>
                                                            <label key={time}
                                                                   className={`${timepicker.time === time ? 
                                                                       "timepickerTime timepickerTimeSelected" : "timepickerTime"}`}>
                                                                <input key={time} onClick={() => handleTimeSelect(time)}
                                                                       value={time}
                                                                       className={"timepickerInput"}
                                                                       type="radio"/>
                                                                {timePrefix(time)}
                                                            </label>
                                                        )}
                                                    </div>
                                                </div>
                                                <div className="timepickerColumnContainer">
                                                    <strong><span>Duration</span></strong>
                                                    <div className="timepickerTimeContainer">
                                                        {timeDuration.map(duration =>
                                                            <label
                                                                className={`${timepicker.timeDuration === duration ? 
                                                                    "timepickerTime timepickerTimeSelected" : "timepickerTime"}`}>
                                                                <input onClick={() => handleDurationSelect(duration)}
                                                                       value={duration}
                                                                       className="timepickerInput"
                                                                       type="radio"/>
                                                                {duration + ' ' + (duration === 1 ? "hr" : "hrs")}
                                                            </label>
                                                        )}
                                                    </div>
                                                </div>
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