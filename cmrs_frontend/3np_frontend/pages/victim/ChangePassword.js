import dynamic from 'next/dynamic'
import { useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';


const Layout = dynamic(() => import("../components/layout/layout"), {
  ssr: false,
});
const _Title = dynamic(() => import("../components/layout/title"), {
  ssr: false,
});

export default function passChange() {
  const router= useRouter();
  const [id, setid] = useState();
  const [newPassword, setNewPassword] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    //http://localhost:3000/victim/changeVicPassById/"

    try {
      const response = await axios.put(process.env.NEXT_PUBLIC_API_ENDPOINT + '/victim/changeVicPassById/'  + id,
        {
          id:id,
          newPassword:newPassword
        },
        {
            headers: { "Content-Type": "application/json" },
            //withCredentials: true
        }
      );

      if (response.data) {
        router.push("/signin");
      } else {
        setMessage('Failed to change password');
      }
    } catch (error) {
      console.error('Error changing password:', error);
      setMessage('An error occurred');
    }
  };

  return (
    <>
    <_Title title= "Change Password" />
    <form onSubmit={handleSubmit} className="max-w-md mx-auto p-4 bg-white rounded shadow-md">
      <Layout/>
      <_Title title= "Change Password" />
      <h1 className="text-2xl font-bold mb-4">Change Password Page</h1>
      <div className="mb-4">
        <label htmlFor="id" className="block text-sm font-medium text-gray-700">
          Enter Your ID :
        </label>
        <input
          type="number"
          id="id"
          value={id}
          onChange={(e) => setid(e.target.value)}
          className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
          required
        />
      </div>
      <div className="mb-4">
        <label htmlFor="newPassword" className="block text-sm font-medium text-gray-700">
          New Password:
        </label>
        <input
          type="password"
          id="newPassword"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
          required
        />
      </div>
      <div>
        <button
          type="submit"
          className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          Submit
        </button>
      </div>
      {message && <p className="mt-4 text-center text-red-600">{message}</p>}
      
    <p >  Go Back <a href="/signin" class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-30 font-medium rounded-lg text-sm full sm:w-auto px-3 py-2 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-80">Sign In</a>

</p>
    </form>
    </>
  );
}