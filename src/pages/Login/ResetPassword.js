import {MyNav} from "../../components/Nav/MyNav";
import styles from "./Login.module.css";
import {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {alertActions} from "../../actions/alert.actions";
import {userActions} from "../../actions/user.actions";
import {useNavigate, useParams} from "react-router-dom";
import axios from "axios";
import {Loading} from "../../components/Spinner/Spinner";


export const ResetPassword = () => {
    const error = useSelector(state => state.alertReducer);
    const loggedIn = useSelector(state => state.userReducer.loggedIn);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const {id} = useParams();
    let [password, setPassword] = useState('');
    let [activeReset, setActiveReset] = useState(null);

    useEffect(()=> {
            const getResetRequest = async () => {
                try {
                    const resId = await axios.get(`http://localhost:5000/api/auth/resetPas/${id}`);
                    setActiveReset(resId);
                } catch (e) {
                    if (e.response.status === 400) {
                        navigate('/');
                    }
                }
            }
        getResetRequest();
        },[id]);

    if (!activeReset) return <Loading/>
    if (loggedIn) return navigate('');


    const handleInputChange = (e) => {
        setPassword(e.target.value);
    }

    const handeSubmitDisabled = () => {
        return !password;
    };



    const handleSubmit = (e) => {
        e.preventDefault();
        if (password) {
            validPassword(password);
        } else {
            console.log('email and pass not truthy')
            // dispatch(alertActions.error());
        }
    };

    //move to helpers
    const validPassword = (password) => {
        if (password.length < 5 || !password.trim()) {
            dispatch(alertActions.error('Please enter a valid password (more than 5 symbols)'));
        } else {
            dispatch(alertActions.clear());
            dispatch(userActions.resetPas(password, id));
        }
    }

    return (
        <>
            <MyNav/>
            <div className={styles.mainWrapper}>
                <div className={styles.mainInnerWrapper}>
                    <div className={styles.innerWrapper}>
                        <form noValidate onSubmit={handleSubmit}>
                            <div className={styles.emailMainWrap}>
                                <div className={styles.formInputInner}>
                                    <div className={styles.passwordWrap}>
                                        <label className={styles.formLabel} htmlFor="">{password}</label>
                                        <input
                                            className={styles.formInput}
                                            type="password"
                                            name='password'
                                            placeholder={'password *'}
                                            value={password}
                                            onChange={handleInputChange}
                                            required
                                        />
                                    </div>
                                </div>
                                {(error.type) &&
                                    <div className={error.type}>{error.message}</div>}
                            </div>
                            <div className={styles.loginWrap}>
                                <button
                                    className={styles.loginButton}
                                    disabled={handeSubmitDisabled()}>
                                    <span>Reset Password</span>
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    )
}