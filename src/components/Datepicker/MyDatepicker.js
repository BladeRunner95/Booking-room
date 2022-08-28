import {forwardRef} from "react";
import DatePicker, {CalendarContainer} from "react-datepicker";
import 'react-datepicker/dist/react-datepicker.css';
import "./MyDatepicker.css";
import styles from "./MyDatepicker.module.css"
import moment from "moment";
import {useEffect} from "react";
import Cookies from "js-cookie";
import {inFifteenMinutes} from "../../helpers/dateCalculations";
import {useDispatch, useSelector} from "react-redux";
import {allActions} from "../../actions/booking.actions";


export const MyDatepicker = (props) => {

    const filtersStored = useSelector(state => state.myReducer);
    const dispatch = useDispatch();
    useEffect(() => {
        async function getData() {
            try {
                if (props.editPage && !Cookies.get('filters')) return;
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

    const fullUpdateState = (newState) => {
        dispatch(allActions.fullUpdateState(newState));
    };
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
            <div className={styles.myButtonInner}>
                <div>
                    <label htmlFor="input" className={styles.myLabel}>{props.title}</label>
                    <input
                        value={moment(props.value).format('ddd MMM DD, YYYY')}
                        className={props.editPage? styles.myInputEdit : styles.myInput}
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
                <CalendarContainer className={props.editPage ? styles.myDropdownDateEdit : styles.myDropdownDate}>
                    <div className={styles.dateTimeWrapper}>{children}</div>
                </CalendarContainer>
        );
    };


    return (
        <DatePicker selected={props.value}
                    onChange={(date) => props.onChange(date)}
                    onCalendarClose={() => props.onClose()}
                    customInput={<MyCustomInput/>}
                    calendarContainer = {MyContainer}
                    popperClassName={styles.popperPlacement}
                    dayClassName={(date) => moment(date).isBefore(moment(), 'days')&& 'disabledDate'}
                    disabledKeyboardNavigation
        />
    )
};