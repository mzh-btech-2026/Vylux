import { CircleUserRound,Phone,Search,ShoppingCart, User2Icon} from "lucide-react";
import "./Header.css"




export default function Header() {

  return (
   
      <>

      <div className="main-container">

        {/* ---------------- top ------------------ */}
        <div className="top">

          <CircleUserRound size={35} className="profile-button"/>

          <div className="top-middle">

            <p className="title">VYLUX</p>
            <p className="subtitle">Electricals</p>

          </div>

          

          <div className="top-right">

          <Phone size={25} className="phone-logo"/>

          <div className="h-cart-field">

            <ShoppingCart size={25} className="cart-logo"/>
            <p className="h-cart-number">6</p>

          </div>

          </div>


        </div>

        {/* ----------- bottom search bar -------------- */}
        
        <div className="bottom">

          <input type="text" placeholder="Search Products" className="search-bar" />
          <Search className="search-logo"/>

        </div>

      </div>



      {/* ---------------------------------------------------
-------------- desktop view -----------------------
---------------------------------------------------   */}

      <div className="desktop-container">

        <div className="desktop-header">


           {/* ----------- left ----------- */}
          <div className="d-h-left">

            <p className="d-h-l-title">VYLUX</p>
            <p className="d-h-l-subtitle">Electricals</p>
            <p className="d-h-l-owner">AL-Anam Groups</p>


          </div>

          {/* --------- middle ------------------ */}
          <div className="d-h-m">
                 
                 <input type="text" placeholder="Search Products..." className="d-h-m-search"/>
                 <Search className="d-h-m-search-logo"/>

          </div>

          {/* ------------ right--------------------------- */}

           <div className="d-h-r">
             
             <div className="d-h-r-l-l">
              <Phone className="d-h-r-l-logo"/>
              <div className="d-h-r-l-r">
                <p className="d-h-r-l-r-text">Call Us</p>
                <p className="d-h-r-l-r-text">+91 9790051137</p>
              </div>

             </div>

             <div className="d-h-r-r">
                     <ShoppingCart className="d-h-r-cart" /> 
                     <p className="d-h-r-b-text">6</p>

             </div>


           </div>


        </div>


        {/* ------------ nav bar ----------------- */}

        <div className="d-h-navbar">

          <p className="d-h-nav-text">HOME</p>
          <p className="d-h-nav-text">CATEGORIES</p>
          <p className="d-h-nav-text">PRODUCTS</p>
          <p className="d-h-nav-text">ABOUT US</p>
          <p className="d-h-nav-text">MY ORDERS</p>
          <p className="d-h-nav-text">CONTACT US</p>

        </div>
















      </div>
      </>
  );
}