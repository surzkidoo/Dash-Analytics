import { AiFillCloseCircle, AiOutlineDashboard, AiOutlineDotChart, AiOutlineDownload, AiOutlineTransaction, AiOutlineUpload, AiOutlineUser } from 'react-icons/ai'
import {BsDashSquare,  BsPower} from 'react-icons/bs'
import { FaExchangeAlt, FaUser, FaUserAlt } from 'react-icons/fa'
import { NavLink } from 'react-router-dom'
export default function Sidebar(props) {
  const activeLink= ' flex gap-2 pl-4 w-full flex items-center p-2.5    bg-purple-100 text-purple-700  rounded-md'
  const normalLink ='flex gap-2 text-gray-500 pl-4 w-full flex items-center rounded-md hover:text-purple-700  p-2.5  cursor-pointer '


  return (
    <div style={{zIndex:900}}  onClick={()=>{props.setSidebar(!props.sidebar)}} className={`w-[230px]  bg-white left-0 xl:static border-r h-screen fixed  p-2 shadow  ${!props.sidebar && 'hidden'}  xl:block`}>

      <div className=''>
 <div className='text-lg font-bold pl-4 mt-3 justify-between flex items-center'><div>
        <span className=' text-purple-900 '>Dash-Logo</span>

 </div>

      <AiFillCloseCircle onClick={()=>{props.setSidebar(!props.sidebar)}} className='mr-1 xl:hidden'size={24}/>
     </div>

     <div className='flex flex-col mt-3 gap-2'>


      <NavLink to='/'  className={({isActive})=>isActive? activeLink : normalLink}>
      <div>
            <AiOutlineDashboard size={20}/>
        </div>

        <div className='text-[12px]'>
          Dashboard
        </div>

      </NavLink>

      <NavLink to='dashboard/transaction'  className={({isActive})=>isActive? activeLink : normalLink}>
      <div>
            <FaExchangeAlt size={20}/>
        </div>

        <div className='text-[12px]'>
          Transactions
        </div>

      </NavLink>

      <NavLink to='/dashboard/user'  className={({isActive})=>isActive? activeLink : normalLink}>
      <div>
            <AiOutlineUser size={20}/>
        </div>

        <div className='text-[12px]'>
          Users
        </div>

      </NavLink>


      <NavLink to='/log-out'  className={({isActive})=>isActive? activeLink : normalLink}>
      <div>
            <BsPower size={20}/>
        </div>

        <div className='text-[13px]'>
          Log out
        </div>

      </NavLink>



       
       

     </div>
     
    
      
      </div>
    

    </div>
  )
}
