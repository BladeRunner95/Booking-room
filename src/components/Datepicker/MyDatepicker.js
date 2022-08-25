import {forwardRef} from "react";
import DatePicker, {CalendarContainer} from "react-datepicker";
import 'react-datepicker/dist/react-datepicker.css';
import "./MyDatepicker.css";
import moment from "moment";


export const MyDatepicker = (props) => {
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
            placeholder={props}
            className={props.className ? props.className : className}
        >
            <div className="myButtonInner">
                <div>
                    <label htmlFor="input" className="myLabel">{props.title}</label>
                    <input
                        value={moment(props.value).format('ddd MMM DD, YYYY')}
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
                <CalendarContainer className="myDropdownDate">
                    <div className="DateTimeWrapper">{children}</div>
                </CalendarContainer>
        );
    };


    return (
        <DatePicker selected={props.value}
                    onChange={(date) => props.onChange(date)}
                    onCalendarClose={() => props.onClose()}
                    customInput={<MyCustomInput/>}
                    calendarContainer = {MyContainer}
                    popperClassName="popperPlacement"
                    dayClassName={(date) => moment(date).isBefore(moment(), 'days')&& 'disabledDate'}
                    disabledKeyboardNavigation
        />
    )
};