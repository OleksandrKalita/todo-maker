import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";

export const HeaderComponent = () => {
    const isAuth = useSelector(store => store.user.isAuth);

    const userDefaultIcon = require("../../img/user-default-icon.png");
    return (
        <header className="header">
            <div className="header__container">
                <nav className="menu">
                    <ul className="menu__list">
                        <li>
                            <NavLink to={"/main"} className="menu__link">Main</NavLink>
                        </li>
                        <li>
                            <NavLink to={"/main/create"} className="menu__link">Create</NavLink>
                        </li>
                        <li>
                            <NavLink to={"/main/settings"} className="menu__link">Settings</NavLink>
                        </li>
                    </ul>
                </nav>
                <div className="header__auth">
                    {
                        isAuth ? <NavLink to={"/settings"}><img className="auth-img" src={userDefaultIcon} alt="" /></NavLink>
                        : <NavLink to={"/login"}><button className="auth-button">Log in</button></NavLink>
                    }
                </div>
            </div>
        </header>
    );
}