import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";

import UserLayout from "./layout/User/UserLayout.jsx";
import AdminLayout from "./layout/Admin/AdminLayout.jsx";
import Banner from "./pages/Admin/Banner/Banner.jsx"

import Home from "./pages/Home.jsx/Home";



import "./App.css";

export default function App() {

  return (
    <Router>

      <Routes>

        {/* USER ROUTES */}

        <Route element={<UserLayout />}>
          <Route path="/" element={<Home />} />
        </Route>


        {/* ADMIN ROUTES */}

        <Route path="/admin" element={<AdminLayout />}>

          <Route path="banner" element={<Banner />} />
        </Route>

      </Routes>

    </Router>
  );
}