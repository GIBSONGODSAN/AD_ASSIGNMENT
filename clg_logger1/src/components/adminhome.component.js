import React from 'react';
import { Link, Routes, Route } from 'react-router-dom';
import AdminUser from './adminUser.component';
import ActAssign from './adminActAssign.component';
import NamesDisplay from './adminAttend.component';

const AdminHome = () => {
  return (
    <div className="admin-container">
            <h1>Welcome to Admin Home</h1>

            <ul className="admin-menu">
                <li>
                    <Link to="/adminUser">Admin Users</Link>
                </li>
                <li>
                    <Link to="/adminActAssign">Activity Assignment</Link>
                </li>
                <li>
                    <Link to="/adminAttend">Attendance</Link>
                </li>
            </ul>

      <Routes>
        <Route path="/adminUser" element={<AdminUser />} />
        <Route path="/adminActAssign" element={<ActAssign />} />
        <Route path="/adminAttend" element={<NamesDisplay />} />
      </Routes>
    </div>
  );
};

export default AdminHome;
