import { useRouter } from "next/router";
import axios from 'axios';
import { useState } from "react";
import dynamic from 'next/dynamic';
import { useForm } from "react-hook-form";
const Layout = dynamic(() => import('../../Layout/layout'), {
    ssr: false,
  })
  const Title = dynamic(() => import('../../Layout/title'), {
    ssr: false,
  })

export default function addnotice() {
  const { register, handleSubmit, formState: { errors } } = useForm("");

  const [NP, setNP] = useState("");


  const onSubmit = async () => {
    if (!NP) {
      console.error("All fields are required.");
      return;
    }

    try {
      console.log("Posting Safety Post");
      const response = await axios.post(
        process.env.NEXT_PUBLIC_API_ENDPOINT + "/manager/addnotice",
        {
            NP: NP
        },
        {
          headers: {
            " Content-Type": "application/x-www-form-urlencoded"
          },
          withCredentials: true,
        }
      );

      console.warn(response);

      if (response.data) {
        window.location.reload();
      } else {
        // Handle error if needed
      }
    } catch (error) {
      console.error("Error Posting Notice Post", error);
    }
  };
  return (
    <>
    < Title page= "Add Notice" />
    
    <Layout />
    <div>
    <form onSubmit={handleSubmit(onSubmit)} class="max-w-lg mx-auto" >
          
              <div class="form-group">
                  <label htmlFor="NP" class="block mb-2 text-sm font-medium text-green-700 dark:text-green-500">Notice Post  :</label>
                  <input type="text"
                      id="NP"
                      class="bg-green-50 border border-green-500 text-green-900 placeholder-green-700 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block w-full p-2.5 dark:bg-green-100 dark:border-green-400" placeholder="Enter your Safety Post"
                      value={NP}
                      {...register("NP", { required: true })}
                      onChange={(e) => setNP(e.target.value)} />
                  {errors.SP && <p class="mt-2 text-sm text-red-600 dark:text-red-500"><span class="font-medium">Oops!</span> This Field is Required!</p>}
              </div>






              <br />
              <div className="text-center">
                  <input type="submit"
                      value="Add "
                      class="text-center text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 dark:bg-red-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-red-800"
                      data-drawer-target="drawer-navigation"
                      data-drawer-show="drawer-navigation"
                      aria-controls="drawer-navigation"
                      align="center" />
              </div>



       

      </form>
      </div>
      <br></br>
        <a href="/manager/DashBaord" class="font-medium text-primary-600 hover:underline dark:text-primary-500 hover:text-blue-500">Back</a>
   
      </>
  );
    
   
 
      
  }
  