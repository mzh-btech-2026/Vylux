import "./Footer.css"
import {
  House,
  LayoutGrid,
  Package,
  Phone,
  Info
} from "lucide-react";


import {
  BadgeCheck,
  Tags,
  ShieldCheck,
  Truck
} from "lucide-react";


export default function Footer(){

    return(
        <>
        <div className="footer-main-container">


            <div className="logo">
                <House size={20} className="icon"/>
                <p className="icon-text">Home</p>
            </div>
            
              <div className="logo">
                <LayoutGrid size={20} className="icon"/>
                <p className="icon-text">Categories</p>
            </div>

              <div className="logo">
                <Package size={20} className="icon"/>
                <p className="icon-text">My Orders</p>
            </div>

              <div className="logo">
                <Info size={20} className="icon"/>
                <p className="icon-text">About Us</p>
            </div>

        </div>


        {/* -----------------------------------------------
        --------------- desktop view ------------------
        ----------------------------------------------- */}

        <div className="footer-desktop-container">


          {/* ---------- footer top ------------ */}
          <div className="d-f-top">

            <div className="d-f-t-card">
              <BadgeCheck className="d-f-t-logo"/>
              <p className="d-f-t-text">100% Genuine Products</p>
            </div>

            <div className="d-f-t-card">
              <Tags className="d-f-t-logo"/>
              <p className="d-f-t-text">Best Wholesale Prices</p>
            </div>

            <div className="d-f-t-card">
              <ShieldCheck className="d-f-t-logo"/>
              <p className="d-f-t-text">Secure & Safe Shopping</p>
            </div>

            <div className="d-f-t-card">
              <Truck className="d-f-t-logo"/>
              <p className="d-f-t-text">On-Time Delivery</p>
            </div>

          </div>

          {/* ------------ bottom footer --------- */}
           
           <div className="d-f-b">
             <p className="d-f-b-text">&copy; 2026 VYLUX Electricals. All Rights Reserved.</p>
         </div>



        </div>
        
        </>
    );
}