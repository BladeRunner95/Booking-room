import {useParams, useNavigate, Link} from "react-router-dom";
import {useState, useEffect} from "react";
import {MyNav} from "../../components/Nav/MyNav";
import noImg from '../../assets/noImage.jpg';
import weAccept from '../../assets/weAccept.png';
import './SingleLocation.module.css';
import {useSelector, useDispatch} from "react-redux";
import {Loading} from "../../components/Spinner/Spinner";
import axios from "axios";
import Cookies from "js-cookie";
import {addToTimestamp, hoursInDay, timeDuration} from "../../helpers/dateCalculations";
import moment from "moment";
import styles from './SingleLocation.module.css';
import {MyDatepicker} from "../../components/Datepicker/MyDatepicker";
import {allActions} from "../../actions/booking.actions";
import {useTranslation} from "react-i18next";
import {NavArrowIcon} from "../../components/svgs/NavArrowIcon";
import {ProfileIcon} from "../../components/svgs/ProfileIcon";
import {Microphone} from "../../components/svgs/Microphone";
import {Headphones} from "../../components/svgs/Headphones";
import {Wires} from "../../components/svgs/Wires";

export const SingleLocation = (props) => {
    const { t } = useTranslation();
    const {id} = useParams();

    const navigate = useNavigate();
    const goBack = () => navigate(-1);
    const dispatch = useDispatch();
    const booking = useSelector(state => state.myReducer);
    const loggedIn = Cookies.get('access_token');
    const checkFilters = Cookies.get('filters');
    const userId = localStorage.getItem('user');
    const [location, setLocation] = useState(null);
    const [slide, setSlide] = useState(0);
    const [filters, setFilters] = useState(null);
    const [loading, setLoading] = useState(false);
    const [openEdit, setOpenEdit] = useState(false);

    useEffect(() => {
        async function getData() {
            try {
                const getLocation = await axios.get(`http://localhost:5000/api/locations/${id}`);
                setLocation(getLocation.data);
                if (checkFilters) {
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
    }, [checkFilters]);

    useEffect(() => {
        if (filters && location) {
            dispatch(allActions.setTotalCost(location.price * filters.timeDuration));
        }
    },[filters, location]);

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

    // const notAvailable = (location) => {
    //     return location.confirmedBookings.some(date => getTimeRange(filters.startDate, filters.finishDate).includes(date));
    // }

    const handleSetBooking = async () => {
        try {
            if (!userId || !loggedIn) {
                console.log('not logged in');
                navigate('/signin');
                return;
            }
            // const checkAvailable = await notAvailable(location);
            // console.log(checkAvailable);
            // if (checkAvailable) {
            //     //add alert
            //     console.log('this dates are already booked');
            //     return;
            // }
            setLoading(true);
            const data = {
                startDate: filters.startDate,
                finishDate: filters.finishDate - 1,
                location: id,
                cost: filters.totalCost
            };
            await axios.post(`http://localhost:5000/api/bookings/${userId}`, data);
            setLoading(true);
            dispatch(allActions.defaultState());
            navigate('/');
        } catch (e) {
            if (e.response?.data) {
                console.log(e.response.data);
                //alert.danger(e.response.data)
                setLoading(false);
                return;
            }
            console.log(e);
        }
    };

    const handleOpenEdit = () => {
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

    if ((!location && !filters) || loading) return <div className={styles.SingleLocloading}><Loading/></div>;

    const switchIcon = (type) => {
        switch (type) {
            case 'Broadcast Microphone':
                return <Microphone />;
            case 'Headphones':
                return <Headphones />;
            case 'Interface':
                return <Wires />;
            default:
                return undefined;
        }
    };

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
                                            <Link className={styles.singleLocaFilterLink} to={goBack} onClick={goBack}>{t('back-to-studios')}</Link>
                                        </li>
                                        <span className={styles.singleLocaFilterSlash}>/</span>
                                        <li className={`${styles.singleLocaFilter} ${styles.secondFilter}`}>
                                            <span>{location.name}</span>
                                        </li>
                                        <span className={`${styles.singleLocaFilterSlash} ${styles.filterGreyText}`}>/</span>
                                        <li className={`${styles.singleLocaFilter} ${styles.filterGreyText}`}>{location.capacity} {t('people')}</li>
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
                                                                        <NavArrowIcon/>
                                                                    </div>
                                                                </button>
                                                                <button
                                                                    onClick={handleSlideImageRight}
                                                                    className={`${styles.singleLocaCarouselLeftButtonWrapper} ${styles.carouselRightButton}`}>
                                                                    <div className={styles.singleLocaCarouselLeftButtonInner}>
                                                                        <NavArrowIcon rightButton/>
                                                                    </div>
                                                                </button>
                                                                <div className={styles.singleLocaCarouselCapacity}>
                                                                    <ProfileIcon viewBox="0 0 16 16" light classname={styles.profileSvg}/>
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
                                                            {location.details.map((detailObj) => (
                                                                <div key={detailObj.title} className={styles.singleLocaDetailEquipItem}>
                                                                    <div className={styles.singleLocaDetailEquipIcon}>
                                                                        {switchIcon(detailObj.title)}
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
                                                <button
                                                    className={styles.paymentPayButton}
                                                    onClick={handleSetBooking}
                                                    // disabled={true}
                                                >
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