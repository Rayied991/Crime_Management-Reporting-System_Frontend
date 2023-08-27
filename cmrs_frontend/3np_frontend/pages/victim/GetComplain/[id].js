import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import axios from "axios";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import Image from "next/image";
import Navigation from "@/pages/components/layout/navigator";

//const Layout = dynamic(() => import("../../components/layout/layout"));
//const _Title = dynamic(() => import("../../components/layout/layout"));

export default function View_Complain()
{
    const router = useRouter();

  const [id, setid] = useState();
  const [Victim_FName, setVictim_FName] = useState("");
  const [VicEmail, setVicEmail] = useState("");
  const [PostCom, setPostCom] = useState("");
  const [Eventdate, setEventdate] = useState("");
  const [Witness, setWitness] = useState("");
  const [FileUpload, setFileUpload] = useState("");
//   const [victim, setVictim] = useState(); //"14"

  const [CollectedpostData, setCollectedpostData] = useState(null);
  const [isFormComplete, setIsFormComplete] = useState(false);
 
  console.warn("ID line(23)= " + router.query.id); // Working


  useEffect(() => {
    fetchPostComData();
    
  }, [router.query.id]);

    // * Collect  Data
    useEffect(() => {
        if (CollectedpostData !== null) {
          console.log("Collected post Data:", CollectedpostData);
          setid(CollectedpostData?.id);
          setVictim_FName(CollectedpostData.Victim_FName);
          setVicEmail(CollectedpostData.VicEmail);
          setPostCom(CollectedpostData.PostCom);
          setEventdate(CollectedpostData.Eventdate);
          setWitness(CollectedpostData.Witness);
          setFileUpload(CollectedpostData.FileUpload);



          console.log("id:", CollectedpostData.id);
          console.log("Victim_FName :", CollectedpostData.Victim_FName);
          console.log("VicEmail :", CollectedpostData.VicEmail);
          console.log("PostCom :", CollectedpostData.PostCom);
          console.log("Eventdate :", CollectedpostData.Eventdate);
          console.log("Witness :", CollectedpostData.Witness);
          console.log("FileUpload :", CollectedpostData.FileUpload);
        //   console.log("Book Image Name :", CollectedpostData.Book_Image);
        //   console.log("Seller_ID :", CollectedpostData.Seller_ID);
        }
      }, [CollectedpostData]);

      useEffect(() => {
        // Check if all required fields are filled
        const allFieldsFilled =
        Victim_FName && VicEmail && PostCom && Eventdate && Witness && FileUpload;
    
        setIsFormComplete(allFieldsFilled);
      }, [Victim_FName, VicEmail, PostCom, Eventdate, Witness, FileUpload]);
    
      const fetchPostComData = async () => {
        try {
          const response = await axios.get(
            "http://localhost:3000/victim/searchComplain/" + router.query.id,
            //{ withCredentials: true }
          );
          const data = response.data;
          console.log("Fetched PostCom Data:", data);
    
          // Update the CollectedBookData state
          if (data != null) {
            setCollectedpostData(data);
            //setBook_Image(data.Book_Image);
          }
        } catch (error) {
          console.error("Error fetching Complain data:", error);
        }
      };
//PUT method
const handleSubmit = async (e)=>{
  e.preventDefault();
  //update 
  const formData = new FormData();
  formData.append("Victim_FName", Victim_FName);
  formData.append("VicEmail", VicEmail);
  formData.append("PostCom", PostCom);
  formData.append("Eventdate", Eventdate);
  formData.append("Witness", Witness);
  formData.append("FileUpload", FileUpload);
  
  console.log(formData); // Working

  try {
    console.log("Posting Data...");

    const response = await axios.put(
      "http://localhost:3000/victim/updatecomplain/" + id,
      {
        
        Victim_FName:Victim_FName,
        VicEmail: VicEmail,
        PostCom: PostCom,
        Eventdate:Eventdate,
        Witness: Witness,
        FileUpload: FileUpload
        //victim: victim
        
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    console.log(response);

    if (response.data) {
      console.info("Data Has been Updated");
      // TODO: Reload the Page Here
      router.push({
        pathname: "/victim/GetComplain/" + router.query.id,
      });
    } else {
      console.info("Failed to Update");
      router.push({
        pathname: "error",
      });
    }
  } catch (error) {
    console.error("Error Upload", error);
  }

  //Delete 
  







};
const handleDelete = async () =>
  {
    try{
      if(id)
      {
        const res = await axios.delete(
          `http://localhost:3000/victim/deleteCom/${id}`
        );
        console.log("Deleted Or Not? = " + res);
        // You might want to refresh the book list after deletion
        // You can call fetchBookImages() again or refetch data here
        // fetchBookImages();
        setid(null); // Reset selected book ID
        window.location.reload(); // Reload the page
      }
    }
    catch (error) {
      console.error("Error deleting complain:", error);
    }
  }

const set_id = (e)=> {
  setid(e.target.value);
}
const set_Victim_FName = (e) => {
  setVictim_FName(e.target.value);
};
const set_VicEmail = (e) => {
  setVicEmail(e.target.value);
};
const set_PostCom = (e) => {
  setPostCom(e.target.value);
};
const set_Eventdate = (e) => {
  setEventdate(e.target.value);
};
const set_Witness = (e) => {
  setWitness(e.target.value);
};
const set_FileUpload = (e) => {
  setFileUpload(e.target.value);
};







return(

<>
{/* <_Title title= "view Com" /> */}
{/* <Layout /> */}
<section className="bg-white dark:bg-gray-900" align="center">
 
  <div className="p-6" >
      <h1 class="text-2xl font-semibold mb-4" align="center">View Complain</h1>

<div>
{/* <h1>View Complain</h1> */}
<form onSubmit={handleSubmit} encType="multipart/form-data">
<div className="grid gap-4 sm:grid-cols-2 sm:gap-6">
<div class="sm:col-span-2">
<label for="id"
class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
>Post ID :</label>
 <input 
 type="number"
 id="id"
 class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" 
 value={id}
 onChange={set_id}
 />
</div>
</div>

<div >
{/* <div class="sm:col-span-2"> */}
        <label for="Victim_FName"
          class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
        > Victim First Name :</label>
        <input type="text" 
        placeholder={CollectedpostData?.Victim_FName}
        id="Victim_FName" 
        class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
        value={Victim_FName}
       onChange={set_Victim_FName}
        //  {...register('Victim_FName', { required: true })}
        />
          {/* {errors.Victim_FName && <p >FName is required</p>} */}
        </div>
        {/* </div> */}


 <div>
        <label for="email"
         class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
        >Victim Email :
        </label>
        <input type="email" 
        class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" 
        placeholder={CollectedpostData?.VicEmail} 
        id="VicEmail" 
        value={VicEmail}
        onChange={set_VicEmail}
        // {...register('VicEmail', { required: true, pattern: /\S+@\S+\.\S+/ })}
        />
         {/* {errors.email && (
                    <p>
                      {errors.VicEmail.type === 'required'
                        ? 'Email is required'
                        : 'Invalid email address'}
                    </p>
                                      )} */}
        </div>

        <div>
        <label for="PostCom"
        class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
        >Post Complain :</label>
        <input type="text" 
         placeholder={CollectedpostData?.PostCom} 
        id="PostCom"
        value={PostCom}
        onChange={set_PostCom}
        class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" 
        // {...register('PostCom', { required: true })}
        />
          {/* {errors.PostCom && <p >postCom is required</p>} */}
        </div>
        <div>
        <label for="Eventdate" 
         class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
        >Eventdate :</label>
        <input type="text" 
        placeholder={CollectedpostData?.Eventdate} 
        id="Eventdate"  
        value={Eventdate}
        class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" 
        onChange={set_Eventdate}
        // {...register('Eventdate', { required: true })}
        />
          {/* {errors.Eventdate && <p >Eventdate is required</p>} */}
        </div>

        <div>
        <label for="Witness" 
        class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Witness :</label>
        <input type="text"
        placeholder={CollectedpostData?.Witness} 
         id="Witness"  
         value={Witness}
         class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" 
         onChange={set_Witness}
        // {...register('Witness', { required: true })}
        />
          {/* {errors.Witness && <p >Witness is required</p>} */}
        </div>


        <div>
        <label for="FileUpload"
        class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">FileUpload :</label>
        <input type="text" 
        placeholder={CollectedpostData?.FileUpload} 
        id="FileUpload"  
        value={FileUpload}
        class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" 
        onChange={set_FileUpload}
        // {...register('FileUpload', { required: true })}

        />
          {/* {errors.FileUpload && <p >File is required</p>} */}
        </div>
        <div className="text-center">
                  <input
                    class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                    type="submit"
                    disabled={!isFormComplete}
                    value="Update Complain"
                  />
                </div>
            {/* You can open the modal using ID.showModal() method */}
      {/* <button className="btn" >open modal</button> */}
      {/* <dialog id="confirm_Delete" className="modal">
        <form method="dialog" className="modal-box"> */}
          {/* <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
            ✕
          </button> */}
          {/* <h3 className="font-bold text-lg">Confirm Delete?</h3>
          <p className="py-4">Are you sure that you want to delete it?</p> */}
          <div  className="text-center">
            {/* if there is a button in form, it will close the modal */}
            <button 
            class="text-red-600 inline-flex items-center hover:text-white border border-red-600 hover:bg-red-600 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:border-red-500 dark:text-red-500 dark:hover:text-white dark:hover:bg-red-600 dark:focus:ring-red-900"
            onClick={ handleDelete } className="btn">
                                <svg class="w-5 h-5 mr-1 -ml-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clip-rule="evenodd"></path></svg>
              Delete
            </button>
          </div>
          <button 
          type="button" 
          class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          onClick={() => router.back()}>
              Click here to go back
            </button>


    </form>
    </div>
    </div>
  </section>
  {/* </Layout> */}
  {/* <Link href=""
             class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >Back</Link>
         <br>
         </br> */}

{/* </div> */}




</>


)



}
