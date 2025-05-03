import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { FiUser, FiLogOut, FiMenu, FiX } from 'react-icons/fi'

const Navbar = () => {
  const navigate = useNavigate()
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const handleLogout = async () => {
    try {
      
      // Call the logout endpoint from backend 

      // Redirecting user after logout for now
      navigate('/')
    } catch (err) {
      console.error('Logout failed:', err)
    }
  }

  const navbarVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: 'easeOut' }
    }
  }

  return (
    <motion.nav
      className="bg-white shadow-md py-4"
      initial="hidden"
      animate="visible"
      variants={navbarVariants}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">

          {/* Logo */}
          <Link to="/home" className="flex items-center space-x-2">
            <div className="rounded-full bg-primary-500 text-white p-2">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
              </svg>
            </div>
            <span className="text-xl font-semibold text-primary-800">CertVault</span>
          </Link>

          {/* Profile section */}
          <div className="hidden md:flex items-center space-x-6">

            <Link
              to="/profile"
              className="flex items-center space-x-1 text-neutral-700 hover:text-primary-600 transition-colors"
            >
              <FiUser className="w-5 h-5" />
              <span>Profile</span>
            </Link>
            <button
              onClick={handleLogout}
              className="flex items-center space-x-1 text-neutral-700 hover:text-primary-600 transition-colors"
            >
              <FiLogOut className="w-5 h-5" />
              <span>Logout</span>
            </button>
          </div>

          {/* Profile menu*/}
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-neutral-700 hover:text-primary-600"
            >
              {isMenuOpen ? <FiX className="w-6 h-6" /> : <FiMenu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {isMenuOpen && (
          <motion.div
            className="md:hidden mt-4 space-y-4 py-2"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
          >
            <Link
              to="/profile"
              className="block py-2 px-4 text-neutral-700 hover:bg-neutral-100 rounded-md"
              onClick={() => setIsMenuOpen(false)}
            >
              <div className="flex items-center space-x-2">
                <FiUser className="w-5 h-5" />
                <span>Profile</span>
              </div>
            </Link>
            <button
              onClick={() => {
                setIsMenuOpen(false)
                handleLogout()
              }}
              className="block w-full text-left py-2 px-4 text-neutral-700 hover:bg-neutral-100 rounded-md"
            >
              <div className="flex items-center space-x-2">
                <FiLogOut className="w-5 h-5" />
                <span>Logout</span>
              </div>
            </button>
          </motion.div>
        )}
      </div>
    </motion.nav>
  )
}

export default Navbar
