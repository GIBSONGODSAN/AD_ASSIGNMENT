import './App.css';
import "bootstrap/dist/css/bootstrap.min.css"
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";

import LoginPage from "./components/loginpage.component";
import HomePage from "./components/homepage.component";
import AdminHome from "./components/adminhome.component";

function App() {
  return (
    <Router>
      <Routes>
        <Route path='/loginpage' element={<LoginPage />} />
        <Route path='/homepage' element={<HomePage />} />
        <Route path='/adminhome' element={<AdminHome />} />
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
