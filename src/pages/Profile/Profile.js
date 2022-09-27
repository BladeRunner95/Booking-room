import {MyNav} from "../../components/Nav/MyNav";
import styles from './Profile.module.css';
import {useEffect, useState} from "react";
import axios from "axios";
import {useParams} from "react-router-dom";
import {Table, Button} from "react-bootstrap";
import moment from "moment";
import {useTranslation} from "react-i18next";
import {ProfileIcon} from "../../components/svgs/ProfileIcon";


export const Profile = () => {
    const { t } = useTranslation();
    const {id} = useParams();
    let [myData, setMyData] = useState(null);
    let [myBookings, setMyBookings] = useState(null);
    let [error, setError] = useState(null);
    const userStorage = localStorage.getItem('user');

    useEffect(()=> {
        const getUser = async() => {
            try {
                if (userStorage === id) {
                    const user = await axios.get(`http://localhost:5000/api/auth/users/${id}`, {
                        withCredentials: true
                    });
                    setMyData(user.data);
                }
            } catch (e) {
                setError(e.response.data);
            }
        }
        getUser();
    }, [userStorage, id]);


    useEffect(()=> {
        const getMyBookings = async() => {
            try {
                if (userStorage === id) {
                    const bookings = await axios.get(`http://localhost:5000/api/bookings/byUser/${id}`, {
                        withCredentials: true
                    });
                    setMyBookings(bookings.data);
                }
            } catch (e) {
                setError(e.response.data);
            }
        }
        getMyBookings();
    }, [userStorage, id]);

    if (error) {
        return <div>You are not authenticated</div>
    }
    if (!myData) {
        return <div>Loading...</div>
    }

    return (
        <>
            <MyNav/>
            <div className={styles.mainWrapper}>
                <div className={styles.mainInner}>
                    <div className={styles.flowWrapper}>
                        <div className={styles.headWrapper}>
                            <div className={styles.helloWrapper}>
                                <h1 className={styles.helloText}>{t('hello')}<br />{myData.username}</h1>
                            </div>
                            <div className={styles.profileIconWrapper}>
                                <a href="" className={styles.profileIconLink}>
                                    <div>
                                        <ProfileIcon viewBox="0 0 14 14" classname={styles.profileSvg}/>
                                    </div>
                                </a>
                            </div>
                        </div>

                        <div>
                            {myBookings && myBookings.length > 0 ?
                                <Table className={styles.tableWrapper}>
                                    <thead>
                                    <tr>
                                        <th>#</th>
                                        <th>{t('location')}</th>
                                        <th>{t('start')}</th>
                                        <th>{t('finish')}</th>
                                        <th>{t('cost')}</th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    {myBookings.map((booking, index) => (
                                            <tr key={booking._id}>
                                                <td>{index}</td>
                                                <td>{booking.locationName}</td>
                                                <td>{moment(booking.startDate).format('ddd DD.MM.YY')} - {moment(booking.startDate).format('ha')}</td>
                                                <td>{moment(booking.finishDate).format('ddd DD.MM.YY')} - {moment(booking.finishDate + 1).format('ha')}</td>
                                                <td>{booking.cost || Math.round(Math.random())}</td>
                                                <td><Button variant="dark">{t('refund')}</Button></td>
                                            </tr>
                                        ))
                                    }
                                    </tbody>
                                </Table>
                                : <div className={styles.noBookings}>{t('no-bookings')}</div>
                            }
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
};