import { useQuery } from "@tanstack/react-query";
import React, { useEffect, useState } from "react";
import { fetchData } from "../Api/analytics";
import Loader from "../Components/Loader";
import { AiFillCaretDown } from "react-icons/ai";

export default function TransactionPage() {

    const [transactionSuccess, setTransactionSuccess] = useState([])

    const analyticQuery = useQuery({queryKey:['transaction'], queryFn:  fetchData });


    useEffect(() => {
        if (analyticQuery.isSuccess) {
          setTransactionSuccess((prev) => [
            ...analyticQuery.data.data['User List of succesful transaction yesterday'],
          ]);
        }
      }, [analyticQuery.isSuccess, analyticQuery.data]);


  return analyticQuery.isLoading ? <Loader/>: (
    <div>
      {/* <p>TransactionPage</p> */}

      <div className="bg-white w-full p-4 rounded-sm">
        <div role="tablist" className="tabs  overflow-hidden  tabs-lifted">
          <input
            type="radio"
            name="my_tabs_2"
            role="tab"
            className="tab"
            aria-label="Successful Transactions"
            checked
          />
          <div
            role="tabpanel"
            className="tab-content bg-base-100 border-base-300 rounded-box overflow-x-scroll lg:overflow-x-auto p-3"
          >
            <div className="flex flex-col gap-4 mt-2">
                            <details className="dropdown dropdown-end self-end">
                <summary className="m-1 btn btn-sm text-[13px] rounded-none bg-gray-500 text-white">Filter Result <AiFillCaretDown/> </summary>
                <div className="p-2 border flex gap-1.5 flex w-[300px]  shadow menu dropdown-content z-[1] bg-base-100 rounded-box w-52">
                    <div className="flex gap-3 ">
                        <p className="text-[12px] text-purple-500">Today</p>
                        <p className="text-[12px] text-gray-500">YesterDay</p>
                        <p className="text-[12px] text-gray-500">30 Days</p>
                    </div>

                    <div className="w-full flex flex-col gap-1">
                        <label htmlFor="" className="text-gray-900 text-[14px] font-bold ">Custom Date Range</label>
                        <div className="flex w-full ">
                        <input type="date" placeholder="from" className="w-full p-1 border text-[13px]" />
                        <input type="date" placeholder="to" className="w-full p-1 border text-[13px]" />
                        </div>
                    </div>

                    <div className="w-full flex flex-col gap-1">
                        <label htmlFor="" className="text-gray-900 text-[14px] font-bold ">Transaction Type</label>
                        <div className="flex w-full ">
                        <select className="border p-1 text-[13px] w-full">
                            <option className="">Payout</option>
                        </select>
                        </div>

                    </div>


                    <div className="btn btn-sm text-white font-normal hover:bg-purple-400 text-[13px] bg-purple-500">
                        Filter
                    </div>
                </div>
                </details>
                <div className="overflow-x-auto ">
              <table className="table table-xs">
                {/* head */}
                <thead>
                  <tr>
                    <th>No</th>
                    <th>Ref</th>
                    <th>User</th>
                    <th>Amount</th>
                    <th>Transaction Type</th>
                    <th>Date</th>

                  </tr>
                </thead>
                <tbody>
                  {/* row 1 */}

                  {
                    transactionSuccess.map((tran,index)=>{

                        return (
                        <tr key={tran.TxRef} className="p-1">
                        <th>{index+1}</th>
                        <td className="word-break">{tran.TxRef}</td>
                        <td>{tran.accountname}</td>
                        <td>{tran.amount}</td>
                        <td>{tran.transactionType}</td>
                        <td>{new Date(tran.date).toDateString()}</td>

                      </tr>)
                    })
                  }
                 
                 
                </tbody>
              </table>
            </div> 
            </div>
           
          </div>

          <input
            type="radio"
            name="my_tabs_2"
            role="tab"
            className="tab"
            aria-label="Failed Transactions"
          />
            <div
            role="tabpanel"
            className="tab-content bg-base-100 border-base-300 rounded-box p-3  overflow-x-scroll lg:overflow-x-auto"
          >
            <div className="flex flex-col gap-4 mt-2">
                            <details className="dropdown dropdown-end self-end">
                <summary className="m-1 btn btn-sm text-[13px] rounded-none bg-gray-500 text-white ">Filter Result <AiFillCaretDown/> </summary>
                <div className="p-2 border flex gap-1.5 flex w-[300px]  shadow menu dropdown-content z-[1] bg-base-100 rounded-box w-52">
                    <div className="flex gap-3 ">
                        <p className="text-[12px] text-purple-500">Today</p>
                        <p className="text-[12px] text-gray-500">YesterDay</p>
                        <p className="text-[12px] text-gray-500">30 Days</p>
                    </div>

                    <div className="w-full flex flex-col gap-1">
                        <label htmlFor="" className="text-gray-900 text-[14px] font-bold ">Custom Date Range</label>
                        <div className="flex w-full ">
                        <input type="date" placeholder="from" className="w-full p-1 border text-[13px]" />
                        <input type="date" placeholder="to" className="w-full p-1 border text-[13px]" />
                        </div>
                    </div>

                  

                    <div className="w-full flex flex-col gap-1">
                        <label htmlFor="" className="text-gray-900 text-[14px] font-bold ">Transaction Type</label>
                        <div className="flex w-full ">
                        <select className="border p-1 text-[13px] w-full">
                            <option className="">Payout</option>
                        </select>
                        </div>
                    </div>

                    <div className="btn btn-sm text-white font-normal hover:bg-purple-400 text-[13px] bg-purple-500">
                        Filter
                    </div>
                </div>
                </details>
                <div className="overflow-x-auto ">
              <table className="table table-xs">
                {/* head */}
                <thead>
                  <tr>
                    <th>No</th>
                    <th>Ref</th>
                    <th>User</th>
                    <th>Amount</th>
                    <th>Transaction Type</th>
                    <th>Date</th>

                  </tr>
                </thead>
                <tbody>
                  {/* row 1 */}

                  {
                    transactionSuccess.map((tran,index)=>{

                        return (
                        <tr key={tran.TxRef} className="p-1">
                        <th>{index+1}</th>
                        <td>{tran.TxRef}</td>
                        <td>{tran.accountname}</td>
                        <td>{tran.amount}</td>
                        <td>{tran.transactionType}</td>
                        <td>{new Date(tran.date).toDateString()}</td>

                      </tr>)
                    })
                  }
                 
                 
                </tbody>
              </table>
            </div> 
            </div>
           
          </div>
        </div>

        
      </div>
    </div>
  );
}
