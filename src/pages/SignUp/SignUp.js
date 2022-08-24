import {Navigate, useLocation} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {MyNav} from "../../components/Nav/MyNav";
import styles from './SignUp.module.css';
import {useEffect, useState} from "react";
import {userActions} from "../../actions/user.actions";
import {alertActions} from "../../actions/alert.actions";


export const SignUp = () => {
    const dispatch = useDispatch();
    const location = useLocation();
    const registered = useSelector(state => state.signupReducer);
    const error = useSelector(state => state.alertReducer);
    let [inputs, setInputs] = useState({
        username: '',
        email: '',
        password: ''
    });

    let [repeatPass, setRepeatPass] = useState('');

    let [showPassword, setShowPassword] = useState({
        password: false,
        repeatPas: false
    });

    useEffect(()=> {
        // dispatch(alertActions.clear());

        //update error message on changing first pass input with second filled
        if (repeatPass.length > 0 && inputs.password !== repeatPass) {
            const payload = {
                type: 'repeatPass',
                message: 'Password is not match'
            }
            dispatch(alertActions.error(payload));
        }
        else {
            dispatch(alertActions.clear());
        }
        }, [inputs.password])


    //redirect to login after signUp but you can't go to signUp until you refresh the page
    if (registered.registered) {
        return <Navigate to='/signin' replace/>;
    }

    const handleInputChange = (e) => {
        setInputs(prev => {
            return {
                ...prev,
                [e.target.name]: e.target.value
            }
        });
    };

    const handleRepeatPassword = (e) => {
        setRepeatPass(e.target.value);
        if (e.target.value && (e.target.value !== inputs.password)) {
            const payload = {
                type: 'repeatPass',
                message: 'Password is not match'
            };
            dispatch(alertActions.error(payload));
        } else {
            dispatch(alertActions.clear());
        }
    };

    const handleShowPassword = (id) => {
        setShowPassword(prev => {
            return {...prev, [id]: !prev[id]}
        });
    };

    const validForm = (email, password, inputs) => {
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
            dispatch(userActions.register(inputs));
        }
    }

    const handleSubmitSignIn = (e) => {
        e.preventDefault();
        if (inputs.username && inputs.email && inputs.password && repeatPass && (inputs.password === repeatPass)) {
            console.log('everything validated');
            validForm(inputs.email, inputs.password, inputs);
            // dispatch(userActions.register(inputs));
        } else {
            console.log('Some input wrong');
        }
    };

    const handeSubmitDisabled = () => {
        return !(inputs.username && inputs.email && inputs.password && repeatPass && (inputs.password === repeatPass));
    };


    return (
        <>
                    <MyNav/>
                    <div className={styles.wrapper}>
                        <div className={styles.innerWrapper}>
                            <div>
                                <div className={styles.title}>
                                    <h2 className={styles.titleText}>Create new account</h2>
                                </div>
                                <form onSubmit={handleSubmitSignIn} noValidate action="">
                                    <div className={styles.formWrapper}>
                                        <h3 className={styles.account}>Account</h3>
                                        <div id="username" className={styles.inputWrapper}>
                                            <div>
                                                <div className={styles.inputInnerWrap}>
                                                    <label htmlFor="username" className={styles.inputLabel}>First
                                                        Name</label>
                                                    <input id="username"
                                                           name="username"
                                                           type="text"
                                                           aria-label="Username"
                                                           placeholder="Username *"
                                                           required
                                                           value={inputs.username}
                                                           onChange={handleInputChange}
                                                           className={styles.inputInner}/>
                                                </div>
                                            </div>
                                            {(error.message?.type === 'username') &&
                                                <div className={styles.danger}>{error.message.message}</div>}
                                        </div>
                                        <div className={styles.inputWrapper}>
                                            <div>
                                                <div className={styles.inputInnerWrap}>
                                                    <label htmlFor="email" className={styles.inputLabel}>Email</label>
                                                    <input
                                                        id="email"
                                                        name="email"
                                                        type="email"
                                                        aria-label="Email"
                                                        placeholder="Email *"
                                                        value={inputs.email}
                                                        onChange={handleInputChange}
                                                        required
                                                        className={styles.inputInner}/>
                                                </div>
                                            </div>
                                            {(error.message?.type === 'email') &&
                                                <div className={styles.danger}>{error.message.message}</div>}
                                        </div>
                                        <div className={styles.inputWrapper}>
                                            <label htmlFor="password" className={styles.inputLabel}>Password</label>
                                            <input
                                                type={showPassword.password ? "text" : "password"}
                                                className={styles.inputInner}
                                                id="password"
                                                name="password"
                                                aria-label="Password (8 characters or more)"
                                                placeholder="Password *"
                                                value={inputs.password}
                                                onChange={handleInputChange}
                                                required/>
                                            <button type="button"
                                                    tabIndex="-1"
                                                    className={styles.passHideBtn}
                                                    onClick={() => handleShowPassword("password")}
                                                    disabled={!Boolean(inputs.password)}
                                            >
                                                <span></span>
                                                <div className={styles.eyeWrapper}>
                                                    <svg width="24" height="24" overflow="visible"
                                                         viewBox="0 0 24 24"
                                                         preserveAspectRatio="xMinYMin meet"
                                                         fill={inputs.password ? "" : "#808080"}
                                                         stroke=""
                                                         strokeWidth="4">
                                                        {showPassword.password ?
                                                            <g stroke="none">
                                                                <path fillRule="evenodd"
                                                                      clipRule="evenodd"
                                                                      d="M4.97676 7.44189C6.80781 6.10724 9.20284 5 12 5C14.7972 5 17.1922
                                                                   6.10724 19.0232 7.44189C20.8489 8.77262 22.1734
                                                                   10.3713 22.8522 11.4767L23.1735 12L22.8522 12.5233C22.1734
                                                                   13.6287 20.8489 15.2274 19.0232 16.5581C17.1922 17.8928 14.7972 19 12
                                                                   19C9.20284 19 6.80781 17.8928 4.97676 16.5581C3.15109 15.2274 1.82664 13.6287
                                                                   1.14783 12.5233L0.82653 12L1.14783 11.4767C1.82664 10.3713 3.15109 8.77262
                                                                   4.97676 7.44189ZM3.20283 12C3.82621 12.8641 4.83701 13.9813 6.15482 14.9419C7.7536
                                                                   16.1072 9.74453 17 12 17C14.2555 17 16.2464 16.1072 17.8452 14.9419C19.163 13.9813
                                                                   20.1738 12.8641 20.7972 12C20.1738 11.1358 19.163 10.0187 17.8452 9.05811C16.2464
                                                                   7.89276 14.2555 7 12 7C9.74453 7 7.7536 7.89276 6.15482 9.05811C4.83701 10.0187
                                                                   3.82621 11.1359 3.20283 12Z">
                                                                </path>
                                                                <circle cx="12" cy="12" r="3"></circle>
                                                            </g> :
                                                            <path fillRule="evenodd"
                                                                  clipRule="evenodd"
                                                                  d="M16.5756 17.9898L20.2929 21.7071L21.7071 20.2929L18.4015
                                                                    16.9873C18.6154 16.8477 18.8227 16.7043 19.0232 16.5581C20.8489 15.2274 22.1734 13.6287 22.8522
                                                                    12.5233L23.1735 12L22.8522 11.4767C22.1734 10.3713 20.8489 8.77262
                                                                    19.0232 7.44189C17.1922 6.10724 14.7972 5 12 5C10.3176
                                                                    5 8.78068 5.40056 7.42444 6.01023L3.70711 2.29289L2.29289
                                                                    3.70711L5.59848 7.01269C5.38461 7.15226 5.1773 7.29571
                                                                    4.97675 7.44189C3.15109 8.77262 1.82663 10.3713 1.14782
                                                                    11.4767L0.826523 12L1.14782 12.5233C1.82663 13.6287 3.15109 15.2274 4.97675 16.5581C6.80781
                                                                    17.8928 9.20284 19 12 19C13.6824 19 15.2193 18.5994 16.5756 17.9898ZM16.9512 15.537C17.2612 15.3497
                                                                    17.5595 15.1501 17.8452 14.9419C19.163 13.9813 20.1738 12.8641 20.7972 12C20.1738 11.1358 19.163 10.0187
                                                                    17.8452 9.05811C16.2464 7.89276 14.2555 7 12 7C10.9212 7 9.90289 7.20425 8.95909 7.54487L10.7066
                                                                    9.29237C11.0982 9.10495 11.5369 9 12 9C13.6569 9 15 10.3431 15 12C15 12.4631 14.895 12.9018 14.7076
                                                                    13.2934L16.9512 15.537ZM13.2934 14.7076L15.0409 16.4551C14.0971 16.7958 13.0788 17 12 17C9.74453 17
                                                                    7.75359 16.1072 6.15482 14.9419C4.837 13.9813 3.8262 12.8641 3.20283 12C3.8262 11.1359 4.837 10.0187
                                                                    6.15482 9.05811C6.44053 8.84986 6.73876 8.65031 7.04879 8.463L9.29237 10.7066C9.10495 11.0982 9 11.5369 9
                                                                    12C9 13.6569 10.3431 15 12 15C12.4631 15 12.9018 14.895 13.2934 14.7076Z"
                                                                  stroke='none'>
                                                            </path>
                                                        }
                                                    </svg>
                                                </div>
                                            </button>
                                            {(error.message?.type === 'password') &&
                                                <div className={styles.danger}>{error.message.message}</div>}
                                        </div>
                                        <div className={styles.inputWrapper}>
                                            <div className={styles.passRelative}>
                                                <label htmlFor="repPassword" className={styles.inputLabel}>Repeat
                                                    Password</label>
                                                <input
                                                    type={showPassword.repeatPas ? "text" : "password"}
                                                    className={styles.inputInner}
                                                    id="repPassword"
                                                    name="passwordDoubled"
                                                    aria-label="Repeat password"
                                                    placeholder="Repeat password *"
                                                    value={repeatPass}
                                                    onChange={handleRepeatPassword}
                                                    required/>

                                                <button type="button"
                                                        tabIndex="-1"
                                                        className={styles.passHideBtn}
                                                        onClick={() => handleShowPassword('repeatPas')}
                                                        disabled={!Boolean(repeatPass)}
                                                >
                                                    <span></span>
                                                    <div className={styles.eyeWrapper}>
                                                        <svg width="24" height="24" overflow="visible"
                                                             viewBox="0 0 24 24"
                                                             preserveAspectRatio="xMinYMin meet"
                                                             fill={repeatPass ? "" : "#808080"}
                                                             stroke="#808080"
                                                             strokeWidth="4">
                                                            {showPassword.repeatPas ?
                                                                <g stroke="none">
                                                                    <path fillRule="evenodd"
                                                                          clipRule="evenodd"
                                                                          d="M4.97676 7.44189C6.80781 6.10724 9.20284 5 12 5C14.7972 5 17.1922
                                                                   6.10724 19.0232 7.44189C20.8489 8.77262 22.1734
                                                                   10.3713 22.8522 11.4767L23.1735 12L22.8522 12.5233C22.1734
                                                                   13.6287 20.8489 15.2274 19.0232 16.5581C17.1922 17.8928 14.7972 19 12
                                                                   19C9.20284 19 6.80781 17.8928 4.97676 16.5581C3.15109 15.2274 1.82664 13.6287
                                                                   1.14783 12.5233L0.82653 12L1.14783 11.4767C1.82664 10.3713 3.15109 8.77262
                                                                   4.97676 7.44189ZM3.20283 12C3.82621 12.8641 4.83701 13.9813 6.15482 14.9419C7.7536
                                                                   16.1072 9.74453 17 12 17C14.2555 17 16.2464 16.1072 17.8452 14.9419C19.163 13.9813
                                                                   20.1738 12.8641 20.7972 12C20.1738 11.1358 19.163 10.0187 17.8452 9.05811C16.2464
                                                                   7.89276 14.2555 7 12 7C9.74453 7 7.7536 7.89276 6.15482 9.05811C4.83701 10.0187
                                                                   3.82621 11.1359 3.20283 12Z">
                                                                    </path>
                                                                    <circle cx="12" cy="12" r="3"></circle>
                                                                </g> :
                                                                <path fillRule="evenodd"
                                                                      clipRule="evenodd"
                                                                      d="M16.5756 17.9898L20.2929 21.7071L21.7071 20.2929L18.4015
                                                                    16.9873C18.6154 16.8477 18.8227 16.7043 19.0232 16.5581C20.8489 15.2274 22.1734 13.6287 22.8522
                                                                    12.5233L23.1735 12L22.8522 11.4767C22.1734 10.3713 20.8489 8.77262
                                                                    19.0232 7.44189C17.1922 6.10724 14.7972 5 12 5C10.3176
                                                                    5 8.78068 5.40056 7.42444 6.01023L3.70711 2.29289L2.29289
                                                                    3.70711L5.59848 7.01269C5.38461 7.15226 5.1773 7.29571
                                                                    4.97675 7.44189C3.15109 8.77262 1.82663 10.3713 1.14782
                                                                    11.4767L0.826523 12L1.14782 12.5233C1.82663 13.6287 3.15109 15.2274 4.97675 16.5581C6.80781
                                                                    17.8928 9.20284 19 12 19C13.6824 19 15.2193 18.5994 16.5756 17.9898ZM16.9512 15.537C17.2612 15.3497
                                                                    17.5595 15.1501 17.8452 14.9419C19.163 13.9813 20.1738 12.8641 20.7972 12C20.1738 11.1358 19.163 10.0187
                                                                    17.8452 9.05811C16.2464 7.89276 14.2555 7 12 7C10.9212 7 9.90289 7.20425 8.95909 7.54487L10.7066
                                                                    9.29237C11.0982 9.10495 11.5369 9 12 9C13.6569 9 15 10.3431 15 12C15 12.4631 14.895 12.9018 14.7076
                                                                    13.2934L16.9512 15.537ZM13.2934 14.7076L15.0409 16.4551C14.0971 16.7958 13.0788 17 12 17C9.74453 17
                                                                    7.75359 16.1072 6.15482 14.9419C4.837 13.9813 3.8262 12.8641 3.20283 12C3.8262 11.1359 4.837 10.0187
                                                                    6.15482 9.05811C6.44053 8.84986 6.73876 8.65031 7.04879 8.463L9.29237 10.7066C9.10495 11.0982 9 11.5369 9
                                                                    12C9 13.6569 10.3431 15 12 15C12.4631 15 12.9018 14.895 13.2934 14.7076Z"
                                                                      stroke="none">
                                                                </path>
                                                            }
                                                        </svg>
                                                    </div>
                                                </button>
                                            </div>
                                            {(error.message?.type === 'repeatPass') &&
                                                <div className={styles.danger}>{error.message.message}</div>}
                                        </div>
                                        <button aria-label="Continue" className={styles.continue}
                                                disabled={handeSubmitDisabled()}>
                                            <span>Continue</span>
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
        </>
    )
};