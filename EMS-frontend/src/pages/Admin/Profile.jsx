import React, { useContext, useEffect, useState } from "react";
import Sidebar from "../../components/common/Sidebar";
import AdminNavbar from "../../components/Admin/AdminNavbar";
import { AdminContext } from "../../context/AdminContext";
import axios from "axios";
import { toast } from "react-toastify";
import { assets } from "../../assets/assets";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const [isEdit, setIsEdit] = useState(false);
  const [image, setImage] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false); 

  const { adminProfile, getAdminProfile, setAdminProfile, aToken, setAToken, backendUrl } =
    useContext(AdminContext);
    const navigate = useNavigate()

  useEffect(() => {
    getAdminProfile();
  }, []);

  if (!adminProfile) return <p>Loading...</p>;

  const updateAdminProfileData = async () => {
    try {
      const formData = new FormData();

      formData.append("firstName", adminProfile.fullName.firstName);
      formData.append("lastName", adminProfile.fullName.lastName);
      formData.append("email", adminProfile.email);
      formData.append("password", adminProfile.password);
      formData.append("dob", adminProfile.dob);
      formData.append("phone", adminProfile.phone);
      formData.append("gender", adminProfile.gender);
      formData.append("address", adminProfile.address);
      image && formData.append("image", image);

      const { data } = await axios.post(
        backendUrl + "/api/admin/update-profile",
        formData,
        { headers: { aToken } }
      );
      if (data.success) {
        setAdminProfile(data.updatedAdmin);
        getAdminProfile()
        toast.success(data.message);
        setIsEdit(false);
        setImage(null);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error.message);
      if (error.response && error.response.data && error.response.data.message) {
      toast.error(error.response.data.message);
    } else {
      toast.error("Something went wrong!");
    }
    }
  };

   const deleteAccount = async ()=>{
       try {
         const {data} = await axios.post(backendUrl + '/api/admin/delete-profile',
           {},
           { headers: { aToken } }
         )
         if(data.success){
           toast.success(data.message)
           localStorage.removeItem("aToken");
           setAToken(null);
            navigate('/')
         }else{
           toast.error(data.message)
         }
       } catch (error) {
         console.log(error);
        if (error.response && error.response.data && error.response.data.message) {
      toast.error(error.response.data.message);
    } else {
      toast.error("Error while deleteing the profile!");
    }
       }
     }
   
  return (
    <div className="w-full flex ">
      <Sidebar />
      <div className="w-full sm:ml-[8rem] md:ml-[19.6rem] overflow-hidden">
        <AdminNavbar />

        <div
          className=" flex flex-col lg:flex-row text-sm items-center justify-center gap-10 md:gap-24 bg-white drop-shadow-md
        px-3 py-3 pt-28 mt-16  dark:bg-transparent"
        >
          <div className="flex flex-col gap-2 items-center">
            {isEdit ? (
              <label htmlFor="image">
                <div className="inline-block relative cursor-pointer">
                  <img
                    className="w-36 rounded opacity-75"
                    src={
                      image ? URL.createObjectURL(image) : assets.uploadImage
                    }
                    alt=""
                  />
                </div>
                <input
                  onChange={(e) => setImage(e.target.files[0])}
                  type="file"
                  id="image"
                  hidden
                />
              </label>
            ) : (
              <img
                className="w-72 h-68 rounded-lg"
                src={adminProfile.image || assets.uploadImage}
                alt=""
              />
            )}

            <div className="flex gap-2">
              {isEdit ? (
                <input
                  className="bg-gray-50 text-3xl font-medium max-w-24 mt-4 dark:bg-transparent placeholder:dark:text-white"
                  type="text"
                  value={adminProfile.fullName.firstName}
                  onChange={(e) =>
                    setAdminProfile((prev) => ({
                      ...prev,
                      fullName: { ...prev.fullName, firstName: e.target.value },
                    }))
                  }
                />
              ) : (
                <p className="font-medium text-3xl text-neutral-800 dark:text-white mt-4">
                  {adminProfile.fullName.firstName}
                </p>
              )}

              {isEdit ? (
                <input
                  className="bg-gray-50 text-3xl font-medium max-w-28 mt-4 dark:bg-transparent placeholder:dark:text-white"
                  type="text"
                  value={adminProfile.fullName.lastName}
                  onChange={(e) =>
                    setAdminProfile((prev) => ({
                      ...prev,
                      fullName: { ...prev.fullName, lastName: e.target.value },
                    }))
                  }
                />
              ) : (
                <p className="font-medium text-3xl text-neutral-800 dark:text-white mt-4">
                  {adminProfile.fullName.lastName}
                </p>
              )}
            </div>
          </div>

          <div className="flex flex-col gap-5">
            <div className="flex flex-col bg-white drop-shadow-md  border border-zinc-300 p-5 rounded-md dark:bg-[#1a1a1a]">
              <p className="text-neutral-900 text-lg mt-3 dark:text-white">
                BASIC INFORMATION
              </p>
              <div className="grid grid-cols-[1fr_3fr] gap-y-2.5 mt-3 text-neutral-500">
                <p className="font-medium text-base dark:text-white ">Gender:</p>
                {isEdit ? (
                  <select
                    className="max-w-20 bg-gray-100"
                    value={adminProfile.gender}
                    onChange={(e) =>
                      setAdminProfile((prev) => ({
                        ...prev,
                        gender: e.target.value,
                      }))
                    }
                  >
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                  </select>
                ) : (
                  <p className="text-gray-600 dark:text-neutral-100 text-base">
                    {adminProfile.gender}
                  </p>
                )}

                <p className="font-medium text-base dark:text-white ">DOB:</p>
                {isEdit ? (
                  <input
                    className="max-w-28 bg-gray-100 dark:bg-transparent placeholder:dark:text-white"
                    type="date"
                    value={adminProfile.dob}
                    onChange={(e) =>
                      setAdminProfile((prev) => ({
                        ...prev,
                        dob: e.target.value,
                      }))
                    }
                  />
                ) : (
                  <p className="text-gray-600 dark:text-gray-100 text-base">
                    {adminProfile.dob}
                  </p>
                )}
              </div>
            </div>

            <div className="flex flex-col bg-white drop-shadow-md border border-zinc-300 p-5 rounded-md dark:bg-[#1a1a1a]">
              <p className="text-neutral-900 text-lg mt-3 dark:text-white">
                CONTACT INFORMATION
              </p>
              <div className="grid grid-cols-[1fr_3fr] gap-y-2.5 mt-3 text-neutral-500 dark:text-neutral-100">
                <p className="text-base font-medium">Email id:</p>
                {isEdit ? (
                  <input
                    className="bg-gray-100  max-w-28 dark:bg-transparent placeholder:dark:text-white"
                    type="text"
                    value={adminProfile.email}
                    onChange={(e) =>
                      setAdminProfile((prev) => ({
                        ...prev,
                        email: e.target.value,
                      }))
                    }
                  />
                ) : (
                  <p className="text-gray-600 dark:text-neutral-100 text-base">
                    {adminProfile.email}
                  </p>
                )}

                <p className="font-medium text-base">Phone:</p>
                {isEdit ? (
                  <input
                    className="bg-gray-100  dark:bg-transparent max-w-52 placeholder:dark:text-white"
                    type="text"
                    value={adminProfile.phone}
                    onChange={(e) =>
                      setAdminProfile((prev) => ({
                        ...prev,
                        phone: e.target.value,
                      }))
                    }
                  />
                ) : (
                  <p className="text-blue-400 text-base">
                    {adminProfile.phone}
                  </p>
                )}

                <p className="font-medium text-base"> Address: </p>
                {isEdit ? (
                  <p>
                    <input
                      className="bg-gray-50 dark:bg-transparent placeholder:dark:text-white"
                      type="text"
                      value={adminProfile.address}
                      onChange={(e) =>
                        setAdminProfile((prev) => ({
                          ...prev,
                          address: e.target.value,
                        }))
                      }
                    />
                  </p>
                ) : (
                  <p className="text-gray-500 dark:text-gray-50 text-base">
                    {adminProfile.address}{" "}
                  </p>
                )}
              </div>
            </div>

           <div className="mt-10 flex gap-2">
              {isEdit ? (
                <button
                  className="border border-primary px-8 py-2 rounded-lg bg-green-500 hover:bg-green-600 hover:text-white transition-all
                            text-base sm:text-xl "
                  onClick={() => updateAdminProfileData()}
                >
                  Save Information
                </button>
              ) : (
                <button
                  className="border border-primary px-8 py-2 rounded-md bg-green-500 hover:bg-green-600 hover:text-white transition-all
                            text-base sm:text-xl "
                  onClick={() => setIsEdit(true)}
                >
                  Edit
                </button>
              )}
              <button
                onClick={() => setShowDeleteModal(true)}
                className="border border-primary px-10 py-2 rounded-lg bg-red-500 hover:bg-red-700
               hover:text-white transition-all text-base sm:text-xl font-normal"
              >
                Delete Account
              </button>
            </div>
          </div>
        </div>
         {/* Delete Account Modal */}
         {showDeleteModal && (
          <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center z-50">
            <div className="bg-white p-5 dark:bg-[#1a1a1a] rounded-lg">
              <p className="text-lg">Are you sure you want to delete your account? </p>
              <div className="flex items-center justify-center gap-6 mt-4">
                <button
                  className="bg-red-600 text-white px-5 py-2 rounded-md"
                  onClick={()=>deleteAccount()} 
                >
                  Delete
                </button>
                <button
                  className="bg-gray-300 text-black px-5 py-2 rounded-md"
                  onClick={() => setShowDeleteModal(false)} 
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Profile;
