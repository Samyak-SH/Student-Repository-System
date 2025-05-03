import { Routes, Route, Navigate } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'

// Pages
import LandingPage from './pages/LandingPage'
import TeacherLogin from './pages/TeacherLogin'
import TeacherSignup from './pages/TeacherSignup'
import TeacherHome from './pages/TeacherHome'
import CertificatePage from './pages/CertificatePage'

// Protected Route Component (Without AuthContext)
const ProtectedRoute = ({ children }) => {
  // Since you're not using AuthContext, the "isLoggedIn" logic should be based on the simulated state
  const isLoggedIn = true; // This can be true or false depending on your logic (for now it will be true to simulate login)

  if (!isLoggedIn) {
    return <Navigate to="/" replace />
  }
  
  return children
}

function App() {
  return (
    <div className="flex min-h-screen flex-col bg-gray-50">
      <main className="flex-grow">
        <AnimatePresence mode="wait">
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<LandingPage />} />
            <Route path="/teacher/login" element={<TeacherLogin />} />
            <Route path="/teacher/signup" element={<TeacherSignup />} />

            {/* Protected Teacher Routes */}
            <Route 
              path="/teacher/home" 
              element={
                <ProtectedRoute>
                  <TeacherHome />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/teacher/certificates/:folderId" 
              element={
                <ProtectedRoute>
                  <CertificatePage />
                </ProtectedRoute>
              } 
            />

            {/* Fallback Route */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </AnimatePresence>
      </main>
    </div>
  )
}

export default App
