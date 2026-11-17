import { XCircle, Menu, UserCircle } from "lucide-react";
import "./Sidebar.css"
import { useState } from "react";

import {
  LayoutDashboard,
  Images,
  Grid2X2,
  Package,
  ShoppingBag,
  Users,
  ChartNoAxesCombined,
  Settings,
  LogOut, UserRound, ChevronDown
} from "lucide-react";


export default function Sidebar(){

    const [showmenu,setshowmenu] = useState(false);

    return(
        <>
 
       {/* -------------- mobile -view------------------- */}

       <div className="admin-mobile-sidebar">


         <div className="sidebar">

            <div className="s-l">
                <Menu className="s-menu-button" onClick={()=>setshowmenu(true)}/>
            </div>


            <div className="s-m">
                <p className="s-m-title">VYLUX</p>
                <p className="s-m-subtitle1">Electricals</p>
                <p className="s-m-subtitle2">Al-Anam Groups</p>
            </div>

            <div className="s-r">
                <UserCircle className="s-r-logo"/>
                <p className="s-r-text">Admin Pannel</p>

            </div>

        </div>

        {/* --------- left side bar------------- */}

        {
            showmenu && 
            <div className="l-sidebar">

            {/* -------------left side top ----------------- */}
            <div className="l-top">

                <XCircle className="l-t-l-logo" onClick={()=>setshowmenu(false)}/>
                <div className="l-t-r">
                <p className="l-t-r-title">VYLUX</p>
                <p className="l-t-r-subtitle1">Electricals</p>
                <p className="l-t-r-subtitle2">Al-Anam Groups</p>
            </div>

            </div>

            {/* ---------------- left side bottom ---------------- */}

            <div className="l-bottom">

                <div className="l-b-card">
                       
                       <LayoutDashboard className="l-b-icon"/>
                       <p className="l-b-icon-name">Dashboard</p>
                </div>

                
                <div className="l-b-card">
                       
                       <Images className="l-b-icon"/>
                       <p className="l-b-icon-name">Banners</p>
                </div>

                
                <div className="l-b-card">
                       
                       <Grid2X2 className="l-b-icon"/>
                       <p className="l-b-icon-name">Categories</p>
                </div>

                
                <div className="l-b-card">
                       
                       <Package className="l-b-icon"/>
                       <p className="l-b-icon-name">Products</p>
                </div>

                
                <div className="l-b-card">
                       
                       <ShoppingBag className="l-b-icon"/>
                       <p className="l-b-icon-name">Orders</p>
                </div>

                
                <div className="l-b-card">
                       
                       <Users className="l-b-icon"/>
                       <p className="l-b-icon-name">Users</p>
                </div>

                
                <div className="l-b-card">
                       
                       <ChartNoAxesCombined className="l-b-icon"/>
                       <p className="l-b-icon-name">Reports</p>
                </div>

                
                <div className="l-b-card">
                       
                       <Settings className="l-b-icon"/>
                       <p className="l-b-icon-name">Setiings</p>
                </div>

                
                <div className="l-b-card">
                       
                       <LogOut className="l-b-icon"/>
                       <p className="l-b-icon-name">Logout</p>
                </div>

            </div>



        </div>
        }
        
       </div>
        
        

        {/* ---------------------------------------------
--------------desktop view ------------------
--------------------------------------------- */
         }

         <div className="admin-desktop-sidebar">

           {/* ----------- top bar -------------- */}
            <div className="d-a-s-top">

                <p className="d-a-s-t-title">VYLUX</p>
                <p className="d-a-s-t-subtitle1">Electricals</p>
                <p className="d-a-s-t-subtitle2">Al-Anam Groups</p>

            </div>

            {/* --------------------- bottom bar ----------- */}

            <div className="d-a-s-bottom">

                 <div className="d-a-s-b-card">
                       
                       <LayoutDashboard className="d-a-s-b-icon"/>
                       <p className="d-a-s-b-icon-name">Dashboard</p>
                </div>

                <div className="d-a-s-b-card">
                       
                       <Images className="d-a-s-b-icon"/>
                       <p className="d-a-s-b-icon-name">Banners</p>
                </div>

                <div className="d-a-s-b-card">
                       
                       <Grid2X2 className="d-a-s-b-icon"/>
                       <p className="d-a-s-b-icon-name">Categories</p>
                </div>

                <div className="d-a-s-b-card">
                       
                       <Package className="d-a-s-b-icon"/>
                       <p className="d-a-s-b-icon-name">Products</p>
                </div>

                <div className="d-a-s-b-card">
                       
                       <ShoppingBag className="d-a-s-b-icon"/>
                       <p className="d-a-s-b-icon-name">Orders</p>
                </div>

                <div className="d-a-s-b-card">
                       
                       <Users className="d-a-s-b-icon"/>
                       <p className="d-a-s-b-icon-name">Users</p>
                </div>

                <div className="d-a-s-b-card">
                       
                       <ChartNoAxesCombined className="d-a-s-b-icon"/>
                       <p className="d-a-s-b-icon-name">Reports</p>
                </div>

                <div className="d-a-s-b-card">
                       
                       <Settings className="d-a-s-b-icon"/>
                       <p className="d-a-s-b-icon-name">Settings</p>
                </div>

                <div className="d-a-s-b-card">
                       
                       <LogOut className="d-a-s-b-icon"/>
                       <p className="d-a-s-b-icon-name">Logout</p>
                </div>

                
            </div>

            {/* -------------- admin login bar ---------------- */}

                 <div className="d-a-s-login">

            <div className="d-a-s-profile-icon">
                <UserRound size={24} />
            </div>

            <div className="d-a-s-profile-info">

                <p className="d-a-s-profile-name">
                    Admin
                </p>

                <select
                    className="d-a-s-profile-select"
                    defaultValue="admin"
                   
                >
                    <option value="admin">Admin Panel</option>
                    <option value="user">User Website</option>
                </select>

            </div>


        </div>
           

         </div>
        
        
        </>
    );
}