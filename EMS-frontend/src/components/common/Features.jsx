import React from "react";
import { assets } from "../../assets/assets";

const Features = () => {
  return (
    <div className="flex flex-col gap-8 px-5 py-3">
      <div className="flex flex-col md:flex-row flex-wrap items-center justify-between gap-5 md:gap-3 ">
        <div className="md:w-1/2 flex flex-col gap-4 items-start justify-center p-5">
          <h1 className="font-semibold text-3xl md:text-5xl lg:text-6xl text-emerald-900 dark:text-emerald-400">
            Monitor Employee Productivity
          </h1>
          <p className="font-medium text-lg text-gray-500 w-10/12 dark:text-neutral-200">
            Monitoting employees is challenging enough, especially if they're
            miles away. take control over your remote worker's productivity
            through daily reports on active time, activity tracking. Employees's
            attendance is automatically calculated and counted based in their
            laptop or coputer activity.
          </p>
        </div>

        <div className="md:w-[45%]">
          <img
            src={assets.EmsFeatureImg1}
            alt=""
            className="w-full bg-transparent"
          />
        </div>
      </div>

      <div className="flex flex-col-reverse md:flex-row flex-wrap items-center gap-5 justify-between md:gap-3 md:px-4">
        <div className="md:w-2/5">
          <img src={assets.EmsFeatureImg2} alt="" className="w-full" />
        </div>

        <div className="md:w-[45%] flex flex-col gap-4 items-start  justify-center p-5">
          <h1 className="font-semibold text-3xl md:text-5xl lg:text-6xl text-emerald-900 dark:text-emerald-400">
            Flexible Leave Management
          </h1>
          <p className="font-medium text-lg text-gray-500 dark:text-neutral-200 w-10/12 ">
            Leave/timeoff is an important component of a worker's experience.
            E.M.S. provides a customization platform to create you own policies
            and leave types. Workers and managers can easily view balace and the
            request history through self-service.
          </p>
        </div>
      </div>

      <div className="flex flex-col md:flex-row flex-wrap items-center justify-between gap-5 md:gap-3 md:px-4">
        <div className="md:w-1/2 flex flex-col gap-4 items-start justify-center p-5">
          <h1 className="font-semibold text-3xl md:text-5xl lg:text-6xl text-emerald-900 dark:text-emerald-400">
            Secure Password Management
          </h1>
          <p className="font-medium text-lg text-gray-500 dark:text-neutral-200 w-10/12">
            Creating and sharing passwords for each of your employees can be
            taxing and prone to security threats. Effortlessly generate complex
            passwords and share them securely through us.
          </p>
        </div>

        <div className="md:w-[45%]">
          <img
            src={assets.EmsFeatureImg3}
            alt=""
          />
        </div>
      </div>
    </div>
  );
};

export default Features;
