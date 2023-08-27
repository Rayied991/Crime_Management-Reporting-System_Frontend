
import axios from "axios"
import { useState } from "react"
import { useRouter } from "next/router"
import Image from "next/image"
import dynamic from "next/dynamic";
import { useForm } from 'react-hook-form';

const Layout = dynamic(() => import("../components/layout/layout"));
const _Title = dynamic(() => import("../components/layout/title"));



export default function postEvi(){


    const router = useRouter();
    //const [VicEmail, setVicEmail] = useState("");
    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm();
    const validateFile = (value) => {
        const file = value[0];
        const allowedtypes = ["image/jpg", "image/png"];
  
        if (!allowedtypes.includes(file.type)){
            return false;
        }
        }

  const [success, setSuccess] = useState('')
  const onSubmit = async (data) => {
    console.log(data);
    const formData = new FormData();
    formData.append('VicEmail', data.VicEmail);
    formData.append('Evidence', data.Evidence[0]);


    console.log(formData);
    try {
        const response = await axios.post("http://localhost:3000/victim/UploadEvidence",
            formData, {
            headers: {
                "Content-Type": "multipart/form-data"
            }
        });
      

        setSuccess('Evidance Uploaded');
        reset();

    }
    catch (error) {
      //  console.log(error.response.data.message);
        
        setSuccess('Evidance Not uploaded ' + error.response.data.message);

    }


};


    return (
<>
<_Title title= "Post Evidance" />
<Layout>
<section class="bg-white dark:bg-gray-900">
  <div class="py-8 px-4 mx-auto max-w-2xl lg:py-16">
      <h1 class="mb-4 text-xl font-bold text-gray-900 dark:text-white">Post Evidance </h1>
{success}
<form onSubmit={handleSubmit(onSubmit)} encType="multipart/form-data">

        {/* <h1>Post Evidance Page</h1> */}
        {/* <div>
        <label for="email">Victim Email :</label>
        <input type="email" />
        </div> */}
         <div>
      <label for="email"
       class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
      >Victim Email :</label>
        <input 
        type="email" 
        id="VicEmail"
        class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="Input email" required=""
        {...register('VicEmail', { required: true, pattern: /\S+@\S+\.\S+/ })}/>
         {errors.email && (
                    <p>
                      {errors.VicEmail.type === 'required'
                        ? 'Email is required'
                        : 'Invalid email address'}
                    </p>
                                      )}

        </div>
     

        <div>
                    <label htmlFor="file"
                    class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >Evidance Upload :</label>
                    <input
                        type="file"
                        id="Evidence"
                        class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="Input File/JPG/PNG" required=""
                        {...register('Evidence', { required: true, validate: validateFile })}
                    />
                    {errors.Evidence && 
                    <p>
                    {errors.Evidence.type === 'required'
                        ? 'file is required'
                        : 'invalid file'}
                </p>
    }
                </div>
       
        

        
                <button type="submit" 
        class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >Post Evidance</button>
        <br></br>
        <button type="button" 
        class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        onClick={() => router.back()}>
              Click here to go back
            </button>
           
        </form>
        </div>
         
    </section>

      
        </Layout>
</>
    )
}

