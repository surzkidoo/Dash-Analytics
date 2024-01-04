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
export default function Sidebar(props) {
  const activeLink =
    " flex gap-2 pl-2.5 w-full flex items-center p-2.5    bg-violet-50 text-violet-800 font-semibold  rounded-md";
  const normalLink =
    "flex gap-2 text-zinc-400 pl-2.5 w-full i flex items-center rounded-md hover:text-violet-800  p-2.5  cursor-pointer ";

  return (
    <div
      style={{ zIndex: 900 }}
      onClick={() => {
        props.setSidebar(!props.sidebar);
      }}
      className={`w-[230px]  bg-white left-0 xl:static border-r h-screen fixed  p-2 shadow  ${
        !props.sidebar && "hidden"
      }  xl:block`}
    >
      <div className="flex flex-col gap-0  md:gap-5">
        <div className="text font-bold pl-4 mt-3 justify-between flex items-center">
          <div>
            <span className=" text-purple-900 ">KaraADs</span>
          </div>

          <AiFillCloseCircle
            onClick={() => {
              props.setSidebar(!props.sidebar);
            }}
            className="mr-1 xl:hidden"
            size={24}
          />
        </div>

        <div className="flex flex-col mt-3 gap-3">
          <NavLink
            to="/"
            className={({ isActive }) => (isActive ? activeLink : normalLink)}
          >
            <div>
              <MdDashboard size={24} />
            </div>

            <div className="text-[14px]">Dashboard</div>
          </NavLink>

          <NavLink
            to="dashboard/transaction"
            className={({ isActive }) => (isActive ? activeLink : normalLink)}
          >
            <div>
              <TbTransferVertical size={24} />
            </div>

            <div className="text-[14px]">Transactions</div>
          </NavLink>

          <NavLink
            to="/dashboard/user"
            className={({ isActive }) => (isActive ? activeLink : normalLink)}
          >
            <div>
              <AiOutlineUser size={24} />
            </div>

            <div className="text-[14px]">Users</div>
          </NavLink>

          <NavLink
            to="/sign-in"
            className={({ isActive }) => (isActive ? activeLink : normalLink)}
          >
            <div>
              <BsPower size={24} />
            </div>

            <div className="text-[14px]">Log out</div>
          </NavLink>
        </div>
      </div>
    </div>
  );
}
