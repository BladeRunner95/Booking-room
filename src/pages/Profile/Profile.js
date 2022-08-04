import {_Nav} from "../../components/Nav/_Nav";
import styles from './Profile.module.css';
import {useEffect, useState} from "react";
import axios from "axios";
import {useParams} from "react-router-dom";
import Cookies from "js-cookie";
import {Table} from "react-bootstrap";


export const Profile = () => {
    const {id} = useParams();
    let [myData, setMyData] = useState(null);
    let [error, setError] = useState(null);
    const loggedIn = Cookies.get('access_token');

    useEffect(()=> {

        const getUser = async() => {
            try {
                const user = await axios.get(`http://localhost:5000/api/auth/users/${id}` , {
                    withCredentials: true
                    // headers: {
                    //     'Authorization': `Bearer ${loggedIn}`,
                    //     'Credentials' : 'include'
                    //     // options.credentials = 'include';
                    // }
                });
                setMyData(user.data);
            } catch (e) {
                setError(e.response.data);
            }
            console.log(myData)
        }
        getUser();
    }, []);

    if (error) {
        return <div>You are not authenticated</div>
    }
    if (!myData) {
        return <div>Loading...</div>
    }

    return (
        <>
            <_Nav/>
            <div className={styles.mainWrapper}>
                <div className={styles.mainInner}>
                    <div className={styles.flowWrapper}>
                        <div className={styles.headWrapper}>
                            <div className={styles.helloWrapper}>
                                <h1 className={styles.helloText}>Hello {myData.username}</h1>
                            </div>
                            <div className={styles.profileIconWrapper}>
                                <a href="" className={styles.profileIconLink}>
                                    <div>
                                        <svg width="50" height="50" overflow="visible" viewBox="0 0 14 14"
                                             preserveAspectRatio="xMinYMin meet" fill="" stroke="#808080"
                                             strokeWidth="4">
                                            <path stroke="none"
                                                  d="M9.35545 4.35556C9.35545 5.65649 8.30083 6.71111 6.99989 6.71111C5.69895 6.71111
                                                   4.64434
                                                   5.65649
                                                   4.64434 4.35556C4.64434 3.05462 5.69895 2 6.99989 2C8.30083 2 9.35545 3.05462 9.35545 4.35556ZM9.4643
                                                   7.94737C10.6065 7.16219 11.3554 5.84634 11.3554 4.35556C11.3554 1.95005 9.4054 0 6.99989 0C4.59439 0 2.64434
                                                   1.95005 2.64434 4.35556C2.64434 5.84639 3.39336 7.16229 4.53561 7.94745C2.14894 8.92024 0.466732 11.2637 0.466732
                                                   14V14H2.46673V14C2.46673 11.4963 4.49637 9.46667 7.00007 9.46667C9.50376 9.46667 11.5334 11.4963 11.5334 14V14H13.5334V14C13.5334
                                                   11.2636 11.8511 8.92009 9.4643 7.94737Z"></path>
                                        </svg>
                                    </div>
                                </a>
                            </div>
                        </div>

                        <div>
                            {/*<div className={styles.bookingsWrapper}>*/}
                            {myData ?
                                <Table className="mt-3" striped bordered hover variant="dark">
                                    <thead>
                                    <tr>
                                        <th>#</th>
                                        <th>Start</th>
                                        <th>Finish</th>
                                        <th>Cost</th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    {myData.bookings.map((booking, index) => (
                                        <tr key={booking._id}>
                                            <td>{index}</td>
                                            <td>{booking.startDate || new Date().toDateString()}</td>
                                            <td>{booking.finishDate || new Date().toDateString()}</td>
                                            <td>{booking.cost || Math.round(Math.random())}</td>
                                        </tr>
                                    ))}
                                    </tbody>
                                {/*    myData.bookings.map(booking => {*/}
                                {/*    return <div key={booking}>{booking}</div>*/}
                                {/*})*/}
                                </Table> :
                                <div>Nothing get from the server</div>
                            }
                            {/*</div>*/}
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
};