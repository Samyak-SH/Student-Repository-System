import { createContext, useContext, useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast'

const AuthContext = createContext()

export const useAuth = () => useContext(AuthContext)

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null)
  const [loading, setLoading] = useState(true)
  const navigate = useNavigate()
  
  useEffect(() => {
    // Load user from localStorage on initial render
    const storedUser = localStorage.getItem('user')
    if (storedUser) {
      setCurrentUser(JSON.parse(storedUser))
    }
    setLoading(false)
  }, [])

  // Mock user signup function
  const signup = (userData, role) => {
    // In a real app, this would be an API call
    return new Promise((resolve) => {
      setTimeout(() => {
        const newUser = {
          ...userData,
          id: Date.now().toString(),
          role,
        }
        
        // Store in localStorage (mimicking backend storage)
        const users = JSON.parse(localStorage.getItem('users') || '[]')
        users.push(newUser)
        localStorage.setItem('users', JSON.stringify(users))
        
        // Set current user
        setCurrentUser(newUser)
        localStorage.setItem('user', JSON.stringify(newUser))
        
        toast.success('Account created successfully!')
        resolve(newUser)
      }, 1000)
    })
  }
  
  // Mock user login function - now accepts any credentials
  const login = (credentials, role) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        // Create a mock user with the provided credentials
        const user = {
          id: Date.now().toString(),
          email: credentials.email,
          firstName: 'Demo',
          lastName: 'User',
          role,
          ...(role === 'teacher' ? {
            teacherId: 'T123'
          } : {
            usn: 'S123',
            department: 'Computer Science'
          })
        }
        
        setCurrentUser(user)
        localStorage.setItem('user', JSON.stringify(user))
        toast.success('Logged in successfully!')
        resolve(user)
      }, 1000)
    })
  }
  
  // Mock function to create student credentials (for teachers)
  const createStudentCredential = (studentData) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const newStudent = {
          ...studentData,
          id: Date.now().toString(),
          role: 'student',
        }
        
        // Store in localStorage
        const users = JSON.parse(localStorage.getItem('users') || '[]')
        users.push(newStudent)
        localStorage.setItem('users', JSON.stringify(users))
        
        toast.success('Student account created successfully!')
        resolve(newStudent)
      }, 1000)
    })
  }
  
  // Logout function
  const logout = () => {
    setCurrentUser(null)
    localStorage.removeItem('user')
    toast.success('Logged out successfully!')
    navigate('/')
  }
  
  // Mock function to get all students (for teachers)
  const getStudents = () => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const users = JSON.parse(localStorage.getItem('users') || '[]')
        const students = users.filter(user => user.role === 'student')
        resolve(students)
      }, 500)
    })
  }
  
  const updateProfile = (updateData) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        // Update in localStorage
        const users = JSON.parse(localStorage.getItem('users') || '[]')
        const userIndex = users.findIndex(u => u.id === currentUser.id)
        
        if (userIndex !== -1) {
          const updatedUser = { ...users[userIndex], ...updateData }
          users[userIndex] = updatedUser
          localStorage.setItem('users', JSON.stringify(users))
          
          // Update current user
          setCurrentUser(updatedUser)
          localStorage.setItem('user', JSON.stringify(updatedUser))
          
          toast.success('Profile updated successfully!')
          resolve(updatedUser)
        }
      }, 1000)
    })
  }
  
  const value = {
    currentUser,
    signup,
    login,
    logout,
    createStudentCredential,
    getStudents,
    updateProfile,
    loading
  }
  
  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  )
}