import {MyNav} from "../../components/Nav/MyNav";
import "./Locations.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import {useState, useEffect, useRef} from "react";
import {MyDatepicker} from "../../components/Datepicker/MyDatepicker";
import {LocationList} from "../LocationList/LocationList";
import {useSelector, useDispatch} from "react-redux";
import {allActions} from "../../actions/booking.actions";
import {Loading} from "../../components/Spinner/Spinner";
import {hoursInDay, inFifteenMinutes, toAmPm} from "../../helpers/dateCalculations";
import {timeDuration} from "../../helpers/dateCalculations";
import Cookies from "js-cookie";
import moment from "moment";


export const Locations = (props) => {
    const wrapperRef = useRef(null);
    let filtersStored = useSelector(state => state.myReducer);
    const dispatch = useDispatch();
    const filtersNames = [
        {
            title: 'Location',
            value: 'Tel-Aviv'
        },
        {
            title: 'Date'
        },
        {
            title: 'Time'
        }
    ];

    useEffect(() => {
        async function getData() {
            try {

                if (filtersStored.finishDate) {
                    await Cookies.set('filters', JSON.stringify(filtersStored), {expires: inFifteenMinutes});
                    fullUpdateState(filtersStored);
                }
            } catch (error) {
                console.log(error);
            }
        }

        getData();
    }, [filtersStored.finishDate]);

    // useEffect(()=> {
    //     const outsideTimepicker = (ref) => {
    //         if (ref.current && !ref.current.contains())
    //         console.log(e)
    //     }
    //     document.addEventListener("click", handleClickOutside)
    //     outsideTimepicker(wrapperRef);
    // }, [wrapperRef])


    const fullUpdateState = (newState) => {
        dispatch(allActions.fullUpdateState(newState));
        console.log('full state update1!!!!!!!!!!!!!!!')
    };
    //click outside hook
    // const useOutsideClick = (ref) => {
    //     useEffect(() => {
    //         function handleClickOutside(event) {
    //             if (ref.current && !ref.current.contains(event.target)) {
    //                 setOutsideClick({...outsideClick, outside: false, inside: false});
    //             }
    //         }
    //
    //         document.addEventListener("click", handleClickOutside);
    //         return () => {
    //             document.removeEventListener("click", handleClickOutside);
    //         };
    //     }, [ref]);
    // }

    const [opened, setOpened] = useState(
        {
            index: null,
            open: false,
            timeOutside: false,
            timeInside: false
        });

    // const [calendarOpened, setCalendarOpened] = useState(false);
    // const [timepickerOpened, setTimepickerOpened] = useState(false);

    // useOutsideClick(wrapperRef);


    const handleClickedDropdown = (inputId) => {
        // setCalendarOpened(prev=> !prev);
        if (inputId === opened.index) {
            setOpened(prev => ({
                ...prev, index: null, open: false
            }));
        } else {
            setOpened({index: inputId, open: true});
        }
    };

    // const handleClickedTimepicker = () => {
    //     setTimepickerOpened(prev => !prev);
    // }


    const handleDateSelect = (selectedDate) => {
        if (filtersStored.finishDate === undefined) {
            dispatch(allActions.setStartDate(selectedDate));
        } else {
            const updatedFinishDate = (moment(selectedDate).clone().add(filtersStored.timeDuration, 'hours')).valueOf();
            dispatch(allActions.setStartFinishDate(selectedDate.valueOf(), updatedFinishDate));
            console.log('startFinish date working');
        }

    };

    const handleTimeSelect = (selectedTime) => {
        if (filtersStored.finishDate === undefined) {
            dispatch(allActions.setStartDate(selectedTime.valueOf()))
        } else {
            const updatedFinishDate = (moment(selectedTime).clone().add(filtersStored.timeDuration, 'hours')).valueOf();
            dispatch(allActions.setStartFinishDate(selectedTime.valueOf(), updatedFinishDate));
        }
    };

    const handleDurationSelect = (selectedDuration) => {
        const newFinishDate = (moment(filtersStored.startDate).clone().add(selectedDuration, 'hours')).valueOf();
        dispatch(allActions.setFinishDate(newFinishDate, selectedDuration));
    }

    return (
        <>
            {props.title ? <MyNav/> : null}
            <div className="mainWrap">
                <div className="mb-5 mt-5 myContainer">
                    {filtersNames ?
                        <div className="myDropdownButton">
                            {filtersNames.map((input, index) => (
                                <div key={input.title} className="myButtonWrapper">

                                    {input.title === "Location" ?
                                        <div className="timepickerInputWrapper">
                                            <div onClick={() => {
                                                // handleClickedDropdown(index);
                                            }}
                                                 className="myButton">
                                                <div className="myButtonInner">
                                                    <div>
                                                        <label htmlFor="input" className="myLabel">{input.title}</label>
                                                        <input placeholder="location"
                                                               value={input.value}
                                                               className="myInput"
                                                               type="text"
                                                               readOnly/>
                                                    </div>
                                                    <span>▼</span>
                                                </div>
                                            </div>
                                            <div
                                                className={opened.index === index ? "myDropdownLocation" : "dropHidden"}>
                                                {/*<div className="myDropdownInnerWrapper">*/}
                                                {/*    <div className="myDropdownInner">*/}
                                                {/*        {input.value.map((dropdownItem,index) => <div key={index}
                                             className="myLocationOptions">{dropdownItem}</div>)}*/}
                                                {/*    </div>*/}
                                                {/*</div>*/}
                                            </div>
                                        </div> : null}

                                    {input.title === "Date" ?
                                        <MyDatepicker
                                            value={filtersStored.startDate}
                                            onClose={() => handleClickedDropdown(index)}
                                            calendarOpened={opened.index === index}
                                            onClick={() => handleClickedDropdown(index)}
                                            placeholder="choose date"
                                            className="myButton"
                                            title={input.title}
                                            onChange={(date) => handleDateSelect(date.getTime())}
                                        />
                                        : null}

                                    {input.title === "Time" &&
                                        <div ref={wrapperRef} className="timepickerInputWrapper">
                                            <div onClick={() => {
                                                handleClickedDropdown(index);
                                                setOpened({
                                                    ...opened,
                                                    timeOutside: true,
                                                    timeInside: !opened.timeInside
                                                });
                                            }}
                                                 className="myButton">
                                                <div className="myButtonInner">
                                                    <div>
                                                        <label htmlFor="input" className="myLabel">{input.title}</label>
                                                        <input placeholder="choose time and duration"
                                                               value={toAmPm(filtersStored.startDate) + (filtersStored.finishDate ? ' - ' +
                                                                   toAmPm(filtersStored.finishDate)
                                                                   : "" )}
                                                               className="myInput"
                                                               type="text"
                                                               readOnly/>
                                                    </div>
                                                    <span>▼</span>
                                                </div>
                                            </div>

                                            <div
                                                className={opened.timeInside && opened.timeOutside ? "myDropdownTime" : "dropHidden"}>
                                                <div className="DateTimeWrapper">
                                                    <div className="timepickerContainer">
                                                        <div className="timepickerColumnContainer">
                                                            <strong><span>Start Time</span></strong>
                                                            <div className="timepickerTimeContainer">
                                                                {hoursInDay(moment(filtersStored.startDate)).map(time =>
                                                                    <label key={time.format('ha')}
                                                                           className={`${time.isSame(filtersStored.startDate, 'hour') ?
                                                                               "timepickerTime timepickerTimeSelected" : "timepickerTime"}`}>
                                                                        <input
                                                                               onClick={() => handleTimeSelect(time)}
                                                                               // value={time}
                                                                               className={"timepickerInput"}
                                                                               type="radio"/>
                                                                        {time.format('ha')}
                                                                    </label>
                                                                )}
                                                            </div>
                                                        </div>
                                                        <div className="timepickerColumnContainer">
                                                            <strong><span>Duration</span></strong>
                                                            <div className="timepickerTimeContainer">
                                                                {timeDuration.map(duration =>
                                                                    <label
                                                                        key={duration}
                                                                        className={`${filtersStored.timeDuration === duration ?
                                                                            "timepickerTime timepickerTimeSelected" : "timepickerTime"}`}>
                                                                        <input
                                                                            onClick={() => handleDurationSelect(duration)}
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
                                            </div>
                                        </div>
                                    }
                                </div>
                            ))
                            }
                        </div> : <Loading/>
                    }
                </div>
                <button onClick={() =>
                    console.log(`start: ${moment(filtersStored.startDate).format('DD.MM.YYYY ha')}, finish: ${
                        moment(filtersStored.finishDate).format('DD.MM.YYYY ha')}, total cost: ${filtersStored.totalCost}`)}
                        type="button">
                    Show logs
                </button>
                <LocationList/>
            </div>
        </>
    )
}