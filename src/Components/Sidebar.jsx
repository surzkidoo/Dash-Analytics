import { AiFillCloseCircle, AiOutlineUser } from 'react-icons/ai'
import {BsDashSquare,  BsPower} from 'react-icons/bs'
import { NavLink } from 'react-router-dom'
export default function Sidebar(props) {
  const activeLink= ' flex gap-2 pl-4 w-full flex items-center p-2.5    bg-violet-400 text-white rounded-md'
  const normalLink ='flex gap-2 text-white pl-4 w-full flex items-center rounded-md  p-2.5  cursor-pointer hover:bg-violet-400'


  return (

    <div style={{zIndex:900}} className={`w-[250px]  bg-violet-500 left-0 xl:static border-r h-screen fixed  p-2 shadow  ${!props.sidebar && 'hidden'}  xl:block`}>

      <div className=''>
 <div className='text-lg font-bold pl-4 mt-3 justify-between flex items-center'><div>
        <span className=' text-violet-100 '>Dash-Analytics</span>

 </div>

      <AiFillCloseCircle onClick={()=>{props.setSidebar(!props.sidebar)}} className='mr-1 xl:hidden'size={24}/>
     </div>

     <div className='flex flex-col mt-3 gap-2'>


      <NavLink to='/'  className={({isActive})=>isActive? activeLink : normalLink}>
      <div>
            <BsDashSquare size={20}/>
        </div>

        <div className='text-[13px]'>
          Dashboard
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
