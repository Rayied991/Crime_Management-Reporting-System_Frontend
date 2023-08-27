import { useForm } from 'react-hook-form';
import axios from "axios";
import { useState } from "react";
import { useRouter } from 'next/router';
import dynamic from 'next/dynamic';
import Image from 'next/image';
import Footer from '../components/layout/footer';
import signin from '../signin';
const Layout= dynamic(()=> 
import("../components/layout/layout"), {
  ssr: false,
})

const _Title = dynamic(()=>
import("../components/layout/title"), {
  ssr: false,
})

export default function Reg(){
  
  const router = useRouter();
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
        // formData.append('', data.uname);
        formData.append('VicEmail', data.VicEmail);
        formData.append('Victim_FName', data.Victim_FName);
        formData.append('Victim_LName', data.Victim_LName);
        formData.append('Phone', data.Phone);
        formData.append('NID_No', data.NID_No);
        formData.append('Vicpassword', data.Vicpassword);
        formData.append('Confirm_Vicpassword', data.Confirm_Vicpassword);
        formData.append('image', data.image[0]);

        
        
        //formData.append('address', data.address);
        //formData.append('dob', data.dob);
        //formData.append('filename', data.filename[0]);
        console.log(formData);
        try {
            const response = await axios.post("http://localhost:3000/victim/regvic",
                formData, {
                headers: {
                    "Content-Type": "multipart/form-data"
                }
            });
          

            setSuccess('Registered');
            reset();

        }
        catch (error) {
          //  console.log(error.response.data.message);
            
            setSuccess('vicitm add unsuccessfull ' + error.response.data.message);

        }


    };

    return (
  <>
<_Title title= "Register" />
{/* <Layout> */}
<div class="p-6 space-y-4 md:space-y-6 sm:p-8">
              <h1 class="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white" align="center">
              Register and Create an account
              </h1>
{success}
<form class="space-y-4 md:space-y-6" action="#"
 onSubmit={handleSubmit(onSubmit)} encType="multipart/form-data" >
        {/* <h1>Registration Page</h1> */}
        <div>
      <label for="email"

      class="block mb-2 text-sm font-medium text-gray-900 dark:text-white" 
      >Victim Email :</label>
        <input 
        type="email" 
        id="VicEmail"
        class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-60 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="name@gmail.com" required="" align="center"
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
        <label for="Victim_FName" 
        class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
        >First Name :</label>
        <input type="text" id="Victim_FName"
        class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder=" Enter Victim First Name" required=""
         {...register('Victim_FName', { required: true })}
        />
          {errors.Victim_FName && <p >FName is required</p>}
        </div>

        <div>
        <label for="Victim_LName" 
        class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
        >Last Name :</label>
        <input type="text" id="Victim_LName"
        class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder=" Enter Victim Last Name" required=""
        {...register('Victim_LName', { required: true })}
        />
         {errors.Victim_LName && <p >LName is required</p>}
        </div>

        <div>
        <label for="NID_No" 
        class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
        >NID :</label>
        <input type="number" id="NID_No"
        class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Enter NID No" required=""
        {...register('NID_No', { required: true })}  />
         {errors.NID_No && <p >nid is required</p>}
        </div>
        <div>
        <label for="Phone"
        class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
        >Phone Number :</label>
        <input type="number" id="Phone"
        class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Enter Phone Number" required=""
        {...register('Phone', { required: true })}
        />
        {errors.Phone && <p >pnum is required</p>}
        </div>

        <div>
        <label for="Vicpassword"
        class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
        >Password:</label>
        <input type="password" id="Vicpassword"
        placeholder="••••••••" class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required=""
        {...register('Vicpassword', { required: true })}
        />
        {errors.Vicpassword && (
                    <p>
                      {errors.Vicpassword.type === 'required'
                        ? 'Password is required'
                        : 'Invalid password pattern'}
                    </p>
                  )}
        </div>

        <div>
        <label for="Confirm_Vicpassword"
        class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
        >Confirm Password:</label>
        <input type="password" id="Confirm_Vicpassword"
        placeholder="••••••••" class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required=""
        {...register('Confirm_Vicpassword', { required: true })}
        />
         {errors.Confirm_Vicpassword && (
                    <p>
                      {errors.Confirm_Vicpassword.type === 'required'
                        ? 'Password is required'
                        : 'Invalid password pattern'}
                    </p>
                  )}
        </div>
        <div>
                    <label htmlFor="file" 
                    class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >File</label>
                    <input
                        type="file"
                        id="image"
                        class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required=""
                        {...register('image', { required: true, validate: validateFile })}
                    />
                    {errors.image && 
                    <p>
                    {errors.image.type === 'required'
                        ? 'file is required'
                        : 'invalid file'}
                </p>
    }
                </div>
                <div class="flex items-start">
                      <div class="flex items-center h-5">
                        <input id="terms" aria-describedby="terms" type="checkbox" class="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800" required="" />
                      </div>
                      <div class="ml-3 text-sm">
                        <label for="terms" class="font-light text-gray-500 dark:text-gray-300">I accept the <a class="font-medium text-primary-600 hover:underline dark:text-primary-500" href="#">Terms and Conditions</a></label>
                      </div>
                  </div>
       
        <button type="submit" 
        class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >Submit</button>

<p class="text-sm font-light text-gray-500 dark:text-gray-400">
                      Already have an account? <a href="../signin" class="font-medium text-primary-600 hover:underline dark:text-primary-500">Login here</a>
                  </p>
        </form>
        <br/>
              <button type="button" 
               class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              onClick={() => router.back()}>
              Click here to go back
            </button>
     </div>
       {/* </Layout> */}
      {/* <Footer></Footer> */}
              </>
    );
         }
        