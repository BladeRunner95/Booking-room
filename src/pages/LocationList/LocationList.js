import './LocationList.css';
import {Link} from "react-router-dom";
import {useEffect, useState} from "react";
import {useSelector} from "react-redux";
import axios from "axios";
import noImg from '../../assets/noImage.jpg';
import {getTimeRange} from "../../helpers/dateCalculations";
import {useTranslation} from "react-i18next";
import {ProfileIcon} from "../../components/svgs/ProfileIcon";

export const LocationList = () => {
    const { t } = useTranslation();
    const [selectedLocations, setSelectedLocations] = useState(null);
    const filtersStored = useSelector(state => state.myReducer);
    // const dispatch = useDispatch();
    useEffect(() => {
        async function getData() {
            try {
                if (filtersStored.finishDate) {
                    const sendTimeRange = getTimeRange(filtersStored.startDate, filtersStored.finishDate-1);
                    const data = {
                        timeRange: sendTimeRange
                    };

                    const locations = await axios.post(`http://localhost:5000/api/locations/byName/${filtersStored.location}`, data);
                    setSelectedLocations(locations.data);
                }
            } catch (error) {
                console.log(error);
            }
        }
        getData();
    }, [filtersStored.finishDate, filtersStored.location]);
    // const handleOnClick = useCallback(() => navigate(`locations/${locationId}`, {replace: true}), [navigate]);

    return (
        <>
            {selectedLocations &&
                <>
                    <div className="locationsCountWrapper">
                        <div>{selectedLocations.length > 0 ? `${t('showing-studios')} ${selectedLocations.length} ${t('available-studios')}` : t('fully-booked')}
                        </div>
                    </div>
                    <div className="locationsListWrapper">
                        <div className="locationsListInner">
                            {selectedLocations.map(loca => (
                                <div key={loca._id} className="locationWrapper">
                                    <div className="locationInner">
                                        <div className="locationImageWrapper">
                                            <Link to={`/singleLocation/${loca._id}`}
                                                  className="locationImageInner">
                                                <img className="locationImage" src={loca.images.length >0 ? loca.images[0] : noImg } alt={loca.name}/>
                                            </Link>
                                        </div>
                                        <div className="locationInfoWrapper">
                                            <div className="locationDescriptionWrapper">
                                                <h2 className="locationDescriptionTitle">{loca.name}</h2>
                                                <div
                                                    className="locationDescriptionPrices">{loca.coupon || t('no-coupons')}</div>
                                            </div>
                                            <div>
                                                <div className="locationCapacityPriceWrapper">
                                                    <div className="locationCapacityPriceInner">
                                                        <div className="locationCapacityWrapper">
                                                            <div className="locationCapacityIconWrapper">
                                                                <ProfileIcon classname="userSvg" viewBox="0 0 14 14"/>
                                                            </div>
                                                            <h3 className="locationCapacityCount">{loca.capacity}</h3>
                                                        </div>
                                                        <div className="locationPriceWrapper">
                                                            <div className="locationPriceInner">
                                                                <div
                                                                    className="locationPricePerHour">₪{loca.price} /{t('hour')}
                                                                </div>
                                                                <h4 className="locationPrice">₪{loca.price * filtersStored.timeDuration}</h4>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <Link className="locationButton" to={`/singleLocation/${loca._id}`}>
                                            <span className="locationButtonSpan">{t('explore')}</span>
                                        </Link>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </>
            }
        </>
    )
};