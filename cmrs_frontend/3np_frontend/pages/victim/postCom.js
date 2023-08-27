
import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import axios from "axios";
import { useState } from "react";
import { useForm } from "react-hook-form";
import Image from "next/image";
import Link from "next/link";
import Navigation from "../components/layout/navigator";
import Footer from "../components/layout/footer";
// const Layout = dynamic(() => import("../components/layout/layout"));
// const _Title = dynamic(() => import("../components/layout/title"));
// const Layout = dynamic(() => import("../components/layout/layout"));
// const _Title = dynamic(() => import("../components/layout/title"));

const Layout= dynamic(()=> 
import("../components/layout/layout"), {
  ssr: false,
})

const _Title = dynamic(()=>
import("../components/layout/title"), {
  ssr: false,
})

export default function postCom() {
  const router = useRouter();

  const [Victim_FName, setVictim_FName] = useState("");
  const [VicEmail, setVicEmail] = useState("");
  const [PostCom, setPostCom] = useState("");
  const [Eventdate, setEventdate] = useState("");
  const [Witness, setWitness] = useState("");
  const [FileUpload, setFileUpload] = useState("");
  const [victim, setVictim] = useState(); //"14"

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("Victim_FName", Victim_FName);
    formData.append("VicEmail", VicEmail);
    formData.append("PostCom", PostCom);
    formData.append("Eventdate", Eventdate);
    formData.append("Witness", Witness);
    formData.append("FileUpload", FileUpload);
    formData.append("victim", victim);
    console.warn(formData)

    try {
      console.log("Posting Data");
      const response = await axios.post(
        "http://localhost:3000/victim/postComplain",
        {
          Victim_FName:Victim_FName,
          VicEmail: VicEmail,
          PostCom: PostCom,
          Eventdate:Eventdate,
          Witness: Witness,
          FileUpload: FileUpload,
          victim: victim
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      console.warn(response);

      // if (response.status === 200) {
      //   router.push("/victim/postCom");
      // } else {
      //   router.push("/error");
      // }
      if(response.data)
                  {
                    router.push({
                     pathname:"/victim/postCom",
                    });
                    window.location.reload();
                  }
                  else
                  {
                    router.push({
                      pathname:"error",
                    });
                  }
                
    } catch (error) {
      console.error("Error posting Complain", error);
    }
  };

    return (
<>
<_Title title= "Post Com" />

<Layout />
<section class="bg-white dark:bg-gray-900">
  <div class="py-8 px-4 mx-auto max-w-2xl lg:py-16">
      <h1 class="mb-4 text-xl font-bold text-gray-900 dark:text-white">Post Complain </h1>


        
        {/* {success} */}
<form onSubmit={handleSubmit} encType="multipart/form-data" >
 
        {/* <input type="hidden" 
        id="id" 
        value={id}
       onChange={(e) => setid(0)}
      
        /> */}
        
<div class="grid gap-4 sm:grid-cols-2 sm:gap-6">
<div class="sm:col-span-2">
        <label for="Victim_FName"
         class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
        >First Name :</label>
        <input type="text" 
        id="Victim_FName" 
        class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="Type name" required=""
        value={Victim_FName}
       onChange={(e) => setVictim_FName(e.target.value)}
        //  {...register('Victim_FName', { required: true })}
        />
          {/* {errors.Victim_FName && <p >FName is required</p>} */}
       </div>
        </div>


        <div class="w-full">
        <label for="email"
        class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Victim Email :
        </label>
        <input type="email"  
        id="VicEmail" 
        class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="Email" required=""
        value={VicEmail}
        onChange={(e) => setVicEmail(e.target.value)}
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

       

        <div class="w-full">
        <label for="Witness" 
        class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
        >Witness :</label>
        <input type="text"
         id="Witness"  
         class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="Witness" required=""
         value={Witness}
         onChange={(e) => setWitness(e.target.value)}
        // {...register('Witness', { required: true })}
        />
          {/* {errors.Witness && <p >Witness is required</p>} */}
        </div>
       
        <div class="w-full">
        <label for="Eventdate" 
        class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
        >Eventdate :</label>
        <input type="text" 
        id="Eventdate"  
        class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="Event Date" required=""
        value={Eventdate}
        onChange={(e) => setEventdate(e.target.value)}
        // {...register('Eventdate', { required: true })}
        />
          {/* {errors.Eventdate && <p >Eventdate is required</p>} */}
        </div>
       
        <div>
        <label for="FileUpload"
         class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
          FileUpload :</label>
        <input type="text" 
        id="FileUpload"  
        class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="Upload File" required=""
        value={FileUpload}
        onChange={(e) => setFileUpload(e.target.value)}
        // {...register('FileUpload', { required: true })}

        />
          {/* {errors.FileUpload && <p >File is required</p>} */}
        </div>
        
        
        <div>
        <label for="victim" 
        class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
        >Victim :</label>
        <input type="number" 
        id="victim"  
        class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="" required=""
        value={victim}
        onChange={(e) => setVictim(e.target.value)}
        // {...register('Eventdate', { required: true })}
        />
          {/* {errors.Eventdate && <p >Eventdate is required</p>} */}
        </div>
       
       {/* Hidden vicitm id passed as foreign key */}
        {/* <input type="number" id="victim" value={victim} */}

        {/* /> */}

        <div class="sm:col-span-2">
        <label for="PostCom" 
        class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
        >Post Complain :</label>
        <textarea type="text" 
        id="PostCom"
        rows="4" class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="Your description here"
        value={PostCom}
        onChange={(e) => setPostCom(e.target.value)}
        // {...register('PostCom', { required: true })}
        />
          {/* {errors.PostCom && <p >postCom is required</p>} */}
        </div>

         
        {/* <div>
        <input type="submit" 
         
        value="postCom" 
        />
        </div> */}
          <button type="submit" 
        class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >POST COMPLAIN</button>
        
      </form>
      </div>
    </section>

        <br></br>
        {/* <button type="button" 
         class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        onClick={() => router.back()}>
              Back
            </button> */}
            {/* <Link href="../components/layout/navigator"
             class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >Back</Link> */}

<button type="button" onClick={() => router.back()}>
              Click here to go back
            </button>
         <br>
         </br>
         <br></br>

            <Link href="/victim/GetPostCom"
             class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >View Complain</Link>   
           
           <Footer/>
     
</>
    );
}

