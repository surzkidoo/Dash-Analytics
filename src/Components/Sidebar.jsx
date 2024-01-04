import {
  AiFillCloseCircle,
  AiOutlineCloudUpload,
  AiOutlineDashboard,
  AiOutlineDotChart,
  AiOutlineDownload,
  AiOutlineTransaction,
  AiOutlineUpload,
  AiOutlineUser,
} from "react-icons/ai";
import { BsDashSquare, BsPower, BsSendArrowUp } from "react-icons/bs";
import { TbTransferIn, TbTransferVertical } from "react-icons/tb";
import { MdDashboard } from "react-icons/md";
import { NavLink } from "react-router-dom";
import logo from '../assets/logo-dash.png';

export default function Sidebar(props) {
  const activeLink =
    " flex gap-[26px]   flex items-center pl-[50px] p-2.5 mr-[40px] h-[60px]   bg-primary text-white font-semibold ";
  const normalLink =
    "flex gap-[26px] flex pl-[50px] items-center h-[60px] mr-[40px] rounded-md text-textHead cursor-pointer ";

  return (
    <div
      style={{ zIndex: 900 }}
      onClick={() => {
        props.setSidebar(!props.sidebar);
      }}
      className={`w-[280px] md:w-[345px]  bg-white left-0 xl:static justify-between border-r h-screen fixed flex flex-col  ${
        !props.sidebar && "hidden"
      } xl:flex`}
    >
      <div className="flex flex-col gap-0    md:gap-5">
        <div className="text font-bold  justify-between flex items-center">
          <div className="flex relative items-center" >
           
           <img src={logo} alt="" className="w-[100px]" />
           <p className=" text-[30px] font-bold left-[70px] absolute">araads</p>
          </div>

          <AiFillCloseCircle
            onClick={() => {
              props.setSidebar(!props.sidebar);
            }}
            className="mr-1 xl:hidden"
            size={24}
          />
        </div>

        <div className="flex flex-col mt-3 gap-[8px]">
          <NavLink
            to="/"
            className={({ isActive }) => (isActive ? activeLink : normalLink)}
          >
            <div>
              <MdDashboard size={32} />
            </div>

            <div className="text-[18px] font-semibold ">Dashboard</div>
          </NavLink>

          <NavLink
            to="dashboard/transaction"
            className={({ isActive }) => (isActive ? activeLink : normalLink)}
          >
            <div>
              <TbTransferVertical size={32} />
            </div>

            <div className="text-[18px] font-semibold ">Transactions</div>
          </NavLink>

          <NavLink
            to="/dashboard/user"
            className={({ isActive }) => (isActive ? activeLink : normalLink)}
          >
            <div>
              <AiOutlineUser size={32} />
            </div>

            <div className="text-[18px] font-semibold ">Users</div>
          </NavLink>

          <NavLink
            to="/sign-in"
            className={({ isActive }) => (isActive ? activeLink : normalLink)}
          >
            <div>
              <BsPower size={32} />
            </div>

            <div className="text-[18px] font-semibold ">Log out</div>
          </NavLink>
        </div>

       
      </div>

      <div className="pl-[50px] pb-[62px] flex flex-col gap-[24px]">
            <p className="text-primary semibold font-[15px] flex items-center gap-[8px]"> <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M9.48387 1.28809C11.0081 2.35952 12 4.1119 12 6.09523C12 9.35237 9.31936 11.9928 6.0121 12C2.70968 12.0071 0.00484312 9.35713 4.41572e-06 6.10475C-0.00241494 4.12142 0.98952 2.36428 2.51129 1.29047C2.79436 1.09286 3.18871 1.17619 3.35807 1.47381L3.74033 2.14285C3.88307 2.39285 3.81533 2.70952 3.58065 2.88095C2.57662 3.61428 1.93549 4.77618 1.93549 6.09285C1.93307 8.29047 3.73791 10.0952 6 10.0952C8.21613 10.0952 10.079 8.32856 10.0645 6.06904C10.0573 4.83571 9.46694 3.64523 8.41694 2.87857C8.18226 2.70714 8.11694 2.39047 8.25968 2.14285L8.64194 1.47381C8.81129 1.17857 9.20323 1.09047 9.48387 1.28809ZM6.96774 6.28571V0.571428C6.96774 0.254762 6.70887 0 6.3871 0H5.61291C5.29113 0 5.03226 0.254762 5.03226 0.571428V6.28571C5.03226 6.60237 5.29113 6.85713 5.61291 6.85713H6.3871C6.70887 6.85713 6.96774 6.60237 6.96774 6.28571Z" fill="#0AAAAA"/>
</svg>
Logout</p>

<div className="flex flex-col">
  <h1 className="secondary-text">Karaads</h1>
  <p className="text-main">© 2022 All Rights Reserved</p>
</div>
      </div>
    </div>
  );
}
