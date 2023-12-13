import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useImageUpdateMutation } from "../../redux/userApi";
import { updateLogo } from "../../redux/userSlice";

export const SettingsComponent = () => {
    const dispatch = useDispatch();
    const user = useSelector(store => store.user.user);
    const logoPath = user.logoPath;

    const [firstName, setFirstName] = useState(user.firstName);
    const [lastName, setLastName] = useState(user.lastName);
    const [email, setEmail] = useState(user.email);

    const [firstNameFocus, setFirstNameFocus] = useState(false);
    const [lastNameFocus, setLastNameFocus] = useState(false);
    const [emailFocus, setEmailFocus] = useState(false);

    const [firstNameError, setFirstNameError] = useState(false);
    const [lastNameError, setLastNameError] = useState(false);
    const [emailError, setEmailError] = useState(false);

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
    emailInputClass = emailError ? `${emailInputClass} error` : emailInputClass

    const passportIcon = require("../../img/passport-icon.png");
    const emailIcon = require("../../img/email-icon.png");
    const userDefaultIcon = require("../../img/test-photo.jpg");
    const userLogo = require(`../../../public/Images/${logoPath}`);

    const [file, setFile] = useState(null);

    const [imageUpdate, { data, isSuccess }] = useImageUpdateMutation();
    
    if (isSuccess) {
        localStorage.setItem("token", data.token);
        console.log(data.logoPath);
        dispatch(updateLogo(data.logoPath));
    }
    const handleUpload = (e) => {
        console.log(file);
        const formData = new FormData();
        formData.append("file", file);
        imageUpdate(formData);
    }
    const submitHandler = (event) => {
        event.preventDefault();


    }
    return (
        <div className="component">
            <div className="component__container">
                <form action="" className="fields-block setting" onSubmit={event => submitHandler(event)}>
                    <div className="setting-left-block">
                        <div className="input-container setting">
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
                        <div className="input-container setting">
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
                        <div className="input-container setting">
                            <label htmlFor="" className={emailLabelClass}>Email</label>
                            <input
                            readOnly
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
                        <div className="button-block">
                            <button type="submit" className="button setting" onClick={handleUpload}>Apply</button>
                        </div>
                    </div>
                    <div className="setting-right-block">
                        <div className="photo__container">
                            <img src={userLogo} alt="" className="photo" />
                            <div className="photo-preview">
                                <input 
                                accept="image/*"
                                type="file"
                                onChange={e => setFile(e.target.files[0])} />
                                <div>delete</div>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
}