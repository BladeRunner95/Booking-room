import './LocationList.css';
import {useNavigate, Routes, Route, Link} from "react-router-dom";
import {useCallback, useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import axios from "axios";
import {Loading} from "../../components/Spinner/Spinner";

export const LocationList = () => {
    const [selectedLocations, setSelectedLocations] = useState(null);
    const filtersStored = useSelector(state => state.myReducer);
    // const dispatch = useDispatch();
    useEffect(() => {
        async function getData() {
            try {
                if (filtersStored.finishDate) {
                    console.log('finish date updated');
                    // const locations = await axios.get(`http://localhost:5000/api/locations/byName/${filtersStored.location[0]}`);
                    const locations = await axios.get(`http://localhost:5000/api/locations/byName/${["Holon"]}`);
                    setSelectedLocations(locations.data);
                }
            } catch (error) {
                console.log(error);
            }
        }
        getData();
    }, [filtersStored.finishDate])
    const navigate = useNavigate();
    // const handleOnClick = useCallback(() => navigate(`locations/${locationId}`, {replace: true}), [navigate]);

    //navigate back one page
    const goBack = () => navigate(-1);

    return (
        <>
            {selectedLocations ?
                <>
                    <div className="locationsCountWrapper">
                        <div>{selectedLocations.length > 0 ? `Showing ${selectedLocations.length} available studios` : "We're fully booked at this time"}
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
                                                <img className="locationImage" src={loca.images[0]} alt={loca.name}/>
                                            </Link>
                                        </div>
                                        <div className="locationInfoWrapper">
                                            <div className="locationDescriptionWrapper">
                                                <h2 className="locationDescriptionTitle">{loca.name}</h2>
                                                <div
                                                    className="locationDescriptionPrices">{loca.coupon || 'No coupons'}</div>
                                            </div>
                                            <div>
                                                <div className="locationCapacityPriceWrapper">
                                                    <div className="locationCapacityPriceInner">
                                                        <div className="locationCapacityWrapper">
                                                            <div className="locationCapacityIconWrapper">
                                                                <svg width="14" height="14" overflow="visible"
                                                                     viewBox="0 0 14 14"
                                                                     preserveAspectRatio="xMinYMin meet"
                                                                     fill="" stroke="#808080" strokeWidth="4">
                                                                    <path stroke="none" d="M9.35545 4.35556C9.35545 5.65649 8.30083 6.71111 6.99989 6.71111C5.69895 6.71111 4.64434 5.65649 4.64434 4.35556C4.64434
                                                             3.05462 5.69895 2 6.99989 2C8.30083 2 9.35545 3.05462 9.35545 4.35556ZM9.4643 7.94737C10.6065 7.16219 11.3554 5.84634 11.3554 4.35556C11.3554
                                                             1.95005 9.4054 0 6.99989 0C4.59439 0 2.64434 1.95005 2.64434 4.35556C2.64434 5.84639 3.39336 7.16229 4.53561 7.94745C2.14894 8.92024 0.466732 11.2637
                                                              0.466732 14V14H2.46673V14C2.46673 11.4963 4.49637 9.46667 7.00007 9.46667C9.50376 9.46667 11.5334 11.4963 11.5334 14V14H13.5334V14C13.5334 11.2636 11.8511 8.92009 9.4643 7.94737Z">
                                                                    </path>
                                                                </svg>
                                                            </div>
                                                            <h3 className="locationCapacityCount">{loca.capacity}</h3>
                                                        </div>
                                                        <div className="locationPriceWrapper">
                                                            <div className="locationPriceInner">
                                                                <div
                                                                    className="locationPricePerHour">₪{loca.price} /hr
                                                                </div>
                                                                <h4 className="locationPrice">₪{loca.price}</h4>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <Link className="locationButton" to={`/singleLocation/${loca._id}`}>
                                            <span className="locationButtonSpan">Explore</span>
                                        </Link>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </> :null
            }
        </>
    )
};