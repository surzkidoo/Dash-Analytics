import { useState } from 'react';
import { BsLockFill, BsTelephoneFill } from 'react-icons/bs'
import {
  useMutation, } from '@tanstack/react-query'
import { AiFillWarning } from 'react-icons/ai';
import { useDispatch } from 'react-redux';
import Loader from '../Components/Loader';
import { signInUser } from '../Api/SignIn';
import * as Yup from 'yup';
import { Link, useNavigate } from 'react-router-dom';
import { setUser } from '../features/Authslice';
import logo from '../assets/logo.png'

function SigninPage() {

  const navigate = useNavigate();
  const dispatch = useDispatch()


  
  const validationSchema = Yup.object().shape({
    password: Yup.string().required('Password is required').min(6, 'Password must be at least 6 characters'),
    phoneNumber: Yup.string().min(10, 'Invalid phone number').required('Phone number is required'),
  
  });
      //Form Data
      const [formData, setFormData] = useState({
        password: '',
        phoneNumber: '',
      });


      const [error, setError] = useState({
        message:'',
      });

      const mutation = useMutation({
        mutationFn:signInUser
      });
    
      const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData((prevData) => ({
          ...prevData,
          [name]: value,
        }));
      };


      const handleSubmit = async (event) => {
        event.preventDefault();
    
        try {
          await validationSchema.validate(formData, { abortEarly: false });
          let result = await mutation.mutateAsync(formData);
          console.log(result)
          if(result){
            if(result.data.data){
              console.log(result.data);
              if(!result.data.data.role=="admin"){
                setError({message:`You are not an admin`})
                return 
              }
              dispatch(setUser(result.data))
              navigate('/');
              return
            }else{
              console.log(result);
              setError({message:result.data.msg})

            }
          }
         
        } catch (error) {

          console.log(error)
          if (error.name === 'ValidationError') {
            const validationErrors = {};
            error.inner.forEach((e) => {
              validationErrors[e.path] = e.message;
            });
            setError({message:`Please Fill In Your Correct Detail`})
            console.error('Validation error:', validationErrors);
          }else{ 

            console.log('Signup failed:', error.message);
            setError({message:'Something went wrong try again!!!'});

          }
           
          }
        
      };
    
  return (
    <div className='flex'>
    <div className=' bg-bgform flex-[1] flex hidden md:flex  items-center'>
      <img src={logo} alt="" className='w-full'  />
    </div>
    <div className="flex w-full items-center flex-[4] justify-center mt-0 min-h-screen overflow-hidden bg-pageBg ">
    {mutation.isPending && <Loader/>} 
    <div className='w-[700px] flex justify-center rounded-[20px] py-[30px] md:py-[69px] bg-white shadow-max'>
    <form onSubmit={handleSubmit} className=" w-full md:w-[480px] rounded-md  bg-white p-4 gap-[32px] flex flex-col m-1">
      <div className='gap-[10px] flex-col flex'>
      <h4 className="self-center page-title-text">Sign in to your account</h4>

<p className='self-center text-main '>Login to access your dashboard and settings.</p>
      </div>
    

    {error.message && <span className='text-error bg-errorBg text-[14px] items-center self-center flex p-[6px]'>{error.message}</span>}


    <div className='flex flex-col gap-[12px]'>

      

     

        <div>    
          <div className="">
            

            <input
              className="input-active"
              placeholder="Enter Phone Number"
              type="text"
              name="phoneNumber"
              value={formData.phoneNumber}
              onChange={handleChange}
            />

          </div>
          
          {error?.phoneNumber && <span className='text-red-800 text-[12px] flex gap-1 mt-1'> <AiFillWarning/> {error.phoneNumber}</span>}


        </div>

      <div>    
          <div className="">
          

            <input
              className="input-active"
              placeholder="Password"
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
            
            />


          </div>
          {error?.password && <span className='text-red-800 text-[12px] flex gap-1 mt-1'> <AiFillWarning/> {error.password}</span>}

          

        </div>

       
       

        </div>


        <button type='submit'  className="bg-primary btn btn-xs outline-none hover:bg-secondary rounded-[5px] gap-[8px] flex items-center outline-none justify-center   text-[16px] text-white h-[57px] ">
          Login
        <svg width="7" height="8" viewBox="0 0 7 8" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M2.97623 1.3264L3.32307 0.970551C3.46993 0.819875 3.7074 0.819875 3.8527 0.970551L6.88986 4.08505C7.03672 4.23572 7.03672 4.47937 6.88986 4.62844L3.8527 7.74454C3.70584 7.89521 3.46836 7.89521 3.32307 7.74454L2.97623 7.38869C2.82781 7.23641 2.83093 6.98795 2.98248 6.83888L4.86508 4.99872H0.374958C0.167169 4.99872 0 4.8272 0 4.61401V4.10108C0 3.88789 0.167169 3.71637 0.374958 3.71637H4.86508L2.98248 1.87621C2.82937 1.72713 2.82625 1.47868 2.97623 1.3264Z" fill="white"/>
</svg>

        </button>
      <div className='flex gap-2 justify-center'>
      <Link to='/sign-up'> <p className="text-[16px] text-primary text-center">Create an account</p></Link>

      <Link to='/reset'><p  className="text-[16px] text-primary text-center"> Forgot password?</p></Link>
      </div>
         
      </form>
    </div>
  
    
  </div>
    </div>
  )
}

export default SigninPage