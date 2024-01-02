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
    <div className="px-0 md:px-4 py-2 flex gap-10 flex-wrap flex-col bg-gray-100">

      <div className="flex gap-4 p-4 md:p-0 flex-col md:flex-row flex-md-wrap">
        <Summary
          number={analyticQuery.data.data[
            "Life time, Total Number of Transsaction request for earnings, payout, and error"
          ].toLocaleString()}
          name="Total Transaction"
          color="bg-purple-100"
          icon={<BsCloudLightning className="text-purple-500" size={24} />}
        />

        <Summary
          number={analyticQuery.data.data[
            "Number of Users"
          ].toLocaleString()}
          name="Total Number of Users"
          color="bg-yellow-100"
          icon={<AiOutlineUser className="text-yellow-500" size={24} />}
        />


        <Summary
          number={analyticQuery.data.data[
            "Number of Earnings request"
          ].toLocaleString()}
          name="Total Number of Earnings request"
          color="bg-blue-100"
          icon={<AiOutlineTransaction className="text-blue-500" size={24} />}
        />

          
        <Summary
          number={analyticQuery.data.data[
            "Total number of payout transaction"
          ].toLocaleString()}
          name="Total number of payout transaction"
          color='bg-green-100'
          icon={<BsCash className="text-green-500" size={24} />}
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
