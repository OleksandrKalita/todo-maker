import { Outlet } from "react-router-dom";
import { HeaderComponent } from "./MainComponents/HeaderComponent";

export const MainLayout = () => {
    return (
        <div className="wrapper">
            <HeaderComponent/>
            <Outlet/>
        </div>
    );
}