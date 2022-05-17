import {forwardRef, useState} from "react";
import DatePicker, {CalendarContainer} from "react-datepicker";
import 'react-datepicker/dist/react-datepicker.css';
import "./MyDatepicker.css";


export const MyDatepicker = (props) => {
    const [startDate, setStartDate] = useState(new Date());

    //input editing
    const MyCustomInput = forwardRef(({onClick, className}, ref) => (
        //forward input inside MyDatepicker component with following props
        <div
            onClick={() => {
                if (!props.calendarOpened) {
                    onClick();
                }
                props.onClick()
            }}
            placeholder={startDate.toDateString()}
            className={props.className ? props.className : className}
        >
            <div className="myButtonInner">
                <div>
                    <label htmlFor="input" className="myLabel">{props.title}</label>
                    <input
                        value={startDate.toDateString()}
                        className="myInput"
                        type="text"
                        readOnly/>
                </div>
                <span>▼</span>
            </div>
        </div>
    ));
    //Container editing
    const MyContainer = ({ className, children }) => {
        return (
                <CalendarContainer className="myDropdown">
                    <div className="calendarWrapper">{children}</div>
                </CalendarContainer>
        );
    };


    return (
        <DatePicker selected={startDate}
                    onChange={(date) => setStartDate(date)}
                    onCalendarClose={() => props.onClose()}
                    customInput={<MyCustomInput/>}
                    calendarContainer = {MyContainer}
                    popperClassName="popperPlacement"
        />
    )
};