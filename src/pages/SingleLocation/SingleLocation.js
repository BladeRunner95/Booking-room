import {useParams, useNavigate, Navigate, Link} from "react-router-dom";
import {useState, useEffect} from "react";
import {_Nav} from "../../components/Nav/_Nav";
import drocher from '../../assets/lexshug.jpg';
import './SingleLocation.css';
import {useSelector} from "react-redux";
import {Spinner} from "../../components/Spinner/Spinner";
import axios from "axios";
import {NotFound} from "../../components/NotFound/NotFound";
import Cookies from "js-cookie";

export const SingleLocation = (props) => {
  const {id} = useParams();
  const navigate = useNavigate();
  const goBack = () => navigate(-1);
  const booking = useSelector(state => state.myReducer);
  const loggedIn = Cookies.get('access_token');

  const [ location, setLocation ] = useState(null);
  const [ slide, setSlide ] = useState(false);
  const [ filters, setFilters ] = useState(null);

  useEffect(() => {
    async function getData() {
      try {
        const getLocation = await axios.get(`http://localhost:5000/api/locations/${id}`);
        setLocation(getLocation.data);
        if (localStorage.getItem('filters') !== null) {
          const getFilters = JSON.parse(localStorage.getItem('filters'));
          setFilters(getFilters.locations);
        }
      } catch (e) {
        console.log('pipipiopopo');
      }
    }
    getData();
  },[]);

  if (!localStorage.getItem('filters')) {
    return <NotFound/>
  }

  const timeStampToDate = (timestamp) => {
    return new Date(timestamp);
  };

  const handleSlideImage = () => {
  setSlide(prev => !prev)
  };

  return (
      (
          (location && filters) ? <>
          <_Nav />
              <div className="singleLocaWrapper">
                <div>
                  <div>
                    <div className="singleLocaInnerWrapper">
                      <div className="singleLocaInner">
                        <div className="singleLocaInnerPad">
                          <ul className="singleLocaFilters">
                            <li className="singleLocaFilter">
                              <Link className="singleLocaFilterLink" to={goBack} onClick={goBack}>Back to all studios</Link>
                            </li>
                            <span className="singleLocaFilterSlash">/</span>
                            <li className="singleLocaFilter secondFilter">
                              <span>{location.name}</span>
                            </li>
                            <span className="singleLocaFilterSlash filterGreyText">/</span>
                            <li className="singleLocaFilter filterGreyText">{location.capacity} people</li>
                          </ul>
                          <div className="singleLocaInfoMainSection">
                            <div className="singleLocaInfoWrapper">
                              <div className="singleLocaSliderWrapper">
                                <a className="singleLocaSliderLink">
                                  <div className="singleLocaSliderInnerWrapper">
                                    <div className="singleLocaCarouselWrapper">
                                      <div className="singleLocaCarouselInner">
                                        <div className="singleLocaCarouselImagesWrapper">
                                          <div>
                                            <ul className={`singleLocaCarouselList ${slide? "singleLocaCarouselTwo" : "singleLocaCarouselOne"}`}>
                                              {location.images.map(singleImage => (
                                                  <li key={singleImage} className="singleLocaCarouselImageWrapper">
                                                    <div className="singleLocaCarouselImageInner">
                                                      <img className="singleLocaCarouselImage" src={singleImage} alt={location.name}/>
                                                    </div>
                                                  </li>
                                              ))}
                                            </ul>
                                          </div>
                                        </div>
                                        <div className="singleLocaSliderBottomShadow" />
                                        <button
                                            onClick={() => handleSlideImage()}
                                            className="singleLocaCarouselLeftButtonWrapper">
                                          <div className="singleLocaCarouselLeftButtonInner">
                                            <svg width="24" height="24" overflow="visible" preserveAspectRatio="xMinYMin meet" strokeWidth="0"
                                                 viewBox="0 0 25 25" fill="#FFFFFF" stroke="#FFFFFF" icon="chevronLeft"><path d="M4 12L20 4L20 20L4 12Z"></path></svg>
                                          </div>
                                        </button>
                                        <button
                                            onClick={() => handleSlideImage()}
                                            className="singleLocaCarouselLeftButtonWrapper carouselRightButton">
                                          <div className="singleLocaCarouselLeftButtonInner">
                                            <svg width="24" height="24" overflow="visible" preserveAspectRatio="xMinYMin meet" strokeWidth="0"
                                                 viewBox="0 0 25 25" fill="#FFFFFF" stroke="#FFFFFF" icon="chevronRight"><path d="M20 12L4 20L4 4L20 12Z"></path></svg>
                                          </div>
                                        </button>
                                        <div className="singleLocaCarouselCapacity">
                                          <img src="https://book.pirate.com/static/media/capacity-white.9786fb66.svg" alt={location.capacity}/>
                                          <span className="singleLocaCapacityNumber">{location.capacity}</span>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </a>
                              </div>

                              <div className="singleLocaInfoDetails">
                                <div className="singleLocaInfoDetailsInner">
                                  <div className="singleLocaDetailsEquipWrapper">
                                    <h3 className="singleLocaDetailsTitle">Equipment</h3>
                                    <div className="singleLocaDetailsEquipInner">
                                      <div className="singleLocaDetailEquipItem">
                                        <div className="singleLocaDetailEquipIcon">
                                          <svg width="24" height="24" overflow="visible"
                                               preserveAspectRatio="xMinYMin meet" strokeWidth="0" viewBox="0 0 25 25"
                                               fill="#000000" stroke="#000000" icon="microphone"
                                               className="sc-eXuyPJ sjfVN">
                                            <g>
                                              <path
                                                  d="M13 18.92C14.6646 18.6797 16.187 17.8482 17.2888 16.5775C18.3906 15.3067 18.998 13.6818 19
                                                  12H17C17 13.3261 16.4732 14.5978 15.5355 15.5355C14.5978 16.4732 13.3261 17 12 17C10.6739 17 9.40214
                                                  16.4732 8.46446 15.5355C7.52678 14.5978 6.99998 13.3261 6.99998 12H4.99998C5.00196 13.6818 5.60939 15.3067 6.71117
                                                   16.5775C7.81294 17.8482 9.33539 18.6797 11 18.92V22H5.99998V24H18V22H13V18.92Z"></path>
                                              <path
                                                  d="M12 16C13.1089 15.9481 14.1521 15.4593 14.9017 14.6404C15.6512 13.8215 16.0461 12.7392 16
                                                   11.63V4.35999C16 3.29912 15.5785 2.2817 14.8284 1.53156C14.0782 0.78141 13.0608 0.359985 12
                                                    0.359985C10.9391 0.359985 9.92167 0.78141 9.17153 1.53156C8.42138 2.2817 7.99996 3.29912 7.99996 4.35999V11.63C7.95381
                                                    12.7392 8.34867 13.8215 9.09822 14.6404C9.84777 15.4593 10.891 15.9481 12 16ZM9.99996 4.35999C9.99996 3.82955 10.2107 3.32087
                                                    10.5858 2.9458C10.9608 2.57073 11.4695 2.35999 12 2.35999C12.5304 2.35999 13.0391 2.57073 13.4142 2.9458C13.7893 3.32087 14
                                                    3.82955 14 4.35999V11.63C14 12.1604 13.7893 12.6691 13.4142 13.0442C13.0391 13.4193 12.5304 13.63 12 13.63C11.4695 13.63
                                                    10.9608 13.4193 10.5858 13.0442C10.2107 12.6691 9.99996 12.1604 9.99996 11.63V4.35999Z"></path>
                                            </g>
                                          </svg>
                                        </div>
                                        <div className="ps-1">
                                          <h4 className="singleLocaDetailEquipTitle">{location.details[0].title}</h4>
                                          <div className="singleLocaDetailEquipText">{location.details[0].description}</div>
                                        </div>
                                      </div>

                                      <div className="singleLocaDetailEquipItem">
                                        <div className="singleLocaDetailEquipIcon">
                                          <svg width="24" height="24" overflow="visible"
                                               preserveAspectRatio="xMinYMin meet" strokeWidth="0" viewBox="0 0 25 25"
                                               fill="#000000" stroke="#000000" icon="headphones"
                                               className="sc-eXuyPJ sjfVN">
                                            <path fill="#000"
                                                  d="M22.04 13.95V11.49C22.0909 8.76495 21.0597 6.13073 19.1722 4.16452C17.2847 2.19831 14.6949 1.06042
                                                  11.97 1.00003C9.28134 1.06301 6.72714 2.18836 4.86617 4.12991C3.00521 6.07146 1.98902
                                                  8.67111 2.04 11.36V13.95L0.0400009 15.95V20.95L2.04 22.95H7.04V13.95H4.04V11.36C3.98622 9.20073
                                                  4.79076 7.1082 6.27724 5.54111C7.76373 3.97402 9.81088 3.06024 11.97 3.00003C14.1645 3.06027 16.2457 3.98742 17.7581
                                                  5.57858C19.2706 7.16975 20.0911 9.29532 20.04 11.49V13.95H17.04V22.95H22.04L24.04 20.95V15.95L22.04 13.95Z"></path>
                                          </svg>
                                        </div>
                                        <div className="ps-1">
                                          <h4 className="singleLocaDetailEquipTitle">{location.details[1].title}</h4>
                                          <div className="singleLocaDetailEquipText">{location.details[1].title}</div>
                                        </div>
                                      </div>

                                      <div className="singleLocaDetailEquipItem">
                                        <div className="singleLocaDetailEquipIcon">
                                          <svg width="24" height="24" overflow="visible"
                                               preserveAspectRatio="xMinYMin meet" strokeWidth="0" viewBox="0 0 25 25"
                                               fill="#000000" stroke="#000000" icon="audio" className="sc-eXuyPJ sjfVN">
                                            <path fillRule="evenodd" clipRule="evenodd"
                                                  d="M2.70709 0.292908C2.89463 0.480444 3 0.734784 3 1V2H1V1C1 0.734784 1.10537 0.480444 1.29291
                                                  0.292908C1.48044 0.105371 1.73478 0 2 0C2.26522 0 2.51956 0.105371 2.70709 0.292908ZM9 8.47998C9
                                                  5.34998 11.15 3 14 3C16.85 3 19 5.34998 19 8.47998V24H17V8.47998C17 6.45998 15.74 5 14 5C12.26 5 11 6.47998 11
                                                  8.47998V18.48C11 21.61 8.85 23.97 6 23.97C3.15 23.97 1 21.61 1 18.48V14.69C0.697724 14.5155 0.446367 14.2649 0.270935
                                                  13.9631C0.0955035 13.6614 0.00210674 13.319 0 12.97V7.96997H1V2.96997H3V7.96997H4V12.97C3.99789 13.319 3.9045 13.6614 3.72906
                                                  13.9631C3.55363 14.2649 3.30228 14.5155 3 14.69V18.48C3 20.5 4.26 21.97 6 21.97C7.74 21.97 9 20.48 9 18.48V8.47998Z"></path>
                                          </svg>
                                        </div>
                                        <div className="ps-1">
                                          <h4 className="singleLocaDetailEquipTitle">{location.details[2].title}</h4>
                                          <div className="singleLocaDetailEquipText">{location.details[2].title}</div>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                  <div className="singleLocaDetailsLocationWrap">
                                    <h3 className="singleLocaDetailsTitle">Location</h3>
                                    <h4 className="singleLocaDetailEquipTitle">Address: </h4>
                                    <div className="singleLocaDetailEquipText singleLocaAddress">Herzl 60, Ramat Gan</div>
                                    <div className="singleLocaGmaps">
                                      <a href="https://www.google.com/maps/dir/?api=1&amp;destination=Pirate.com,+London%20N15%204ND"
                                         target="_blank" className="track_studioInfo_googleMaps"
                                         rel="noopener noreferrer">View in Google Maps</a>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>

                            <div className="paymentColumn">
                              <div className="paymentColumnInner">
                                <div className="paymentTitleWrap">
                                  <h2 className="paymentTitle">{location.name}</h2>
                                </div>
                                <div className="paymentColumnCity"><span>{location.title}</span></div>
                                <div className="paymentColumnDate">{timeStampToDate(filters.startDate).toDateString().slice(0, 10)} - {timeStampToDate(filters.finishDate).toDateString()}</div>
                                <div className="paymentColumnTimeWrap">
                                  <div className="paymentColumnTimeWrap">
                                    {
                                      timeStampToDate(filters.startDate).toLocaleString('en-US', { hour: 'numeric', hour12: true })
                                    } - {
                                    timeStampToDate(filters.finishDate).toLocaleString('en-US', { hour: 'numeric', hour12: true })
                                  } ({filters.timeDuration}hrs)</div>
                                  <button className="paymentEditButton"><span>Edit</span></button>
                                </div>
                                <div className="paymentColumnTotal">
                                  <div className="paymentColumnTotalInner">
                                    <h3 className="paymentColumnTotalText">total</h3>
                                    <div className="paymentColumnTotalAmount">
                                      <span className="paymentTotalAmountSpan">₪{filters.totalCost}</span>
                                    </div>
                                  </div>
                                </div>
                                <Link className="paymentPayButton" to={`/payment/${id}`}>
                                  <span>Book this studio</span>
                                </Link>
                                <div className="paymentCardsWrap">
                                  <div className="paymentAcceptText">We accept</div>
                                </div>
                                <div className="paymentCardsIcons">
                                  <img className="paymentCardsIcon" src="https://book.pirate.com/static/media/visa-logo.d9f67f79.svg" alt="visa"/>
                                  <img className="paymentCardsIcon" src="https://book.pirate.com/static/media/mastercard-logo.5613174f.svg" alt="mastercard"/>
                                  <img className="paymentCardsIcon" src="https://book.pirate.com/static/media/american-express-logo.8982b953.svg" alt="amexp"/>
                                  <img className="paymentCardsIcon" src="https://book.pirate.com/static/media/apple-pay-logo.a744afb2.svg" alt="applepay"/>
                                  <img className="paymentCardsIcon" src="https://book.pirate.com/static/media/google-pay-logo.7acf5d5b.svg" alt="googlepay"/>
                                </div>
                                <div className="paymentPowered">
                                  <img src="https://book.pirate.com/static/media/powered-by-stripe-logo.90abdeaa.svg" alt="Powered by Stripe"/>
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
            </> : <Spinner/>
      )
  )

};