import './App.css';
import "bootstrap/dist/css/bootstrap.min.css"
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import LoginPage from "./components/loginpage.component";
import HomePage from "./components/homepage.component";

function App() {
  return (
    <Router>
      <Routes>
        <Route path='/loginpage' element={<LoginPage />} />
        <Route path='/homepage' element={<HomePage />} />
      </Routes>
    </Router>
  );
}

export default App;
