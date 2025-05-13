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

const SERVER_URL =  import.meta.env.VITE_SERVER_URL;


const TeacherHome = () => {
  const [folders, setFolders] = useState([])
  const [filteredFolders, setFilteredFolders] = useState([])
  const [searchQuery, setSearchQuery] = useState('')
  const [filters, setFilters] = useState({ category: '', department: '' })
  const [isLoading, setIsLoading] = useState(true)
  const [showCredentialForm, setShowCredentialForm] = useState(false)


  //Fetch all folder later when connected to backend 
  const fetchFolders = async () => {
    setIsLoading(true)
    // try {
    //   // const response = await fetch('/api/folders')
    //   // const data = await response.json()

    //   setFolders(data)
    //   setFilteredFolders(data)
    // }
    // catch (error) {
    //   console.error('Error fetching folders:', error)
    // }
    // finally {
    //   setIsLoading(false)
    // }
  }


  //call real api from backend to get certificates for all folders
  const fetchCertificatesForFolder = async (folderId) => {
    try {
      const response = await fetch(`/api/folders/${folderId}/certificates`)
      const data = await response.json()

    } catch (error) {
      console.error('Error fetching certificates:', error)
    }
  }

  useEffect(() => {
    const getStudents = async()=>{
      const token = localStorage.getItem("jwt_token_teacher");
      try{
        const result = await axios.get(`${SERVER_URL}/teacher/getAllStudents`, {
          headers : {
            Authorization : `Bearer ${token}`
          }
        })
        console.log(result.data);
      }catch(err){
        console.error(err);
      }
    }

    getStudents();
    fetchFolders()
  }, [])


  // use this fucntion whenever teacher clicks on a specific student and add the student's usn in the api call to get all their certificates
  // const getStudentCertificate = async()=>{
  //   const token = localStorage.getItem("jwt_token_teacher");
  //   try{
  //     const result = await axios.get(`${SERVER_URL}/teacher/getStudentCertificate?USN=${'replace with usn'}`, {
  //     headers : {
  //       Authorization : `Bearer ${token}`
  //     }
  //     })
  //     console.log(result);
  //   }catch(err){
  //     console.error(err);
  //   }
  // }



  //fetch folder based on filter through backend
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
    fetchFolders() 
  }



  //For csv file to add credentual oof student
  const downloadCredentials = () => {
    const csvHeader = 'Student Name,Email,Department,Folder Name\n'
    const csvRows = folders.map(f =>
      `${f.studentName},${f.studentEmail || ''},${f.studentDepartment},${f.name}`
    )
    const csvContent = csvHeader + csvRows.join('\n')

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' })
    const url = URL.createObjectURL(blob)

    window.open(url) 
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

          <div className="mb-8">
            <SearchBar onSearch={handleSearch} />
          </div>

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
                  <h3 className="text-lg font-semibold mb-4">Teacher Actions</h3>

                  <button
                    onClick={() => setShowCredentialForm(true)}
                    className="btn-primary w-full justify-center py-3 mb-4"
                  >
                    <FiPlus className="mr-2" />
                    <span>Create Student Account</span>
                  </button>

                  <button
                    onClick={downloadCredentials}
                    className="btn-secondary w-full justify-center py-3"
                  >
                    <FiDownload className="mr-2" />
                    <span>Add Credential of Student </span>
                  </button>

                  <div className="p-4 mt-4 bg-blue-50 rounded-md">
                    <div className="flex items-start">
                      <FiHelpCircle className="text-blue-500 mt-0.5 mr-2 flex-shrink-0" />
                      <p className="text-sm text-blue-700">
                        Create accounts for students to give them access to upload their certificates. Also add each student  credential in CSV file.
                      </p>
                    </div>
                  </div>
                </motion.div>
              </div>
            </div>

            <div className="lg:col-span-3">
              <FolderGrid
                folders={filteredFolders}
                isLoading={isLoading}
                onFolderClick={fetchCertificatesForFolder}
              />
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
