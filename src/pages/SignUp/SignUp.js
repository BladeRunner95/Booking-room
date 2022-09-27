import {Navigate} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {MyNav} from "../../components/Nav/MyNav";
import styles from './SignUp.module.css';
import {useEffect, useState} from "react";
import {userActions} from "../../actions/user.actions";
import {alertActions} from "../../actions/alert.actions";
import {useTranslation} from "react-i18next";
import {Icon} from "../../components/svgs/Icon/Icon";


export const SignUp = () => {
    const { t } = useTranslation();
    const dispatch = useDispatch();
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
        // const validResult = validForm(email, password, inputs);
        // if (validResult)
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
                                    <h2 className={styles.titleText}>{t('create-account')}</h2>
                                </div>
                                <form onSubmit={handleSubmitSignIn} noValidate action="">
                                    <div className={styles.formWrapper}>
                                        {/*<h3 className={styles.account}>Account</h3>*/}
                                        <div id="username" className={styles.inputWrapper}>
                                            <div>
                                                <div className={styles.inputInnerWrap}>
                                                    <label htmlFor="username" className={styles.inputLabel}>First
                                                        Name</label>
                                                    <input id="username"
                                                           name="username"
                                                           type="text"
                                                           aria-label="Username"
                                                           placeholder={t('username')}
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
                                                        placeholder={t('email')}
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
                                                placeholder={t('password')}
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
                                                    <Icon
                                                        fill={inputs.password ? "" : "#808080"}
                                                        showPas={showPassword.password}
                                                    />
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
                                                    placeholder={t('repeat-password')}
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
                                                        <Icon
                                                            fill={repeatPass ? "" : "#808080"}
                                                            showPas={showPassword.repeatPas}
                                                        />
                                                    </div>
                                                </button>
                                            </div>
                                            {(error.message?.type === 'repeatPass') &&
                                                <div className={styles.danger}>{error.message.message}</div>}
                                        </div>
                                        <button aria-label="Continue" className={styles.continue}
                                                disabled={handeSubmitDisabled()}>
                                            <span>{t('continue')}</span>
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
        </>
    )
};