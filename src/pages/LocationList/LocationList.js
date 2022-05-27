import './LocationList.css';
import {useNavigate, Routes, Route, Link} from "react-router-dom";
import {useCallback, useState} from "react";

export const LocationList = () => {

    const [locationId, setLocationId] = useState(null);

    const navigate = useNavigate();
    // const handleId = (id) => setLocationId(id);
    // const handleOnClick = useCallback(() => navigate(`locations/${locationId}`, {replace: true}), [navigate]);

    //navigate back one page
    const goBack = () => navigate(-1);

    const locations = [
        {
            id: 1,
            title: "Shugaev studio",
            img: 'https://piratestudios-kraken-files.s3.eu-west-1.amazonaws.com/studio_images/54f5375e9e0d3f2a1798cd079f7aa309_medium.jpg',
            price: 125,
            capacity: 6,
            coupon: null
        }, {
            id: 2,
            title: "Shugaev studio",
            img: 'https://piratestudios-kraken-files.s3.eu-west-1.amazonaws.com/studio_images/54f5375e9e0d3f2a1798cd079f7aa309_medium.jpg',
            price: 125,
            capacity: 6,
            coupon: null
        }, {
            id: 3,
            title: "Shugaev studio",
            img: 'https://piratestudios-kraken-files.s3.eu-west-1.amazonaws.com/studio_images/54f5375e9e0d3f2a1798cd079f7aa309_medium.jpg',
            price: 125,
            capacity: 6,
            coupon: null
        }, {
            id: 4,
            title: "Shugaev studio",
            img: 'https://piratestudios-kraken-files.s3.eu-west-1.amazonaws.com/studio_images/54f5375e9e0d3f2a1798cd079f7aa309_medium.jpg',
            price: 125,
            capacity: 6,
            coupon: null
        }

    ];

    return (
        <>
            <div className="locationsCountWrapper">
                <div>{locations.length > 0 ? `Showing ${locations.length} available studios` : "We're fully booked at this time"}
                </div>
            </div>
            <div className="locationsListWrapper">
                <div className="locationsListInner">
                    {locations.map(loca => (
                        <div key={loca.id} className="locationWrapper">
                            <div className="locationInner">
                                <div className="locationImageWrapper">
                                    <div className="locationImageInner">
                                        <img className="locationImage" src={loca.img} alt={loca.title}/>
                                    </div>
                                </div>
                                <div className="locationInfoWrapper">
                                    <div className="locationDescriptionWrapper">
                                        <h2 className="locationDescriptionTitle">{loca.title}</h2>
                                        <div className="locationDescriptionPrices">{loca.coupon}</div>
                                    </div>
                                    <div>
                                        <div className="locationCapacityPriceWrapper">
                                            <div className="locationCapacityPriceInner">
                                                <div className="locationCapacityWrapper">
                                                    <div className="locationCapacityIconWrapper">
                                                        <svg width="14" height="14" overflow="visible"
                                                             viewBox="0 0 14 14" preserveAspectRatio="xMinYMin meet"
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
                                                        <div className="locationPricePerHour">₪{loca.price} /hr</div>
                                                        <h4 className="locationPrice">₪{loca.price}</h4>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                {/*<button className="locationButton">*/}
                                    <Link className="locationButton" to={`/singleLocation/${loca.id}`}>
                                    <span className="locationButtonSpan">Explore</span>
                                    </Link>
                                {/*</button>*/}
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/*<Routes>*/}
            {/*    <Route path="/locations/:id" element={<SingleLocation />} />*/}
            {/*</Routes>*/}
        </>
    )
};