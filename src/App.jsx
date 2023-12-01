import {Routes, Route, Navigate} from "react-router-dom";
import { LoginPage } from "./components/LoginPage";
import { MainPage } from "./components/MainPage";
import { RegistrationPage } from "./components/RegistrationPage";

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<MainPage/>}/>
        <Route path="/login" element={<LoginPage/>}/>
        <Route path="/signin" element={<RegistrationPage/>}/>
        <Route path="*" element={<Navigate to="/"/>}/>
      </Routes>
    </div>
  );
}

export default App;
