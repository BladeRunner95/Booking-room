import {_Nav} from "../../components/Nav/_Nav";
import "./Locations.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import {useState, useEffect, useRef} from "react";
import {MyDatepicker} from "../../components/Datepicker/MyDatepicker";
import {LocationList} from "../LocationList/LocationList";
import {useSelector, useDispatch} from "react-redux";
import {allActions} from "../../actions/booking.actions";
import axios from "axios";
import {Spinner} from "../../components/Spinner/Spinner";


export const Locations = (props) => {
    const wrapperRef = useRef(null);
    let filtersStored = useSelector(state => state.myReducer);
    const dispatch = useDispatch();
    const [filters, setFilters] = useState(null);

    const startTimestampToDate = (timestamp) => {
      return new Date(timestamp.startDate);
    };

    const finishTimestampToDate = (timestamp) => {
        return new Date(timestamp.finishDate);
    };

    useEffect(() => {
        async function getData() {
            try {
                if (filtersStored.finishDate) {
                    console.log('finish date updated');
                    const getFilters = await axios.get('http://localhost:5000/api');
                    setFilters(getFilters.data);
                    // setFilters(locations.data);
                    // let newObj = {};
                    // for (let [key, value] of Object.entries(filtersStored)) {
                    //     if (typeof value === 'object' && !Array.isArray(value)) {
                    //         newObj[JSON.stringify(key)] = value.toString();
                    //     } else {
                    //         newObj[JSON.stringify(key)] = value;
                    //     }
                    // }
                    // if (localStorage.getItem('filters') === null) {
                    //     await localStorage.setItem('filters', JSON.stringify(filtersStored));
                    // }
                    // else {
                    //     const storageFilters = JSON.parse(localStorage.getItem('filters'));
                    //     console.log(storageFilters);
                        //dispatch action change initialState to localstorage object
                    // }
                } else {
                    if (localStorage.getItem('filters') !== null) {
                        const getFilters = await JSON.parse(localStorage.getItem('filters'));
                        console.log(getFilters);
                        fullUpdateState(getFilters.locations);
                    }
                        const getFilters = await axios.get('http://localhost:5000/api');
                        setFilters(getFilters.data);
                }
            } catch (error) {
                console.log(error);
            }
        }

        getData();

        // return async ()=> {
        //     if (filtersStored.finishDate) {
        //         await localStorage.setItem('filters', JSON.stringify(filtersStored));
        //     }
        // }
    }, [filtersStored.finishDate]);



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


    const times = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23];
    const timeDuration = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 24];
    const timePrefix = (hour) => ((hour + 11) % 12 + 1) + (hour >= 12 ? "pm" : "am");
    // useOutsideClick(wrapperRef);


    const handleClickedDropdown = (inputId) => {
        if (inputId === opened.index) {
            setOpened({index: null, open: false});
        } else {
            setOpened({index: inputId, open: true});
        }
    };

    const handleDateSelect = (selectedDate) => {
        if (filtersStored.finishDate === undefined) {
            dispatch(allActions.setStartDate(selectedDate));
        } else {
            dispatch(allActions.setStartFinishDate(selectedDate));
            // localStorage.setItem();
        }

    };

    const handleTimeSelect = (selectedTime) => {
        if (filtersStored.finishDate === undefined) {
            dispatch(allActions.setTimeStart(selectedTime));
        } else {
            dispatch(allActions.changeStartFinishTime(selectedTime));
        }
    };

    const handleDurationSelect = (selectedDuration) => {
        dispatch(allActions.setDuration(selectedDuration));
    }

    return (
        <>
            {props.title ? <_Nav/> : null}
            <div className="mainWrap">
                <div className="mb-5 mt-5 myContainer">
                    {filters ?
                        <div className="myDropdownButton">
                            {filters.map((input, index) => (
                                <div key={input.id} className="myButtonWrapper">

                                    {input.title === "Location" ?
                                        <div className="timepickerInputWrapper">
                                            <div onClick={() => {
                                                handleClickedDropdown(index);
                                            }}
                                                 className="myButton">
                                                <div className="myButtonInner">
                                                    <div>
                                                        <label htmlFor="input" className="myLabel">{input.title}</label>
                                                        <input placeholder="location"
                                                               value={input.value[0]}
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
                                            value={startTimestampToDate(filtersStored)}
                                            onClose={() => handleClickedDropdown(index)}
                                            calendarOpened={opened.index === index}
                                            onClick={() => handleClickedDropdown(index)}
                                            placeholder={startTimestampToDate(filtersStored)}
                                            className="myButton"
                                            title={input.title}
                                            onChange={(date) => handleDateSelect(date.getTime())}
                                        />
                                        : null}

                                    {input.title === "Time" ?
                                        //in other case return regular div with dropdown
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
                                                               value={timePrefix(filtersStored.time) + (filtersStored.finishDate ? ' - ' +
                                                                   timePrefix(finishTimestampToDate(filtersStored).getHours()) : "")}
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
                                                                {times.map(time =>
                                                                    <label key={time}
                                                                           className={`${filtersStored.time === time ?
                                                                               "timepickerTime timepickerTimeSelected" : "timepickerTime"}`}>
                                                                        <input key={time}
                                                                               onClick={() => handleTimeSelect(time)}
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
                                        </div> : null
                                    }
                                </div>
                            ))
                            }
                        </div> : <Spinner/>
                    }
                </div>
                <button onClick={() =>
                    console.log(`start: ${startTimestampToDate(filtersStored)}, finish:  ${finishTimestampToDate(filtersStored)}, total cost: ${filtersStored.totalCost}`)}
                        type="button">
                    Show logs</button>
                <LocationList/>
            </div>
        </>
    )
}