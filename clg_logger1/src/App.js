import './App.css';
import "bootstrap/dist/css/bootstrap.min.css"
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";

import LoginPage from "./components/loginpage.component";
import HomePage from "./components/homepage.component";
import AdminHome from "./components/adminHome.component";
import AdminUser from "./components/adminUser.component";
import ActAssign from './components/adminActAssign.component';
import NamesDisplay from './components/adminAttend.component';

function App() {
  return (
    <Router>
      <Routes>
        <Route path='/loginpage' element={<LoginPage />} />
        <Route path='/homepage' element={<HomePage />} />
        <Route path='/adminhome' element={<AdminHome />} />
        <Route path='/adminUser' element={<AdminUser />} />
        <Route path='/adminActAssign' element={<ActAssign />} />
        <Route path='/adminAttend' element={<NamesDisplay />} />
        {/* Add a default route to redirect to /loginpage */}
        <Route
          path="*"
          element={<Navigate to="/loginpage" />}
        />
      </Routes>
    </Router>
  );
}

export default App;

// SET PATH=C:\Program Files\Nodejs;%PATH%
