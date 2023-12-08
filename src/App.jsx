import {Routes, Route, Navigate} from "react-router-dom";
import { LoginPage } from "./components/LoginPage";
import { MainLayout } from "./components/MainLayout";
import { RegistrationPage } from "./components/RegistrationPage";
import { MainComponents } from "./components/MainComponents/MainComponents";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { useAuthMutation } from "./redux/userApi";
import { login } from "./redux/userSlice";

function App() {
  const isAuth = useSelector(state => state.user.isAuth);
  const [auth, {data, isSuccess}] = useAuthMutation();
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
          <Route path="main/*" element={isAuth ? <MainLayout/> : <Navigate to="/login"/>}>
            <Route path="" element={<MainComponents/>}/>
          </Route>
          <Route path="login" element={isAuth ? <Navigate to="/main"/> : <LoginPage/>}/>
          <Route path="signin" element={isAuth ? <Navigate to="/main"/> : <RegistrationPage/>}/>
          <Route path="*" element={<Navigate to="/main"/>}/>
        </Route>
      </Routes>
    </div>
  );
}

export default App;
