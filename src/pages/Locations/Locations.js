import {MyNav} from "../../components/Nav/MyNav";
import styles from "./Locations.module.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import {useState, useRef} from "react";
import {MyDatepicker} from "../../components/Datepicker/MyDatepicker";
import {LocationList} from "../LocationList/LocationList";
import {useSelector, useDispatch} from "react-redux";
import {allActions} from "../../actions/booking.actions";
import {Loading} from "../../components/Spinner/Spinner";
import {hoursInDay, toAmPm, handleTimeSelect, addToTimestamp} from "../../helpers/dateCalculations";
import {timeDuration} from "../../helpers/dateCalculations";
import moment from "moment";
import {useTranslation} from "react-i18next";
import {DropdownLink} from "../../components/Dropdown/Dropdown";


export const Locations = (props) => {
    const { t } = useTranslation();
    let filtersStored = useSelector(state => state.myReducer);
    const dispatch = useDispatch();
    const filtersNames = [
        {
            title: t('location'),
            value: 'Tel-Aviv'
        },
        {
            title: t('date')
        },
        {
            title: t('time')
        }
    ];
    const [timepickerOpened, setTimepickerOpened] = useState(false);
    const handleClickedTimepicker = () => {
        setTimepickerOpened(prev => !prev);
    }


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
        const startTimestamp = selectedTime.valueOf();
        if (filtersStored.finishDate === undefined) {
            dispatch(allActions.setStartDate(startTimestamp))
        } else {
            const updatedFinishDate = addToTimestamp(startTimestamp, filtersStored.timeDuration);
            dispatch(allActions.setStartFinishDate(startTimestamp, updatedFinishDate));
        }
    };

    const handleDurationSelect = (selectedDuration) => {
        const newFinishDate = addToTimestamp(filtersStored.startDate, selectedDuration);
        dispatch(allActions.setFinishDate(newFinishDate, selectedDuration));
    }

    return (
        <>
            {props.title ? <MyNav/> : null}
            <div className={styles.mainWrap}>
                <div className={`mb-5 mt-5 ${styles.myContainer}`}>
                    {filtersNames ?
                        <div className={styles.myDropdownButton}>
                            {filtersNames.map((input, index) => (
                                <div key={input.title} className={styles.myButtonWrapper}>

                                    {input.title === t('location') &&
                                        <div className={styles.timepickerInputWrapper}>
                                            <div onClick={() => {
                                            }}
                                                 className={styles.myButton}>
                                                <div className={styles.myButtonInner}>
                                                    <div>
                                                        <label htmlFor="input"
                                                               className={styles.myLabel}>{input.title}</label>
                                                        <input placeholder="location"
                                                               value={input.value}
                                                               className={styles.myInput}
                                                               type="text"
                                                               readOnly/>
                                                    </div>
                                                    {/*<span>▼</span>*/}
                                                </div>
                                            </div>
                                            <div>
                                            </div>
                                        </div>
                                    }

                                    {input.title === t('date') &&
                                        <MyDatepicker
                                            value={filtersStored.startDate}
                                            placeholder="choose date"
                                            className={styles.myButton}
                                            title={input.title}
                                            onChange={(date) => handleDateSelect(date.getTime())}
                                        />
                                    }

                                    {input.title === t('time') &&
                                        <div className={styles.timepickerInputWrapper}>
                                        <DropdownLink disabled={timepickerOpened} stateChanger={setTimepickerOpened}>
                                            <div onClick={handleClickedTimepicker}
                                                 className={styles.myButton}>
                                                <div className={styles.myButtonInner}>
                                                    <div>
                                                        <label htmlFor="input"
                                                               className={styles.myLabel}>{input.title}</label>
                                                        <input placeholder="choose time and duration"
                                                               value={toAmPm(filtersStored.startDate) +
                                                                   (filtersStored.finishDate ? ' - ' +
                                                                   toAmPm(filtersStored.finishDate)
                                                                   : "")}
                                                               className={styles.myInput}
                                                               type="text"
                                                               readOnly/>
                                                    </div>
                                                    <span>▼</span>
                                                </div>
                                            </div>

                                            <div
                                                className={timepickerOpened? styles.myDropdownTime : styles.dropHidden}>
                                                <div className={styles.DateTimeWrapper}>
                                                    <div className={styles.timepickerContainer}>
                                                        <div className={styles.timepickerColumnContainer}>
                                                            <strong><span>{t('start-time')}</span></strong>
                                                            <div className={styles.timepickerTimeContainer}>
                                                                {hoursInDay(moment(filtersStored.startDate)).map(time =>
                                                                    <label key={time.format('ha')}
                                                                           className={time.isSame(filtersStored.startDate, 'hour') ?
                                                                               `${styles.timepickerTime} ${styles.timepickerTimeSelected}`
                                                                               : styles.timepickerTime}>
                                                                        <input
                                                                            onClick={() => handleTimeSelect(time)}
                                                                            // value={time}
                                                                            className={styles.timepickerInput}
                                                                            type="radio"/>
                                                                        {time.format('ha')}
                                                                    </label>
                                                                )}
                                                            </div>
                                                        </div>
                                                        <div className={styles.timepickerColumnContainer}>
                                                            <strong><span>{t('duration')}</span></strong>
                                                            <div className={styles.timepickerTimeContainer}>
                                                                {timeDuration.map(duration =>
                                                                    <label
                                                                        key={duration}
                                                                        className={filtersStored.timeDuration === duration ?
                                                                            `${styles.timepickerTime} ${styles.timepickerTimeSelected}`
                                                                            : styles.timepickerTime}>
                                                                        <input
                                                                            onClick={() => handleDurationSelect(duration)}
                                                                            value={duration}
                                                                            className={styles.timepickerInput}
                                                                            type="radio"/>
                                                                        {duration + ' ' + (duration === 1 ? t('hour') : t('hours'))}
                                                                    </label>
                                                                )}
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </DropdownLink>
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