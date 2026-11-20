import axios from "axios";

const API_URL = "http://localhost:8080/api/v1/vylux/banner";


// ---------------- create a banners -------------------
const createBanner = async (bannerData) => {
    try {
        const response = await axios.post(
            `${API_URL}/create`,
            bannerData
        );

        return response.data;
    } catch (error) {
        console.error(
            "Error creating banner:",
            error.response?.data || error.message
        );
        throw error;
    }
};


// ----------------- get all banners ----------------
const getallBanners = async () =>{

    try{

        const response = await axios.get(
            `${API_URL}/all`
        )

        return response
    }catch(error){

        console.error(
            "probelm in fetching banners:",
            error.response?.data || error.message
        )
    }
}

//-------------- delete a banner -------------------

const deleteBanner = async (id)=>{

    try{

        const response = await axios.delete(
            `${API_URL}/delete/${id}`
        );

        return response;
    }
    catch(error){

        console.error(
            error.response?.data || error.message
        )
    }
}


//------------------- update a banner ------------------------------
const updateBanner = async (id,bannerData)=>{

    try{

        const response = await axios.patch(
            `${API_URL}/update/${id}`,
            bannerData
        )

        return response
    }
    catch (error) {
        console.error(
            "Error creating banner:",
            error.response?.data || error.message
        );
        throw error;
    }
}


export default { createBanner,getallBanners,deleteBanner,updateBanner };