import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import Navbar from '../components/common/Navbar'
import Footer from '../components/common/Footer'
import { motion, AnimatePresence } from 'framer-motion'
import { FiPlus, FiFolder, FiEdit2, FiTrash2, FiX } from 'react-icons/fi'

const CreateFolderModal = ({ onClose, onSubmit }) => {
  const [formData, setFormData] = useState({
     usn: '',
    department: '',
    title: '',
    date: new Date().toISOString().split('T')[0],
   
  })

  const handleSubmit = (e) => {
    e.preventDefault()
    onSubmit(formData)
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
    
    {/* Folder creating part */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
        className="bg-white rounded-lg shadow-lg max-w-md w-full p-6"
      >
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-semibold text-neutral-800">Create New Folder</h2>
          <button onClick={onClose} className="text-neutral-500 hover:text-neutral-700">
            <FiX className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-sm font-medium text-neutral-700 mb-1">Title</label>
            <input
              type="text"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              className="input-field"
              required
            />
          </div>


          <div className="mb-4">
            <label className="block text-sm font-medium text-neutral-700 mb-1">Usn</label>
            <input
              type="text"
              value={formData.user}
              onChange={(e) => setFormData({ ...formData, user: e.target.value })}
              className="input-field"
              required
            />
          </div>

          <div className="mb-6">
            <label className="block text-sm font-medium text-neutral-700 mb-1">Department</label>
            <input
              type="text"
              value={formData.department}
              onChange={(e) => setFormData({ ...formData, department: e.target.value })}
              className="input-field"
              required
            />
          </div>

  
          <div className="mb-4">
            <label className="block text-sm font-medium text-neutral-700 mb-1">Date</label>
            <input
              type="date"
              value={formData.date}
              onChange={(e) => setFormData({ ...formData, date: e.target.value })}
              className="input-field"
              required
            />
          </div>

        

          <div className="flex justify-end space-x-3">
            <button type="button" onClick={onClose} className="btn-outline">Cancel</button>
            <button type="submit" className="btn-primary">Create Folder</button>
          </div>
        </form>
      </motion.div>
    </div>
  )
}

const FolderCard = ({ folder, onEdit, onDelete }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    className="bg-white rounded-lg shadow-card p-6 hover:shadow-hover transition-shadow"
  >
    <div className="flex justify-between items-start">
      <div className="flex-1">
        <Link to={`/student/folder/${folder.id}`} className="block">
          <div className="flex items-center mb-3">
            <div className="p-2 bg-primary-100 text-primary-600 rounded-lg mr-3">
              <FiFolder className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-semibold text-neutral-800 line-clamp-1">{folder.user}</h3>
          </div>
        
          
          <p className="text-sm text-green-700">{folder.title}</p>
          <p className="text-sm text-blue-600"> {folder.department}</p>
          <p className="text-sm text-neutral-500">Created on {folder.date}</p>
        </Link>
      </div>

      <div className="flex space-x-2 ml-4">
        <button onClick={() => onEdit(folder)} className="p-2 hover:bg-primary-50 hover:text-primary-600 rounded-full">
          <FiEdit2 className="w-4 h-4" />
        </button>
        <button onClick={() => onDelete(folder.id)} className="p-2 hover:bg-red-50 hover:text-red-600 rounded-full">
          <FiTrash2 className="w-4 h-4" />
        </button>
      </div>
    </div>
  </motion.div>
)

const StudentHome = () => {
  const currentUser = { firstName: 'Student', user: 'student123', department: 'Computer Science' }

  const [showCreateModal, setShowCreateModal] = useState(false)
  const [folders, setFolders] = useState([])

  //  Fetch folders from backend 
  useEffect(() => {

  }, [])

  const handleCreateFolder = (folderData) => {
    const newFolder = {
      id: Date.now().toString(), // Replace it with backend generated id 
      ...folderData
    }

    

    setFolders([newFolder, ...folders])
    setShowCreateModal(false)
  }

  const handleEditFolder = (folder) => {

    // Update folders 
    console.log('Edit folder:', folder)
  }

  const handleDeleteFolder = (folderId) => {
    if (window.confirm('Are you sure you want to delete this folder?')) {

      // Send delete request to backend


      setFolders(folders.filter(folder => folder.id !== folderId))
    }
  }

  return (
    <div className="min-h-screen flex flex-col bg-neutral-50">
      <Navbar />

      <main className="flex-grow">
        <div className="section-container">
          <div className="flex justify-between items-center mb-8">
            <div>
              <h1 className="text-3xl font-bold text-neutral-800 mb-2">Welcome, {currentUser.firstName}!</h1>
              <p className="text-neutral-600">Manage your certificates and achievements</p>
            </div>

            <button onClick={() => setShowCreateModal(true)} className="btn-primary">
              <FiPlus className="mr-2" /> Create Folder
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {folders.length > 0 ? (
              folders.map(folder => (
                <FolderCard key={folder.id} folder={folder} onEdit={handleEditFolder} onDelete={handleDeleteFolder} />
              ))
            ) : (
              <div className="col-span-full text-center py-12">
                <div className="bg-neutral-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                  <FiFolder className="w-8 h-8 text-neutral-400" />
                </div>
                <h3 className="text-xl font-medium text-neutral-700 mb-2">No folders yet</h3>
                <p className="text-neutral-500">Create your first folder to start organizing your certificates</p>
              </div>
            )}
          </div>
        </div>
      </main>

      <Footer />

      <AnimatePresence>
        {showCreateModal && (
          <CreateFolderModal
            onClose={() => setShowCreateModal(false)}
            onSubmit={handleCreateFolder}
          />
        )}
      </AnimatePresence>
    </div>
  )
}

export default StudentHome
