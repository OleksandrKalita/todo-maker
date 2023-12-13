import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useSignInUserMutation } from "../redux/userApi";

export const RegistrationPage = () => {
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const [firstNameFocus, setFirstNameFocus] = useState(false);
    const [lastNameFocus, setLastNameFocus] = useState(false);
    const [emailFocus, setEmailFocus] = useState(false);
    const [passwordFocus, setPasswordFocus] = useState(false);

    const [passwordHidden, setPasswordHidden] = useState(true);

    const [firstNameError, setFirstNameError] = useState(false);
    const [lastNameError, setLastNameError] = useState(false);
    const [emailError, setEmailError] = useState(false);
    const [passwordError, setPasswordError] = useState(false);

    let firstNameLabelClass = firstNameFocus ? "input-label active" : "input-label";
    firstNameLabelClass = firstNameError ? `${firstNameLabelClass} error`: firstNameLabelClass;
    let firstNameInputClass = firstNameFocus ? "input active" : "input";
    firstNameInputClass = firstNameError ? `${firstNameInputClass} error` : firstNameInputClass;

    let lastNameLabelClass = lastNameFocus ? "input-label active" : "input-label";
    lastNameLabelClass = lastNameError ? `${lastNameLabelClass} error`: lastNameLabelClass;
    let lastNameInputClass = lastNameFocus ? "input active" : "input";
    lastNameInputClass = lastNameError ? `${lastNameInputClass} error` : lastNameInputClass;

    let emailLabelClass = emailFocus ? "input-label active" : "input-label";
    emailLabelClass = emailError ? `${emailLabelClass} error`: emailLabelClass;
    let emailInputClass = emailFocus ? "input active" : "input";
    emailInputClass = emailError ? `${emailInputClass} error` : emailInputClass;

    let passwordLabelClass = passwordFocus ? "input-label active" : "input-label";
    passwordLabelClass = passwordError ? `${passwordLabelClass} error`: passwordLabelClass;
    let passwordInputClass = passwordFocus ? "input active" : "input";
    passwordInputClass = passwordError ? `${passwordInputClass} error` : passwordInputClass;

    const passportIcon = require("../img/passport-icon.png");
    const emailIcon = require("../img/email-icon.png");
    const openEyeIcon = require("../img/open-eye-icon.png");
    const closeEyeIcon = require("../img/close-eye-icon.png");

    const [signInUser, {isError, isSuccess}] = useSignInUserMutation();

    const navigate = useNavigate();

    function isValidEmail(data) {
        const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{3}$/;
        return emailRegex.test(data);
    }

    if (isSuccess) {
        navigate("/login");
    }
    const submitHandler = async (event) => {
        event.preventDefault();

        setPasswordHidden(true);

        let errorCounter = 0;
        if (firstName.trim().length === 0) {
            setFirstNameError(true);
            errorCounter++;
        }
        if (lastName.trim().length === 0) {
            setLastNameError(true);
            errorCounter++;
        }
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
        await signInUser({firstName, lastName, email, password});
    }
    return (
        <div className="page">
            <div className="page__container">
                <div className="auth-block">
                    <div className="title">Create new account<div className="primary">.</div></div>
                    <div className="text">Already A Member? <NavLink className="link" to="/login">Log In</NavLink></div>
                    <form action="" className="fields-block" onSubmit={event => submitHandler(event)}>
                        <div className="name-fields">
                            <div className="input-container">
                                <label htmlFor="" className={firstNameLabelClass}>First name</label>
                                <input 
                                type="text" 
                                value={firstName}
                                className={firstNameInputClass}
                                onFocus={() => setFirstNameFocus(true)}
                                onBlur={() => setFirstNameFocus(false)}
                                onChange={event => {
                                    if (firstNameError) setFirstNameError(false);
                                    setFirstName(event.target.value);
                                }}/>
                                <img src={passportIcon} alt="" className="input-img"/>
                            </div>
                            <div className="input-container">
                                <label htmlFor="" className={lastNameLabelClass}>Last name</label>
                                <input 
                                type="text"
                                value={lastName} 
                                className={lastNameInputClass}
                                onFocus={() => setLastNameFocus(true)}
                                onBlur={() => setLastNameFocus(false)}
                                onChange={event => {
                                    if (lastNameError) setLastNameError(false);
                                    setLastName(event.target.value)
                                }}/>
                                <img src={passportIcon} alt="" className="input-img"/>
                            </div>
                        </div>
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
                                setPassword(event.target.value);
                            }}/>
                            <img 
                            src={passwordHidden ? openEyeIcon : closeEyeIcon} 
                            alt="" 
                            className="input-img"
                            onClick={() => setPasswordHidden(!passwordHidden)}/>
                        </div>
                        <div className="button-block">
                            <button type="submit" className="button">Create account</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}