import { useState } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import dynamic from 'next/dynamic';

const Layout= dynamic(()=> 
import("../components/layout/layout"), 
{
    ssr:false,
}
);
const _Title = dynamic(()=>
import("../components/layout/title"), 
{
    ssr:false,
}
);


export default function VicPro() {
  const router = useRouter();
  const [inputId, setInputId] = useState();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!inputId) {
        console.error("Username is required ");
        return;
      }
      console.info(inputId);

    try {
      const response = await axios.get(
        `http://localhost:3000/victim/crimestatus/${inputId}`
      );
    //   const response = await axios.get(
    //     `${process.env.NEXT_PUBLIC_API_ENDPOINT}/admin/getpolice/${inputUsername}`
    //   );
      console.log("API Response:", response.data);

      if (response.data) {
        // If the username exists, redirect to the profile page
        //router.push('/victim/GetRegInfo/${inputId}');
        router.push(`/victim/GetCrimeStatus/${inputId}`);
      } else {
        // Handle the case where the username doesn't exist
        console.log("Username not found");
      }
    } catch (error) {
      console.error("Error checking username:", error);
    }
  };

  return (
      <>
     <Layout />
    <form onSubmit={handleSubmit}>
    <h1 class="text-2xl font-bold text-black-500 mb-4" align="center"> View Crime Status</h1>
      <label
      for="ID"
      class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
>
        Enter your ID:
        <input
          type="text"
          class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          value={inputId}
          onChange={(e) => setInputId(e.target.value)}
        />
      </label>
      <button type="submit"
       class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
      >Submit</button>
<br></br>
<br></br>
      <button type="button" 
       class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
      onClick={() => router.back()}>
              Click here to go back
            </button>
    </form>
    {/* <Footer/> */}
    </>
  );
}