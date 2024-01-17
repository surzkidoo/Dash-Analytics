import { useQuery } from "@tanstack/react-query";
import React, { useEffect, useRef, useState } from "react";
import { fetchData } from "../Api/analytics";
import Loader from "../Components/Loader";
import { AiFillCaretDown, AiOutlineSearch } from "react-icons/ai";
import { fetchUser } from "../Api/user";
import { MdMore } from "react-icons/md";

export default function AdsPage() {
  return (
    <div className="w-full">
      {/* <p>TransactionPage</p> */}

      <div className="bg-white w-full p-4 rounded-sm   max-w-full bg-green-900 ">
        <div className="flex flex-col bg-white gap-2  h-[75vh] w-full">
          <div className="flex justify-between items-center">
            <h1>Ads Record</h1>

            {/* <div className="flex flex-row gap-3 items-center ">

            <div className=" bg-white gap-2  hidden md:flex  flex-row pl-2 items-center border  rounded-md">
              <AiOutlineSearch size={20} className="text-slate-400" />
              <input type="text" className="text-[14px] p-1.5 outline-none placeholder:text-[13px]" onChange={handleSearch} placeholder="Search Record by UserId" />
            </div>


            <details className="dropdown dropdown-end self-end">
                <summary className="m-1 btn btn-sm text-[13px]  bg-violet-800 rounded-md hover:bg-violet-700 text-white bg">Filter Result <AiFillCaretDown/> </summary>
                <div className="p-2 border flex gap-1.5 flex w-[300px]  bg-white  shadow menu dropdown-content z-[10]  rounded-box w-52">
                    <div className="flex gap-3 ">
                        <p className={`text-[12px] hover:text-purple-500 ${sortDateType=='today' ? 'text-purple-500': null}`} onClick={()=> sortDateType=='today'? handleClear(): setSortDateType('today')}>Today</p>
                        <p  className={`text-[12px] hover:text-purple-500 ${sortDateType=='yesterday' && 'text-purple-500'}`}  onClick={()=>sortDateType=='yesterday'? handleClear() :  setSortDateType('yesterday')}>YesterDay</p>
                        <p className={`text-[12px] hover:text-purple-500 ${sortDateType=='last30' && 'text-purple-500'}`} onClick={()=> sortDateType=='last30'? handleClear() :  setSortDateType('last30')}>30 Days</p>
                    </div>

                    <div className="w-full flex flex-col gap-1">
                        <label htmlFor="" className="text-gray-900 text-[14px] font-bold ">Custom Date Range</label>
                        <div className="flex w-full ">
                        <input type="date" placeholder="from" ref={startRef} className="w-full text-gray-900 p-2 border text-[13px]" />
                        <input type="date" placeholder="to" ref={enddRef} className="w-full text-gray-900 p-2 border text-[13px]" />
                        </div>
                    </div>

                    <div className="w-full flex flex-col gap-1">
                        <label htmlFor="" className="text-gray-900 text-[14px] font-bold">Bank Type</label>
                        <div className="flex w-full ">
                        <select ref={typeRef} className="border p-2 text-[13px] w-full">
                            <option value="payout" >Payout</option>
                            <option value="earning" >Earning</option>
                            <option value="failed" >Failed</option>

                        </select>
                        </div>

                    </div>

                    <div className="flex flex-row gap-1 w-full">
                    <div onClick={filteredData} className="btn w-full flex-1 btn-sm w-full text-white p-2 px-4 font-normal hover:bg-purple-400 text-[13px] bg-purple-500">
                        Filter
                    </div>
                    <div onClick={handleClear} className="btn w-full btn-sm w-full flex-1 text-white p-2 px-4 font-normal hover:bg-green-400 text-[13px] bg-green-500">
                        Clear
                    </div>
                    </div>

                   
                </div>
                </details> 
            </div> */}
          </div>

          <div className="overflow-x-auto">
            <table className="table table-xs">
              {/* head */}
              <thead>
                <tr>
                  <th>No</th>
                  <th>Id</th>
                  <th>Key</th>
                  <th>Headline</th>
                  <th>Descriptions</th>
                  <th>Status</th>
                  <th>AD type</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {/* row 1 */}

                <tr className="p-1">
                  <th>22</th>
                  <td className="word-break  p-[10px] text-[18px] text-textHead">
                    1
                  </td>
                  <td className=" p-[5px] text-[18px] text-textHead">123</td>
                  <td className=" p-[5px] text-[18px] text-textHead">123w</td>
                  <td className=" p-[5px] text-[18px] text-textHead">Lorem ipsum dolor sit amet.</td>
                  <td className=" p-[5px] text-[18px] text-textHead"><select className="select select-sm select-bordered ">
                    <option>Active</option>
                    <option>Pending</option>
                    <option>Deactivated</option>

                  </select></td>
                  <td className=" p-[5px] text-[18px] text-textHead">Image</td>
                  <td className=" p-[5px] text-[18px] text-textHead">
                    <div className="flex flex-col gap-1">
                    
                      <button
                        className="btn btn-sm bg-primary hover:bg-secondary text-xs outline-none text-white"
                        onClick={() =>
                          document.getElementById("my_modal_1").showModal()
                        }
                      >
                         Ad details
                      </button>
                      <dialog id="my_modal_1" className="modal">
                        <div className="modal-box flex flex-col gap-2">
                          <form method="dialog">
                            {/* if there is a button in form, it will close the modal */}
                            <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
                              ✕
                            </button>
                          </form>

                          <img
                            src="../ad-sample.png"
                            className="w-[50%] self-center bg-red-900"
                            alt=""
                          />
                          <h3 className="font-bold text-lg self-center text-center">
                            Healine for Ad
                          </h3>

                          <p className="py-4 text-center">
                            Lorem ipsum dolor sit amet consectetur adipisicing
                            elit. Eius excepturi aliquam exercitationem!
                          </p>

                          <div className="flex gap-1.5 items-center">
                            <h1 className="font-bold">Start Date</h1>
                            <div className="">12/12/2024</div>
                          </div>

                          <div className="flex gap-1.5 items-center">
                            <h1 className="font-bold">End Date</h1>
                            <div className="">12/12/2024</div>
                          </div>

                          <div className="flex gap-1.5 items-center">
                            <h1 className="font-bold">Country</h1>
                            <div className="">Nigeria</div>
                          </div>

                          <div className="flex gap-1.5 items-center">
                            <h1 className="font-bold">Region</h1>
                            <div className="">Delta</div>
                          </div>

                          <div className="flex gap-1.5 items-center">
                            <h1 className="font-bold">Status</h1>
                            <div className="badge badge-lg border-2 text-error bg-errorBg ">
                              DeActivated
                            </div>
                          </div>

                          <div className="flex gap-1.5 items-center">
                            <h1 className="font-bold">Age</h1>
                            <div className="badge badge-lg border-2 bg-primary text-white">
                              18-22
                            </div>
                            <div className="badge badge-lg border-2 bg-primary text-white">
                              23-40
                            </div>
                          </div>

                          <div className="flex gap-1.5 items-center">
                            <h1 className="font-bold">Interest</h1>
                            <div className="badge badge-lg border-2 bg-primary text-white">
                              Music
                            </div>
                            <div className="badge badge-lg border-2 bg-primary text-white">
                              Sport
                            </div>
                          </div>
                        </div>
                      </dialog>

                      <button
                        className="btn btn-sm bg-primary hover:bg-secondary text-xs outline-none text-white"
                        onClick={() =>
                          document.getElementById("my_modal_2").showModal()
                        }
                      >
                         User
                      </button>
                      <dialog id="my_modal_2" className="modal">
                        <div className="modal-box flex flex-col gap-2">
                          <form method="dialog">
                            {/* if there is a button in form, it will close the modal */}
                            <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
                              ✕
                            </button>
                          </form>

                         
                          <div className="flex gap-1.5 items-center">
                            <h1 className="font-bold">Full Name</h1>
                            <div className="">Abubakar Mukhatr</div>
                          </div>

                          <div className="flex gap-1.5 items-center">
                            <h1 className="font-bold">Country</h1>
                            <div className="">Delta</div>
                          </div>

                          <div className="flex gap-1.5 items-center">
                            <h1 className="font-bold">State</h1>
                            <div className="">Delta</div>
                          </div>

                          <div className="flex gap-1.5 items-center">
                            <h1 className="font-bold">City</h1>
                            <div className="">Ekiti</div>
                          </div>

                          <div className="flex gap-1.5 items-center">
                            <h1 className="font-bold">Zip</h1>
                            <div className="">123</div>
                          </div>

                          
                          <div className="flex gap-1.5 ">
                            <h1 className="font-bold">Address</h1>
                            <div className="">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eveniet, voluptas!</div>
                          </div>

                          
                          <div className="flex gap-1.5 items-center">
                            <h1 className="font-bold">Phone Number</h1>
                            <div className="">123</div>
                          </div>

                          <div className="flex gap-1.5 items-center">
                            <h1 className="font-bold">Date Of Birth</h1>
                            <div className="">12/03/12</div>
                          </div>

                         

                          
                       
                        </div>
                      </dialog>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
