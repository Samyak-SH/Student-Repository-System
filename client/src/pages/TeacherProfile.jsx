import { useState } from 'react'
import Navbar from '../components/common/Navbar'
import Footer from '../components/common/Footer'
import { motion } from 'framer-motion'
import { FiUser, FiMail, FiEdit2, FiSave, FiX } from 'react-icons/fi'

const TeacherProfile  = () => {

  // Make backend call here to fetch actual user profile 
  const currentUser = {
    firstName: 'John',
    lastName: 'Doe',
    email: 'john.doe@example.com',
    id: 'T12345', 
  }

  const [isEditing, setIsEditing] = useState(false)
  const [formData, setFormData] = useState({
    firstName: currentUser?.firstName || '',
    lastName: currentUser?.lastName || '',
    email: currentUser?.email || '',
    id: currentUser?.id || '',
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setSuccess('')


    // Validation
    if (!formData.firstName || !formData.lastName || !formData.email || !formData.id) {
      setError('All fields are required')
      return
    }

    if (!formData.email.includes('@')) {
      setError('Please enter a valid email address')
      return
    }

    setLoading(true)
    try {
    
     //Replace it with actual backend call
      setSuccess('Profile updated successfully!')
      setIsEditing(false)
    } catch (err) {
      setError(err.message || 'Failed to update profile')
    } finally {
      setLoading(false)
    }
  }


  //This section is for password genreation
  const handleGeneratePassword = () => {
   
     //Replace this with api call from backend 
    const generatedPassword = Math.random().toString(36).slice(-10)
    setSuccess(`New password generated: ${generatedPassword}`)
    setError('')
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
            <h1 className="text-3xl font-bold text-neutral-800 mb-2">Teacher Profile</h1>
            <p className="text-neutral-600">Manage your personal information</p>
          </motion.div>

          <div className="max-w-3xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="bg-white rounded-lg shadow-card p-8"
            >
              <div className="flex justify-between items-center mb-8">
                <h2 className="text-2xl font-semibold text-neutral-800">Personal Information</h2>

                {!isEditing ? (
                  <button
                    onClick={() => setIsEditing(true)}
                    className="btn-outline inline-flex items-center"
                  >
                    <FiEdit2 className="mr-2" />
                    <span>Edit Profile</span>
                  </button>
                ) : (
                  <button
                    onClick={() => {
                      setIsEditing(false)
                      setFormData({
                        firstName: currentUser?.firstName || '',
                        lastName: currentUser?.lastName || '',
                        email: currentUser?.email || '',
                        id: currentUser?.id || '',
                      })
                      setError('')
                      setSuccess('')
                    }}
                    className="btn-ghost inline-flex items-center"
                  >
                    <FiX className="mr-2" />
                    <span>Cancel</span>
                  </button>
                )}
              </div>

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

              <form onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  <div>
                    <label className="block text-sm font-medium text-neutral-700 mb-1">First Name</label>
                    {isEditing ? (
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <FiUser className="text-neutral-500" />
                        </div>
                        <input
                          type="text"
                          name="firstName"
                          value={formData.firstName}
                          onChange={handleChange}
                          className="input-field pl-10"
                        />
                      </div>
                    ) : (
                      <p className="font-medium text-neutral-800">{currentUser?.firstName}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-neutral-700 mb-1">Last Name</label>
                    {isEditing ? (
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <FiUser className="text-neutral-500" />
                        </div>
                        <input
                          type="text"
                          name="lastName"
                          value={formData.lastName}
                          onChange={handleChange}
                          className="input-field pl-10"
                        />
                      </div>
                    ) : (
                      <p className="font-medium text-neutral-800">{currentUser?.lastName}</p>
                    )}
                  </div>
                </div>

                <div className="mb-6">
                  <label className="block text-sm font-medium text-neutral-700 mb-1">Email</label>
                  {isEditing ? (
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <FiMail className="text-neutral-500" />
                      </div>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        className="input-field pl-10"
                      />
                    </div>
                  ) : (
                    <p className="font-medium text-neutral-800">{currentUser?.email}</p>
                  )}
                </div>

                <div className="mb-6">
                  <label className="block text-sm font-medium text-neutral-700 mb-1">User ID</label>
                  {isEditing ? (
                    <input
                      type="text"
                      name="id"
                      value={formData.id}
                      onChange={handleChange}
                      className="input-field"
                    />
                  ) : (
                    <p className="font-medium text-neutral-800">{currentUser?.id}</p>
                  )}
                </div>

                {isEditing && (
                  <div className="flex justify-end mt-8">
                    <button
                      type="submit"
                      className="btn-primary inline-flex items-center"
                      disabled={loading}
                    >
                      {loading ? (
                        <span>Loading...</span>
                      ) : (
                        <>
                          <FiSave className="mr-2" />
                          <span>Save Changes</span>
                        </>
                      )}
                    </button>
                  </div>
                )}
              </form>

              {/* password section */}
              <div className="mt-12 border-t pt-8">
                <h2 className="text-xl font-semibold text-neutral-800 mb-4">Forgot your password?</h2>
                <p className="text-neutral-600 mb-4">Click the button below to generate a new password.</p>

                <div className="flex items-center space-x-4">
                  <button
                    className="btn-outline"
                    onClick={handleGeneratePassword}
                  >
                    Generate New Password
                  </button>
                </div>

                <p className="text-sm text-neutral-500 mt-3">
                   You’ll receive your new password via your registered email .
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

export default TeacherProfile 
