import React, { useState } from 'react'
import { AiOutlineMenu, AiTwotoneMinusSquare } from 'react-icons/ai'
import { BsBell, BsCalendar2, BsPeopleFill, BsPersonFill, BsSearch, BsXCircle } from 'react-icons/bs'
import { FaHamburger } from 'react-icons/fa'
import { useSelector } from 'react-redux'


function Header(props) {

  const { auth } = useSelector((state)=>state)
  const [openSearch, setOpenSearch] = useState(false);

  return (
    <div className='flex  justify-between items-center h-[70px] mx-1 bg-white  md:mx-4'>
      <div className='flex  items-center gap-2'>
      <AiOutlineMenu onClick={()=>props.setSidebar(true)}  className='xl:hidden' size={24}/>
      <div className='text-[13px] md:text-[20px] text-gray-900'>DashBoard  <span className='text-[13px] md:text-lg  text-gray-900'>   </span> </div>
      </div>

        <div className='flex gap-3 items-center'>

        <div className="flex gap-1 items-center">

            <div className='flex items-center justify-center p-2 rounded-full bg-purple-500'>
            <BsPersonFill className='text-white' size={18}/>
  
            </div>

            <div className='flex flex-col'>
              <p className='text-gray-500 text-[15px]'>{auth.isAuthenticated && auth.user.fullname.split(' ')[0]}</p>
              <p className='text-[10px] text-gray-400'>Admin</p>

            </div>
        </div>


        </div>
    </div>
  )
}

export default Header