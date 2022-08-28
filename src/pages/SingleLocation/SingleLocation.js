import {useParams, useNavigate, Link} from "react-router-dom";
import {useState, useEffect, useMemo} from "react";
import {MyNav} from "../../components/Nav/MyNav";
// import drocher from '../../assets/lexshug.jpg';
import noImg from '../../assets/noImage.jpg';
import weAccept from '../../assets/weAccept.png';
import './SingleLocation.module.css';
import {useSelector, useDispatch} from "react-redux";
import {Loading} from "../../components/Spinner/Spinner";
import axios from "axios";
import {NotFound} from "../../components/NotFound/NotFound";
import Cookies from "js-cookie";
import {addToTimestamp, getTimeRange, handleTimeSelect, hoursInDay, timeDuration} from "../../helpers/dateCalculations";
import moment from "moment";
import styles from './SingleLocation.module.css';
import {MyDatepicker} from "../../components/Datepicker/MyDatepicker";
import {allActions} from "../../actions/booking.actions";

export const SingleLocation = (props) => {
    const {id} = useParams();
    const navigate = useNavigate();
    const goBack = () => navigate(-1);
    const dispatch = useDispatch();
    const booking = useSelector(state => state.myReducer);
    const loggedIn = Cookies.get('access_token');
    const userId = localStorage.getItem('user');
    const [location, setLocation] = useState(null);
    const [slide, setSlide] = useState(0);
    const [filters, setFilters] = useState(null);
    const [loading, setLoading] = useState(false);
    const [openEdit, setOpenEdit] = useState(false);
    const [calOpened, setCalOpened] = useState(false);

    useEffect(() => {
        async function getData() {
            try {
                const getLocation = await axios.get(`http://localhost:5000/api/locations/${id}`);
                setLocation(getLocation.data);
                if (Cookies.get('filters')) {
                    const getFilters = JSON.parse(Cookies.get('filters'));
                    setFilters(getFilters);
                } else {
                    dispatch(allActions.defaultState());
                    navigate('/');
                }
            } catch (e) {
                console.log(e);
            }
        }

        getData();
    }, [Cookies.get('filters')]);

    useEffect(() => {
        if (filters && location) {
            dispatch(allActions.setTotalCost(location.price * filters.timeDuration));
        }
    },[filters, location])

    // need to memorize this value. useMemo doesn't work with conditional statements
    const memoized = location?.images && 100 / location.images.length;

    const handleSlideLeft = () => {
        if (slide === 0) {
            setSlide(-(memoized * (location.images.length - 1)));
            return;
        }
        setSlide(prev => prev + memoized);
    };

    const handleSlideImageRight = () => {
        if (slide - (memoized) === -100) {
            setSlide(0);
            return;
        }
        setSlide(prev => prev - (memoized));
    };

    const notAvailable = (location) => {
        return location.confirmedBookings.some(date => getTimeRange(filters.startDate, filters.finishDate).includes(date));
    }

    const handleSetBooking = async () => {
        try {
            if (!userId || !loggedIn) {
                console.log('not logged in');
                navigate('/signin');
                return;
            }
            if (notAvailable(location)) {
                //add alert
                console.log('this dates are already booked');
                return;
            }
            setLoading(true);
            const data = {
                startDate: filters.startDate,
                finishDate: filters.finishDate - 1,
                location: id,
                cost: filters.totalCost
            };
            const booking = await axios.post(`http://localhost:5000/api/bookings/${userId}`, data);
            setLoading(true);
            navigate('/');
        } catch (e) {
            console.log(e);
        }
    };

    const handleOpenEdit = () => {
        // if (!openEdit && !Cookies.get('filters')) {
        //     dispatch(allActions.defaultState());
        //     navigate('/');
        // }
      setOpenEdit(prev=> !prev);
    };

    const handleTimeSelect = (e) => {
        const selectedTime = Number(e.target.value);
        if (booking.finishDate === undefined) {
            dispatch(allActions.setStartDate(selectedTime));
        } else {
            const updatedFinishDate = addToTimestamp(selectedTime, booking.timeDuration)
            // const updatedFinishDate = (moment(selectedTime).clone().add(booking.timeDuration, 'hours')).valueOf();
            dispatch(allActions.setStartFinishDate(selectedTime, updatedFinishDate));
        }
    };

    const handleDurationSelect = (e) => {
        const selectedDuration = e.target.value;
        const newFinishDate = addToTimestamp(booking.startDate, selectedDuration);
        // const newFinishDate = (moment(booking.startDate).clone().add(selectedDuration, 'hours')).valueOf();
        dispatch(allActions.setFinishDate(newFinishDate, selectedDuration));
    }


    const handleDateSelect = (selectedDate) => {
        if (booking.finishDate === undefined) {
            dispatch(allActions.setStartDate(selectedDate));
        } else {
            const updatedFinishDate = (moment(selectedDate).clone().add(booking.timeDuration, 'hours')).valueOf();
            dispatch(allActions.setStartFinishDate(selectedDate.valueOf(), updatedFinishDate));
        }

    };

    if ((!location && !filters) || loading) return <div className={styles.SingleLocloading}><Loading/></div>


    const svgs = [
        <svg width="24" height="24" overflow="visible"
                       preserveAspectRatio="xMinYMin meet"
                       strokeWidth="0" viewBox="0 0 25 25"
                       fill="#000000" stroke="#000000">
        <g><path d="M13 18.92C14.6646 18.6797 16.187 17.8482 17.2888 16.5775C18.3906 15.3067 18.998 13.6818 19
        12H17C17 13.3261 16.4732 14.5978 15.5355 15.5355C14.5978 16.4732 13.3261 17 12 17C10.6739 17 9.40214
        16.4732 8.46446 15.5355C7.52678 14.5978 6.99998 13.3261 6.99998 12H4.99998C5.00196 13.6818 5.60939
        15.3067 6.71117 16.5775C7.81294 17.8482 9.33539 18.6797 11 18.92V22H5.99998V24H18V22H13V18.92Z"/>
            <path d="M12 16C13.1089 15.9481 14.1521 15.4593 14.9017 14.6404C15.6512 13.8215 16.0461 12.7392 16
            11.63V4.35999C16 3.29912 15.5785 2.2817 14.8284 1.53156C14.0782 0.78141 13.0608 0.359985 12
            0.359985C10.9391 0.359985 9.92167 0.78141 9.17153 1.53156C8.42138 2.2817 7.99996 3.29912 7.99996
            4.35999V11.63C7.95381 12.7392 8.34867 13.8215 9.09822 14.6404C9.84777 15.4593 10.891 15.9481 12
            16ZM9.99996 4.35999C9.99996 3.82955 10.2107 3.32087 10.5858 2.9458C10.9608 2.57073 11.4695 2.35999
            12 2.35999C12.5304 2.35999 13.0391 2.57073 13.4142 2.9458C13.7893 3.32087 14 3.82955 14
            4.35999V11.63C14 12.1604 13.7893 12.6691 13.4142 13.0442C13.0391 13.4193 12.5304 13.63 12
            13.63C11.4695 13.63 10.9608 13.4193 10.5858 13.0442C10.2107 12.6691 9.99996 12.1604 9.99996
            11.63V4.35999Z"/></g>
        </svg> ,
        <svg width="24" height="24" overflow="visible"
             preserveAspectRatio="xMinYMin meet"
             strokeWidth="0" viewBox="0 0 25 25"
             fill="#000000" stroke="#000000">
            <path fill="#000" d="M22.04 13.95V11.49C22.0909 8.76495 21.0597 6.13073 19.1722 4.16452C17.2847 2.19831 14.6949 1.06042
            11.97 1.00003C9.28134 1.06301 6.72714 2.18836 4.86617 4.12991C3.00521 6.07146 1.98902
            8.67111 2.04 11.36V13.95L0.0400009 15.95V20.95L2.04 22.95H7.04V13.95H4.04V11.36C3.98622 9.20073
            4.79076 7.1082 6.27724 5.54111C7.76373 3.97402 9.81088 3.06024 11.97 3.00003C14.1645 3.06027 16.2457 3.98742 17.7581
            5.57858C19.2706 7.16975 20.0911 9.29532 20.04 11.49V13.95H17.04V22.95H22.04L24.04 20.95V15.95L22.04 13.95Z"/>
        </svg>,
        <svg width="24" height="24" overflow="visible"
             preserveAspectRatio="xMinYMin meet"
             strokeWidth="0" viewBox="0 0 25 25"
             fill="#000000" stroke="#000000">
            <path fillRule="evenodd" clipRule="evenodd"
                  d="M2.70709 0.292908C2.89463 0.480444 3 0.734784 3 1V2H1V1C1 0.734784 1.10537 0.480444 1.29291
                  0.292908C1.48044 0.105371 1.73478 0 2 0C2.26522 0 2.51956 0.105371 2.70709 0.292908ZM9 8.47998C9
                  5.34998 11.15 3 14 3C16.85 3 19 5.34998 19 8.47998V24H17V8.47998C17 6.45998 15.74 5 14 5C12.26 5 11 6.47998 11
                  8.47998V18.48C11 21.61 8.85 23.97 6 23.97C3.15 23.97 1 21.61 1 18.48V14.69C0.697724 14.5155 0.446367 14.2649 0.270935
                  13.9631C0.0955035 13.6614 0.00210674 13.319 0 12.97V7.96997H1V2.96997H3V7.96997H4V12.97C3.99789 13.319 3.9045 13.6614 3.72906
                  13.9631C3.55363 14.2649 3.30228 14.5155 3 14.69V18.48C3 20.5 4.26 21.97 6 21.97C7.74 21.97 9 20.48 9 18.48V8.47998Z"/>
        </svg>
    ];

    return (
        <>
            <MyNav/>
            {filters &&
            <div className={styles.singleLocaWrapper}>
                <div>
                    <div>
                        <div className={styles.singleLocaInnerWrapper}>
                            <div className={styles.singleLocaInner}>
                                <div className={styles.singleLocaInnerPad}>
                                    <ul className={styles.singleLocaFilters}>
                                        <li className={styles.singleLocaFilter}>
                                            <Link className={styles.singleLocaFilterLink} to={goBack} onClick={goBack}>Back to
                                                all studios</Link>
                                        </li>
                                        <span className={styles.singleLocaFilterSlash}>/</span>
                                        <li className={`${styles.singleLocaFilter} ${styles.secondFilter}`}>
                                            <span>{location.name}</span>
                                        </li>
                                        <span className={`${styles.singleLocaFilterSlash} ${styles.filterGreyText}`}>/</span>
                                        <li className={`${styles.singleLocaFilter} ${styles.filterGreyText}`}>{location.capacity} people</li>
                                    </ul>
                                    <div className={styles.singleLocaInfoMainSection}>
                                        <div className={styles.singleLocaInfoWrapper}>
                                            <div className={styles.singleLocaSliderWrapper}>
                                                {location.images.length > 0 ?
                                                <a className={styles.singleLocaSliderLink}>
                                                    <div className={styles.singleLocaSliderInnerWrapper}>
                                                        <div className={styles.singleLocaCarouselWrapper}>
                                                            <div className={styles.singleLocaCarouselInner}>
                                                                <div className={styles.singleLocaCarouselImagesWrapper}>
                                                                    <div>
                                                                        <ul className={styles.singleLocaCarouselList}
                                                                            style={{
                                                                                width: `calc(100% * ${location.images.length})`,
                                                                                transform: `translateX(${slide}%) translateX(0px)`
                                                                            }}
                                                                        >
                                                                            {location.images.map(singleImage => (
                                                                                <li key={singleImage}
                                                                                    className={styles.singleLocaCarouselImageWrapper}
                                                                                    style={{
                                                                                        width: `calc(100%/ ${location.images.length})`,
                                                                                        paddingBottom: `calc(69%/ ${location.images.length})`
                                                                                    }}
                                                                                >
                                                                                    <div className={styles.singleLocaCarouselImageInner}>
                                                                                        <img
                                                                                            className={styles.singleLocaCarouselImage}
                                                                                            src={singleImage}
                                                                                            alt={location.name}/>
                                                                                    </div>
                                                                                </li>
                                                                            ))}
                                                                        </ul>
                                                                    </div>
                                                                </div>
                                                                <div className={styles.singleLocaSliderBottomShadow}/>
                                                                <button
                                                                    onClick={handleSlideLeft}
                                                                    className={styles.singleLocaCarouselLeftButtonWrapper}>
                                                                    <div className={styles.singleLocaCarouselLeftButtonInner}>
                                                                        <svg width="24" height="24" overflow="visible"
                                                                             preserveAspectRatio="xMinYMin meet"
                                                                             strokeWidth="0"
                                                                             viewBox="0 0 25 25" fill="#FFFFFF"
                                                                             stroke="#FFFFFF">
                                                                            <path d="M4 12L20 4L20 20L4 12Z"/>
                                                                        </svg>
                                                                    </div>
                                                                </button>
                                                                <button
                                                                    onClick={handleSlideImageRight}
                                                                    className={`${styles.singleLocaCarouselLeftButtonWrapper} ${styles.carouselRightButton}`}>
                                                                    <div className={styles.singleLocaCarouselLeftButtonInner}>
                                                                        <svg width="24" height="24" overflow="visible"
                                                                             preserveAspectRatio="xMinYMin meet"
                                                                             strokeWidth="0"
                                                                             viewBox="0 0 25 25" fill="#FFFFFF"
                                                                             stroke="#FFFFFF">
                                                                            <path d="M20 12L4 20L4 4L20 12Z"/>
                                                                        </svg>
                                                                    </div>
                                                                </button>
                                                                <div className={styles.singleLocaCarouselCapacity}>
                                                                    <svg xmlns="http://www.w3.org/2000/svg" width="16"
                                                                         height="16" viewBox="0 0 16 16" fill="none">
                                                                        <path fillRule="evenodd" clipRule="evenodd" d="M4.66667 4.66667C4.66667 2.82572
                                                                        6.15905 1.33333 8 1.33333C9.84095 1.33333
                                                                        11.3333 2.82572 11.3333 4.66667C11.3333 6.50762 9.84095 8 8 8C6.15905 8 4.66667 6.50762 4.66667
                                                                        4.66667ZM8 0C5.42267 0 3.33333 2.08934 3.33333 4.66667C3.33333 6.53641 4.43292 8.14932 6.02071
                                                                        8.89402C2.59326 9.69623 0 12.5336 0 16H1.33333C1.33333 12.7447 4.25689 10 8 10C11.7431 10 14.6667
                                                                        12.7447 14.6667 16H16C16 12.5336 13.4067 9.69623 9.97929 8.89402C11.5671 8.14932 12.6667 6.53641
                                                                        12.6667 4.66667C12.6667 2.08934 10.5773 0 8 0Z"
                                                                              fill="white"/>
                                                                    </svg>
                                                                    <span
                                                                        className={styles.singleLocaCapacityNumber}>{location.capacity}</span>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </a>
                                                    : <div className={styles.carouselNoImages}>
                                                        <img className={styles.carouselPlaceholder} src={noImg} alt="no im"/>
                                                    </div> }
                                            </div>

                                            <div className={styles.singleLocaInfoDetails}>
                                                <div className={styles.singleLocaInfoDetailsInner}>
                                                    <div className={styles.singleLocaDetailsEquipWrapper}>
                                                        <h3 className={styles.singleLocaDetailsTitle}>Equipment</h3>
                                                        <div className={styles.singleLocaDetailsEquipInner}>
                                                            {location.details.map((detailObj, index) => (
                                                                <div key={detailObj.title} className={styles.singleLocaDetailEquipItem}>
                                                                    <div className={styles.singleLocaDetailEquipIcon}>
                                                                        {svgs[index]}
                                                                    </div>
                                                                    <div className="ps-1">
                                                                        <h4 className={styles.singleLocaDetailEquipTitle}>{detailObj.title}</h4>
                                                                        <div
                                                                            className={styles.singleLocaDetailEquipText}>{detailObj.description}</div>
                                                                    </div>
                                                                </div>
                                                                )
                                                            )}
                                                        </div>
                                                    </div>
                                                    <div className={styles.singleLocaDetailsLocationWrap}>
                                                        <h3 className={styles.singleLocaDetailsTitle}>Location</h3>
                                                        <h4 className={styles.singleLocaDetailEquipTitle}>Address: </h4>
                                                        <div
                                                            className={`${styles.singleLocaDetailEquipText} ${styles.singleLocaAddress}`}>Herzl
                                                            60, Ramat Gan
                                                        </div>
                                                        <div className={styles.singleLocaGmaps}>
                                                            <a href="https://goo.gl/maps/8TeFEL1nM75Htuxp7"
                                                               target="_blank" className={styles.track_studioInfo_googleMaps}
                                                               rel="noopener noreferrer">View in Google Maps</a>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        <div className={styles.paymentColumn}>
                                            <div className={styles.paymentColumnInner}>
                                                <div className={styles.paymentTitleWrap}>
                                                    <h2 className={styles.paymentTitle}>{location.name}</h2>
                                                </div>
                                                <div className={styles.paymentColumnCity}><span>{location.title}</span></div>
                                                <div className={styles.paymentColumnDate}>
                                                    {moment(filters.startDate).format('dddd DD MMMM YYYY')}
                                                </div>
                                                <div className={styles.paymentColumnTimeWrap}>
                                                    {/*<div className={styles.}paymentColumnTimeWrap}>*/}
                                                        {
                                                            moment(filters.startDate).format('hA')
                                                        } - {
                                                        moment(filters.finishDate).format('hA')
                                                    } ({filters.timeDuration} {filters.timeDuration === 1 ? 'hr': 'hrs'})
                                                    <button onClick={handleOpenEdit} className={styles.paymentEditButton}><span>Edit</span></button>
                                                </div>

                                                {openEdit &&
                                                    <div className={styles.editContainer}>
                                                        <form className={styles.editInputsWrap}>
                                                            <div className={styles.dateInputWrap}>
                                                                <div className={styles.dateInputInner}>
                                                                    <label className={styles.editTitle}>Date</label>
                                                                    <div className={styles.dateInputPre}>
                                                                        {/*<div className={styles.dateInput}>*/}
                                                                        <MyDatepicker
                                                                            editPage
                                                                            value={booking.startDate}
                                                                            onClose={() => setCalOpened(!calOpened)}
                                                                            onClick={()=> setCalOpened(!calOpened)}
                                                                            calendarOpened={calOpened}
                                                                            placeholder="choose date"
                                                                            onChange={(date) => handleDateSelect(date.getTime())}
                                                                        />

                                                                    </div>
                                                                </div>
                                                            </div>

                                                            <div className={styles.dateInputWrap}>
                                                                <div className={styles.smallInputWrap}>
                                                                    <label className={styles.editTitle}>Start</label>
                                                                    <div className={styles.smallInputInner}>
                                                                        <div className={styles.smallInputPre}>
                                                                            <select onChange={handleTimeSelect}
                                                                                    value={booking.startDate}
                                                                                    className={styles.selectContainer}>
                                                                                {hoursInDay(moment(filters.startDate)).map(time =>
                                                                                    <option
                                                                                        key={time.format('ha')}
                                                                                        value={time.valueOf()}>
                                                                                        {time.format('ha')}
                                                                                    </option>
                                                                                )}
                                                                            </select>
                                                                        </div>
                                                                        <span className={styles.dropdownIcon}>▼</span>
                                                                    </div>
                                                                </div>
                                                                <div className={styles.emptyContainer}/>
                                                                <div className={styles.smallInputWrap}>
                                                                    <div className={styles.smallInputWrap}>
                                                                        <label className={styles.editTitle}>Duration</label>
                                                                        <div className={styles.smallInputInner}>
                                                                            <div className={styles.smallInputPre}>
                                                                                <select
                                                                                    onChange={handleDurationSelect}
                                                                                    value={booking.timeDuration}
                                                                                    className={styles.selectContainer}>
                                                                                    {timeDuration.map(duration =>
                                                                                        <option
                                                                                            key={duration}
                                                                                            value={duration}>{duration} {duration === 1? 'hour': 'hours'}</option>
                                                                                        )}
                                                                                </select>
                                                                            </div>
                                                                            <span className={styles.dropdownIcon}>▼</span>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </form>
                                                        <div></div>
                                                    </div>
                                                }

                                                <div className={styles.paymentColumnTotal}>
                                                    <div className={styles.paymentColumnTotalInner}>
                                                        <h3 className={styles.paymentColumnTotalText}>total</h3>
                                                        <div className={styles.paymentColumnTotalAmount}>
                                                            <span
                                                                className={styles.paymentTotalAmountSpan}>₪{booking.totalCost}</span>
                                                        </div>
                                                    </div>
                                                </div>
                                                {/*<Link className={styles.paymentPayButton} to={`/payment/${id}`}>*/}
                                                {/*  <span>Book this studio</span>*/}
                                                {/*</Link>*/}
                                                <button className={styles.paymentPayButton} onClick={handleSetBooking}>
                                                    <span>Book this studio</span>
                                                </button>
                                                <div className={styles.paymentCardsWrap}>
                                                    <div className={styles.paymentAcceptText}>We accept</div>
                                                </div>
                                                <div className={styles.paymentCardsIcons}>
                                                    <img className={styles.paymentCardsIcon}
                                                         src={weAccept}
                                                         alt="payment icons"/>
                                                </div>
                                                <div className={styles.paymentPowered}>
                                                    <img
                                                        src="https://book.pirate.com/static/media/powered-by-stripe-logo.90abdeaa.svg"
                                                        alt="Powered by Stripe"/>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
                }
        </>
    )
};