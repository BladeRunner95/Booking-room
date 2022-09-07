import styles from './Login.module.css';
import {MyNav} from "../../components/Nav/MyNav";
import {Link, useNavigate, Navigate, useLocation} from "react-router-dom";
import {useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {userActions} from "../../actions/user.actions";
import {Loading} from "../../components/Spinner/Spinner";
import {alertTypes} from "../../types/alert.types";
import {alertActions} from "../../actions/alert.actions";
import {useTranslation} from "react-i18next";

export const Login = () => {
    const { t } = useTranslation();
    const dispatch = useDispatch();
    const loggingIn = useSelector(state => state.userReducer.loggingIn);
    const error = useSelector(state => state.alertReducer);
    const loggedIn = useSelector(state => state.userReducer.loggedIn);
    const location = useLocation();

    let [email, setEmail] = useState('');
    let [password, setPassword] = useState('');

    const [submitted, setSubmitted] = useState(false);
    const [checkbox, setCheckbox] = useState(false);

    const handleInputsChange = (e, index) => {
        if (index === 'email') {
            setEmail(e.target.value)
        }
        if (index === 'password') {
            setPassword(e.target.value)
        }
    };

    const handleCheckbox = () => {
        setCheckbox(prev => !prev);
    };

    const handeSubmitDisabled = () => {
        return !(email && password);
    };

    //validate form
    //move to helpers
    const validForm = (email, password) => {
        if (!/\S+@\S+\.\S+/.test(email)) {
            dispatch(alertActions.error({
                type: 'email',
                message: 'Please enter a valid email address'
            }));
            return;
        }
        if (password.length < 5 || !password.trim()) {
            dispatch(alertActions.error({
                type: 'password',
                message: 'Please enter a valid password (more than 5 symbols)'
            }));
        } else {
            dispatch(userActions.login(email, password, checkbox));
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        setSubmitted(true);
        if (email && password) {
            validForm(email, password);
        } else {
            console.log('email and pass not truthy')
            // dispatch(alertActions.error());
        }
    };

    return (
        <>
            <MyNav/>
                <div className={styles.mainWrapper}>
                    <div className={styles.mainInnerWrapper}>
                        <div className={styles.innerWrapper}>
                            <div className={styles.welcomeWrapper}>
                                <div className={styles.welcomeInner}>
                                    <h1 className={styles.welcomeText}>{t('welcome')}</h1>
                                </div>
                            </div>
                            {/*{loggingIn ? <Loading/> :*/}
                                <form noValidate onSubmit={handleSubmit}>
                                    <div className={styles.emailMainWrap}>
                                        <div className={styles.formInputInner}>
                                            <div>
                                                <label className={styles.formLabel} htmlFor="">{email}</label>
                                                <input
                                                    className={styles.formInput}
                                                    type="text"
                                                    name='email'
                                                    placeholder={t('email')}
                                                    value={email}
                                                    onChange={e => handleInputsChange(e, 'email')}
                                                    required
                                                />
                                            </div>
                                        </div>
                                        {(error.message?.type === 'email') &&
                                            <div className={styles.invalidLogIn}>{error.message.message}</div>}
                                    </div>

                                    <div className={styles.emailMainWrap}>
                                        <div className={styles.formInputInner}>
                                            <div className={styles.passwordWrap}>
                                                <label className={styles.formLabel} htmlFor="">{password}</label>
                                                <input
                                                    className={styles.formInput}
                                                    type="password"
                                                    name='password'
                                                    placeholder={t('password')}
                                                    value={password}
                                                    onChange={e => handleInputsChange(e, 'password')}
                                                    required
                                                />
                                            </div>
                                        </div>
                                        {(error.message?.type === 'password') &&
                                            <div className={styles.invalidLogIn}>{error.message.message}</div>}
                                    </div>

                                    <div className={styles.checkboxRowWrap}>
                                        <div>
                                            <div className={styles.rememberMeWrap}>
                                                <input type="checkbox" name="remember-me" value
                                                       className={styles.checkboxInput}/>
                                                <div className={styles.customCheckboxWrap}>
                                                    <svg width="14" height="14" overflow="visible" viewBox="0 0 14 14"
                                                         preserveAspectRatio="xMinYMin meet" fill="" stroke="#808080"
                                                         strokeWidth="4"
                                                         className={`${styles.checkboxSvg} ${checkbox ? styles.checked : null}`}>
                                                        <path
                                                            d="M14 3.36287L12.5689 2L4.60365 10.1629L1.43822 6.88558L0 8.24126L4.59627 13L14 3.36287Z"
                                                            stroke="none">
                                                        </path>
                                                    </svg>
                                                </div>
                                                <label className={styles.checkboxLabel} onClick={() => handleCheckbox()}
                                                       htmlFor="remember-me">{t('remember')}</label>
                                            </div>
                                        </div>
                                        <Link className={styles.forgotPassword} to="/forgot">{t('forgot')}</Link>
                                    </div>
                                    <div className={styles.loginWrap}>

                                        <button
                                            className={styles.loginButton}
                                            disabled={handeSubmitDisabled()}
                                        >
                                            <span>{t('login')}</span>
                                        </button>
                                        {(error.message) &&
                                            <div className={error.type}>{error.message}</div>}
                                        {/*{(error.message?.type === 'credentials') &&*/}
                                        {/*    <div className={styles.invalidLogIn}>{t('invalid_login')}</div>}*/}
                                    </div>
                                    <Link className={styles.createAccount} to={'/signup'}>
                                        <span>{t('create-account')}</span>
                                    </Link>
                                </form>
                        {/*    */}
                        </div>
                    </div>
                </div>
        </>
    )
}