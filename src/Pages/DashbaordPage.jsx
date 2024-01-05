import { useEffect, useState } from "react";
import Header from "../Components/Header";
import Sidebar from "../Components/Sidebar";
import Chart from "react-apexcharts";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { fetchData } from "../Api/analytics";
import { useQuery } from "@tanstack/react-query";
import Loader from "../Components/Loader";
import {
  AiFillCheckSquare,
  AiFillMoneyCollect,
  AiOutlineCheckSquare,
  AiOutlineMore,
  AiOutlinePaperClip,
  AiOutlineTransaction,
  AiOutlineUser,
} from "react-icons/ai";
import {
  BsCash,
  BsCloudLightning,
  BsDot,
  BsThreeDots,
  BsThreeDotsVertical,
} from "react-icons/bs";


import Summary from "../Components/Summary";

function DashbaordPage() {
  const analyticQuery = useQuery({ queryKey: ["data"], queryFn: fetchData });

  // analyticQuery.isSuccess && console.log(analyticQuery.data?.result.map(item => [ new Date(item.date).getTime(), item.totalAmount]))

  const [chartData, setChartData] = useState({
    options: {
      chart: {
        id: "basic-bar",
        toolbar: {
          autoSelected: "pan",
          show: false,
        },
      },
      dataLabels: {
        enabled: false,
      },

      colors: ["#00BAEC"],
      stroke: {
        width: 1,
      },
      grid: {
        borderColor: "#555",
        clipMarkers: false,

        xaxis: {
          lines: {
            show: false,
          },
        },
        yaxis: {
          lines: {
            show: false,
          },
        },
      },

      xaxis: {
        categories: [],
        labels: {
          show: true,
        },
      },
    },
    series: [
      {
        name: "series-1",
        data: [30, 40, 45, 50, 49, 60, 70, 91],
      },
    ],
  });

  //   const [transactionChartData, setTransactionChartData] = useState({options: {
  //     chart: {
  //       id: "basic-bar"
  //       ,toolbar: {
  //         autoSelected: "pan",
  //         show: false
  //       },

  //     },
  //     dataLabels: {
  //         enabled: false
  //       },

  //       colors: ["#00BAEC"],
  //       stroke: {
  //         width: 1
  //       },
  //       grid: {
  //         borderColor: "#555",
  //         clipMarkers: false,

  //         xaxis: {
  //             lines: {
  //               show: false,
  //             }
  //           },
  //           yaxis: {
  //             lines: {
  //               show: false,
  //             }
  //           }
  //       },

  //     xaxis: {
  //       type: 'datetime',
  //       labels: {
  //         show: true,}
  //  }
  //   },
  //   series: [{

  //     data:analyticQuery.isSuccess && analyticQuery.data?.result.map(item => [ new Date(item.date).getTime(), item.totalAmount])

  //   }

  //   ]
  // })

  // const [localState, setLocalState] = useState(null);

  // const { data, isLoading, error } = useQuery('data', fetchData, {
  //   onSuccess: (data) => {
  //     // Update local component state when data is successfully fetched
  //     setChartData(data);
  //   },
  // });

  return analyticQuery.isLoading ? (
    <Loader />
  ) : (
    <div className="px-0 md:px-4 py-2 flex gap-[21px] flex-wrap flex-col ">

      <div className="flex justify-between items-center bg-errorBg  p-[14px] rounded-[5px]">
      <p className="text-textHead text-[14px] font-medium">We have recently updated our system for invoicing. Please update your billing details in the settings.</p>
      <svg width="11" height="11" viewBox="0 0 11 11"  className="flex-shrink-0" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M9.96875 0H1.03125C0.461914 0 0 0.527902 0 1.17857V9.82143C0 10.4721 0.461914 11 1.03125 11H9.96875C10.5381 11 11 10.4721 11 9.82143V1.17857C11 0.527902 10.5381 0 9.96875 0ZM8.17266 7.13281C8.27578 7.25067 8.27578 7.44219 8.17266 7.56004L7.30254 8.55446C7.19941 8.67232 7.03184 8.67232 6.92871 8.55446L5.5 6.90692L4.07129 8.55446C3.96816 8.67232 3.80059 8.67232 3.69746 8.55446L2.82734 7.56004C2.72422 7.44219 2.72422 7.25067 2.82734 7.13281L4.26895 5.5L2.82734 3.86719C2.72422 3.74933 2.72422 3.55781 2.82734 3.43996L3.69746 2.44554C3.80059 2.32768 3.96816 2.32768 4.07129 2.44554L5.5 4.09308L6.92871 2.44554C7.03184 2.32768 7.19941 2.32768 7.30254 2.44554L8.17266 3.43996C8.27578 3.55781 8.27578 3.74933 8.17266 3.86719L6.73105 5.5L8.17266 7.13281Z" fill="#86888C"/>
</svg>

      </div>

      <div className="flex justify-between items-center gra  p-[14px] rounded-[5px]">
      <p className="text-white text-[14px] medium">Welcome name. If you have questions about onboarding or how Karaads creator works, please schedule a call with our support team.</p>
      <svg width="11" height="11" className="flex-shrink-0" viewBox="0 0 11 11" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M9.96875 0H1.03125C0.461914 0 0 0.527902 0 1.17857V9.82143C0 10.4721 0.461914 11 1.03125 11H9.96875C10.5381 11 11 10.4721 11 9.82143V1.17857C11 0.527902 10.5381 0 9.96875 0ZM8.17266 7.13281C8.27578 7.25067 8.27578 7.44219 8.17266 7.56004L7.30254 8.55446C7.19941 8.67232 7.03184 8.67232 6.92871 8.55446L5.5 6.90692L4.07129 8.55446C3.96816 8.67232 3.80059 8.67232 3.69746 8.55446L2.82734 7.56004C2.72422 7.44219 2.72422 7.25067 2.82734 7.13281L4.26895 5.5L2.82734 3.86719C2.72422 3.74933 2.72422 3.55781 2.82734 3.43996L3.69746 2.44554C3.80059 2.32768 3.96816 2.32768 4.07129 2.44554L5.5 4.09308L6.92871 2.44554C7.03184 2.32768 7.19941 2.32768 7.30254 2.44554L8.17266 3.43996C8.27578 3.55781 8.27578 3.74933 8.17266 3.86719L6.73105 5.5L8.17266 7.13281Z" fill="white"/>
</svg>


      </div>


      <div className="flex gap-[20px] p-4 md:p-0 flex-col md:flex-row flex-wrap">
        <Summary
          number={analyticQuery?.data?.data[
            "Life time, Total Number of Transsaction request for earnings, payout, and error"
          ].toLocaleString()}
          name="Total Transaction"
          color="bg-purple-100"
          icon={'security.png'}
        />

        <Summary
          number={analyticQuery?.data?.data[
            "Number of Users"
          ].toLocaleString()}
          name="Total Number of Users"
          color="bg-yellow-100"
          icon={'package.png'}
        />


        <Summary
          number={analyticQuery?.data?.data[
            "Number of Earnings request"
          ].toLocaleString()}
          name="Total Number of Earnings request"
          color="bg-blue-100"
          icon={'bar-graph.png'}
        />

          
        <Summary
          number={analyticQuery?.data?.data[
            "Total number of payout transaction"
          ].toLocaleString()}
          name="Total number of payout transaction"
          color='bg-green-100'
          icon={'security.png'}
        />

      
      </div>

      <div className="flex p-4 md:p-0  gap-4 flex-col md:flex-row flex-wrap">
        <div className="flex flex-col bg-white   border p-2 rounded-md items-center">
          <div className="flex flex-row w-full p-1  justify-between items-center">
            <p className="text-gray-700  text-violet-500 text-[16px]">
              Number of Users
            </p>
            <h1 className="text-gray-900 p-2 hidden text-[13px] text-white rounded-lg bg-violet-500">
              0
            </h1>
          </div>

          <Chart
            options={chartData.options}
            series={chartData.series}
            type="area"
            className="m-0 p-0"
            height="200px"
            width="100%"
          />
        </div>

        <div className="flex flex-col bg-white   border p-2 rounded-md items-center">
          <div className="flex flex-row w-full p-1  justify-between items-center">
            <p className="text-gray-700  text-violet-500 text-[16px]">
              Number of Transactions
            </p>
            <h1 className="text-gray-900 p-2 hidden text-[13px] text-white rounded-lg bg-violet-500">
              0
            </h1>
          </div>

          <Chart
            options={chartData.options}
            series={chartData.series}
            type="area"
            className="m-0 p-0"
            height="200px"
            width="100%"
          />
        </div>

        <div className="flex flex-col bg-white   border p-2 rounded-md items-center">
          <div className="flex flex-row w-full p-1  justify-between items-center">
            <p className="text-gray-700  text-violet-500 text-[16px]">
              Amount In Users Wallet
            </p>
            <h1 className="text-gray-900 p-2  hidden text-[13px] text-white rounded-lg bg-violet-500">
              0
            </h1>
          </div>

          <Chart
            options={chartData.options}
            series={chartData.series}
            type="area"
            className="m-0 p-0 "
            height="200px"
            width="100%"
          />
        </div>
      </div>
    </div>
  );
}

export default DashbaordPage;
