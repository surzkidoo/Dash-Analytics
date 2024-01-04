import { useState } from "react";
import Header from "../Components/Header";
import Sidebar from "../Components/Sidebar";

import { Outlet} from "react-router-dom";



function DashbaordTemplete() {
  const  [sidebar ,setSidebar] = useState(false)


  return (
    <div className="flex flex-row  w-full h-screen ">

      <div className="flex flex-1">
        <Sidebar  sidebar={sidebar} setSidebar={setSidebar} />
      </div>

      <div className="w-full min-h-screen flex flex-col ">
        <div className="h-[120px] flex-shrink-0">
          <Header sidebar={sidebar} setSidebar={setSidebar} />
        </div>
        <div className="sm:px-2 md:px-4  py-2 flex gap-10  flex-wrap flex-col bg-pageBg">
        <Outlet/>
        </div>
      </div>
    </div>
  );
}

export default DashbaordTemplete;
