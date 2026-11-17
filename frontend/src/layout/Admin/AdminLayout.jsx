import { Outlet } from "react-router-dom";

import Sidebar from "../../components/Admin/Sidebar/Sidebar.jsx";

import "./AdminLayout.css";

export default function AdminLayout() {

    return (
        <div className="admin-layout">

            {/* ADMIN SIDEBAR */}
            <Sidebar />

            {/* ADMIN PAGE CONTENT */}
            <main className="admin-content">
                <Outlet />
            </main>

        </div>
    );
}