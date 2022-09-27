import {forwardRef, useRef} from "react";
import DatePicker, {CalendarContainer} from "react-datepicker";
import 'react-datepicker/dist/react-datepicker.css';
import "./MyDatepicker.css";
import styles from "./MyDatepicker.module.css"
import moment from "moment";
import {useEffect} from "react";
import Cookies from "js-cookie";
import {useDispatch, useSelector} from "react-redux";
import {allActions} from "../../actions/booking.actions";
import {Loading} from "../Spinner/Spinner";



const MyCustomInput = forwardRef(({ _ref, onClick, ...props}, ref) => {

    if (!_ref || !_ref.current) {
        return <Loading/>;
    }
    const handleCloseDropdown = () => {
        _ref.current.setOpen(false);
    }

    return (
    <div
        onClick={() => {
            if (!_ref?.current?.state.open) {
                onClick();
            } else {
                handleCloseDropdown();
            }
        }}
        ref={ref}
        placeholder={props.title}
        className={props.className}>
        <div className={styles.myButtonInner}>
            <div>
                <label htmlFor="input" className={styles.myLabel}>{props.title}</label>
                <input
                    value={moment(_ref.current.props.value).format('ddd MMM DD, YYYY')}
                    className={_ref.current.props.editPage? styles.myInputEdit : styles.myInput}
                    type="text"
                    readOnly/>
            </div>
            <span>▼</span>
        </div>
    </div>
)});


export const MyDatepicker = (props) => {
    const startRef = useRef(null);
    const filtersStored = useSelector(state => state.myReducer);
    const dispatch = useDispatch();

    useEffect(()=> {
        if (props.editPage && !Cookies.get('filters')) return;
        dispatch(allActions.fullUpdateState(filtersStored));
    },[startRef]);

    const MyContainer = ({ className, children }) => {
        return (
                <CalendarContainer className={props.editPage ? styles.myDropdownDateEdit : styles.myDropdownDate}>
                    <div className={styles.dateTimeWrapper}>{children}</div>
                </CalendarContainer>
        );
    };

    return (
        <DatePicker
            ref={startRef}
            selected={props.value}
                    onChange={(date) => props.onChange(date)}
                    customInput={<MyCustomInput _ref={startRef}/>}
                    calendarContainer = {MyContainer}
                    popperClassName={styles.popperPlacement}
                    dayClassName={(date) => moment(date).isBefore(moment(), 'days')&& 'disabledDate'}
                    disabledKeyboardNavigation
            {...props}
        />
    )
};