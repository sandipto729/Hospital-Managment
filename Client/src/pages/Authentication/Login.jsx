import React, { useContext, useEffect, useState } from 'react'
import { AppContext } from '../../context/AppContext'
import axios from 'axios'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'
import GitHubIcon from '@mui/icons-material/GitHub';
import { useLocation } from 'react-router-dom';
import GoogleIcon from '@mui/icons-material/Google';

const Login = () => {

  const [state, setState] = useState('Sign Up')

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const navigate = useNavigate()
  const { backendUrl, token, setToken } = useContext(AppContext)
  console.log('backendUrl', backendUrl)

  const onSubmitHandler = async (event) => {
    event.preventDefault();

    if (state === 'Sign Up') {

      const { data } = await axios.post(backendUrl + '/api/user/register', { name, email, password })

      if (data.success) {
        localStorage.setItem('token', data.token)
        setToken(data.token)
      } else {
        toast.error(data.message)
      }

    } else {

      const { data } = await axios.post(backendUrl + '/api/user/login', { email, password })

      if (data.success) {
        localStorage.setItem('token', data.token)
        setToken(data.token)
      } else {
        toast.error(data.message)
      }

    }

  }

  useEffect(() => {
    if (token) {
      navigate('/')
    }
  }, [token])


  const location = useLocation();

  // useEffect(() => {
  //   const fetchAccessToken = async () => {
  //     const queryString = window.location.search;
  //     const urlParams = new URLSearchParams(queryString);
  //     const codeParam = urlParams.get('code');
  //     console.log("Code Param:", codeParam);

  //     if (codeParam) {
  //       try {
  //         const response = await fetch(`${backendUrl}/getAccessToken?code=${codeParam}`);
  //         const data = await response.json();
  //         if (data.success) {
  //           localStorage.setItem('token', data.token)
  //           setToken(data.token)
  //         } else {
  //           toast.error(data.message)
  //         }
  //       } catch (error) {
  //         console.error("Error fetching access token:", error);
  //       }
  //     }
  //   };

  //   fetchAccessToken();
  // }, [location, backendUrl]);

  useEffect(() => {
    const fetchAccessToken = async () => {
      const queryString = window.location.search;
      const urlParams = new URLSearchParams(queryString);
      const codeParam = urlParams.get('code');
  
      if (codeParam) {
        try {
          const response = await fetch(`${backendUrl}/getGoogleAccessToken?code=${codeParam}`);
          const data = await response.json();
          if (data.success) {
            localStorage.setItem('token', data.token)
            setToken(data.token)
          } else {
            toast.error(data.message)
          }
        } catch (error) {
          console.error("Error fetching access token:", error);
        }
      }
    };
    fetchAccessToken();
  }, [location, backendUrl]);
  
  const loginWithGoogle = async () => {
    const url = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${import.meta.env.VITE_GOOGLE_CLIENT_ID}&redirect_uri=${import.meta.env.VITE_GOOGLE_REDIRECT_URI}&response_type=code&scope=email`;
    window.open(url, "_self");
  };

  
  const loginWithGithub = async () => {
    window.location.assign(
      `https://github.com/login/oauth/authorize?client_id=${import.meta.env.VITE_GITHUB_CLIENT_ID}`
    );
  };



  

  return (
    <form onSubmit={onSubmitHandler} className='min-h-[80vh] flex items-center'>
      <div className='flex flex-col gap-3 m-auto items-start p-8 min-w-[340px] sm:min-w-96 border rounded-xl text-[#5E5E5E] text-sm shadow-lg'>
        <p className='text-2xl font-semibold'>{state === 'Sign Up' ? 'Create Account' : 'Login'}</p>
        <p  className='flex items-center gap-2 cursor-pointer'>
          Login with <GitHubIcon onClick={loginWithGithub}/> <GoogleIcon onClick={loginWithGoogle}/>
        </p>
        {/* <p  className='flex items-center gap-2 cursor-pointer'>
          Login with 
        </p> */}
        <p>Please {state === 'Sign Up' ? 'sign up' : 'log in'} to book appointment</p>
        {state === 'Sign Up'
          ? <div className='w-full '>
            <p>Full Name</p>
            <input onChange={(e) => setName(e.target.value)} value={name} className='border border-[#DADADA] rounded w-full p-2 mt-1' type="text" required />
          </div>
          : null
        }
        <div className='w-full '>
          <p>Email</p>
          <input onChange={(e) => setEmail(e.target.value)} value={email} className='border border-[#DADADA] rounded w-full p-2 mt-1' type="email" required />
        </div>
        <div className='w-full '>
          <p>Password</p>
          <input onChange={(e) => setPassword(e.target.value)} value={password} className='border border-[#DADADA] rounded w-full p-2 mt-1' type="password" required />
        </div>
        <button className='bg-primary text-white w-full py-2 my-2 rounded-md text-base'>{state === 'Sign Up' ? 'Create account' : 'Login'}</button>
        {state === 'Sign Up'
          ? <p>Already have an account? <span onClick={() => setState('Login')} className='text-primary underline cursor-pointer'>Login here</span></p>
          : <p>Create an new account? <span onClick={() => setState('Sign Up')} className='text-primary underline cursor-pointer'>Click here</span></p>
        }
      </div>
    </form>
  )
}

export default Login



