import { NavLink } from "react-router-dom";
export const RegistrationPage = () => {
    return (
        <div className="page">
            <div className="page__container">
                <div className="auth-block">
                    <div className="title">Create new account <div className="primary">.</div></div>
                    <div className="text">Already A Member? <NavLink className="link">Log In</NavLink></div>
                    <div className="fields-block">
                        <div className="name-fields">
                            <div className="input-container">
                                <label htmlFor="" className="input-label">First name</label>
                                <input type="text" className="input" />
                                <img src="" alt="" />
                            </div>
                            <div className="input-container">
                                <label htmlFor="" className="input-label">Last name</label>
                                <input type="text" className="input" />
                                <img src="" alt="" />
                            </div>
                        </div>
                        <div className="input-container">
                            <label htmlFor="" className="input-label">Email</label>
                            <input type="text" className="input" />
                            <img src="" alt="" />
                        </div>
                        <div className="input-container">
                            <label htmlFor="" className="input-label">Password</label>
                            <input type="password" className="input" />
                            <img src="" alt="" />
                        </div>
                        <div className="button-block">
                            <button className="button">Create account</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}