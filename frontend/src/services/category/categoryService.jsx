import axios from "axios"


const API_URL ="http://localhost:8080/api/v1/vylux/category"


//----------- create a category -----------------------------
const createCategory = async (categoryData) =>{
   
    try{

        const response = await axios.post(
            `${API_URL}/create`,
            categoryData
        );

        return response;


    }catch(error){

        console.error(
            error.response?.data || error.message
        )
    }

}


//-----------------get all category ----------------------------
const getall = async (currentPage) =>{

    try{

        const response = await axios.get(
            `${API_URL}/getall`,
              {
                params: {
                    page: currentPage,
                    size: 4
                }
            }
        );

        return response;
    }catch(error){

        console.error(
            error.response?.data || error.message
        )
    }
}

//-------------------------------- update a category ------------------------------------

const updatecategory = async (id,catgory)=>{


    try{

        const response = await axios.patch(
            `${API_URL}/update/${id}`,
            catgory
        )

        return response;
    }

    catch(error){

        error.response?.data || error.message
    }
}

//------------------ delete a category --------------------
//------------------ delete a category --------------------

const deleteCategory = async (id) => {

    try {

        const response = await axios.delete(
            `${API_URL}/delete/${id}`
        );

        return response;

    } catch (error) {

        console.error(
            "DELETE CATEGORY ERROR:",
            error.response?.data || error.message
        );

        throw error;
    }
};

export default { createCategory,getall,updatecategory,deleteCategory};