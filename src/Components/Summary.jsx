import React from 'react'
import { BsCloudLightning, BsThreeDotsVertical } from 'react-icons/bs'

export default function Summary({name,number,icon}) {
  return (
    <div className="flex w-full md:w-[240px] rounded-[20px]  h-[150px] bg-white rounded-xl px-[28px] py-[25px] flex-row overflow-hidden">
     


    <div className="flex flex-col gap-[6px]">
        <p className="page-title-text">{number}</p>
        <p className="text-textPara font-medium text-[14px] w-[123px]">{name}</p>
    </div>

    <img src={icon} className='w-[908px] h-[128px]' alt="" />

  </div>
  )
}
