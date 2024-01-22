import { useMutation, useQuery } from "@tanstack/react-query";
import React, { useEffect, useRef, useState } from "react";
import { changeStatus, fetchData } from "../Api/getAds";
import Loader from "../Components/Loader";
import { AiFillCaretDown, AiOutlineSearch } from "react-icons/ai";
import { fetchUser } from "../Api/user";
import { MdMore } from "react-icons/md";

export default function AdsPage() {

  const [transactionSuccess, setTransactionSuccess] = useState([])
  const [tableData, settableData] = useState([])

  const startRef = useRef();
  const enddRef = useRef()
  const typeRef = useRef()


  const [sortDateType, setSortDateType] = useState('')

  const mutation = useMutation({
    mutationFn:changeStatus
  });


  const [page, setPage] = useState(1);


 
  const handlePage = (value)=>{
    setPage(value);
    // queryResult.refetch({ page:value, transactionType: currentTab });

   }


   const queryResult = useQuery({
    queryKey: ['AdsData', { page: page }],
    queryFn: () => fetchData(page),
    keepPreviousData: true,
  });


   const handeStatusChange = async (id,e) =>{
    console.log('value',{id,s:e.target.value})

    let result2 = await mutation.mutateAsync({key:id,status:e.target.value});
    if(mutation.isSuccess){
      queryResult.refetch()
      e.target.value = result2.data.status;

    }
    console.log('fromse',result2);
   }

 

  const renderPageNumbers = () => {
    const totalPages = queryResult.data.totalPages;
    const visiblePages = 5; // Number of visible page numbers at a time
    const halfVisiblePages = Math.floor(visiblePages / 2);

    let startPage = Math.max(1, page - halfVisiblePages);
    let endPage = Math.min(totalPages, startPage + visiblePages - 1);

    if (endPage - startPage + 1 < visiblePages) {
      startPage = Math.max(1, endPage - visiblePages + 1);
    }

    const pageNumbers = [];

    for (let i = startPage; i <= endPage; i++) {
      pageNumbers.push(
        <span
          key={i}
          onClick={() => handlePage(i)}
          className={
          i === page ? 'join-item btn btn-sm bg-primary text-white hover:bg-secondary' : 'join-item btn btn-sm'
          }
        >
          {i}
        </span>
      );
    }

    if(totalPages!=page){
    pageNumbers.push(
      <span
      className='join-item btn btn-sm btn-disabled'
  
    >
      ....
    </span>
    )

    pageNumbers.push(
      <span
      key={totalPages}
      onClick={() => handlePage(totalPages)}
      className={
      totalPages === page ? 'join-item btn btn-sm bg-primary text-white hover:bg-secondary' : 'join-item btn btn-sm'
      }
    >
      {totalPages}
    </span>
    )
  }


    return pageNumbers;
  };



const handleClear = () =>{

  //Reset To initial Data
  settableData(transactionSuccess)
  setSortDateType('')
  console.log()

  console.log('reset')
}

const handleSearch = (e) => {
  const searchTerm = e.target.value;


  if(!searchTerm){
    settableData(transactionSuccess)
    return
  }


  const results = transactionSuccess.filter(item =>
    item.userId.toLowerCase().includes(searchTerm.toLowerCase())
  );

  settableData(results);
};


  return  queryResult.isLoading ? <Loader/>: (
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
                  <th>FullName</th>
                  <th>Headline</th>
                  <th>Descriptions</th>
                  <th>Status</th>
                  <th>AD type</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {/* row 1 */}
                {
                   queryResult.isSuccess && queryResult.data?.docs.map((ad,index)=>{

               return (<tr key={index} className="p-1">
                  <th>{index+1}</th>
                 
                  <td className=" p-[5px] text-[18px] text-textHead">{ad.userid.fullname}</td>
                  <td className=" p-[5px] text-[18px] text-textHead">{ad.headline}</td>
                  <td className=" p-[5px] text-[18px] text-textHead">{ad.description}</td>
                  <td className=" p-[5px] text-[18px] text-textHead"><select defaultValue={ad.status} onClick={(e)=>handeStatusChange(ad._id,e)}  className="select select-sm select-bordered ">
                  <option value='deactivate'>DeActivated</option>
                    <option value='active' >Active</option>
                    <option value='Pending'>Pending</option>

                  </select></td>
                  <td className=" p-[5px] text-[18px] text-textHead">{ad.type}</td>
                  <td className=" p-[5px] text-[18px] text-textHead">
                    <div className="flex flex-col gap-1">
                    
                      <button
                        className="btn btn-sm bg-primary hover:bg-secondary w-[150px] text-xs outline-none text-white"
                        onClick={() =>
                          document.getElementById("my_modal_1"+index).showModal()
                        }
                      >
                         Ad details
                      </button>
                      <dialog id={"my_modal_1"+index} className="modal">
                        <div className="modal-box flex flex-col gap-2">
                          <form method="dialog">
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
                            {ad.healine}
                          </h3>

                          <p className="py-4 text-center">
                          {ad.description}
                          </p>

                          <div className="flex gap-1.5 ">
                            <h1 className="font-bold shrink-0">Start Date</h1>
                            <div className="">{Date(ad.date)}</div>
                          </div>

                          <div className="flex gap-1.5 ">
                            <h1 className="font-bold shrink-0">End Date</h1>
                            <div className="">{Date(ad.endDate)}</div>
                          </div>

                          <div className="flex gap-1.5 items-center">
                            <h1 className="font-bold">Country</h1>
                            <div className="">{ad.country}</div>
                          </div>

                          <div className="flex gap-1.5 items-center">
                            <h1 className="font-bold">Region</h1>
                            <div className="">{ad.region}</div>
                          </div>

                          <div className="flex gap-1.5 items-center">
                            <h1 className="font-bold">Status</h1>
                            <div className={`badge badge-lg border-2  ${ad.status=='active'?'text-success bg-successBg' : ad.status=='Pending'? 'text-yellow-600 bg-yellow-100': 'text-error bg-errorBg'  } `}>
                              {ad.status}
                            </div>
                          </div>

                          <div className="flex gap-1.5 items-center">
                            <h1 className="font-bold">Age</h1>
                            {
                              ad.age.map((age,index)=>{
                         return <div key={index} className="badge badge-lg border-2 bg-primary text-white">
                            {age}
                            </div>
                              })
                            }
                            
                          </div>

                          <div className="flex gap-1.5 items-center">
                            <h1 className="font-bold">Interest</h1>
                            {
                              ad.interest.map((int,index)=>{
                         return <div key={index} className="badge badge-lg border-2 bg-primary text-white">
                            {int}
                            </div>
                              })
                            }
                          </div>
                        </div>
                      </dialog>

                      <button
                        className="btn btn-sm bg-primary hover:bg-secondary w-[150px] text-xs outline-none text-white"
                        onClick={() =>
                          document.getElementById("my_modal_2"+index).showModal()
                        }
                      >
                         User
                      </button>
                      <dialog id={"my_modal_2"+index} className="modal">
                        <div className="modal-box flex flex-col gap-2">
                          <form method="dialog">
                            {/* if there is a button in form, it will close the modal */}
                            <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
                              ✕
                            </button>
                          </form>

                         
                          <div className="flex gap-1.5 items-center">
                            <h1 className="font-bold">Full Name</h1>
                            <div className="">{ad.userid.fullname}</div>
                          </div>

                          <div className="flex gap-1.5 items-center">
                            <h1 className="font-bold">Email</h1>
                            <div className="">{ad.userid.email}</div>
                          </div>

                          <div className="flex gap-1.5 items-center">
                            <h1 className="font-bold">Phone Number</h1>
                            <div className="">{ad.userid.phoneNumber}</div>
                          </div>

                       

                          <div className="flex gap-1.5 items-center">
                            <h1 className="font-bold">CreatedAt</h1>
                            <div className="">{Date(ad.userid.createdAt)}</div>
                          </div>

                          
                          <div className="flex gap-1.5 ">
                            <h1 className="font-bold">Address</h1>
                            <div className="">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eveniet, voluptas!</div>
                          </div>
                       
                        </div>
                      </dialog>
                    </div>
                  </td>
                </tr>)

                      })}
              </tbody>
            </table>
          </div>
        </div>
        
        <div className="join my-2">
            {queryResult.isSuccess && renderPageNumbers()}
          </div>
      </div>
    </div>
  );
}
