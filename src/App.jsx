import {Routes, Route, Navigate} from "react-router-dom";
import { LoginPage } from "./components/LoginPage";
import { MainLayout } from "./components/MainLayout";
import { RegistrationPage } from "./components/RegistrationPage";
import { MainComponent } from "./components/MainComponents/MainComponent";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { useAuthMutation } from "./redux/userApi";
import { login } from "./redux/userSlice";
import { SettingsComponent } from "./components/MainComponents/SettingsComponent";

function App() {
  const isAuth = useSelector(state => state.user.isAuth);
  const [auth, {data, isSuccess, isError}] = useAuthMutation();
  const dispatch = useDispatch();

 
  useEffect(() => {
    auth();
  }, []);

  if (isSuccess) {
    localStorage.setItem("token", data.token);
    dispatch(login(data.user));
  }
  
  
  return (
    <div className="con">
      <Routes>
        <Route path="/">
          {/* <Route path="main/*" element={isAuth ? <MainLayout/> : <Navigate to="/login"/>}> */}
          <Route path="main/*" element={<MainLayout/>}>
            <Route path="" element={<MainComponent/>}/>
            <Route path="settings" element={isAuth ? <SettingsComponent/> : <Navigate to={"/main"}/>}/>
          </Route>
          <Route path="login" element={isAuth ? <Navigate to="/main"/> : <LoginPage/>}/>
          <Route path="signin" element={isAuth ? <Navigate to="/main"/> : <RegistrationPage/>}/>
          <Route path="*" element={isAuth ? <Navigate to={"/main"}/> : <Navigate to={"/login"} />}/>
        </Route>
      </Routes>
    </div>
  );
}

export default App;
