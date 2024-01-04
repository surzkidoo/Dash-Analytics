import {} from 'react'

function Loader() {
  return (
    <div className='overlay z-[2]'>
        <div className="loader-bg m-[20px]"><div className='loader'></div></div>
    </div>
  )
}

export default Loader