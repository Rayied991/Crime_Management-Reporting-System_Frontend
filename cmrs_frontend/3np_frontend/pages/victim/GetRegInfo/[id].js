// import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import axios from "axios";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import Image from "next/image";

// const Layout = dynamic(() => import("../../components/layout/layout"));
// const _Title = dynamic(() => import("../../components/layout/layout"));

export default function VicProfile()
{
    const router = useRouter();

const [id, setid] = useState();

const [Victim_FName, setVictim_FName] = useState("");
const [Victim_LName, set_Victim_LName] = useState("");
const [VicEmail, set_VicEmail] = useState("");
const [Phone, set_Phone] = useState();
const [NID_No, set_NID_No] = useState();
const [Vicpassword, setVicpassword] = useState("");
const [Confirm_Vicpassword, setConfirm_Vicpassword] = useState("");
const [Insertfile_NID, setInsertfile_NID] = useState("");



const [CollectedregData, setCollectedregData] = useState(null);
const [isFormComplete, setIsFormComplete] = useState(false);
//const aid=router.query.id;
  console.warn("ID line(37)= " + router.query.id); // Working


  useEffect(() => {
    fetchRegData();
    
  }, [router.query.id]);


 // * Collect  Data
 useEffect(() => {
    if (CollectedregData !== null) {
      console.log("Collected post Data:", CollectedregData);
      // setid(CollectedregData?.id);
      setid(router.query.id);
      setVictim_FName(CollectedregData.Victim_FName);
     set_Victim_LName(CollectedregData.Victim_LName);
     set_VicEmail(CollectedregData.VicEmail);
      set_Phone(CollectedregData.Phone);
      set_NID_No(CollectedregData.NID_No);
      setVicpassword(CollectedregData.Vicpassword);
      setConfirm_Vicpassword(CollectedregData.Confirm_Vicpassword);
      setInsertfile_NID(CollectedregData.Insertfile_NID);

      console.log("id:", CollectedregData.id);
      console.log("Victim_FName:", CollectedregData.Victim_FName);
      console.log("Victim_LName:", CollectedregData.Victim_LName);
      console.log("VicEmail:", CollectedregData.VicEmail);
      console.log("Phone:", CollectedregData.Phone);
      console.log("NID_No:", CollectedregData.NID_No);
      console.log("Vicpassword:", CollectedregData.Vicpassword);
      console.log("Confirm_Vicpassword:", CollectedregData.Confirm_Vicpassword);
      console.log("Insertfile_NID:", CollectedregData.Insertfile_NID);

    }
}, [CollectedregData]);

useEffect(() => {
    // Check if all required fields are filled
    const allFieldsFilled =
    Victim_FName  && Victim_LName && VicEmail && Phone && NID_No && Vicpassword && Confirm_Vicpassword && Insertfile_NID;

    setIsFormComplete(allFieldsFilled);
  }, [Victim_FName,Victim_LName, VicEmail, Phone, NID_No, Vicpassword, Confirm_Vicpassword,Insertfile_NID]);

  const fetchRegData = async () => {
    try {
      const response = await axios.get(
        "http://localhost:3000/victim/SearchVicId/" + router.query.id,
        //{ withCredentials: true }
      );
      const data = response.data;
      console.log("Fetched REg Data:", data);

      // Update the CollectedBookData state
      if (data != null) {
        setCollectedregData(data);
        //setBook_Image(data.Book_Image);
      }
    } catch (error) {
      console.error("Error fetching Complain data:", error);
    }
 


    };
    //Put method

const handleSubmit = async (e)=>
{
  e.preventDefault();
  const formData = new FormData();
  formData.append('VicEmail', VicEmail);
formData.append('Victim_FName', Victim_FName);
formData.append('Victim_LName', Victim_LName);
formData.append('Phone', Phone);
formData.append('NID_No', NID_No);
formData.append('Vicpassword', Vicpassword);
formData.append('Confirm_Vicpassword', Confirm_Vicpassword);
formData.append('Insertfile_NID', Insertfile_NID);

console.log(formData);



try{
  console.log("Posting Data...");

    const response = await axios.put(
      "http://localhost:3000/victim/updatereg/" + id,
      {
        
        Victim_FName:Victim_FName,
        Victim_LName:Victim_LName,
         VicEmail: VicEmail,
        Phone:Phone,
        NID_No:NID_No,
        Vicpassword:Vicpassword,
        Confirm_Vicpassword,Confirm_Vicpassword,
        Insertfile_NID : Insertfile_NID
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
        pathname: "/victim/GetRegInfo/" + router.query.id,
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
};


const set_id = (e)=> {
  setid(e.target.value);
};
const set_victim_fname = (e)=> {
  setVictim_FName(e.target.value);
};
const set_victim_lname = (e)=> {
  set_Victim_LName(e.target.value);
};
const set_victim_email = (e)=> {
  set_VicEmail(e.target.value);
};
const set_victim_phone = (e)=> {
  set_Phone(e.target.value);
};
const set_nid_no = (e)=> {
  set_NID_No(e.target.value);
};
const set_vicpass = (e)=> {
  setVicpassword(e.target.value);
};
const set_vicConpass = (e)=> {
  setConfirm_Vicpassword(e.target.value);
};
const set_Insertfile_NID = (e)=> {
  setInsertfile_NID(e.target.value);
};




    return (
        <>
      {/* <_Title title= "View reg" />
      <Layout>
        */}
      <section className="bg-white dark:bg-gray-900" align="center">
      <div className="p-6" >
      <h1 class="text-2xl font-semibold mb-4" align="center">Your Profile</h1>
      <form onSubmit={handleSubmit} encType="multipart/form-data">
              {/* <h1>Registration Page</h1> */}

              <div>
<label for="id"
 class="block mb-2 text-sm font-medium text-gray-900 dark:text-white" >Post ID:</label>
 <input 
 type="number"
 id="id"
 class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
 value={id}
 placeholder={CollectedregData?.id}
 onChange={set_id}
 />
</div>
              
              
              <div>
              <label for="Victim_FName"
               class="block mb-2 text-sm font-medium text-gray-900 dark:text-white" >First Name :</label>
              <input type="text"
               id="Victim_FName"
               class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              value={Victim_FName}
              placeholder={CollectedregData?.Victim_FName}
              onChange={set_victim_fname}
              // {...register('Victim_FName', { required: true })}
              />
                {/* {errors.Victim_FName && <p >FName is required</p>} */}
              </div>
      
              <div>
              <label for="Victim_LName">Last Name :</label>
              <input type="text"
               id="Victim_LName"
               class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
               value={Victim_LName}
               placeholder={CollectedregData?.Victim_LName}
              onChange={set_victim_lname}
             // {...register('Victim_LName', { required: true })}
              />
               {/* {errors.Victim_LName && <p >LName is required</p>} */}
              </div>
      
              <div>
            <label for="email">Victim Email :</label>
              <input 
              type="email" 
              class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder={CollectedregData?.VicEmail}
              id="VicEmail"
              value={VicEmail}
              onChange={set_victim_email}
        //onChange={set_VicEmail}
              //{...register('VicEmail', { required: true, pattern: /\S+@\S+\.\S+/ })}
              />
               {/* {errors.email && (
                          <p>
                            {errors.VicEmail.type === 'required'
                              ? 'Email is required'
                              : 'Invalid email address'}
                          </p>
                                            )}
       */}
              </div>


              <div>
              <label for="NID_No">NID :</label>
              <input type="number" 
              id="NID_No"
              class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
               value={NID_No}
               placeholder={CollectedregData?.NID_No}
               onChange={set_nid_no}
              //{...register('NID_No', { required: true })}  
              />
             {/* {errors.NID_No && <p >nid is required</p>} */}
              </div>
              <div>
              <label for="Phone">Phone Number :</label>
              <input type="number" id="Phone"
               value={Phone}
               class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
               placeholder={CollectedregData?.Phone}
               onChange={set_victim_phone}
            //   {...register('Phone', { required: true })}
              />
              {/* {errors.Phone && <p >pnum is required</p>} */}
              </div>
      
              <div>
              <label for="Vicpassword">Password:</label>
              <input type="password" 
              id="Vicpassword"
                value={Vicpassword}
                class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder={CollectedregData?.Vicpassword}
               onChange={set_vicpass}

              //{...register('Vicpassword', { required: true })}
              />
              {/* {errors.Vicpassword && (
                          <p>
                            {errors.Vicpassword.type === 'required'
                              ? 'Password is required'
                              : 'Invalid password pattern'}
                          </p>
                        )} */}
              </div>
      
              <div>
              <label for="Confirm_Vicpassword">Confirm Password:</label>
              <input type="password"
               id="Confirm_Vicpassword"
              value={Confirm_Vicpassword}
              class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder={CollectedregData?.Confirm_Vicpassword}
              onChange={set_vicConpass}
              ///{...register('Confirm_Vicpassword', { required: true })}
              />
               {/* {errors.Confirm_Vicpassword && (
                          <p>
                            {errors.Confirm_Vicpassword.type === 'required'
                              ? 'Password is required'
                              : 'Invalid password pattern'}
                          </p>
                        )} */}
              </div>
              <div>
                          <label htmlFor="file">File</label>
                          <input
                              type="text"
                              id="Insertfile_NID"
                              value={Insertfile_NID}
                              class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder={CollectedregData?.Insertfile_NID}
              onChange={set_Insertfile_NID}
                              //{...register('image', { required: true, validate: validateFile })}
                          />
                          {/* {errors.image && 
                          <p>
                          {errors.image.type === 'required'
                              ? 'file is required'
                              : 'invalid file'}
                      </p>
          } */}
                      </div>
                     
        <div className="text-center">
                  <input
                    
                    type="submit"
                    class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                    disabled={!isFormComplete}
                    value="Update Profile"
                  />
                </div>
         
              </form>
              <br/>
                    <button type="button"
                     class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                    onClick={() => router.back()}>
                    Click here to go back
                  </button>
                  </div>
           </section>
             {/* </Layout> */}
            
                    </>
    )

 
        };

