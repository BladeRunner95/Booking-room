import './StyleLocation.css';
import People from "../../assets/people.png";

export const SingleLocation = () => {
    const locations = [
        {
            title: "Shugaev studio",
            img: 'https://piratestudios-kraken-files.s3.eu-west-1.amazonaws.com/studio_images/54f5375e9e0d3f2a1798cd079f7aa309_medium.jpg',
            price: 125,
            capacity: 6,
            coupon: null
        },

    ];

    return (
        <div className="singleLocationWrapper">
            <div className="locationsCountWrapper">
                <div>{locations.length > 0? `Showing ${locations.length} available studios` : "We're fully booked at this time"}
                </div>
            </div>
            <div className="locationsListWrapper">
                <div className="locationsListInner">
                    {locations.map(loca => (
                        <div className="locationWrapper">
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
                                                        <img style={{width: "100%"}} src={People} alt="people"/></div>
                                                    <h3 className="locationCapacityCount">{loca.capacity}</h3>
                                                </div>
                                                <div className="locationPriceWrapper">
                                                    <div className="locationPriceInner">
                                                        <div className="locationPricePerHour">₪{loca.price} /hr</div>
                                                        <h4 className="locationPrice">{loca.price}</h4>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <button className="locationButton">
                                    <span className="locationButtonSpan">Explore</span>
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
};