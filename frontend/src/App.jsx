
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import Home from "./pages/Home.jsx/Home";

import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";

import "./App.css";

export default function App() {

  return (
    <Router>

      {/* MOBILE VIEW */}
      <div className="app-main-container">

        <Header />

        <main className="app-main-content">
          <Routes>
            <Route path="/" element={<Home />} />
          </Routes>
        </main>

        <Footer />

      </div>


      {/* DESKTOP VIEW */}
      <div className="desktop-view">

        <Header />

        <main className="desktop-main-content">
          <Routes>
            <Route path="/" element={<Home />} />
          </Routes>
        </main>

        <Footer />

      </div>

    </Router>
  );
}
