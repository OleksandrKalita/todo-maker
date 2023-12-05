import {Routes, Route, Navigate} from "react-router-dom";
import { LoginPage } from "./components/LoginPage";
import { MainLayout } from "./components/MainLayout";
import { RegistrationPage } from "./components/RegistrationPage";
import { MainComponents } from "./components/MainComponents/MainComponents";

function App() {
  return (
    <div>
      <Routes>
        <Route path="/">
          <Route path="main/*" element={<MainLayout/>}>
            <Route path="" element={<MainComponents/>}/>
          </Route>
          <Route path="login" element={<LoginPage/>}/>
          <Route path="signin" element={<RegistrationPage/>}/>
          {/* <Route path="*" element={<Navigate to="/"/>}/> */}
        </Route>
      </Routes>
    </div>
  );
}

export default App;
