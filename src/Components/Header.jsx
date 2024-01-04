import React, { useState } from 'react'
import { AiOutlineMenu, AiTwotoneMinusSquare } from 'react-icons/ai'
import { BsBell, BsCalendar2, BsPeopleFill, BsPersonFill, BsSearch, BsXCircle } from 'react-icons/bs'
import { FaHamburger } from 'react-icons/fa'
import { useSelector } from 'react-redux'


function Header(props) {

  const { auth } = useSelector((state)=>state)
  const [openSearch, setOpenSearch] = useState(false);

  return (
    <div className='flex  justify-between items-center h-full mx-1 bg-white  md:mx-4'>
      <div className='flex  items-center gap-[41px]'>
      <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M17.3749 25.75H4.625C3.72751 25.75 3 25.0224 3 24.125C3 23.2276 3.72751 22.5 4.625 22.5H17.3749C18.2724 22.5 18.9999 23.2276 18.9999 24.125C18.9999 25.0224 18.2724 25.75 17.3749 25.75Z" fill="#5D6065"/>
<path d="M27.3749 17.625H4.625C3.72751 17.625 3 16.8974 3 16C3 15.1026 3.72751 14.375 4.625 14.375H27.3749C28.2724 14.375 28.9999 15.1025 28.9999 16C28.9999 16.8975 28.2724 17.625 27.3749 17.625Z" fill="#5D6065"/>
<path d="M27.3749 9.50001H4.625C3.72751 9.50001 3 8.7725 3 7.875C3 6.97751 3.72751 6.25 4.625 6.25H27.3749C28.2724 6.25 28.9999 6.97751 28.9999 7.875C28.9999 8.7725 28.2724 9.50001 27.3749 9.50001Z" fill="#5D6065"/>
</svg>

      <AiOutlineMenu onClick={()=>props.setSidebar(true)}  className='xl:hidden' size={24}/>
      <h1 className='secondary-text'>Dashboard  </h1>
      </div>

        <div className='flex gap-3 items-center'>

        <div className="flex gap-1 items-center gap-[19px]">

        <div className='flex flex-col gap-[8px]'>
              <p className='secondary-text'>{auth.isAuthenticated && auth.user.fullname}</p>
              <p className='text-main text-end'>karaads</p>

            </div>

        <svg width="57" height="57" viewBox="0 0 57 57" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect width="57" height="57" rx="5" fill="url(#paint0_linear_0_1)"/>
            <path d="M18.0649 38C17.5609 38 17.1469 37.847 16.8229 37.541C16.5169 37.217 16.3639 36.821 16.3639 36.353V20.747C16.3639 20.279 16.5169 19.892 16.8229 19.586C17.1469 19.262 17.5429 19.1 18.0109 19.1H26.7859C27.2539 19.1 27.6409 19.253 27.9469 19.559C28.2709 19.847 28.4329 20.225 28.4329 20.693C28.4329 21.089 28.2709 21.44 27.9469 21.746C27.6409 22.052 27.2539 22.205 26.7859 22.205H19.4959L19.7389 21.881V27.308L19.5499 26.957H25.5709C26.0389 26.957 26.4259 27.11 26.7319 27.416C27.0559 27.704 27.2179 28.082 27.2179 28.55C27.2179 28.946 27.0559 29.297 26.7319 29.603C26.4259 29.909 26.0389 30.062 25.5709 30.062H19.4959L19.7389 29.819V36.353C19.7389 36.821 19.5679 37.217 19.2259 37.541C18.9019 37.847 18.5149 38 18.0649 38ZM41.947 34.841C42.415 34.841 42.802 34.994 43.108 35.3C43.432 35.588 43.594 35.966 43.594 36.434C43.594 36.884 43.432 37.262 43.108 37.568C42.802 37.856 42.415 38 41.947 38H33.172C32.704 38 32.308 37.847 31.984 37.541C31.678 37.217 31.525 36.821 31.525 36.353V20.747C31.525 20.279 31.687 19.892 32.011 19.586C32.335 19.262 32.749 19.1 33.253 19.1C33.685 19.1 34.063 19.262 34.387 19.586C34.729 19.892 34.9 20.279 34.9 20.747V35.3L34.306 34.841H41.947Z" fill="white"/>
            <defs>
            <linearGradient id="paint0_linear_0_1" x1="62.8966" y1="36.3621" x2="-2.89934e-06" y2="36.3621" gradientUnits="userSpaceOnUse">
            <stop offset="0.0543172" stop-color="#0AAAAA"/>
            <stop offset="1" stop-color="#066969"/>
            </linearGradient>
            </defs>
            </svg>


           
        </div>


        </div>
    </div>
  )
}

export default Header