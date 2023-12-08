import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useLogInUserMutation } from "../redux/userApi";
import { useDispatch } from "react-redux";
import { login } from "../redux/userSlice";

export const LoginPage = () => {
    const [email, setEmail] = useState("@gmail.com");
    const [password, setPassword] = useState("");

    const [emailFocus, setEmailFocus] = useState(false);
    const [passwordFocus, setPasswordFocus] = useState(false);

    const [passwordHidden, setPasswordHidden] = useState(true);

    const [emailError, setEmailError] = useState(false);
    const [passwordError, setPasswordError] = useState(false);

    let emailLabelClass = emailFocus ? "input-label active" : "input-label";
    emailLabelClass = emailError ? `${emailLabelClass} error`: emailLabelClass;
    let emailInputClass = emailFocus ? "input active" : "input";
    emailInputClass = emailError ? `${emailInputClass} error` : emailInputClass;

    let passwordLabelClass = passwordFocus ? "input-label active" : "input-label";
    passwordLabelClass = passwordError ? `${passwordLabelClass} error`: passwordLabelClass;
    let passwordInputClass = passwordFocus ? "input active" : "input";
    passwordInputClass = passwordError ? `${passwordInputClass} error` : passwordInputClass;

    const emailIcon = require("../img/email-icon.png");
    const openEyeIcon = require("../img/open-eye-icon.png");
    const closeEyeIcon = require("../img/close-eye-icon.png");

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [logInUser, {data, isSuccess}] = useLogInUserMutation();

    function isValidEmail(data) {
        const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{3}$/;
        return emailRegex.test(data);
    }

    if (isSuccess) {
        localStorage.setItem("token", data.token);
        dispatch(login(data.user));
        navigate("/main");
    }

    const submitHandler = async (event) => {
        event.preventDefault();

        setPasswordHidden(true);

        let errorCounter = 0;
        if (!isValidEmail(email)) {
            setEmailError(true);
            errorCounter++;
        }
        if (password.trim().length < 7) {
            setPasswordError(true);
            errorCounter++;
        }

        if (errorCounter > 0) {
            return 0;
        }

        await logInUser({email, password});
    }
    return (
        <div className="page">
            <div className="page__container">
                <div className="auth-block">
                    <div className="title">Login to the account<div className="primary">.</div></div>
                    <div className="text">Don't Have Account? <NavLink className="link" to="/signin">Sign In</NavLink></div>
                    <form action="" className="fields-block" onSubmit={event => submitHandler(event)}>
                        <div className="input-container">
                            <label htmlFor="" className={emailLabelClass}>Email</label>
                            <input 
                            type="text" 
                            value={email}
                            className={emailInputClass}
                            onFocus={() => setEmailFocus(true)}
                            onBlur={() => setEmailFocus(false)}
                            onChange={event => {
                                if (emailError) setEmailError(false); 
                                setEmail(event.target.value)
                            }}/>
                            <img src={emailIcon} alt="" className="input-img"/>
                        </div>
                        <div className="input-container">
                            <label htmlFor="" className={passwordLabelClass}>Password</label>
                            <input 
                            type={passwordHidden ? "password" : "text"} 
                            value={password}
                            className={passwordInputClass}
                            onFocus={() => setPasswordFocus(true)}
                            onBlur={() => setPasswordFocus(false)}
                            onChange={event => {
                                if (passwordError) setPasswordError(false); 
                                setPassword(event.target.value)
                            }}/>
                            <img 
                            src={passwordHidden ? openEyeIcon : closeEyeIcon} 
                            alt="" 
                            className="input-img"
                            onClick={() => setPasswordHidden(!passwordHidden)}/>
                        </div>
                        <div className="button-block">
                            <button type="submit" className="button">Log In</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}