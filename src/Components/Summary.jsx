import React from 'react'
import { BsCloudLightning, BsThreeDotsVertical } from 'react-icons/bs'

export default function Summary({name,number,icon}) {
  return (
    <div className="flex w-full md:w-[339px] rounded-[20px]  h-[202px] bg-white rounded-xl px-[36px] py-[44px] flex-row overflow-hidden">
     


    <div className="flex flex-col gap-[10px]">
        <p className="page-title-text">{number}</p>
        <p className="text-textPara font-medium text-[18px] w-[153px]">{name}</p>
    </div>

    <img src={icon} className='w-[178px] h-[178px]' alt="" />

  </div>
  )
}
