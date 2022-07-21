import styles from './Login.module.css';
import {_Nav} from "../../components/Nav/_Nav";
import {Link} from "react-router-dom";
import {useState} from "react";
import axios from "axios";
import {useDispatch, useSelector} from "react-redux";
import {userActions} from "../../actions/user.actions";

export const Login = () => {
    const dispatch = useDispatch();
    const loggingIn = useSelector(state => state.userReducer.loggingIn);

    let [ inputs, setInputs ] = useState([
        {
            id: 1,
            name: 'Email address',
            value: undefined
        },
        {
            id:2,
            name: 'Password',
            value: undefined
        }
    ]);

    const [submitted, setSubmitted] = useState(false);
    const [ checkbox, setCheckbox ] = useState(false);

    const handleInputsChange = (e, index) => {
    setInputs(prev => {
        prev[index].value = e.target.value;
        return prev;
    })};

    const handleCheckbox = () => {
        setCheckbox(prev => !prev);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        setSubmitted(true);
        if (inputs[0].value && inputs[1].value) {
            const credentials = {
                username: inputs[0].value,
                password: inputs[1].value,
            };
            console.log('submitted with username and password');
            // await axios.post('http://localhost:5000/api/auth/login', credentials, {withCredentials: true})
            dispatch(userActions.login(inputs[0].value, inputs[1].value));
            // get return url from location state or default to home page
            // const { from } = location.state || { from: { pathname: "/" } };
            // dispatch(userActions.login(inputs[0].value, inputs[1].value, from));
        }
    };

    return (
        <>
        <_Nav />
            {loggingIn ? <div>AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAa</div> :
                <div className={styles.mainWrapper}>
                    <div className={styles.mainInnerWrapper}>
                        <div className={styles.innerWrapper}>
                            <div className={styles.welcomeWrapper}>
                                <div className={styles.welcomeInner}>
                                    <h1 className={styles.welcomeText}>WELCOME</h1>
                                </div>
                            </div>
                            <form noValidate onSubmit={handleSubmit}>
                                {inputs.map((inpt, index) =>
                                    <div key={inpt.id} className={styles.emailMainWrap}>
                                        <div className={inpt.id === 2 ? styles.passwordWrap : null}>
                                            <div className={styles.formInputInner}>
                                                <label className={styles.formLabel} htmlFor="">{inpt.email}</label>
                                                <input
                                                    className={styles.formInput}
                                                    type="text"
                                                    id={inpt.name}
                                                    key={inpt.name}
                                                    name={inpt.name}
                                                    placeholder={inpt.name + ' *'}
                                                    value={inputs[index].value}
                                                    onChange={e => handleInputsChange(e, index)}
                                                    required
                                                />
                                            </div>
                                        </div>
                                    </div>
                                )}
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