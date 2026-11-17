import { Outlet } from "react-router-dom";

import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";

import "./UserLayout.css";

export default function UserLayout() {
  return (
    <>
      {/* MOBILE VIEW */}
      <div className="app-main-container">

        <Header />

        <main className="app-main-content">
          <Outlet />
        </main>

        <Footer />

      </div>

      {/* DESKTOP VIEW */}
      <div className="desktop-view">

        <Header />

        <main className="desktop-main-content">
          <Outlet />
        </main>

        <Footer />

      </div>
    </>
  );
}