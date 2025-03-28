import React, { useContext, useState } from "react";
import Sidebar from "../../components/common/Sidebar";
import AdminNavbar from "../../components/Admin/AdminNavbar";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { AdminContext } from "../../context/AdminContext";
import axios from "axios";

const CreateEmployee = () => {
  const navigate = useNavigate();
  const { backendUrl, aToken } = useContext(AdminContext);
  const [passwordVisible, setPasswordVisible] = useState(false);

  const [Img, setImg] = useState(false);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [dob, setDob] = useState("1 Year");
  const [phone, setPhone] = useState("");
  const [gender, setGender] = useState("");
  const [position, setPosition] = useState("");
  const [salary, setSalary] = useState("");
  const [address, setAddress] = useState("");
  const [joiningDate, setJoiningDate] = useState("");
  const [department, setDepartment] = useState("");
  const [workingType, setWorkingType] = useState("");

  const onSubmitHandler = async (e) => {
    e.preventDefault();

    try {
      if (!Img) {
        return toast.error("Image is not selected");
      }

      const formData = new FormData();

      formData.append("image", Img);
      formData.append("fullName[firstName]", firstName);
      formData.append("fullName[lastName]", lastName);
      formData.append("email", email);
      formData.append("password", password);
      formData.append("dob", dob);
      formData.append("phone", phone);
      formData.append("gender", gender);
      formData.append("position", position);
      formData.append("salary", salary);
      formData.append("address", address);
      formData.append("joiningDate", joiningDate);
      formData.append("department", department);
      formData.append("workingType", workingType);

      formData.forEach((value, key) => {
        console.log(`${key}:${value}`);
      });

      const { data } = await axios.post(
        backendUrl + "/api/admin/create-employee",
        formData,
        { headers: { aToken } }
      );

      if (data.success) {
        toast.success(data.message);
        setImg(false);
        setFirstName("");
        setLastName("");
        setEmail("");
        setPassword("");
        setDob("");
        setPhone("");
        setGender("");
        setPosition("");
        setSalary("");
        setAddress("");
        setJoiningDate("");
        setDepartment("");
        setWorkingType("");
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error("Something Went Wrong!");
      console.log(error.message);
    }
  };

  return (
    <div className="w-full flex">
      <Sidebar />
      <div className="w-full sm:ml-[8rem] md:ml-[19.6rem] overflow-hidden">
        <AdminNavbar />
        <div className="p-4 flex flex-col gap-8 relative">
          <h1 className="font-medium text-2xl text-neutral-800 dark:text-white">
            Add New Employee
          </h1>

          <form
            className="p-10 px-10 bg-white border drop-shadow-md flex flex-col items-center justify-between gap-5 rounded-xl mx-10 
          dark:bg-[#1a1a1a] dark:border-[#535353]"
            onSubmit={onSubmitHandler}
          >
            <div className="flex flex-col lg:flex-row items-start justify-between gap-4 w-full">
              <div className="flex flex-col gap-2 w-full  lg:w-1/2">
                <h3 className="text-lg text-zinc-800 font-medium dark:text-white">
                  FirstName
                </h3>
                <input
                  type="text"
                  value={firstName}
                  placeholder="Enter firstName"
                  onChange={(e) => setFirstName(e.target.value)}
                  className="bg-zinc-100 border border-zinc-300 text-lg placeholder:text-base rounded-sm  px-4 py-2 w-full dark:bg-transparent"
                />
              </div>

              <div className="flex flex-col gap-2 w-full lg:w-1/2">
                <h3 className="text-lg text-zinc-800 font-medium dark:text-white">
                  LastName
                </h3>
                <input
                  type="text"
                  value={lastName}
                  placeholder="Enter lastName"
                  onChange={(e) => setLastName(e.target.value)}
                  className="bg-zinc-100  border border-zinc-300 text-lg placeholder:text-base rounded-sm w-full px-4 py-2 dark:bg-transparent"
                />
              </div>
            </div>

            <div className="flex flex-col lg:flex-row items-start justify-between gap-4 w-full">
              <div className="flex flex-col gap-2 w-full lg:w-1/2">
                <h3 className="text-lg text-zinc-800 font-medium dark:text-white">
                  Email
                </h3>
                <input
                  type="text"
                  value={email}
                  placeholder="Enter email"
                  onChange={(e) => setEmail(e.target.value)}
                  className="bg-zinc-100  border border-zinc-300 text-lg placeholder:text-base rounded-sm w-full px-4 py-2 dark:bg-transparent"
                />
              </div>

              <div className="flex flex-col gap-2 w-full lg:w-1/2 relative">
                <h3 className="text-lg text-zinc-800 font-medium dark:text-white">
                  Password
                </h3>
                <input
                  type={passwordVisible ? "text" : "password"}
                  value={password}
                  placeholder="password"
                  onChange={(e) => setPassword(e.target.value)}
                  className="bg-zinc-100  border border-zinc-300 text-lg placeholder:text-base rounded-sm w-full px-4 py-2 dark:bg-transparent"
                />

                {/* Eye icon to toggle password visibility */}
                <div
                  className="absolute right-2 top-1/2 cursor-pointer"
                  onClick={() => setPasswordVisible(!passwordVisible)}
                >
                  {passwordVisible ? (
                    <i className="ri-eye-line text-xl text-zinc-700 dark:text-zinc-300"></i>
                  ) : (
                    <i className="ri-eye-off-line text-xl text-zinc-700 dark:text-zinc-300"></i>
                  )}
                </div>
              </div>
            </div>

            <div className="flex flex-col lg:flex-row items-start justify-between gap-4 w-full">
              <div className="flex flex-col gap-2 w-full lg:w-1/2">
                <h3 className="text-lg text-zinc-800 font-medium dark:text-white ">
                  Dob
                </h3>
                <input
                  type="date"
                  value={dob}
                  placeholder="Enter Dob"
                  onChange={(e) => setDob(e.target.value)}
                  className="bg-zinc-100  border border-zinc-300 text-lg placeholder:text-base rounded-sm w-full px-4 py-2 dark:bg-transparent"
                />
              </div>

              <div className="flex flex-col gap-2 w-full lg:w-1/2">
                <h3 className="text-lg text-zinc-800 font-medium dark:text-white ">
                  Gender
                </h3>
                <select
                  value={gender}
                  placeholder=""
                  onChange={(e) => setGender(e.target.value)}
                  className="bg-zinc-100  border border-zinc-300 text-lg placeholder:text-base rounded-sm w-full px-4 py-2 dark:bg-transparent"
                >
                  <option
                    className="dark:bg-neutral-800 dark:text-white"
                    value=""
                  >
                    Select Gender
                  </option>
                  <option
                    className="dark:bg-neutral-800 dark:text-white"
                    value="Male"
                  >
                    Male
                  </option>
                  <option
                    className="dark:bg-neutral-800 dark:text-white"
                    value="Female"
                  >
                    Female
                  </option>
                  <option
                    className="dark:bg-neutral-800 dark:text-white"
                    value="Other"
                  >
                    Other
                  </option>
                </select>
              </div>
            </div>

            <div className="flex flex-col lg:flex-row items-start justify-between gap-4 w-full">
              <div className="flex flex-col gap-2 w-full lg:w-1/2">
                <h3 className="text-lg text-zinc-800 font-medium dark:text-white ">
                  Address
                </h3>
                <input
                  type="text"
                  value={address}
                  placeholder="Enter address"
                  onChange={(e) => setAddress(e.target.value)}
                  className="bg-zinc-100  border border-zinc-300 text-lg placeholder:text-base rounded-sm w-full px-4 py-2 dark:bg-transparent"
                />
              </div>

              <div className="flex flex-col gap-2 w-full lg:w-1/2">
                <h3 className="text-lg text-zinc-800 font-medium dark:text-white ">
                  Phone No.
                </h3>
                <input
                  type="text"
                  value={phone}
                  placeholder="Enter Phone No."
                  onChange={(e) => setPhone(e.target.value)}
                  className="bg-zinc-100  border border-zinc-300 text-lg placeholder:text-base rounded-sm w-full px-4 py-2 dark:bg-transparent"
                />
              </div>
            </div>

            <div className="flex flex-col lg:flex-row items-start justify-between gap-4 w-full">
            <div className="flex flex-col gap-2 w-full lg:w-1/2">
                <h3 className="text-lg text-zinc-800 font-medium dark:text-white ">
                  Department
                </h3>
                <input
                  type="text"
                  value={department}
                  placeholder="Enter department"
                  onChange={(e) => setDepartment(e.target.value)}
                  className="bg-zinc-100 border border-zinc-300 text-lg placeholder:text-base rounded-sm w-full px-4 py-2 dark:bg-transparent"
                />
              </div>

              <div className="flex flex-col gap-2 w-full lg:w-1/2">
                <h3 className="text-lg text-zinc-800 font-medium dark:text-white ">
                  Position
                </h3>
                <input
                  type="text"
                  value={position}
                  placeholder="Enter Position"
                  onChange={(e) => setPosition(e.target.value)}
                  className="bg-zinc-100  border border-zinc-300 text-lg placeholder:text-base rounded-sm w-full px-4 py-2 dark:bg-transparent"
                />
              </div>

            </div>

            <div className="flex flex-col lg:flex-row items-start justify-between gap-4 w-full">
              <div className="flex flex-col gap-2 w-full lg:w-1/2">
                <h3 className="text-lg text-zinc-800 font-medium dark:text-white ">
                  Joining Date
                </h3>
                <input
                  type="date"
                  value={joiningDate}
                  placeholder=""
                  onChange={(e) => setJoiningDate(e.target.value)}
                  className="bg-zinc-100 border border-zinc-300 text-lg placeholder:text-base rounded-sm w-full px-4 py-2 dark:bg-transparent"
                />
              </div>

              <div className="flex flex-col gap-2 w-full lg:w-1/2">
                <h3 className="text-lg text-zinc-800 font-medium dark:text-white ">
                  Salary
                </h3>
                <input
                  type="text"
                  value={salary}
                  placeholder="Enter Salary"
                  onChange={(e) => setSalary(e.target.value)}
                  className="bg-zinc-100  border border-zinc-300 text-lg placeholder:text-base rounded-sm w-full px-4 py-2 dark:bg-transparent"
                />
              </div>
            </div>

            <div className="flex flex-col lg:flex-row items-start justify-between gap-8 w-full">
              <div className="flex flex-col gap-2 w-full lg:w-1/2">
                <h3 className="text-lg text-zinc-800 font-medium dark:text-white ">
                  Working Type
                </h3>
                <select
                  value={workingType}
                  placeholder=""
                  onChange={(e) => setWorkingType(e.target.value)}
                  className="bg-zinc-100  border border-zinc-300 text-lg placeholder:text-base rounded-sm w-full px-4 py-2 dark:bg-transparent"
                >
                  <option
                    className="dark:bg-neutral-800 dark:text-white"
                    value=""
                  >
                    Select Working Type
                  </option>
                  <option
                    className="dark:bg-neutral-800 dark:text-white"
                    value="Onsite"
                  >
                    Onsite
                  </option>
                  <option
                    className="dark:bg-neutral-800 dark:text-white"
                    value="Remote"
                  >
                    Remote
                  </option>
                  <option
                    className="dark:bg-neutral-800 dark:text-white"
                    value="Hybrid"
                  >
                    Hybrid
                  </option>
                </select>
              </div>

              <div className="flex flex-col gap-2 w-full">
                <h3 className="text-lg text-zinc-800 font-medium dark:text-white ">
                  Upload Image
                </h3>
                <label htmlFor="img">
                  <img
                    src={Img ? URL.createObjectURL(Img) : ""}
                    className="w-16 bg-zinc-100 rounded-lg cursor-pointer"
                    alt=""
                  />
                </label>
                <input
                  onChange={(e) => setImg(e.target.files[0])}
                  type="file"
                  id="img"
                />
              </div>
            </div>

            <div className="flex w-full gap-4">
              <button
                type="submit"
                className="px-4 py-2 bg-green-700 text-white rounded-sm text-lg font-normal"
              >
                Submit
              </button>
              <button
                className="px-4 py-2 bg-red-600 text-white rounded-sm text-lg font-normal"
                onClick={() => navigate("/all-employees")}
              >
                Go Back
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreateEmployee;
