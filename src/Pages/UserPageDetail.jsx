import React, { useEffect, useState } from "react";
import { AiFillEdit } from "react-icons/ai";
import { BsArrowLeft, BsChevronLeft } from "react-icons/bs";
import { useParams } from "react-router-dom";
import { fetchSingleUser, updateUser } from "../Api/user";
import Loader from "../Components/Loader";
import { useMutation, useQuery } from "@tanstack/react-query";

export default function UserPageDetail() {
  const { id } = useParams();
  console.log(id);


  const mutation = useMutation({
    mutationFn:updateUser
  });




  const queryResult = useQuery({
    queryKey: ["userSingleData", { id }],
    queryFn: () => fetchSingleUser(id),
    keepPreviousData: true,
  });

  




  const [userData, setUserData] = useState({
    fullname: "",
    email: "",
    interest: "",
    region: "",
    phoneNumber: "",
    status: "",
    role: "",
    pin:'',
    country:'',
  });



 

  
  useEffect(() => {
    // Update state when data is available
    if (queryResult.isSuccess) {
      setUserData((prev) => ({
        ...prev,
        fullname: queryResult.data.data.fullname || "",
        email: queryResult.data.data.email || "",
        interest: queryResult.data.data.interest || "",
        region: queryResult.data.data.region || "",
        phoneNumber: queryResult.data.data.phoneNumber || "",
        status: queryResult.data.data.status || "",
        role: queryResult.data.data.role || "",
        pin: queryResult.data.data.pin || "",
        country: queryResult.data.data.country || "",
      }));
    }
  }, [queryResult.isSuccess, queryResult.data]);
  



  const handleForm = (e) => {
    setUserData((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
  };

  



  const handleSubmit = async(e)  => {
    e.preventDefault();
    
    const result = await mutation.mutateAsync({id,...userData});
    if(mutation.isSuccess){
      queryResult.refetch();
      alert('Edited succesfully')
    }  
  };

  return queryResult.isLoading ? (
    <Loader />
  ) : (
    <div className="flex gap-4 flex-col">
      <div className="bg-white rounded-md p-6 flex flex-col gap-3">
        <button className="btn btn-sm bg-primary hover:bg-secondary h-[54px] self-start items-center  text-md outline-none text-white">
          <BsChevronLeft /> Back
        </button>
        <div className="flex justify-between items-center">
          <div className="flex ">
            <h1 className="secondary-text text-[23px]">Bio Info</h1>
          </div>

          {/* You can open the modal using document.getElementById('ID').showModal() method */}
          <button
            className="btn btn-sm bg-primary hover:bg-secondary h-[54px] w-[189px]  text-md outline-none text-white"
            onClick={() => document.getElementById("my_modal_3").showModal()}
          >
            <AiFillEdit /> Edit User
          </button>
          <dialog id="my_modal_3" className="modal">
            <div className="modal-box">
              <form method="dialog">
                {/* if there is a button in form, it will close the modal */}
                <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
                  ✕
                </button>
              </form>
              <h3 className="font-bold text-lg">Edit User!</h3>

              <form
                onSubmit={handleSubmit}
                className="flex flex-col my-2 gap-1.5"
              >
                <div className="flex flex-col gap-1 w-full">
                  <h4 className="secondary-text text-[16px]">Full Name</h4>

                  <input
                    type="text"
                    className="flex p-2 bg-gray-100 outline-none rounded-lg"
                    placeholder="First Name"
                    value={userData?.fullname}
                    onChange={handleForm}
                    name="fullname"
                  />
                </div>

                <div className="flex flex-col gap-1 w-full">
                  <h4 className="secondary-text text-[16px]">Email</h4>

                  <input
                    type="text"
                    className="flex p-2 bg-gray-100 outline-none rounded-lg"
                    placeholder="First Name"
                    value={userData?.email}
                    name="email"
                    onChange={handleForm}
                  />
                </div>

                <div className="flex flex-col gap-1 w-full">
                  <h4 className="secondary-text text-[16px]">Phone Number</h4>

                  <input
                    type="text"
                    className="flex p-2 bg-gray-100 outline-none rounded-lg"
                    placeholder="First Name"
                    value={userData?.phoneNumber}
                    name="phoneNumber"
                    onChange={handleForm}
                  />
                </div>

                <div className="flex flex-col gap-1 w-full">
                  <h4 className="secondary-text text-[16px]">Region</h4>

                  <input
                    type="text"
                    className="flex p-2 bg-gray-100 outline-none rounded-lg"
                    placeholder="First Name"
                    value={userData?.region}
                    onChange={handleForm}
                    name="region"
                  />
                </div>

                <div className="flex flex-col gap-1 w-full">
                  <h4 className="secondary-text text-[16px]">Role</h4>

                  <select
                    className="flex p-2 bg-gray-100 outline-none rounded-lg"
                    name="role"
                    defaultValue={userData?.role}
                    onChange={handleForm}
                    id=""
                  >
                    <option value="admin">Admin</option>
                    <option value="user">User</option>
                  </select>
                </div>

                <div className="flex flex-col gap-1 w-full">
                  <h4 className="secondary-text text-[16px]">Status</h4>

                  <select
                    className="flex p-2 bg-gray-100 outline-none rounded-lg"
                    name="status"
                    defaultValue={userData?.status}
                    onChange={handleForm}
                    id=""
                  >
                    <option value="verified">verified</option>
                    <option value="deactivate">Deactivate</option>
                  </select>
                </div>

                <div className="flex flex-col gap-1 w-full">
                  <h4 className="secondary-text text-[16px]">Interest</h4>

                  <input
                    type="text"
                    className="flex p-2 bg-gray-100 outline-none rounded-lg"
                    placeholder="First Name"
                    value={userData?.interest}
                    onChange={handleForm}
                    name="interest"
                  />
                </div>

                
                <div className="flex flex-col gap-1 w-full">
                  <h4 className="secondary-text text-[16px]">Pin</h4>

                  <input
                    type="text"
                    className="flex p-2 bg-gray-100 outline-none rounded-lg"
                    placeholder="First Name"
                    value={userData?.pin}
                    onChange={handleForm}
                    name="pin"
                  />
                </div>

                <div className="flex flex-col gap-1 w-full">
                  <h4 className="secondary-text text-[16px]">Country</h4>

                  <input
                    type="text"
                    className="flex p-2 bg-gray-100 outline-none rounded-lg"
                    placeholder="First Name"
                    value={userData?.country}
                    onChange={handleForm}
                    name="country"
                  />
                </div>
                {/* <div className="flex flex-col gap-1 w-full">
                  <h4 className="secondary-text text-[16px]">Account Name</h4>

                  <input
                    type="text"
                    className="flex p-2 bg-gray-100 outline-none rounded-lg"
                    placeholder="First Name"
                    value={queryResult.data.data?.accountDetails[0].accountName}

                  />
                </div>

                <div className="flex flex-col gap-1 w-full">
                  <h4 className="secondary-text text-[16px]">Account Number</h4>

                  <input
                    type="text"
                    className="flex p-2 bg-gray-100 outline-none rounded-lg"
                    placeholder="First Name"
                    value={queryResult.data.data?.accountDetails[0].accountNumber}

                  />
                </div>

                <div className="flex flex-col gap-1 w-full">
                  <h4 className="secondary-text text-[16px]">Bank Name</h4>

                  <input
                    type="text"
                    className="flex p-2 bg-gray-100 outline-none rounded-lg"
                    placeholder="First Name"
                    value={queryResult.data.data?.accountDetails[0].bankName}

                  />
                </div> */}
                <button
                  type="submit"
                  className="bg-primary btn hover:bg-secondary  outline-none  bottom-[10px] right-[10px] md:bottom-[48px] md:right-[48px] w-full  text-white flex items-center justify-center rounded-[5px]  gap-[12px]"
                >
                  Update User
                </button>
              </form>
            </div>
          </dialog>
        </div>

        <div className="info-row flex gap-4 w-[80%]  mt-4">
          <div className="flex flex-col gap-1 w-full">
            <h4 className="secondary-text text-[16px]">Full Name</h4>

            <div className="flex p-2 bg-gray-100 rounded-lg">
              {queryResult.data?.data?.fullname}
            </div>
          </div>

          <div className="flex flex-col gap-1 w-full">
            <h4 className="secondary-text text-[16px]">Email</h4>

            <div className="flex p-2 bg-gray-100 rounded-lg">
              {queryResult.data?.data?.email}
            </div>
          </div>
        </div>

        <div className="info-row flex gap-4 w-[80%]  mt-4">
          <div className="flex flex-col gap-1 w-full">
            <h4 className="secondary-text text-[16px]">Pin</h4>

            <div className="flex p-2 bg-gray-100 rounded-lg">
              {queryResult.data?.data?.pin}
            </div>
          </div>

          <div className="flex flex-col gap-1 w-full">
            <h4 className="secondary-text text-[16px]">Region</h4>

            <div className="flex p-2 bg-gray-100 rounded-lg">
              {queryResult.data.data.region}
            </div>
          </div>
        </div>

        <div className="info-row flex gap-4 w-[80%]  mt-4">
          <div className="flex flex-col gap-1 w-full">
            <h4 className="secondary-text text-[16px]">Phone Number</h4>

            <div className="flex p-2 bg-gray-100 rounded-lg">
              {queryResult.data?.data?.phoneNumber}
            </div>
          </div>

          <div className="flex flex-col gap-1 w-full">
            <h4 className="secondary-text text-[16px]">Status</h4>

            <div className="flex p-2 bg-gray-100 rounded-lg">
              {queryResult.data?.data?.status}
            </div>
          </div>
        </div>

        <div className="info-row flex gap-4 w-[80%]  mt-4">
          <div className="flex flex-col gap-1 w-full">
            <h4 className="secondary-text text-[16px]">Role</h4>

            <div className="flex p-2 bg-gray-100 rounded-lg">
              {" "}
              {queryResult.data?.data?.role}
            </div>
          </div>

          <div className="flex flex-col gap-1 w-full">
            <h4 className="secondary-text text-[16px]">Interest</h4>

            <div className="flex p-2 bg-gray-100 rounded-lg">
              {queryResult.data?.data?.interest.join(",")}
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-md p-6 flex flex-col">
        <h1 className="secondary-text text-[23px]">Bank Info</h1>

        <div className="info-row flex gap-4 w-[80%]  mt-4">
          <div className="flex flex-col gap-1 w-full">
            <h4 className="secondary-text text-[16px]">Account Name</h4>

            <div className="flex p-2 bg-gray-100 rounded-lg">
              {queryResult.data?.data?.accountDetails[0]?.accountName}
            </div>
          </div>

          <div className="flex flex-col gap-1 w-full">
            <h4 className="secondary-text text-[16px]">Account Number</h4>

            <div className="flex p-2 bg-gray-100 rounded-lg">
              {queryResult.data?.data?.accountDetails[0]?.accountNumber}
            </div>
          </div>
        </div>

        <div className="info-row flex gap-4 w-[80%]  mt-4">
          <div className="flex flex-col gap-1 w-full">
            <h4 className="secondary-text text-[16px]">Bank Name</h4>

            <div className="flex p-2 bg-gray-100 rounded-lg">
              {queryResult.data?.data?.accountDetails[0]?.bankName}
            </div>
          </div>

          <div className="flex flex-col gap-1 w-full"></div>
        </div>
      </div>
    </div>
  );
}
