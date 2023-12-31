import { useState } from "react";
import Header from "../Components/Header";
import Sidebar from "../Components/Sidebar";

import { Outlet} from "react-router-dom";



function DashbaordTemplete() {
  const  [sidebar ,setSidebar] = useState(false)


  return (
    <div className="flex flex-row  w-full h-screen overflow-hidden">

      <div className="flex flex-1">
        <Sidebar  sidebar={sidebar} setSidebar={setSidebar} />
      </div>

      <div className="w-full h-full overflow-scroll">
        <div>
          <Header sidebar={sidebar} setSidebar={setSidebar} />
        </div>
        <div className="sm:px-2 md:px-4  py-2 flex gap-10 h-full flex-wrap flex-col bg-gray-100">
        <Outlet/>
        </div>
      </div>
    </div>
  );
}

export default DashbaordTemplete;
