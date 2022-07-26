import styles from './Login.module.css';
import {_Nav} from "../../components/Nav/_Nav";
import {Link, useNavigate, Navigate, useLocation} from "react-router-dom";
import {useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {userActions} from "../../actions/user.actions";
import {Spinner} from "../../components/Spinner/Spinner";

export const Login = () => {
    const dispatch = useDispatch();
    const loggingIn = useSelector(state => state.userReducer.loggingIn);
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

    const handleSubmit = async (e) => {
        e.preventDefault();

        setSubmitted(true);
        if (email && password) {
            dispatch(userActions.login(email, password));
        }
    };

    return (
        <>
            <_Nav/>
            {loggingIn ? <Spinner/> :
                <div className={styles.mainWrapper}>
                    <div className={styles.mainInnerWrapper}>
                        <div className={styles.innerWrapper}>
                            <div className={styles.welcomeWrapper}>
                                <div className={styles.welcomeInner}>
                                    <h1 className={styles.welcomeText}>WELCOME</h1>
                                </div>
                            </div>
                            <form noValidate onSubmit={handleSubmit}>
                                <div className={styles.emailMainWrap}>
                                    <div className={styles.formInputInner}>
                                        <div>
                                            <label className={styles.formLabel} htmlFor="">{email}</label>
                                            <input
                                                className={styles.formInput}
                                                type="text"
                                                name='email'
                                                placeholder={'email *'}
                                                value={email}
                                                onChange={e => handleInputsChange(e, 'email')}
                                                required
                                            />
                                        </div>
                                    </div>
                                </div>

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
                                                onChange={e => handleInputsChange(e, 'password')}
                                                required
                                            />
                                        </div>
                                    </div>
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
                                                   htmlFor="remember-me">Remember me</label>
                                        </div>
                                    </div>
                                    <a className={styles.forgotPassword} href="">Forgot password</a>
                                </div>
                                <div className={styles.loginWrap}>
                                    <button className={styles.loginButton}>
                                        <span>Log in</span>
                                    </button>
                                </div>
                                <Link className={styles.createAccount} to={'/signup'}>
                                    <span>Create Account</span>
                                </Link>
                            </form>
                        </div>
                    </div>
                </div>
            }
        </>
    )
}