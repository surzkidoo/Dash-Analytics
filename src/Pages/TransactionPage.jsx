import { useQuery } from "@tanstack/react-query";
import React, { useEffect, useRef, useState } from "react";
import { fetchData } from "../Api/analytics";
import Loader from "../Components/Loader";
import { AiFillCaretDown, AiOutlineSearch } from "react-icons/ai";
import { fetchTransaction } from "../Api/transaction";

export default function TransactionPage() {

    const [transactionSuccess, setTransactionSuccess] = useState([])
    const [tableData, settableData] = useState([])

    const startRef = useRef();
    const enddRef = useRef()
    const typeRef = useRef()


    const [sortDateType, setSortDateType] = useState('');

    const [currentTab, setCurrentTab] = useState('all');
    const [page, setPage] = useState(1);


    const activeTabCss= 'p-[8px] font-bold  text-textHead min-w-[60px] flex justify-center border-b border-b-[4px] border-primary';
    const normalTabCss='p-[8px]  text-textHead min-w-[60px] flex justify-center';


    const handlePage = (value)=>{
    setPage(value);
    // queryResult.refetch({ page:value, transactionType: currentTab });

   }

    const queryResult = useQuery({
      queryKey: ['transactiondata', { page: page, transactionType: currentTab }],
      queryFn: () => fetchTransaction(page, currentTab),
      keepPreviousData: true,
    });

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

  
  

    const handleTab = (value)=>{
      setPage(1);
      setCurrentTab(value);
      // queryResult.refetch({ page:1, transactionType: 'current' });

    }

 



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
      item.TxRef.toLowerCase().includes(searchTerm.toLowerCase())
    );

    settableData(results);
  };

 
  
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
  

  return queryResult.isLoading ? <Loader/>: (
    <div className="w-full">
      {/* <p>TransactionPage</p> */}



      <div className="bg-white w-full p-4 rounded-sm   max-w-full bg-green-900 ">
       

      <div className="flex flex-col bg-white gap-2 mt-0 h-[75vh] w-full  bg-red-900">
        <div className="flex justify-between items-center">
          <h1>Transaction Record</h1>
{/* 
          <div className="flex flex-row gap-3 items-center ">

            <div className=" bg-white gap-2  hidden md:flex  flex-row pl-2 items-center border  rounded-md">
              <AiOutlineSearch size={20} className="text-slate-400" />
              <input type="text" className="text-[14px] p-1.5 outline-none placeholder:text-[13px]" onChange={handleSearch} placeholder="Search Record by Ref Id" />
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
            </div>
                          */}
        </div>

        <div className="flex gap-[25px] borber-b border-[#EAEAEA] border-b-[1px] self-start">
          <div onClick={()=>handleTab('all')} className={currentTab=='all'? activeTabCss : normalTabCss}>
            All
          </div>

          <div onClick={()=>handleTab('pending')} className={currentTab=='pending'? activeTabCss : normalTabCss}>
          Pending Approval
          </div>

          <div onClick={()=>handleTab('payout')} className={currentTab=='payout'? activeTabCss : normalTabCss}>
          Approved
          </div>

          <div onClick={()=>handleTab('error')} className={currentTab=='error'? activeTabCss : normalTabCss}>
          Rejected
          </div>
        </div>
       
                <div className="overflow-x-auto">
              <table className="table table-xs">
                {/* head */}
                <thead>
                  <tr>
                    <th>No</th>
                    <th>Ref</th>
                    <th>Description</th>
                    <th>Amount</th>
                    <th>Transaction Type</th>
                    <th>Date</th>

                  </tr>
                </thead>
                <tbody>
                  {/* row 1 */}

                  {
                   queryResult.isSuccess && queryResult.data?.docs.map((tran,index)=>{

                        return (
                        <tr key={tran._id} className="p-">
                        <th>{((page-1)*50)+(index+1)}</th>
                        <td className="word-break p-[10px] text-[18px] text-textHead">{tran._id}</td>
                        <td className=" p-[5px] text-[18px] text-textHead">{tran.description}</td>
                        <td className=" p-[5px] text-[18px] text-textHead">{tran.amount}</td>
                        <td className=" p-[5px] text-[18px] text-textHead">{tran.transactionType}</td>
                        <td className=" p-[5px] text-[18px] text-textHead">{new Date(tran.date).toDateString()}</td>

                      </tr>)
                    })
                  }
                 
                 
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
