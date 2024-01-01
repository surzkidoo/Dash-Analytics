import { useQuery } from "@tanstack/react-query";
import React, { useEffect, useRef, useState } from "react";
import { fetchData } from "../Api/analytics";
import Loader from "../Components/Loader";
import { AiFillCaretDown } from "react-icons/ai";

export default function TransactionPage() {

    const [transactionSuccess, setTransactionSuccess] = useState([])
    const [tableData, settableData] = useState([])

    const startRef = useRef();
    const enddRef = useRef()
    const typeRef = useRef()


    const [sortDateType, setSortDateType] = useState('')




    const analyticQuery = useQuery({queryKey:['transaction'], queryFn:  fetchData });


    useEffect(() => {
        if (analyticQuery.isSuccess) {
          setTransactionSuccess(() => [
            ...analyticQuery.data.data['User List of succesful transaction yesterday'],
          ]);

          settableData(()=>[...analyticQuery.data.data['User List of succesful transaction yesterday']])
        }
      }, [analyticQuery.isSuccess, analyticQuery.data]);




  const handleClear = () =>{

    //Reset To initial Data
    settableData(transactionSuccess)
    setSortDateType('')
    console.log()

    console.log('reset')
  }


 
  
    // Filtering logic
    const filteredData = () => {

      const endTimestamp = new Date(enddRef.current.value);
      endTimestamp.setDate(endTimestamp.getDate() + 1);
      
    let parsedEndDate =  new Date (endTimestamp);
    let  parsedStartDate =  new Date(startRef.current.value);


    let  transactionTypeFilter =  typeRef.current.value;

    let updatedData = transactionSuccess;


    if (sortDateType === 'today') {
      const today = new Date();
      parsedStartDate = today;
      parsedEndDate = new Date(today);
      parsedEndDate.setDate(today.getDate() + 1);
    }
  
    if (sortDateType === 'yesterday') {
      const yesterday = new Date();
      yesterday.setDate(yesterday.getDate() - 1);
      parsedStartDate = yesterday;
      parsedEndDate = new Date(yesterday);
      parsedEndDate.setDate(yesterday.getDate() + 1);
    }
  
    if (sortDateType === 'last30') {
      const thirtyDaysAgo = new Date();
      thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
      parsedStartDate = thirtyDaysAgo;
      parsedEndDate = new Date();
      parsedEndDate.setDate(parsedEndDate.getDate() + 1);
    }

   
      if (parsedStartDate && parsedEndDate) {
        updatedData = updatedData.filter(
          item =>
            new Date(item.date) >= parsedStartDate &&
            new Date(item.date) <= parsedEndDate
        );

        console.log(updatedData)
      }
  
      if (transactionTypeFilter) {
        updatedData = updatedData.filter(item => item.transactionType === transactionTypeFilter);
      }
      console.log(parsedEndDate);
      console.log(transactionTypeFilter)
      console.log(updatedData)
      settableData(()=>[...updatedData])
  
    };
  

  return analyticQuery.isLoading ? <Loader/>: (
    <div>
      {/* <p>TransactionPage</p> */}

      <div className="bg-white w-full p-4 rounded-sm h-full">
        <div role="tablist" className="tabs    tabs-lifted">
          {/* <input
            type="radio"
            name="my_tabs_2"
            role="tab"
            className="tab"
            aria-label="Successful Transactions"
            checked
          />
          <div
            role="tabpanel"
            className="tab-content bg-grey-100 border-base-300 rounded-box overflow-x-scroll  p-3"
          >
            <div className="flex flex-col bg-white gap-4 mt-2">
                            <details className="dropdown dropdown-end self-end">
                <summary className="m-1 btn btn-sm text-[13px] rounded-none bg-gray-500 text-white">Filter Result <AiFillCaretDown/> </summary>
                <div className="p-2 border flex gap-1.5 flex w-[300px]  bg-white  shadow menu dropdown-content z-[10]  rounded-box w-52">
                    <div className="flex gap-3 ">
                        <p className="text-[12px] text-purple-500">Today</p>
                        <p className="text-[12px] text-gray-500">YesterDay</p>
                        <p className="text-[12px] text-gray-500">30 Days</p>
                    </div>

                    <div className="w-full flex flex-col gap-1">
                        <label htmlFor="" className="text-gray-900 text-[14px] font-bold ">Custom Date Range</label>
                        <div className="flex w-full ">
                        <input type="date" placeholder="from" className="w-full text-gray-900 p-2 border text-[13px]" />
                        <input type="date" placeholder="to" className="w-full text-gray-900 p-2 border text-[13px]" />
                        </div>
                    </div>

                    <div className="w-full flex flex-col gap-1">
                        <label htmlFor="" className="text-gray-900 text-[14px] font-bold">Transaction Type</label>
                        <div className="flex w-full ">
                        <select className="border p-2 text-[13px] w-full">
                            <option className="">Payout</option>
                        </select>
                        </div>

                    </div>


                    <div className="btn btn-sm text-white p-2 px-4 font-normal hover:bg-purple-400 text-[13px] bg-purple-500">
                        Filter
                    </div>
                </div>
                </details>
                <div className="overflow-x-auto ">
              <table className="table table-xs">
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
           
          </div> */}

          <input
            type="radio"
            name="my_tabs_2"
            role="tab"
            className="tab"
            aria-label="Transactions"
            defaultChecked
          />
            <div
            role="tabpanel"
            className="tab-content bg-grey-100 border-base-300 rounded-box min-h-[500px] h-full overflow-x-scroll  p-3"
          >
            <div className="flex flex-col bg-white gap-4 mt-2">
                            <details className="dropdown dropdown-end self-end">
                <summary className="m-1 btn btn-sm text-[13px] rounded-none bg-gray-500 text-white">Filter Result <AiFillCaretDown/> </summary>
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
                        <label htmlFor="" className="text-gray-900 text-[14px] font-bold">Transaction Type</label>
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
                    tableData.map((tran,index)=>{

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
        </div>

        
      </div>
    </div>
  );
}
