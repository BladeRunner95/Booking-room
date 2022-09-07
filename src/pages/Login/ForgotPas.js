import {MyNav} from "../../components/Nav/MyNav";
import styles from "./Login.module.css";
import {Link} from "react-router-dom";
import {useState} from "react";
import {alertActions} from "../../actions/alert.actions";
import {useDispatch, useSelector} from "react-redux";
import {userActions} from "../../actions/user.actions";
import {useTranslation} from "react-i18next";


export const ForgotPas = () => {
    const { t } = useTranslation();
    const notification = useSelector(state => state.alertReducer);
    const emailSent = useSelector(state => state.userReducer);
    const dispatch = useDispatch();

    let [email, setEmail] = useState('');

    const handleInputsChange = (e) => {
        setEmail(e.target.value);
    }

    const handeSubmitDisabled = () => {
        return !email;
    };
    //move to helpers
    const validEmail = (email) => {
        if (!/\S+@\S+\.\S+/.test(email)) {
            dispatch(alertActions.error('Please enter a valid email address'));
        } else {
            console.log('everything is ok');
            dispatch(userActions.forgot(email));
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        if (email) {
            validEmail(email);
        } else {
            console.log('email not truthy')
        }
    }


    return (
        <>
            <MyNav/>
            <div className={styles.mainWrapper}>
                <div className={styles.mainInnerWrapper}>
                    <div className={styles.innerWrapper}>
                        <div className={styles.welcomeWrapper}>
                            <div className={styles.welcomeInner}>
                                <h1 className={styles.welcomeTextForgot}>{t('forgot')}</h1>
                            </div>
                        </div>
                        {/*{loggingIn ? <Loading/> :*/}
                        <form noValidate onSubmit={handleSubmit}>
                            <div className={styles.emailMainWrap}>
                                <div className={styles.formInputInner}>
                                    <div>
                                        <label className={styles.formLabel} htmlFor="">{'email'}</label>
                                        <input
                                            className={styles.formInput}
                                            type="text"
                                            name='email'
                                            placeholder={t('email')}
                                            value={email}
                                            onChange={handleInputsChange}
                                            required
                                            disabled={emailSent.sent}
                                        />
                                    </div>
                                </div>
                                {notification.type &&
                                    <div className={notification.type}>{notification.message}</div>}
                            </div>

                            <div className={styles.loginWrap}>

                                <button
                                    className={styles.loginButton}
                                    disabled={handeSubmitDisabled() || emailSent.sent}
                                >
                                    <span>{t('reset-password')}</span>
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    )
};