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
        message: '',
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
          console.log(result.data);

          if(result.data.data){
            console.log(result.data);
            dispatch(setUser(result.data))
            navigate('/');
            return
          }
          console.log(result.data);
          setError({message:result.data.msg})
        } catch (error) {
          if (error.name === 'ValidationError') {
            const validationErrors = {};
            error.inner.forEach((e) => {
              validationErrors[e.path] = e.message;
            });
            setError({message:`Please Fill  in the form correctly`})
            console.error('Validation error:', validationErrors);
          }else{ 
            console.log('Signup failed:', error.message);
            setError({message:'Something went wrong try again!!!'});

          }
           
          }
        
      };
    
  return (
    <div className="flex items-center justify-center w-screen h-screen bg-violet-500 ">
      {mutation.isPending && <Loader/>} 
      <form onSubmit={handleSubmit} className=" w-full sm:w-[450px] rounded-md   bg-white p-4 gap-4 flex flex-col m-1">
      <h4 className="text-gray-900 text-lg self-center ">Sign In</h4>
      {error?.message && <span className='text-red-800 text-[14px] items-center self-center flex gap-1 mt-1'> <AiFillWarning size={18} className='flex-shrink-0'/> {error.message}</span>}


          <div>    
            <label className="text-[14px] text-gray-700">Phone Number</label>
            <div className="border h-[45px] rounded-md  flex items-center bg-white gap-1 p-2">
              <div>
                <BsTelephoneFill size={18} className="text-gray-500" />
              </div>

              <input
                className="border-none outline-none bg-white placeholder:text-[13px] text-inbbxs p-2 placeholder:text-gray-200 text-gray-500   w-full"
                placeholder="Enter Phone Number"
                type="text"
                name="phoneNumber"
                value={formData.phoneNumber}
                onChange={handleChange}
              />
            </div>
            
          

          </div>

          <div>    
            <label className="text-[14px] text-gray-700">Password</label>
            <div className="border h-[45px] rounded-md  flex items-center bg-white gap-1 p-2">
              <div>
                <BsLockFill size={18} className="text-gray-500" />
              </div>

              <input
                className="border-none bg-white outline-none placeholder:text-[13px] text-xs p-2 placeholder:text-gray-300 text-gray-500  w-full"
                placeholder="Password"
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
              />
            </div>
            

          </div>



          <button type='submit'  className="bg-violet-500 flex items-center outline-none justify-center  uppercase text-[13px] text-white h-[45px] ">
            Sign In
          </button>

          <div className="flex gap-2">
            <p className="text-[13px] text-gray-700"> Don&apos;t have an Account?</p> <Link to='/sign-up' className='text-[13px] text-violet-900' >Sign Up </Link >

          </div>
        </form>
      
    </div>
  )
}

export default SigninPage