
import { useEffect, useState } from "react"
import switches from "../../assets/switch.jpg"
import wires from "../../assets/wires.jpg"
import bannerServices from "../../services/banner/bannerServices.jsx"

import "./Home.css"
import {
  Tag,
  Package,
  BadgeCheck,
  Truck,
  Headset
} from "lucide-react";


export default function Home() {

    //--------- banner get -----------------

    const [banners, setbanners] = useState([]);
    const [bannerimge, setbannerimage] = useState(0);

    const showbanners = async () => {

        try {

            const response = await bannerServices.getallBanners();

            // Show only active banners
            const activeBanners = response.data.filter(
                (banner) => banner.status === true
            );

            setbanners(activeBanners);
            setbannerimage(0);

        } catch (error) {

            console.error("Error fetching banners:", error);

        }

    };


    useEffect(() => {

        showbanners();

    }, []);


    // ----------- automatic banner slider -------------

    useEffect(() => {

        if (banners.length <= 1) return;

        const interval = setInterval(() => {

            setbannerimage((prev) => (prev + 1) % banners.length);

        }, 1000);

        return () => clearInterval(interval);

    }, [banners.length]);


    // ---------------- categories ----------------

    const categories = [
        {
            "name": "switches",
            "img": switches
        },
        {
            "name": "wires",
            "img": wires
        },
        {
            "name": "wires",
            "img": wires
        },
        {
            "name": "wires",
            "img": wires
        },
        {
            "name": "wires",
            "img": wires
        },
        {
            "name": "wires",
            "img": wires
        }
    ]


    // ---------------- popular products ----------------

    const papoular = [
        {
            "name": "switches",
            "img": switches
        },
        {
            "name": "wires",
            "img": wires
        },
        {
            "name": "wires",
            "img": wires
        },
        {
            "name": "wires",
            "img": wires
        },
        {
            "name": "wires",
            "img": wires
        },
        {
            "name": "wires",
            "img": wires
        }
    ]


    return (

        <>

        <div className="home-main-container">

            {/* ------- banner cont --------- */}

            <div className="home-banner-container">

                <div className="banner-slider">

                    {banners.length > 0 && (

                        <img
                            src={banners[bannerimge]?.bannerImage}
                            alt={banners[bannerimge]?.bannerName || "Banner"}
                        />

                    )}

                </div>

            </div>


            {/* --------- assurance card ------------------ */}

            <div className="home-assurance">

                {/* ----- top assurance ------------ */}

                <div className="top-assurance">

                   <div className="home-assurance-card">

                    <Tag className="as-logo" size={20}/>

                    <p className="as-title">
                        Wholesale Prices
                    </p>

                    <p className="as-subtitle">
                        Best Prices for Bulk Orders
                    </p>

                   </div>


                   <div className="home-assurance-card">

                    <Truck className="as-logo" size={20}/>

                    <p className="as-title">
                        Fast Delivery
                    </p>

                    <p className="as-subtitle">
                        Delivery Your Products in Door step and Fast
                    </p>

                   </div>

                </div>


                {/* ----- bottom assurance ------------ */}

                <div className="bottom-assurance">

                   <div className="home-assurance-card">

                    <BadgeCheck className="as-logo" size={20} />

                    <p className="as-title">
                        Quality Products
                    </p>

                    <p className="as-subtitle">
                        100% geniue and trusted products
                    </p>

                   </div>


                   <div className="home-assurance-card">

                    <Headset className="as-logo" size={20}/>

                    <p className="as-title">
                        24/7 Support
                    </p>

                    <p className="as-subtitle">
                        We are here to help yopu 24/7
                    </p>

                   </div>

                </div>

            </div>


            {/* ------------------ shop by category --------------------- */}

            <div className="shopby-cat">

                {/* ----------- top --------------- */}

                <div className="sbc-top">

                    <p className="sbc-title">
                        Shop by Category
                    </p>

                    <p className="sbc-viewall">
                        View all
                    </p>

                </div>


                {/* --------------- bottom --------------------- */}

                <div className="sbc-bottom">

                    {

                        categories.map((cat, index) => {

                            return (

                                <div className="sbc-cat-card" key={index}>

                                    <img
                                        className="sbc-cat-image"
                                        src={cat.img}
                                        alt={cat.name}
                                    />

                                    <p className="sbc-cat-name">
                                        {cat.name}
                                    </p>

                                </div>

                            );

                        })

                    }

                </div>

            </div>


            {/* --------------- popular products --------------------------- */}

            <div className="popular">

                {/* ----------- top --------------- */}

                <div className="popular-top">

                    <p className="popular-title">
                        Popular Products
                    </p>

                    <p className="popular-viewall">
                        View all
                    </p>

                </div>


                {/* --------------- bottom --------------------- */}

                <div className="popular-bottom">

                    {

                        categories.map((cat, index) => {

                            return (

                                <div className="popular-card" key={index}>

                                    <img
                                        className="popular-image"
                                        src={cat.img}
                                        alt={cat.name}
                                    />

                                    <p className="popular-name">
                                        {cat.name}
                                    </p>

                                </div>

                            );

                        })

                    }

                </div>

            </div>

        </div>


        {/* 
        -------------------------------------------
        ------------- desktop view ------------------
        -------------------------------------------
        */}


        <div className="desktop-home-container">


            {/* -------------- desktop banner cont ------------ */}

            <div className="d-home-banner">

                {banners.length > 0 && (

                    <img
                        src={banners[bannerimge]?.bannerImage}
                        alt={banners[bannerimge]?.bannerName || "Banner"}
                        className="d-home-banner-image"
                    />

                )}

            </div>


            {/* --------------- shop by category ----------------------- */}

            <div className="d-ho-shopbycat">


                {/* --------------- top text --------------- */}

                <div className="d-ho-sbc-top">

                    <p className="d-ho-sbc-t-text">
                        Shop by Category
                    </p>

                    <p className="d-ho-sbc-t-viewall">
                        View all
                    </p>

                </div>


                {/* ----------------- bottom shopbycategory card ------------ */}

                <div className="d-ho-sbc-bottom">

                    {

                        categories.map((cat, index) => {

                            return (

                                <div className="d-ho-sbc-b-card" key={index}>

                                    <img
                                        src={cat.img}
                                        alt={cat.name}
                                        className="d-ho-sbc-b-image"
                                    />

                                    <p className="d-ho-sbc-b-text">
                                        {cat.name}
                                    </p>

                                </div>

                            );

                        })

                    }

                </div>

            </div>


            {/* ------------------- popular products ------------------------- */}

            <div className="d-ho-popular">


                {/* ----------- popular top --------------------- */}

                <div className="d-ho-p-top">

                    <div className="d-ho-p-t-t">

                        <p className="d-ho-p-t-text">
                            Popular Products
                        </p>

                        <p className="d-ho-p-t-viewall">
                            View all
                        </p>

                    </div>

                </div>


                {/* ------------- popular bottom ------------------- */}

                <div className="d-ho-p-bottom">

                    {

                        categories.map((cat, index) => {

                            return (

                                <div className="d-ho-p-b-card" key={index}>

                                    <img
                                        src={cat.img}
                                        alt={cat.name}
                                        className="d-ho-p-b-image"
                                    />

                                    <p className="d-ho-p-b-text">
                                        {cat.name}
                                    </p>

                                </div>

                            );

                        })

                    }

                </div>

            </div>

        </div>

        </>

    );

}
