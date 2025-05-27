import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { FiPlus, FiHelpCircle, FiDownload } from 'react-icons/fi'
import axios from 'axios'

import Navbar from '../components/common/Navbar'
import Footer from '../components/common/Footer'
import SearchBar from '../components/common/SearchBar'
import FilterSection from '../components/teacher/FilterSection'
import FolderGrid from '../components/teacher/FolderGrid'
import StudentCredentialForm from '../components/teacher/StudentCredentialForm'

const SERVER_URL = import.meta.env.VITE_SERVER_URL

const TeacherHome = () => {
  const [students, setStudents] = useState([])
  const [searchQuery, setSearchQuery] = useState('')
  const [filters, setFilters] = useState({ category: '', department: '', semester: '' })
  const [isLoading, setIsLoading] = useState(true)
  const [showCredentialForm, setShowCredentialForm] = useState(false)

  // Fetch all students
  const getStudents = async () => {
    const token = localStorage.getItem('jwt_token_teacher')
    setIsLoading(true)
    try {
      const result = await axios.get(`${SERVER_URL}/teacher/getAllStudents`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      setStudents(result.data)
    } catch (err) {
      console.error(err)
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    getStudents()
  }, [])

  // Filter students based on all filters + search query
  const filteredStudents = students.filter((student) => {
    const categoryMatch = filters.category ? student.category === filters.category : true
    const departmentMatch = filters.department ? student.department === filters.department : true
    const semesterMatch = filters.semester ? student.semester === filters.semester : true
    const searchMatch = searchQuery
      ? student.USN.toLowerCase().includes(searchQuery.toLowerCase()) ||
        student.firstName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        student.lastName.toLowerCase().includes(searchQuery.toLowerCase())
      : true

    return categoryMatch && departmentMatch && semesterMatch && searchMatch
  })

  const handleSearch = (query) => setSearchQuery(query)
  const handleFilterChange = (newFilters) => setFilters(newFilters)

  const handleCreateStudentSuccess = () => {
    setShowCredentialForm(false)
    getStudents()
  }

  const handleDownloadCSV = () => {
    const headers = ['firstName', 'lastName', 'email', 'password', 'USN', 'department']
    const csvContent = headers.join(',') + '\n'
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' })
    const url = URL.createObjectURL(blob)

    const a = document.createElement('a')
    a.href = url
    a.download = 'student_credentials_template.csv'
    a.click()
    URL.revokeObjectURL(url)
  }

  return (
    <div className="min-h-screen flex flex-col bg-neutral-50">
      <Navbar />

      <main className="flex-grow">
        <div className="section-container p-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-8"
          >
            <h1 className="text-3xl font-bold text-neutral-800 mb-2">Teacher Dashboard</h1>
            <p className="text-neutral-600">View and manage student folders</p>
          </motion.div>

          <div className="mb-8">
            <SearchBar onSearch={handleSearch} placeholder="Search by USN or student name..." />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            <div className="lg:col-span-1">
              <div className="space-y-6">
                <FilterSection onFilterChange={handleFilterChange} />

                {(filters.department || filters.semester || filters.category) && (
                  <p className="text-sm text-neutral-500">
                    {filteredStudents.length} student{filteredStudents.length !== 1 && 's'} found
                    {filters.category && ` in category "${filters.category}"`}
                    {filters.department && ` in department "${filters.department}"`}
                    {filters.semester && ` for Semester ${filters.semester}`}
                  </p>
                )}

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.4 }}
                  className="bg-white rounded-lg shadow-card p-5"
                >
                  <h3 className="text-lg font-semibold mb-4">Teacher Actions</h3>

                  <button
                    onClick={() => setShowCredentialForm(true)}
                    className="btn-primary w-full justify-center py-3 mb-4"
                  >
                    <FiPlus className="mr-2" />
                    <span>Create Student Account</span>
                  </button>

                  {/*<button
                    onClick={handleDownloadCSV}
                    className="btn-secondary w-full justify-center py-3 mb-4 flex items-center"
                  >
                    <FiDownload className="mr-2" />
                    <span>Add Students Credential CSV</span>
                  </button>*/}

                  <div className="mt-4 p-4 bg-blue-50 rounded-md">
                    <div className="flex items-start">
                      <FiHelpCircle className="text-blue-500 mt-0.5 mr-2 flex-shrink-0" />
                      <p className="text-sm text-blue-700">
                        Click on any student folder to view their certificates
                      </p>
                    </div>
                  </div>
                </motion.div>
              </div>
            </div>

            <div className="lg:col-span-3">
              <FolderGrid students={filteredStudents} isLoading={isLoading} />
            </div>
          </div>
        </div>
      </main>

      <Footer />

      {showCredentialForm && (
        <StudentCredentialForm
          onClose={() => setShowCredentialForm(false)}
          onSuccess={handleCreateStudentSuccess}
        />
      )}
    </div>
  )
}

export default TeacherHome
