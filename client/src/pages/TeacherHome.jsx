import { useState, useEffect } from 'react'
import Navbar from '../components/common/Navbar'
import Footer from '../components/common/Footer'
import SearchBar from '../components/common/SearchBar'
import FilterSection from '../components/teacher/FilterSection'
import FolderGrid from '../components/teacher/FolderGrid'
import StudentCredentialForm from '../components/teacher/StudentCredentialForm'
import { getAllFolders } from '../utils/mockData'
import { motion } from 'framer-motion'
import { FiPlus, FiHelpCircle } from 'react-icons/fi'

const TeacherHome = () => {
  const [folders, setFolders] = useState([])
  const [filteredFolders, setFilteredFolders] = useState([])
  const [searchQuery, setSearchQuery] = useState('')
  const [filters, setFilters] = useState({ category: '', department: '' })
  const [isLoading, setIsLoading] = useState(true)
  const [showCredentialForm, setShowCredentialForm] = useState(false)


  // Replace this function with real API call from backend
  const fetchFolders = async () => {
    setIsLoading(true)
    try {
      const data = getAllFolders()    //replace this with api call
      setFolders(data)
      setFilteredFolders(data)
    } catch (error) {
      console.error('Error fetching folders:', error)
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    fetchFolders()
  }, [])

  useEffect(() => {
    let results = folders

    if (searchQuery) {
      const query = searchQuery.toLowerCase()
      results = results.filter(folder =>
        folder.studentName.toLowerCase().includes(query) ||
        folder.name.toLowerCase().includes(query)
      )
    }

    if (filters.category) {
      results = results.filter(folder => folder.category === filters.category)
    }

    if (filters.department) {
      results = results.filter(folder => folder.studentDepartment === filters.department)
    }

    setFilteredFolders(results)
  }, [searchQuery, filters, folders])

  const handleSearch = (query) => setSearchQuery(query)
  const handleFilterChange = (newFilters) => setFilters(newFilters)
  const handleCreateStudentSuccess = () => {
    setShowCredentialForm(false)
   
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
            <h1 className="text-3xl font-bold text-neutral-800 mb-2">Teacher Dashboard</h1>
            <p className="text-neutral-600">Manage student certificates and credentials</p>
          </motion.div>


           {/* SearchBar */}
          <div className="mb-8">
            <SearchBar onSearch={handleSearch} />
          </div>

         {/* Filtersection */}
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            <div className="lg:col-span-1">
              <div className="space-y-6">
                <FilterSection onFilterChange={handleFilterChange} />

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.4 }}
                  className="bg-white rounded-lg shadow-card p-5"
                >


                  {/* Credential for */}
                  <h3 className="text-lg font-semibold mb-4">Teacher Actions</h3>
                  <button
                    onClick={() => setShowCredentialForm(true)}
                    className="btn-primary w-full justify-center py-3 mb-4"
                  >
                    <FiPlus className="mr-2" />
                    <span>Create Student Account</span>
                  </button>

                  <div className="p-4 bg-blue-50 rounded-md">
                    <div className="flex items-start">
                      <FiHelpCircle className="text-blue-500 mt-0.5 mr-2 flex-shrink-0" />
                      <p className="text-sm text-blue-700">
                        Create accounts for students to give them access to upload their certificates.
                      </p>
                    </div>
                  </div>
                </motion.div>
              </div>
            </div>

            <div className="lg:col-span-3">
              <FolderGrid folders={filteredFolders} isLoading={isLoading} />
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
