import { Outlet, NavLink } from "react-router-dom";

export const MainLayout = () => {
    return (
        <div className="wrapper">
            <header className="header">
                <div className="header__container">

                </div>
            </header>
            <Outlet/>
        </div>
    );
}