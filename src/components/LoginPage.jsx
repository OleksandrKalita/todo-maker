import { useState } from "react";
import { NavLink } from "react-router-dom";

export const LoginPage = () => {
    const [email, setEmail] = useState("");
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

    function isValidEmail(data) {
        const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{3}$/;
        return emailRegex.test(data);
    }
    const submitHandler = (event) => {
        event.preventDefault();

        setPasswordHidden(true);

        if (!isValidEmail(email)) {
            setEmailError(true);
        }
        if (password.trim().length < 7) {
            setPasswordError(true);
        }
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