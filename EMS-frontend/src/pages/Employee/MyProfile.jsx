import React, { useContext, useEffect, useState } from "react";
import Sidebar from "../../components/common/Sidebar";
import EmployeeNavbar from "../../components/Employee/EmployeeNavbar";
import { EmployeeContext } from "../../context/EmployeeContext";
import { toast } from "react-toastify";
import axios from "axios";
import { assets } from "../../assets/assets";

const MyProfile = () => {
  const { profile, setProfile, getMyProfile, backendUrl, token } =
    useContext(EmployeeContext);

  const [isEdit, setIsEdit] = useState(false);
  const [image, setImage] = useState(null);

  useEffect(() => {
    getMyProfile();
  }, []);

  if (!profile) return <p>Loading...</p>;

  const updateProfile = async () => {
    try {
      const formData = new FormData();

      formData.append("firstName", profile.fullName.firstName);
      formData.append("lastName", profile.fullName.lastName);
      formData.append("dob", profile.dob);
      formData.append("phone", profile.phone);
      formData.append("gender", profile.gender);
      formData.append("address", profile.address);
      image && formData.append("image", image);

      const { data } = await axios.post(
        backendUrl + "/api/employee/update-profile",
        formData,
        { headers: { token } }
      );
      if (data.success) {
        setProfile(data.updatedEmployee);
        getMyProfile()
        toast.success(data.message);
        setIsEdit(false);
        setImage(null);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
      if (error.response && error.response.data && error.response.data.message) {
      toast.error(error.response.data.message);
    } else {
      toast.error("Something went wrong!");
    }
    }
  };

  return (
    <div className="w-full flex">
      <Sidebar />
      <div className="w-full  sm:ml-[8.5rem] md:ml-[19.6rem] overflow-hidden">
        <EmployeeNavbar />

        <div
          className="flex flex-col lg:flex-row text-sm items-center justify-center gap-10 md:gap-24 w-full bg-white drop-shadow-md
               dark:bg-transparent dark:border-[#535353]  p-6  pt-28 mt-16 cursor-pointer"
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
                    alt="profile"
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
                src={profile.image || assets.uploadImage}
                alt=""
              />
            )}

            <div className="flex gap-2">
              {isEdit ? (
                <input
                  className="bg-gray-50 text-3xl font-medium max-w-24 mt-4 dark:bg-transparent"
                  type="text"
                  value={profile.fullName.firstName}
                  onChange={(e) =>
                    setProfile((prev) => ({
                      ...prev,
                      fullName: { ...prev.fullName, firstName: e.target.value },
                    }))
                  }
                />
              ) : (
                <p className="font-medium text-3xl text-neutral-800 mt-4 dark:text-white">
                  {profile.fullName.firstName}
                </p>
              )}

              {isEdit ? (
                <input
                  className="bg-gray-50 text-3xl font-medium max-w-28 mt-4 dark:bg-transparent"
                  type="text"
                  value={profile.fullName.lastName}
                  onChange={(e) =>
                    setProfile((prev) => ({
                      ...prev,
                      fullName: { ...prev.fullName, lastName: e.target.value },
                    }))
                  }
                />
              ) : (
                <p className="font-medium text-3xl text-neutral-800 mt-4 dark:text-white">
                  {profile.fullName.lastName}
                </p>
              )}
            </div>

            <div className="flex flex-col gap-1 items-center mt-2">
              <div
                className="px-4 py-1 bg-white drop-shadow-md border border-zinc-300 rounded-lg w-full
               dark:bg-[#1a1a1a] dark:border-[#535353]"
              >
                <p className="text-neutral-700 font-medium text-base dark:text-white">
                  Email
                </p>

                  <p className="font-medium text-lg text-neutral-800 dark:text-white">
                    {profile.email}
                  </p>
              
              </div>

              <div
                className="px-4 py-1 bg-white drop-shadow-md border border-zinc-300 rounded-lg w-full
               dark:bg-[#1a1a1a] dark:border-[#535353]"
              >
                <p className="text-neutral-700 font-medium text-base dark:text-white">
                  Position
                </p>
              
                  <p className="font-medium text-lg text-neutral-800 dark:text-white">
                    {profile.position}
                  </p>
              
              </div>

              <div
                className="px-4 py-1 bg-white drop-shadow-md border border-zinc-300 rounded-lg w-full
               dark:bg-[#1a1a1a] dark:border-[#535353]"
              >
                <p className="text-neutral-700 font-medium text-base dark:text-white">
                  Department
                </p>
              
                  <p className="font-medium text-lg text-neutral-800 dark:text-white">
                    {profile.department}
                  </p>
               
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-5">
            <div
              className="flex flex-col bg-white drop-shadow-md rounded-lg p-5 border border-zinc-300
             dark:bg-[#1a1a1a] dark:border-[#535353]"
            >
              <p className="text-neutral-900 text-lg  mt-3 dark:text-white">
                BASIC INFORMATION
              </p>
              <div className="grid grid-cols-[1fr_3fr] gap-y-2.5 mt-3 text-neutral-500">
                <p className="font-medium text-base text-neutral-700 dark:text-white">
                  Gender:
                </p>
                {isEdit ? (
                  <select
                    className="max-w-20 bg-gray-100 dark:bg-transparent"
                    value={profile.gender}
                    onChange={(e) =>
                      setProfile((prev) => ({
                        ...prev,
                        lastName: e.target.value,
                      }))
                    }
                  >
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                  </select>
                ) : (
                  <p className="text-gray-600 text-base dark:text-white">
                    {profile.gender}
                  </p>
                )}

                <p className="font-medium text-base text-neutral-700 dark:text-white">
                  DOB:
                </p>
                {isEdit ? (
                  <input
                    className="max-w-28 bg-gray-100 dark:bg-transparent"
                    type="date"
                    value={profile.dob}
                    onChange={(e) =>
                      setProfile((prev) => ({ ...prev, dob: e.target.value }))
                    }
                  />
                ) : (
                  <p className="text-gray-600 text-base dark:text-white">
                    {profile.dob}
                  </p>
                )}

                <p className="font-medium text-base text-neutral-700 dark:text-white">
                  Salary:
                </p>
            
                  <p className="text-gray-600 text-base dark:text-gray-100">
                    {profile.salary}
                  </p>
              

                <p className="font-medium text-base text-neutral-700 dark:text-neutral-100">
                  Joining Date:
                </p>
                <p className="text-gray-600 text-base dark:text-gray-100">
                  {profile.joiningDate}
                </p>
              </div>
            </div>

            <div
              className="flex flex-col bg-white drop-shadow-md rounded-lg p-5 border border-zinc-300
             dark:bg-[#1a1a1a] dark:border-[#535353]"
            >
              <p className="text-neutral-900 text-lg  mt-3 dark:text-white">
                CONTACT INFORMATION
              </p>
              <div className="grid grid-cols-[1fr_3fr] gap-y-2.5 mt-3 text-neutral-500">
                <p className="font-medium text-base text-neutral-700 dark:text-white">
                  Phone:
                </p>
                {isEdit ? (
                  <input
                    className="bg-gray-100 dark:bg-transparent max-w-52"
                    type="text"
                    value={profile.phone}
                    onChange={(e) =>
                      setProfile((prev) => ({ ...prev, phone: e.target.value }))
                    }
                  />
                ) : (
                  <p className="text-blue-400 text-base">{profile.phone}</p>
                )}

                <p className="font-medium text-base text-neutral-700 dark:text-white">
                  Address:
                </p>
                {isEdit ? (
                  <input
                    className="bg-gray-50 dark:bg-transparent"
                    type="text"
                    value={profile.address}
                    onChange={(e) =>
                      setProfile((prev) => ({
                        ...prev,
                        address: e.target.value,
                      }))
                    }
                  />
                ) : (
                  <p className="text-gray-500 text-base dark:text-white">
                    {profile.address}
                  </p>
                )}
              </div>
            </div>

            <div className="mt-10 flex gap-2">
              {isEdit ? (
                <button
                  className="border border-primary px-10 py-2 rounded-lg bg-green-500 hover:bg-green-600
                 hover:text-white transition-all text-xl font-medium"
                  onClick={() => updateProfile()}
                >
                  Save Information
                </button>
              ) : (
                <button
                  className="border border-primary px-10 py-2 rounded-lg bg-green-500 hover:bg-green-600
                 hover:text-white transition-all text-xl font-medium"
                  onClick={() => setIsEdit(true)}
                >
                  Edit
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyProfile;
