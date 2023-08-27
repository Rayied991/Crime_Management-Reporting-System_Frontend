import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import axios from "axios";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import Image from "next/image";

const Layout= dynamic(()=>import("../components/layout/layout"));
const _Title = dynamic(()=>import("../components/layout/title"));


export default function All_posts({data}){

    const router = useRouter();

    // const [victim,setvictim] = useState(null);

    // const setvictim = (data) =>
    // {
    //     setvictim(data);
    // };
    

return(
<>
<_Title title="All Books" />
     <Layout/>
     <div>
<table>
    <thead>
    <tr>
        <th>ID</th>
        <th>Vicitm First Name</th>
        <th>Email</th>
        <th>Complain</th>
        <th>Event Date</th>
        <th>Witness</th>
        <th>File Uploaded</th>
    </tr>
    </thead>

    <tbody>
    {data.flatMap((victim) =>
                  victim.postcom.map((postco) => (
                    <tr key={postco.id}>
                      <td className="px-6">{postco.id}</td>
                      {/* <td className="px-6"> */}
                        {/* <div className="flex items-center space-x-3">
                          <div className="avatar">
                            <div className="mask mask-squircle w-12 h-12">
                              <img
                                src={
                                  bookImages[book.Book_ID] ||
                                  "/images/seller/default_book.svg"
                                }
                                alt="Book Image"
                              />
                            </div>
                          </div> */}
                          <div>
                            <div className="font-bold">{postco.Victim_FName}</div>
                          </div>
                        {/* </div>
                      </td> */}
                      <td className="px-6">{postco.VicEmail}</td>
                      <td className="px-6">{postco.PostCom}</td>
                      <td className="px-6">{postco.Eventdate}</td>
                      <td className="px-6">{postco.Witness}</td>
                      <td className="px-6">{postco.FileUpload}</td>
                      {/* <td> */}
                        {/* <button
                          onClick={() => {
                            sendToEdit(book.Book_ID);
                          }}
                          className="btn btn-ghost btn-xs"
                        >
                          Edit
                        </button> */}
                        {/* <button
                          onClick={() => {
                            window.confirm_Delete.showModal();
                            setSelectedBookId(book.Book_ID);
                          }}
                          className="btn btn-ghost btn-xs"
                        >
                          Delete
                        </button> */}
                      {/* </td> */}
                    </tr>
                  ))
                )}
              
    </tbody>
    <tfoot>
                <tr>
                  <th className="px-6">ID</th>
                  <th className="px-6">Victim First Name</th>
                  <th className="px-6">Email</th>
                  <th className="px-6">Post Complain</th>
                  <th className="px-6">Eventdate</th>
                  <th className="px-6">Witness</th>
                  <th className="px-6">File Upload</th>
                </tr>
              </tfoot>
         
</table>
      </div>

</>


)

}
export async function getStaticProps() {
  try {
    const response = await axios.get("http://localhost:3000/victim/search");
    const data = await response.data;
    return { props: { data } };
  } catch (error) {
    console.error("Error fetching book data:", error);
    return { props: { data: [] } };
  }
}


