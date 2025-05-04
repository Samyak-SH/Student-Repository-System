import { useState } from 'react'
import Navbar from '../components/common/Navbar'
import Footer from '../components/common/Footer'
import { motion } from 'framer-motion'
import { FiMail } from 'react-icons/fi'

const StudentProfile = () => {
  // 🔧 Replace with actual backend call to fetch student profile
  const currentUser = {
    email: 'student@example.com',
  }

  const [email, setEmail] = useState(currentUser?.email || '')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')

  const handleGeneratePassword = async () => {
    setLoading(true)
    setError('')
    setSuccess('')

    try {
      // 🔧 Replace with API call like:
      // await axios.post('/api/reset-password', { email })

      const tempPassword = Math.random().toString(36).slice(-10)
      setSuccess(`New password generated: ${tempPassword}`)
    } catch (err) {
      setError('Failed to generate new password.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex flex-col bg-neutral-50">
      <Navbar />

      <main className="flex-grow">
        <div className="section-container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-8"
          >
            <h1 className="text-3xl font-bold text-neutral-800 mb-2">Student Profile</h1>
            <p className="text-neutral-600">Manage your email and reset your password</p>
          </motion.div>

          <div className="max-w-xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="bg-white rounded-lg shadow-card p-8"
            >
              {error && (
                <div className="mb-6 p-4 bg-red-50 text-red-700 rounded-md text-sm">
                  {error}
                </div>
              )}

              {success && (
                <div className="mb-6 p-4 bg-green-50 text-green-700 rounded-md text-sm">
                  {success}
                </div>
              )}

              <div className="mb-6">
                <label className="block text-sm font-medium text-neutral-700 mb-1">Email</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FiMail className="text-neutral-500" />
                  </div>
                  <input
                    type="email"
                    name="email"
                    value={email}
                    disabled
                    className="input-field pl-10 bg-neutral-100 cursor-not-allowed"
                  />
                </div>
              </div>

              <div className="mt-12 border-t pt-8">
                <h2 className="text-xl font-semibold text-neutral-800 mb-4">Forgot your password?</h2>
                <p className="text-neutral-600 mb-4">Click the button below to generate a new password.</p>

                <div className="flex items-center space-x-4">
                  <button
                    className="btn-outline"
                    onClick={handleGeneratePassword}
                    disabled={loading}
                  >
                    {loading ? 'Generating...' : 'Generate New Password'}
                  </button>
                </div>

                <p className="text-sm text-neutral-500 mt-3">
                  * You’ll receive your new password via email once backend is connected.
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}

export default StudentProfile
