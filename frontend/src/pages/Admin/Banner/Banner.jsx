import "./Banner.css"
import Image from "../../../assets/banner.jpg"
import { Edit2, Trash } from "lucide-react";
import { useEffect, useState } from "react";
import bannerServices from "../../../services/banner/bannerServices";
import axios from "axios";


export default function AdminBanner(){

    const [banners, setBanners] = useState([]);


  

    // ----------------- all const variables ------------------


    const [showaddbutton,setshowaddbutton] =useState(false);
    const [showeditbutton,setshoweditbutton] = useState(false);
    const [showbanners,setshowbanners]=useState(true);
    

    const [bannerName,setbannerName] = useState("");
    const [bannerUrl,setbannerUrl] = useState("");
    const [bannerImage,setbannerImage] = useState(null);
    const [bannerStatus,setbannerStatus] = useState(false);

    const [selectedBannerId, setSelectedBannerId] = useState(null);
    const [existingImage, setExistingImage] = useState("");

    const [isUpdating, setIsUpdating] = useState(false);

   //------------------ api function ----------------------

   //---------------- create banner -------------------------
   const handlesavebutton = async () =>{

    if(!bannerName.trim()){
        alert("please enetr the banner name");
        return ;
    }

     if(!bannerUrl.trim()){
        alert("please enter the url");
        return ;
    }

     if(!bannerImage){
        alert("please select the banner image");
        return ;
    }

    const formData = new FormData();

    formData.append("bannerName",bannerName);
    formData.append("url",bannerUrl)
    formData.append("bannerImage",bannerImage);
    formData.append("status",bannerStatus);
    
    try{

        const response = await bannerServices.createBanner(formData)
        
        await fetchData();

        alert("Banner created succesfully");

         // Clear form
        setbannerName("");
        setbannerUrl("");
        setbannerImage("");
        setbannerStatus(true);

        // Close add form
        setshowaddbutton(false);
        setshowbanners(true);

    }catch(error){

        
        alert("Failed to create banner");

        console.error(error);

    }

   }


   // ------------ fetch data -------------------
   const fetchData = async ()=>{

    try{

        const response = await bannerServices.getallBanners();

        setBanners(response.data);


    }catch(error){

         alert("error in loading ....");

        console.error(error);


    }
   }


   //-------------- delete a banner -----------------

   const deletBanner = async (id) => {

    const confirmDelete = window.confirm(
        "Are you sure you want to delete this banner?"
    );

    if (!confirmDelete) return;

    try {

        await bannerServices.deleteBanner(id);

        alert("Banner deleted successfully");

        // Refresh banner list
        await fetchData();

    } catch (error) {

        alert("Error deleting banner");

        console.error(error);
    }
};


//--------------- edit a banner -----------------
const editBanner = async () => {

    if (isUpdating) return;

    if (!selectedBannerId) {
        alert("Banner ID not found");
        return;
    }

    const formData = new FormData();

    // Send fields that have been changed
    formData.append("bannerName", bannerName);
    formData.append("url", bannerUrl);
    formData.append("status", bannerStatus);

    // Image is optional
    if (bannerImage) {
        formData.append("bannerImage", bannerImage);
    }

    try {

        setIsUpdating(true);

        await bannerServices.updateBanner(selectedBannerId, formData);

        await fetchData();

        alert("Banner updated successfully");

        setbannerName("");
        setbannerUrl("");
        setbannerImage(null);
        setbannerStatus(false);
        setExistingImage("");
        setSelectedBannerId(null);

        setshoweditbutton(false);
        setshowbanners(true);

    } catch (error) {

        alert("Failed to update banner");
        console.error(error);

    } finally {
        setIsUpdating(false);
    }
};


  // -------------- all functions -------------------------

    const handeladdbutton =()=>{

        setshowaddbutton(true); 
        setshowbanners(false);
        setshoweditbutton(false)

    }

   //--------------- edit a banner -----------------

const handleeditbutton = (banner) => {

    setSelectedBannerId(banner.id);

    setbannerName(banner.bannerName || "");
    setbannerUrl(banner.url || "");
    setbannerStatus(banner.status ?? false);

    // Existing Cloudinary image
    setExistingImage(banner.bannerImage);

    // No new image selected yet
    setbannerImage(null);

    setshoweditbutton(true);
    setshowaddbutton(false);
    setshowbanners(false);
};

    const formatDate = (date) => {
    if (!date) return "N/A";

    return new Date(date).toLocaleString("en-IN", {
        day: "2-digit",
        month: "short",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
        hour12: true
    });
};


    // ------------------------- useEffect ----------------------

  useEffect(()=>{

    fetchData();
  },[])
   

 
    return(

        <>

        {/* ------ Admin banner mobile view------- */}

        <div className="admin-banner-mobile-view">

            <div className="admin-banner">

              {/* ----------- banner - top ----------- */}
                <div className="a-b-top">

                    <p className="a-b-t-title">Banner Management</p>
                    { showeditbutton ? " ":  
                     <button className="a-b-t-button" 
                     disabled={banners.length>=3}
                    onClick={handeladdbutton}>+ Add Button</button>
}

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
                           onChange={(e)=>setbannerImage(e.target.files[0])}
                            placeholder="choose a imge file" className="a-b-add-banner-field"/>

                            <div className="a-b-image-display">
                                 {bannerImage && (
        <img
            src={URL.createObjectURL(bannerImage)}
            alt="Selected Banner"
            className="w-full h-full object-contain"
        />
    )}

                   
   </div>

   

                        </div>
                    </div>

                    <div className="a-b-add-banner">
                        <p className="a-b-add-banner-text">Title</p>
                        <input type="text" placeholder="Enter the Title" className="a-b-add-banner-text-field" onChange={(e)=>setbannerName(e.target.value)}/>
                    </div>

                    <div className="a-b-add-banner">
                        <p className="a-b-add-banner-text">Link(Optional)</p>
                        <input type="text" placeholder="Enter the url" className="a-b-add-banner-text-field" onChange={(e)=>setbannerUrl(e.target.value)}/>
                    </div>

                    <div className="a-b-add-banner">
                        <p className="a-b-add-banner-text">Status</p>
                        <div className="a-b-add-banner-status">
                            <input className="a-b-add-banner-status-check" type="checkbox" a-b-add-banner-status checked={bannerStatus} onChange={(e)=>setbannerStatus(e.target.checked)}/>
                            <p className="a-b-add-banner-status-text">Active</p>
                        </div>
                    </div>


                    <button className="a-b-save-button" onClick={handlesavebutton}>Save Banner</button>
                    <button onClick={()=>{setshowaddbutton(false) ; setshowbanners(true)}} className="a-b-cancel-button">Cancel</button>



                </div>
               }


                 {/* ---------- edit button from field ---------------- */}

               {
                showeditbutton && 
                 <div className="a-b-add-form">

                    <p className="a-b-add-text">Edit Banner</p>

                    <div className="a-b-add-banner">
                        <p className="a-b-add-banner-text">Banner Image</p>
                        <div className="a-b-image-add-field">
                           <input 
                           type="file"
                           accept="image/*"
                           onChange={(e)=>setbannerImage(e.target.files[0])}
                            placeholder="choose a imge file" className="a-b-add-banner-field"/>

                            <div className="a-b-image-display">
                               {bannerImage ? (
    <img
        src={URL.createObjectURL(bannerImage)}
        alt="Banner Preview"
        className="w-full h-full object-contain"
    />
) : existingImage ? (
    <img
        src={existingImage}
        alt="Existing Banner"
        className="w-full h-full object-contain"
    />
) : null}

                   
   </div>

   

                        </div>
                    </div>

                    <div className="a-b-add-banner">
                        <p className="a-b-add-banner-text">Title</p>
                        <input type="text" value={bannerName} placeholder="Enter the Title" className="a-b-add-banner-text-field" onChange={(e)=>setbannerName(e.target.value)}/>
                    </div>

                    <div className="a-b-add-banner">
                        <p className="a-b-add-banner-text">Link(Optional)</p>
                        <input type="text" placeholder="Enter the url" className="a-b-add-banner-text-field" value={bannerUrl} onChange={(e)=>setbannerUrl(e.target.value)}/>
                    </div>

                    <div className="a-b-add-banner">
                        <p className="a-b-add-banner-text">Status</p>
                        <div className="a-b-add-banner-status">
                            <input className="a-b-add-banner-status-check" type="checkbox" checked={bannerStatus} a-b-add-banner-status onChange={(e)=>setbannerStatus(e.target.checked)}/>
                            <p className="a-b-add-banner-status-text">Active</p>
                        </div>
                    </div>


                  <button
    className="a-b-save-button"
    onClick={editBanner}
    disabled={isUpdating}
>
    {isUpdating ? "Updating..." : "Edit Banner"}
</button>
                    <button onClick={()=>{setshoweditbutton(false);setshowbanners(true)}} className="a-b-cancel-button">Cancel</button>



                </div>
               }


               {/* ----------- banner - bottom ----------- */}

              <div className={showbanners ?"a-b-bottom":"hidden"}>

                {
                    banners.map((banner)=>{

                        return(

                            <div className="a-b-card" key={banner.id}>

                    <img src={banner.bannerImage} alt={bannerName} className="a-b-image"/>

                    <div className="a-b-c-r">

                        <p className="a-b-c-r-name">{banner.bannerName}</p>

                        <div className="a-b-c-r-r-card">

                            <p className={banner.status ?"a-b-c-r-r-card-active-text" : "a-b-c-r-r-card-inactive-text"}>{banner.status ? "Active" : "Inactive"}</p>
                            <Edit2
    className="a-b-c-r-r-card-edit-button"
    onClick={() => handleeditbutton(banner)}
/>
                            <Trash className="a-b-c-r-r-card-delete-button" onClick={()=>deletBanner(banner.id)}/>


                        </div>

                        <p className="a-b-created-text">Created : {formatDate(banner.createdAt)}</p>
                        <p className="a-b-updated-text">Updated : {formatDate(banner.updatedAt)}</p>



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
                   { showeditbutton ? " ": <button className="d-a-b-t-button" 
                   disabled={banners.length>=3}
                   onClick={handeladdbutton}>+ Add Button</button>
}

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
                           onChange={(e)=>setbannerImage(e.target.files[0])}
                            placeholder="choose a imge file" className="d-a-b-add-banner-field"/>
                            
   <div className="d-a-b-image-display">
                                 {bannerImage && (
        <img
            src={URL.createObjectURL(bannerImage)}
            alt="Selected Banner"
            className="w-full h-full object-contain"
        />
    )}
                            </div>

                        </div>
                    </div>

                    <div className="d-a-b-add-banner">
                        <p className="d-a-b-add-banner-text">Title</p>
                        <input type="text" placeholder="Enter the Title" className="d-a-b-add-banner-text-field" onChange={(e)=>setbannerName(e.target.value)}/>
                    </div>

                    <div className="d-a-b-add-banner">
                        <p className="d-a-b-add-banner-text">Link(Optional)</p>
                        <input type="text" placeholder="Enter the url" className="d-a-b-add-banner-text-field" onChange={(e)=>setbannerUrl(e.target.value)}/>
                    </div>

                    <div className="d-a-b-add-banner">
                        <p className="d-a-b-add-banner-text">Status</p>
                        <div className="d-a-b-add-banner-status">
                            <input className="d-a-b-add-banner-status-check" type="checkbox" checked={bannerStatus} onChange={(e)=>setbannerStatus(e.target.checked)}/>
                            <p className="d-a-b-add-banner-status-text">Active</p>
                        </div>
                    </div>


                    <button className="d-a-b-save-button" onClick={handlesavebutton}>Save Banner</button>
                    <button onClick={()=>{setshowaddbutton(false) ;setshowbanners(true)}} className="d-a-b-cancel-button">Cancel</button>



                </div>
               }


                 {/* ---------- desktop edit button from field ---------------- */}

               {
                showeditbutton &&
                 <div className="d-a-b-add-form">

                    <p className="d-a-b-add-text">Edit Banner</p>

                    <div className="d-a-b-add-banner">
                        <p className="d-a-b-add-banner-text">Banner Image</p>
                        <div className="d-a-b-image-add-field">
                             <input 
                           type="file"
                           accept="image/*"
                           onChange={(e)=>setbannerImage(e.target.files[0])}
                            placeholder="choose a imge file" className="d-a-b-add-banner-field"/>
                            
   <div className="d-a-b-image-display">
                                 <div className="d-a-b-image-display">

    {bannerImage ? (
        <img
            src={URL.createObjectURL(bannerImage)}
            alt="New Banner"
            className="w-full h-full object-contain"
        />
    ) : existingImage ? (
        <img
            src={existingImage}
            alt="Existing Banner"
            className="w-full h-full object-contain"
        />
    ) : null}

</div>
                            </div>

                        </div>
                    </div>

                    <div className="d-a-b-add-banner">
                        <p className="d-a-b-add-banner-text">Title</p>
                        <input type="text" placeholder="Enter the Title" value={bannerName} className="d-a-b-add-banner-text-field" onChange={(e)=>setbannerName(e.target.value)}/>
                    </div>

                    <div className="d-a-b-add-banner">
                        <p className="d-a-b-add-banner-text">Link(Optional)</p>
                        <input type="text" placeholder="Enter the url" value={bannerUrl} className="d-a-b-add-banner-text-field" onChange={(e)=>setbannerUrl(e.target.value)}/>
                    </div>

                    <div className="d-a-b-add-banner">
                        <p className="d-a-b-add-banner-text">Status</p>
                        <div className="d-a-b-add-banner-status">
                            <input className="d-a-b-add-banner-status-check" type="checkbox" value={bannerStatus} checked={bannerStatus} onChange={(e)=>setbannerStatus(e.target.checked)}/>
                            <p className="d-a-b-add-banner-status-text">Active</p>
                        </div>
                    </div>


                     <button
    className="d-a-b-save-button"
    onClick={editBanner}
    disabled={isUpdating}
>
    {isUpdating ? "Updating..." : "Edit Banner"}
</button>
                        <button onClick={()=>{setshowbanners(true);setshoweditbutton(false)}} className="d-a-b-cancel-button">Cancel</button>



                </div>
               }




                    {/* ----------- desktop banner - bottom ----------- */}

              <div className={showbanners ? "d-a-b-bottom":"hidden"}>

                {
                    banners.map((banner,index)=>{

                        return(

                            <div className="d-a-b-card" key={banner.id}>

                    <img src={banner.bannerImage} alt={bannerName} className="d-a-b-image"/>

                    <div className="d-a-b-c-r">

                        <p className="d-a-b-c-r-name">{banner.bannerName}</p>

                        <div className="d-a-b-c-r-r-card">

                            <p className={banner.status ?"d-a-b-c-r-r-card-active-text" : "d-a-b-c-r-r-card-inactive-text"}>{banner.status ? "Active" : "Inactive"}</p>
                           <Edit2
    className="d-a-b-c-r-r-card-edit-button"
    onClick={() => handleeditbutton(banner)}
/>
                            <Trash className="d-a-b-c-r-r-card-delete-button" onClick={()=>deletBanner(banner.id)} />


                        </div>

                        <p className="d-a-b-created-text">Created : {formatDate(banner.createdAt)}</p>
                        <p className="d-a-b-updated-text">Updated : {formatDate(banner.updatedAt)}</p>



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