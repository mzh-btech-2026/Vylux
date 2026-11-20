import { useEffect, useState } from "react";
import "./Category.css"
import { Edit2, Trash } from "lucide-react";
import cat from "../../../assets/banner.jpg"
import DesktopCategory from "./DesktopCategory";
import categoryService from "../../../services/category/categoryService";
export default function Category(){

   const [categories,setcategories] = useState([]);

    // ---------- pagination ----------

   const [currentPage, setcurrentPage] = useState(0);
   const [totalPages, settotalPages] = useState(0);
   const [editId, seteditId] = useState(null);
   const [deleteId, setdeletetId] = useState(null);

   const itemsPerPage = 5;


    // ------------ variables ------------
    const [showaddbar,setshowaddbar] = useState(false);
    const [catimage,setcatimage] = useState(null);
    const [existcatimage,setexistcatimage] = useState(null);
    const [catname,setcatname] = useState("");
    const [catslug,setcatslug] = useState(" ");
    const [ispopular,setispopular] = useState(false);
    const [status,setstatus] = useState(true);

    const [showcard,setshowcard] = useState(true);
    const [showeditbar,setshoweditbar] = useState(false);

    //------------- functions-----------------

    //---------------add menu button --------------
    const handleaddmenu = () =>{

        setshowaddbar(true);
        setshowcard(false);
        setshoweditbar(false);
    }
   
    //---------------- edit menu button ---------------
   const handleeditmenu = (category) => {

    seteditId(category.id);

    setexistcatimage(category.categoryImage);
    setcatimage(null);


    setcatname(category.categoryName);
    setcatslug(category.categorySlug);
    setispopular(category.categoryPopular);
    setstatus(category.categoryStatus);

    setshoweditbar(true);
    setshowaddbar(false);
    setshowcard(false);
};

// ---------------------- save button ------------------
    const handlesavebutton = async () => {

    if (!catimage) {
        alert("Category image is important");
        return;
    }

    if (!catname.trim() || !catslug.trim()) {
        alert("Category name and slug are required");
        return;
    }

    const formData = new FormData();

    formData.append("categoryImage", catimage);
    formData.append("categoryName", catname);
    formData.append("categorySlug", catslug);
    formData.append("categoryStatus", status);
    formData.append("categoryPopular", ispopular);

    try {

        const response = await categoryService.createCategory(formData);

        console.log("API RESPONSE:", response.data);

        await getall();

        alert("Successfully saved");

        setshowaddbar(false);
        setshowcard(true);

        setcatimage(null);
        setcatname("");
        setcatslug("");
        setispopular(false);
        setstatus(true);

        setcurrentPage(0);

    } catch (error) {

        alert("Failed to create category");
        console.error(error);

    }
};

//--------------- get all catgeory ---------------

const getall = async () => {
    try {
        const response = await categoryService.getall(
            currentPage
          
        );

        console.log("FULL RESPONSE:", response);
        console.log("RESPONSE DATA:", response.data);
        console.log("CONTENT:", response.data.content);

        setcategories(
            Array.isArray(response.data.content)
                ? response.data.content
                : []
        );

        settotalPages(response.data.totalPages || 0);

    } catch (error) {
        console.error("Failed to fetch category:", error);
    }
};


//-------------- handle edit button --------------------

   const handleeditbutton = async () => {

    if (!catname.trim() || !catslug.trim()) {
        alert("Category name and slug are required");
        return;
    }

    const formData = new FormData();

    if (catimage) {
        formData.append("categoryImage", catimage);
    }

    formData.append("categoryName", catname);
    formData.append("categorySlug", catslug);
    formData.append("categoryStatus", status);
    formData.append("categoryPopular", ispopular);

    try {

        const response = await categoryService.updatecategory(
            editId,
            formData
        );

        console.log("UPDATE RESPONSE:", response.data);

        alert("Successfully updated");

        setshoweditbar(false);
        setshowcard(true);

        setcatimage(null);
        setexistcatimage(null);
        setcatname("");
        setcatslug("");
        setispopular(false);
        setstatus(true);
        seteditId(null);

        await getall();

    } catch (error) {

        console.error("UPDATE ERROR:", error);

        alert("Failed to update category");

    }
};

    //-------------- handle delete button -----------------------
const handledeletebutton = async (id) => {

     const confirmDelete = window.confirm(
        "Are you sure you want to delete this category?"
    );

    if (!confirmDelete) {
        return;
    }

    try {

        await categoryService.deleteCategory(id);

        await getall();

        alert("Successfully deleted");

    } catch (error) {

        console.error("Delete error:", error);

        alert("Failed to delete");

    }
};


//------------- date format ---------------

const formatDate = (date) => {

    if (!date) return "Date not available";

    return new Date(date).toLocaleString("en-GB", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
        hour12: true
    });

};



    

    // ------------------ useEffect ------------------

    useEffect(()=>{

        getall();

    },[currentPage])

 


    return(

        <>

        {/* -------------------- mobile view ---------------------- */}
        <div className="category-mobile-view">


         {/* --------------- top bar ----------------- */}
          <div className="a-c-top">

            <p className="a-c-t-title">
                Category
            </p>

            {
                !showeditbar && 
            <button className="a-c-t-button" onClick={handleaddmenu}>+Add Category</button>

            }
 
          </div>

          {/* ------------- add bar ---------------------- */}

          {showaddbar && 
          
          <div className="a-c-addbar">

            <h1 className="a-c-addbar-title">ADD CATEGORY</h1>


          {/* -------------- add image ------------ */}
            <div className="a-c-addbar-card">
                <p className="a-c-addbar-label">Image</p>
                <input type="file" className="a-c-addbar-file" onChange={(e)=>setcatimage(e.target.files[0])}/>
                <div className="a-c-addbar-image-preview">
                    {
                        catimage ? <img src={URL.createObjectURL(catimage)} alt={catname} className="a-c-addbar-file-image" /> : ""
                    }
                </div>

            </div>

            {/* -------------- add name ------------ */}


             <div className="a-c-addbar-card">
                <p className="a-c-addbar-label">Category Name</p>
                <input type="text" placeholder="Enter the Category name"
                className="a-c-addbar-input" onChange={(e)=>setcatname(e.target.value)}/>
                
            </div>

        {/* -------------- add slug ------------ */}


            <div className="a-c-addbar-card">
                <p className="a-c-addbar-label">Slug name</p>
                <input type="text" placeholder="Enter the slug name"
                 className="a-c-addbar-input" onChange={(e)=>setcatslug(e.target.value)}/>
                
            </div>


            {/* -------------- add popular ------------ */}


            <div className="a-c-addbar-card">
                <p className="a-c-addbar-label">Popular</p>
                <input type="checkbox"
                 className="a-c-addbar-checkbox" 
                 checked={ispopular}
                 onChange={(e)=>setispopular(e.target.checked)}/>
                
            </div>

            {/* -------------- add status------------ */}


            <div className="a-c-addbar-card">
                <p className="a-c-addbar-label">Status</p>
                <input type="checkbox" 
                checked={status}
                className="a-c-addbar-checkbox" onChange={(e)=>setstatus(e.target.checked)}/>
                
            </div>

            {/* ------------ buttons ---------------------- */}

            <div className="a-c-addbar-buttons">
                <button className="a-c-addbar-add-button" onClick={handlesavebutton}>Add</button>
                <button className="a-c-addbar-cancel-button" onClick={()=>{setshowaddbar(false);setshowcard(true)}}>Cancel</button>
            </div>

            </div>
          }


           {/* --------------------- edit bar ---------------------------- */}

           {

            showeditbar &&
              <div className="a-c-addbar">

            <h1 className="a-c-addbar-title">EDIT CATEGORY</h1>


          {/* -------------- edit image ------------ */}
            <div className="a-c-addbar-card">
                <p className="a-c-addbar-label">Image</p>
                <input 
                type="file" className="a-c-addbar-file" onChange={(e)=>setcatimage(e.target.files[0])}/>
                <div className="a-c-addbar-image-preview">
                    <img src={catimage ? URL.createObjectURL(catimage) : existcatimage} className="a-c-addbar-file-image"  />
                </div>

            </div>

            {/* -------------- edit name ------------ */}


             <div className="a-c-addbar-card">
                <p className="a-c-addbar-label">Category Name</p>
                <input 
                value={catname}
                type="text" placeholder="Enter the Category name"
                className="a-c-addbar-input" onChange={(e)=>setcatname(e.target.value)}/>
                
            </div>

        {/* -------------- edit slug ------------ */}


            <div className="a-c-addbar-card">
                <p className="a-c-addbar-label">Slug name</p>
                <input 
                value={catslug}
                type="text" placeholder="Enter the slug name"
                 className="a-c-addbar-input" onChange={(e)=>setcatslug(e.target.value)}/>
                
            </div>


            {/* -------------- edit popular ------------ */}


            <div className="a-c-addbar-card">
                <p className="a-c-addbar-label">Popular</p>
                <input 
                value={ispopular}
                type="checkbox"
                 className="a-c-addbar-checkbox" 
                 checked={ispopular}
                 onChange={(e)=>setispopular(e.target.checked)}/>
                
            </div>

            {/* -------------- edit status------------ */}


            <div className="a-c-addbar-card">
                <p className="a-c-addbar-label">Status</p>
                <input
                value={status}
                type="checkbox" 
                checked={status}
                className="a-c-addbar-checkbox" onChange={(e)=>setstatus(e.target.checked)}/>
                
            </div>

            {/* ------------ buttons ---------------------- */}

            <div className="a-c-addbar-buttons">
                <button className="a-c-addbar-add-button" onClick={handleeditbutton}>UPDATE</button>
                <button className="a-c-addbar-cancel-button" onClick={()=>{setshoweditbar(false);setshowcard(true)}}>Cancel</button>
            </div>

            </div>
          }

           

         
         {/* ------------------------ bottom card ---------------------------- */}
         {

           showcard && 
           
         <div className="a-c-bottom">

           
           {
            categories.map((category)=>{

                return(
                    <div className="a-c-b-card" key={category.id}>

            
               {/* ------------- left image ------------- */}
            <div className="a-c-b-left">

                <img src={category.categoryImage} alt={category.categoryName} className="a-c-b-left-image" />

            </div>

            {/* -------------- second name and status -------------- */}

            <div className="a-c-b-second">

                <p className="a-c-b-second-title">{category.categoryName}</p>
                <p className="a-c-b-second-slug">{category.categorySlug}</p>
                <div className="a-c-b-second-bottom">

                    <p className={category.categoryStatus ? "a-c-b-second-bottom-active":"a-c-b-second-bottom-inactive" } >{category.categoryStatus ? "ACTIVE" : "INACTIVE"}</p>
                    <p className={category.categoryPopular ? "a-c-b-second-bottom-popular" : "a-c-b-second-bottom-notpopular" }>{category.categoryPopular ? "Popular" : "Not Popular"}</p>
                    
                </div>

                <p className="a-c-b-date">{formatDate(category.createdAt)}</p>
                <p className="a-c-b-update">{formatDate(category.updatedAt)}</p>


            </div>

               {/* -------------- second name and status -------------- */}

            <div className="a-c-b-third">

                <Edit2 className="a-c-b-third-edit" size={40} onClick={()=>handleeditmenu(category)}/>
                <Trash className="a-c-b-third-trash" size={40} onClick={()=>handledeletebutton(category.id)}/>

            </div>



           </div>
                );
            })
           }


         </div>
         }



              {/* ---------- pagination ---------- */}

           <div className="pagination">

    <button
        disabled={currentPage === 0}
        onClick={() => setcurrentPage(currentPage - 1)}
    >
        Previous
    </button>

    <span>
        Page {currentPage + 1} of {totalPages}
    </span>

    <button
        disabled={currentPage >= totalPages - 1 || totalPages === 0}
        onClick={() => setcurrentPage(currentPage + 1)}
    >
        Next
    </button>

</div>
                    

        </div>
        


        {/* --------------------- desktop view ----------------------------- */}

          <div className="category-desktop-view">


                    <DesktopCategory />

        </div>
         
        
        
        </>
    );
}