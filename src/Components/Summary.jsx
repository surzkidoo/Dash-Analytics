import React from 'react'
import { BsCloudLightning, BsThreeDotsVertical } from 'react-icons/bs'

export default function Summary({name,number,icon,color}) {
  return (
    <div className="flex w-full md:w-[230px]  h-[130px] bg-white rounded-xl  flex-col justify-between p-3">
    <div className="flex justify-between  self-start  w-full ">
        <div className={`p-1 ${color} rounded-md`}>
            {icon}
        </div>

        <BsThreeDotsVertical className="text-black" size={20} />

    </div>

    <div className="flex flex-col">
        <p className="text-gray-400 text-[10px]">{name}</p>
        <p className="text-gray-900">{number}</p>
    </div>

  </div>
  )
}
