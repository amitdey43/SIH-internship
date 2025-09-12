// App.jsx
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import App from "./App";
import { RegisterMentor } from "./component/RegisterMentor";
import { RegisterHR } from "./component/RegistrationHR";

import { Register } from "./component/Register";
import { Login } from "./component/Login";
import { Userdashboard } from "./component/Userdashboard";
import { Mentordashboard } from "./component/Mentordashboard";
import {Hrdashboard} from "./component/Hrdashboard"
import { Forgotpassword } from "./component/Forgotpassword";
import { Resetforgotpassword } from "./component/Resetpassword";
import { Home } from "./pages/Home";
import { InternshipsList } from "./component/Internshipdashboard";
import InternshipDetails from "./component/Singleintern";
import Internapply from "./component/Internapply";



function App1() {
  return (
    <Router>
      <Routes>

        <Route path="/" element={<Home />} />
        <Route path="/user/register" element={<App />} />
        <Route path="/mentor/register" element={<RegisterMentor/>}/>
        <Route path="/hr/register" element={<RegisterHR/>}/>
        {/* <Route path="/hr/register" element={<RegisterHR/>}/> */}
        <Route path="/register" element={<Register/>}/>
        <Route path="/login" element={<Login/>}/>
        <Route path="/user/dashboard" element={<Userdashboard/>}/>
        <Route path="/hr/dashboard" element={<Hrdashboard/>}/>
        <Route path="/mentor/dashboard" element={<Mentordashboard/>}/>
        <Route path="/forgot-password" element={<Forgotpassword/>}/>
        <Route path="/reset-password/:role/:token" element={<Resetforgotpassword/>}/>
        <Route path="/internships" element={<InternshipsList/>}/>
        <Route path="/intership/details/:id" element={<InternshipDetails/>}/>
        <Route path="/internship/apply/:id" element={<Internapply/>}/>
      </Routes>
    </Router>
  );
}

export default App1;
