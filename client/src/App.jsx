import { Routes, Route, Navigate } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'

// Pages
import LandingPage from './pages/LandingPage'
import TeacherLogin from './pages/TeacherLogin'
import TeacherSignup from './pages/TeacherSignup'
import TeacherHome from './pages/TeacherHome'
import CertificatePage from './pages/CertificatePage'
import StudentLogin from './pages/StudentLogin'
import StudentHome from './pages/StudentHome' 

// Protected Route
const ProtectedRoute = ({ children }) => {
  const isLoggedIn = true // 

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
            <Route path="/student/login" element={<StudentLogin />} />

            {/* Protected Routes */}
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
            <Route
              path="/student/home"
              element={
                <ProtectedRoute>
                  <StudentHome /> 
                </ProtectedRoute>
              }
            />

            {/* Fallback */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </AnimatePresence>
      </main>
    </div>
  )
}

export default App
