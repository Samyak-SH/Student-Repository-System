import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useEffect } from 'react'
import axios from 'axios'

const SERVER_URL = import.meta.env.VITE_SERVER_URL;

const StudentLogin = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const navigate = useNavigate()

  const verifyToken = async (token)=>{
    try{
      const response = await axios.post(`${SERVER_URL}/verify`, {token : token});
      if(response.status == 200){
      navigate('/student/home');
      }

    }
    catch(err){
      if(err.response.status == 401){
      alert("session expired please login again");
      }
    }
  }
  useEffect(() => {
    const token = localStorage.getItem('jwt_token_student');
    if (token) {
      verifyToken(token);
    }
  }, [])

  const handleLogin = async (e) => {
    e.preventDefault()
    setError('')

    if (!email || !password) {
      setError('All fields are required')
      return
    }
    const formData = {
      email : email,
      password : password
    }
    try {
      console.log("sending req");
      const response = await axios.post(`${SERVER_URL}/studentLogin`, formData);
      if (response.status == 200) {
        const token = response.headers['x-auth-token'];
        localStorage.setItem('jwt_token_student', token);
        navigate('/student/home');
      }
    } catch (err) {
      console.error(err);
      if (err.response?.status === 401) {
        setError("Wrong credentials");
      } else if (err.response?.status === 404) {
        setError("User doesn't exist");
      } else {
        setError("Login failed. Please try again.");
      }
    }

  }

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-primary-50 to-primary-100">
      <div className="container mx-auto px-6 py-8">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
        
        </motion.div>
      </div>

      <div className="flex-grow flex items-center justify-center px-6 py-12">
        <motion.form
          onSubmit={handleLogin}
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md space-y-6"
        >
          <div className="text-center mb-8">
            <div className="inline-block p-3 rounded-full bg-primary-100 text-primary-600 mb-4">
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
            </div>
            <h2 className="text-3xl font-bold text-neutral-800">Welcome</h2>
            <p className="text-neutral-600 mt-2">Log in to your Student account</p>
          </div>
          {error && (
            <div className="text-red-600 text-sm text-center">{error}</div>
          )}

          <div>
            <label
              htmlFor="email"
              className="block mb-1 text-sm font-medium text-gray-700"
            >
              Email
            </label>
            <input
              type="text"
              id="studentId"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full border border-gray-300 px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-secondary-400"
            />
          </div>

          <div>
            <label
              htmlFor="password"
              className="block mb-1 text-sm font-medium text-gray-700"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full border border-gray-300 px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-secondary-400"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-secondary-600 text-white py-2 rounded-md hover:bg-blue-700 "
          >
            Login
          </button>
        </motion.form>
      </div>
    </div>
  )
}

export default StudentLogin
