import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import axios from "axios";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import Image from "next/image";

const Layout = dynamic(() => import("../../components/layout/layout"));
const _Title = dynamic(() => import("../../components/layout/layout"));

export default function View_Crime_Status(){

    const router = useRouter();
    //PostId Status
     const [PostId,setPostId] = useState();
     const [Status, setStatus] = useState("");

 const [CollectedcrimeData, setCollectedcrimeData] = useState(null);
 const [isFormComplete, setIsFormComplete] = useState(false);

 //console.warn("ID line(23)= " + router.query.id); // Working

 useEffect(() => {
    fetchCrimeData();
    
  }, [router.query.id]);

 useEffect(()=>
 {

 if(CollectedcrimeData !== null)
 {
    console.log("Collected crime Data:", CollectedcrimeData);
    setPostId(CollectedcrimeData?.PostId);
    setStatus(CollectedcrimeData.Status);

    console.log("PostId:", CollectedcrimeData.PostId);
    console.log("Status :", CollectedcrimeData.Status);
 }

 } , [CollectedcrimeData]);

 useEffect(() => {

    const allFieldsFilled = PostId && Status;

    setIsFormComplete(allFieldsFilled);
  }, [PostId, Status]);

  const fetchCrimeData = async () => {
    try {
      const response = await axios.get(
        "http://localhost:3000/victim/crimestatus/" + router.query.id,
        //{ withCredentials: true }
      );
      const data = response.data;
      console.log("Fetched Crime Data:", data);

      // Update the CollectedBookData state
      if (data != null) {
        setCollectedcrimeData(data);
        //setBook_Image(data.Book_Image);
      }
    } catch (error) {
      console.error("Error fetching Crime data:", error);
    }





 }

 const handleSubmit = async(e)=>{

 }
 return(

    <>
    <_Title title= "View Crime Status" />
    {/* <Layout /> */}
    <section className="bg-white dark:bg-gray-900" align="center">
 
  <div className="p-6" >
      <h1 class="text-2xl font-semibold mb-4" align="center">View Crime Status</h1>

    <div>
    {/* <h1></h1> */}
    <form onSubmit={handleSubmit} encType="multipart/form-data">
    
    <div>
    <label for="id"
     class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
    >Crime Post ID :</label>
     <input 
     type="number"
     id="PostId"
     class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" 
     value={PostId}
     //onChange={set_id}
     />
    </div>
    
    <div>
            <label for="Status"> Status :</label>
            <input type="text" 
             class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" 
            placeholder={CollectedcrimeData?.Status}
            id="Status" 
            value={Status}
           //onChange={set_Victim_FName}
            //  {...register('Victim_FName', { required: true })}
            />
              {/* {errors.Victim_FName && <p >FName is required</p>} */}
            </div>
    
    
     
    
           
    
            
    
        
    
          
            <div className="text-center">
            <button 
             class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" 
             type="button" onClick={() => router.back()}>
              Click here to go back
            </button>  
                    </div>
            
        </form>
        </div>   
    </div>
    </section>
    
    
    
    
    
    </>
    
    
    )
    
    
    
    











};