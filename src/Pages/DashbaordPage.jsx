import { useEffect, useState } from "react";
import Header from "../Components/Header";
import Sidebar from "../Components/Sidebar";
import Chart from "react-apexcharts";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";


function DashbaordPage() {
  const { auth } = useSelector((state)=>state);
  const navigate = useNavigate()
  const  [sidebar ,setSidebar] = useState(false)


  useEffect(()=>{
    !auth.isAuthenticated && navigate('/sign-in');
},[auth,navigate])

    const [data, setData] = useState({options: {
        chart: {
          id: "basic-bar"
          ,toolbar: {
            autoSelected: "pan",
            show: false
          },

        },
        dataLabels: {
            enabled: false
          },
          

          colors: ["#00BAEC"],
          stroke: {
            width: 1
          },
          grid: {
            borderColor: "#555",
            clipMarkers: false,

            xaxis: {
                lines: {
                  show: false,
                }
              },
              yaxis: {
                lines: {
                  show: false,
                }
              }
          },
         
        xaxis: {
            
          categories: [1991, 1992, 1993, 1994, 1995, 1996, 1997, 1998, 1999], 
          labels: {
            show: true,}
        }
      },
      series: [
        {
          name: "series-1",
          data: [30, 40, 45, 50, 49, 60, 70, 91]
        }
      ]
    })

  return (
    <div className="flex flex-row gap-2 w-full">
      <div className="flex flex-1">
        <Sidebar  sidebar={sidebar} setSidebar={setSidebar} />
      </div>

      <div className="w-full">
        <div>
          <Header sidebar={sidebar} setSidebar={setSidebar} />
        </div>
        <div className="px-0 md:px-4 py-2 flex gap-10 flex-wrap">
                
                    <div className="flex flex-col  w-[500px]  border p-2 rounded-md items-center">
                        <div className="flex flex-row w-full p-1  justify-between items-center">
                            <p className="text-gray-700  text-violet-500 text-[16px]" >Number of Users</p>
                            <h1 className="text-gray-900 p-2  text-[13px] text-white rounded-lg bg-violet-500">17k</h1>
                        </div>

                        <Chart
                        options={data.options}
                        series={data.series}
                        type="area"
                        className ='m-0 p-0'
                        height='200px'
                        width='100%'
                        />

                    </div>

                    <div className="flex flex-col  w-[500px]  border p-2 rounded-md items-center">
                        <div className="flex flex-row w-full p-1  justify-between items-center">
                            <p className="text-gray-700  text-violet-500 text-[16px]" >Number of Transactions</p>
                            <h1 className="text-gray-900 p-2  text-[13px] text-white rounded-lg bg-violet-500">200k</h1>
                        </div>

                        <Chart
                        options={data.options}
                        series={data.series}
                        type="area"
                        className ='m-0 p-0'
                        height='200px'
                        width='100%'
                        />

                    </div>


                    <div className="flex flex-col  w-[500px]  border p-2 rounded-md items-center">
                        <div className="flex flex-row w-full p-1  justify-between items-center">
                            <p className="text-gray-700  text-violet-500 text-[16px]" >Amount In Users Wallet</p>
                            <h1 className="text-gray-900 p-2  text-[13px] text-white rounded-lg bg-violet-500">17k</h1>
                        </div>

                        <Chart
                        options={data.options}
                        series={data.series}
                        type="line"
                        className ='m-0 p-0'
                        height='200px'
                        width='100%'
                        />

                    </div>
        </div>
      </div>
    </div>
  );
}

export default DashbaordPage;
