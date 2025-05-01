import React, { useState } from 'react';
import loginSignupImage from '../image/a6.png';
import { BiShow, BiHide } from "react-icons/bi";
import { Link, useNavigate } from 'react-router-dom';
import { ImagetoBase64 } from '../utility/ImagetoBase64';
import { toast } from 'react-hot-toast';

const Signup = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [data, setData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    address: "",          // 👈 New field
    password: "",
    confirmPassword: "",
    image: ""
  });

  const handleShowPassword = () => setShowPassword(prev => !prev);
  const handleShowConfirmPassword = () => setShowConfirmPassword(prev => !prev);

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setData(prev => ({ ...prev, [name]: value }));
  };

  const handleUploadProfileImage = async (e) => {
    const base64 = await ImagetoBase64(e.target.files[0]);
    setData(prev => ({ ...prev, image: base64 }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { firstName, email, password, confirmPassword, address } = data;

    if (firstName && email && password && confirmPassword && address) {
      if (password === confirmPassword) {
        try {
          const fetchData = await fetch(`${process.env.REACT_APP_SERVER_DOMAIN}/signup`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data)
          });

          const dataRes = await fetchData.json();
          console.log(dataRes);
          toast(dataRes.message);
          navigate("/login");
        } catch (err) {
          toast.error("Signup failed. Try again.");
          console.error(err);
        }
      } else {
        toast.error("Passwords do not match");
      }
    } else {
      toast.error("Please fill in all required fields");
    }
  };

  return (
    <div className='p-3 md:p-4 bg-slate-100'>
      <div className='w-full max-w-sm bg-white m-auto flex flex-col p-4'>

        <div className='w-20 overflow-hidden rounded-full drop-shadow-md shadow-md m-auto relative'>
          <img src={data.image || loginSignupImage} alt='' className='w-full h-full' />
          <label htmlFor='profileImage'>
            <div className="absolute bottom-0 h-1/2 bg-slate-500 bg-opacity-50 w-full text-center">
              <p className='text-sm p-1 text-white cursor-pointer'>Upload</p>
            </div>
            <input
              type="file"
              id='profileImage'
              accept='image/*'
              className='hidden'
              onChange={handleUploadProfileImage}
            />
          </label>
        </div>

        <form className='w-full py-3 flex flex-col' onSubmit={handleSubmit}>
          <label htmlFor='firstName'>First Name</label>
          <input type="text" id="firstName" name='firstName' className='mt-1 mb-2 w-full bg-slate-200 px-2 py-1 rounded focus-within:outline-blue-300' value={data.firstName} onChange={handleOnChange} />

          <label htmlFor='lastName'>Last Name</label>
          <input type="text" id="lastName" name='lastName' className='mt-1 mb-2 w-full bg-slate-200 px-2 py-1 rounded focus-within:outline-blue-300' value={data.lastName} onChange={handleOnChange} />

          <label htmlFor='email'>Email</label>
          <input type="email" id="email" name='email' className='mt-1 mb-2 w-full bg-slate-200 px-2 py-1 rounded focus-within:outline-blue-300' value={data.email} onChange={handleOnChange} />

          <label htmlFor='address'>Address</label>
          <input type="text" id="address" name='address' className='mt-1 mb-2 w-full bg-slate-200 px-2 py-1 rounded focus-within:outline-blue-300' value={data.address} onChange={handleOnChange} />

          <label htmlFor='password'>Password</label>
          <div className='flex px-2 py-1 bg-slate-200 rounded mt-1 mb-2 focus-within:outline-blue-300'>
            <input type={showPassword ? "text" : "password"} id="password" name='password' className='w-full bg-slate-200 px-2 py-1 rounded border-none outline-none' value={data.password} onChange={handleOnChange} />
            <span className='flex text-xl cursor-pointer' onClick={handleShowPassword}>
              {showPassword ? <BiShow /> : <BiHide />}
            </span>
          </div>

          <label htmlFor='confirmPassword'>Confirm Password</label>
          <div className='flex px-2 py-1 bg-slate-200 rounded mt-1 mb-2 focus-within:outline-blue-300'>
            <input type={showConfirmPassword ? "text" : "password"} id="confirmPassword" name='confirmPassword' className='w-full bg-slate-200 px-2 py-1 rounded border-none outline-none' value={data.confirmPassword} onChange={handleOnChange} />
            <span className='flex text-xl cursor-pointer' onClick={handleShowConfirmPassword}>
              {showConfirmPassword ? <BiShow /> : <BiHide />}
            </span>
          </div>

          <button className="w-full max-w-[150px] m-auto bg-red-500 hover:bg-red-600 cursor-pointer text-white text-xl font-medium text-center py-1 rounded-full mt-4">
            Sign up
          </button>
        </form>

        <p className="text-left text-sm mt-2">
          Already have an account?{" "}
          <Link to={"/login"} className="text-red-500 underline">Login</Link>
        </p>
      </div>
    </div>
  );
};

export default Signup;
