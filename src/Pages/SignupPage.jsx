import {useState} from 'react'
import {  BsEnvelopeFill, BsLockFill, BsPersonFill, BsTelephoneFill } from 'react-icons/bs'
import * as Yup from 'yup';
import { signupUser } from '../Api/SignUp';
import {
  useMutation, } from '@tanstack/react-query'
import { AiFillWarning } from 'react-icons/ai';
import Loader from '../Components/Loader';
import { Link } from 'react-router-dom';

function SignupPage() {
  
const validationSchema = Yup.object().shape({
  fullname: Yup.string().required('FullName is required'),
  email: Yup.string().email('Invalid email').required('Email is required'),
  password: Yup.string().min(6, 'Password must be at least 6 characters').required('Password is required'),
  phoneNumber: Yup.string().min(10, 'Invalid phone number').required('Phone number is required'),

});

      //Form Data
      const [formData, setFormData] = useState({
        fullname: '',
        email: '',
        password: '',
        phoneNumer: '',
      });

      //Form Validation Error
      const [error, setError] = useState({
        fullname: '',
        email: '',
        password: '',
        phoneNumber: '',
      });

      const [success, setSuccess] = useState('');


  const mutation = useMutation({
    mutationFn:signupUser
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
      await mutation.mutateAsync(formData);
      console.log(mutation.data);
      setSuccess(mutation.data.msg);

    } catch (error) {
      if (error.name === 'ValidationError') {

        const validationErrors = {};
        error.inner.forEach((e) => {
          validationErrors[e.path] = e.message;
        });
        setError(validationErrors)
        console.error('Validation error:', validationErrors);
      } else {
        console.error('Signup failed:', error.message);
      }
    }
  };

 
 

  return (
    <div className="flex items-center justify-center mt-0 min-h-screen overflow-hidden bg-violet-800 ">
      {mutation.isPending && <Loader/>} 
      <form onSubmit={handleSubmit} className=" w-full sm:w-[450px] rounded-md  bg-white p-4 gap-4 flex flex-col m-1">
      <h4 className="text-gray-900 text-lg self-center font-semibold">Sign Up</h4>

      {success && <span className='text-green-500 text-[14px] items-center self-center flex gap-1 mt-1'>  {success}</span>}

          <div>    

            <label className="text-[14px] text-gray-700">Full Name</label>
            <div className="border h-[45px] rounded-md  flex items-center bg-white gap-1 p-2">
              <div>
                <BsPersonFill size={18} className="text-gray-500" />
              </div>

              <input
                className="border-none outline-none bg-white placeholder:text-[13px] text-xs p-2 placeholder:text-zink-400 text-gray-500  w-full"
                placeholder="Full Name"
                type="text"
                name="fullname"
                value={formData.fullname}
                onChange={handleChange}
              />
            </div>

            {error?.fullname && <span className='text-red-800 text-[12px] flex gap-1 mt-1'> <AiFillWarning/> {error.fullname}</span>}

            
          

          </div>

          <div>    
            <label className="text-[14px] text-gray-700">Email</label>
            <div className="border h-[45px] rounded-md  flex items-center bg-white gap-1 p-2">
              <div>
                <BsEnvelopeFill size={18} className="text-gray-500" />
              </div>

              <input
                className="border-none outline-none bg-white placeholder:text-[13px] text-xs p-2 placeholder:text-zink-400 text-gray-500   w-full"
                placeholder="Enter your E-mail Addresss"
                type="text"
                name="email"
                value={formData.email}
                onChange={handleChange}
              />


            </div>
              {error?.email && <span className='text-red-800 text-[12px] flex gap-1 mt-1'> <AiFillWarning/> {error.email}</span>}

          

          </div>



          <div>    
            <label className="text-[14px] text-gray-700">Phone Number</label>
            <div className="border h-[45px] rounded-md  flex items-center bg-white gap-1 p-2">
              <div>
                <BsTelephoneFill size={18} className="text-gray-500" />
              </div>

              <input
                className="border-none outline-none bg-white placeholder:text-[13px] text-xs p-2 placeholder:text-zink-400 text-gray-500   w-full"
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
            <label className="text-[14px] text-gray-700">Password</label>
            <div className="border h-[45px] rounded-md  flex items-center bg-white gap-1 p-2">
              <div>
                <BsLockFill size={18} className="text-gray-500" />
              </div>

              <input
                className="border-none outline-none bg-white placeholder:text-[13px] text-xs p-2 placeholder:text-zink-400 text-gray-500  w-full"
                placeholder="Password"
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
              
              />


            </div>
            {error?.password && <span className='text-red-800 text-[12px] flex gap-1 mt-1'> <AiFillWarning/> {error.password}</span>}

            

          </div>



          <button type='submit'  className="bg-violet-800 btn btn-xs hover:bg-violet-800  flex items-center outline-none justify-center  uppercase text-[13px] text-white h-[45px] ">
            Sign up
          </button>

          <div className="flex gap-2">
            <p className="text-[13px] text-gray-700">Already have an Account?</p> <Link to='/sign-in' className='text-[13px] font-bold text-violet-900' >Sign In</Link>

          </div>
        </form>
      
    </div>
  )
}

export default SignupPage