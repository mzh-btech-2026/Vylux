import "./Banner.css"
import Image from "../../../assets/banner.jpg"
import { Edit2, Trash } from "lucide-react";
import { useState } from "react";


export default function AdminBanner(){


    const banners =[

        {
            "id":1,
            "name":"Banner1",
            "img":Image,
            "url":"/",
            "active":true,
            "created":"12/11/2026 10.23pm",
            "updated":"13/12/2026 10.45pm"
        }
    ]

    const [showaddbutton,setshowaddbutton] =useState(false);
    const [showbanners,setshowbanners]=useState(true);
    const [image,setimage] = useState(null);

    return(

        <>

        {/* ------ Admin banner mobile view------- */}

        <div className="admin-banner-mobile-view">

            <div className="admin-banner">

              {/* ----------- banner - top ----------- */}
                <div className="a-b-top">

                    <p className="a-b-t-title">Banner Management</p>
                    <button className="a-b-t-button" onClick={()=>{setshowaddbutton(!showaddbutton); setshowbanners(false)}}>+ Add Button</button>

                </div>

                {/* ---------- add button from field ---------------- */}

               {
                showaddbutton && 
                 <div className="a-b-add-form">

                    <p className="a-b-add-text">Add Banner</p>

                    <div className="a-b-add-banner">
                        <p className="a-b-add-banner-text">Banner Image</p>
                        <div className="a-b-image-add-field">
                           <input 
                           type="file"
                           accept="image/*"
                           onChange={(e)=>setimage(e.target.files[0])}
                            placeholder="choose a imge file" className="a-b-add-banner-field"/>

                            <div className="a-b-image-display">
                                 {image && (
        <img
            src={URL.createObjectURL(image)}
            alt="Selected Banner"
            className="w-full h-full object-contain"
        />
    )}
                            </div>

                        </div>
                    </div>

                    <div className="a-b-add-banner">
                        <p className="a-b-add-banner-text">Title</p>
                        <input type="text" placeholder="Enter the Title" className="a-b-add-banner-text-field"/>
                    </div>

                    <div className="a-b-add-banner">
                        <p className="a-b-add-banner-text">Link(Optional)</p>
                        <input type="text" placeholder="Enter the url" className="a-b-add-banner-text-field"/>
                    </div>

                    <div className="a-b-add-banner">
                        <p className="a-b-add-banner-text">Status</p>
                        <div className="a-b-add-banner-status">
                            <input className="a-b-add-banner-status-check" type="checkbox" a-b-add-banner-status />
                            <p className="a-b-add-banner-status-text">Active</p>
                        </div>
                    </div>


                    <button className="a-b-save-button">Save Banner</button>
                    <button onClick={()=>setshowaddbutton(false)} className="a-b-cancel-button">Cancel</button>



                </div>
               }


               {/* ----------- banner - bottom ----------- */}

              <div className={showbanners ?"a-b-bottom":"hidden"}>

                {
                    banners.map((banner,index)=>{

                        return(

                            <div className="a-b-card" key={banner.id}>

                    <img src={banner.img} alt="" className="a-b-image"/>

                    <div className="a-b-c-r">

                        <p className="a-b-c-r-name">{banner.name}</p>

                        <div className="a-b-c-r-r-card">

                            <p className={banner.active ?"a-b-c-r-r-card-active-text" : "a-b-c-r-r-card-inactive-text"}>{banner.active ? "Active" : "Inactive"}</p>
                            <Edit2 className="a-b-c-r-r-card-edit-button"/>
                            <Trash className="a-b-c-r-r-card-delete-button" />


                        </div>

                        <p className="a-b-created-text">Created : {banner.created}</p>
                        <p className="a-b-updated-text">Updated : {banner.updated}</p>



                    </div>


                </div>
                        );
                    })
                }

            
              </div>



            </div>



        </div>



        {/* ----------------- desktop view -------------------------- */}

        <div className="desktop-admin-banner">

            <div className="d-a-banner">

                 {/* ----------- desktop banner - top ----------- */}
                <div className="d-a-b-top">

                    <p className="d-a-b-t-title">Banner Management</p>
                    <button className="d-a-b-t-button" onClick={()=>{ setshowaddbutton(true); setshowbanners(false)}}>+ Add Button</button>

                </div>

                {/* ---------- desktop add button from field ---------------- */}

               {
                showaddbutton &&
                 <div className="d-a-b-add-form">

                    <p className="d-a-b-add-text">Add Banner</p>

                    <div className="d-a-b-add-banner">
                        <p className="d-a-b-add-banner-text">Banner Image</p>
                        <div className="d-a-b-image-add-field">
                             <input 
                           type="file"
                           accept="image/*"
                           onChange={(e)=>setimage(e.target.files[0])}
                            placeholder="choose a imge file" className="d-a-b-add-banner-field"/>
                            
   <div className="d-a-b-image-display">
                                 {image && (
        <img
            src={URL.createObjectURL(image)}
            alt="Selected Banner"
            className="w-full h-full object-contain"
        />
    )}
                            </div>

                        </div>
                    </div>

                    <div className="d-a-b-add-banner">
                        <p className="d-a-b-add-banner-text">Title</p>
                        <input type="text" placeholder="Enter the Title" className="d-a-b-add-banner-text-field"/>
                    </div>

                    <div className="d-a-b-add-banner">
                        <p className="d-a-b-add-banner-text">Link(Optional)</p>
                        <input type="text" placeholder="Enter the url" className="d-a-b-add-banner-text-field"/>
                    </div>

                    <div className="d-a-b-add-banner">
                        <p className="d-a-b-add-banner-text">Status</p>
                        <div className="d-a-b-add-banner-status">
                            <input className="d-a-b-add-banner-status-check" type="checkbox" />
                            <p className="d-a-b-add-banner-status-text">Active</p>
                        </div>
                    </div>


                    <button className="d-a-b-save-button">Save Banner</button>
                    <button onClick={()=>{setshowaddbutton(false) ;setshowbanners(true)}} className="d-a-b-cancel-button">Cancel</button>



                </div>
               }



                    {/* ----------- desktop banner - bottom ----------- */}

              <div className={showbanners ? "d-a-b-bottom":"hidden"}>

                {
                    banners.map((banner,index)=>{

                        return(

                            <div className="d-a-b-card" key={banner.id}>

                    <img src={banner.img} alt="" className="d-a-b-image"/>

                    <div className="d-a-b-c-r">

                        <p className="d-a-b-c-r-name">{banner.name}</p>

                        <div className="d-a-b-c-r-r-card">

                            <p className={banner.active ?"d-a-b-c-r-r-card-active-text" : "d-a-b-c-r-r-card-inactive-text"}>{banner.active ? "Active" : "Inactive"}</p>
                            <Edit2 className="d-a-b-c-r-r-card-edit-button"/>
                            <Trash className="d-a-b-c-r-r-card-delete-button" />


                        </div>

                        <p className="d-a-b-created-text">Created : {banner.created}</p>
                        <p className="d-a-b-updated-text">Updated : {banner.updated}</p>



                    </div>


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