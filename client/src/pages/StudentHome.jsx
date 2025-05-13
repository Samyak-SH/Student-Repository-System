import { useState, useEffect } from 'react'
import Navbar from '../components/common/Navbar'
import Footer from '../components/common/Footer'
import { motion, AnimatePresence } from 'framer-motion'
import { FiPlus, FiFolder, FiEdit2, FiTrash2, FiX, FiUpload } from 'react-icons/fi'
import axios from 'axios'

const SERVER_URL = import.meta.env.VITE_SERVER_URL

const CreateFolderModal = ({ onClose, onSubmit }) => {
  const [title, setTitle] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    onSubmit({ title })
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
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
          <div className="mb-6">
            <label className="block text-sm font-medium text-neutral-700 mb-1">Folder Name</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
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

const UploadCertificateModal = ({ onClose, onSubmit }) => {
  const [formData, setFormData] = useState({
    title: '',
    tag: 'course',
    file: null,
  })

  const tags = ['course', 'workshop', 'internship', 'hackathon', 'skill', 'NSS', 'sports']

  const handleSubmit = (e) => {
    e.preventDefault()
    onSubmit(formData)
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
        className="bg-white rounded-lg shadow-lg max-w-md w-full p-6"
      >
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-semibold text-neutral-800">Upload Certificate</h2>
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
            <label className="block text-sm font-medium text-neutral-700 mb-1">Tag</label>
            <select
              value={formData.tag}
              onChange={(e) => setFormData({ ...formData, tag: e.target.value })}
              className="input-field"
            >
              {tags.map((tag) => (
                <option key={tag} value={tag}>{tag}</option>
              ))}
            </select>
          </div>

          <div className="mb-6">
            <label className="block text-sm font-medium text-neutral-700 mb-1">Upload PDF</label>
            <input
              type="file"
              accept="application/pdf"
              onChange={(e) => setFormData({ ...formData, file: e.target.files[0] })}
              className="input-field"
              required
            />
          </div>

          <div className="flex justify-end space-x-3">
            <button type="button" onClick={onClose} className="btn-outline">Cancel</button>
            <button type="submit" className="btn-primary">Upload</button>
          </div>
        </form>
      </motion.div>
    </div>
  )
}

const FolderCard = ({ folder, onEdit, onDelete, onEnter }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    className="bg-white rounded-lg shadow-card p-6 hover:shadow-hover transition-shadow"
  >
    <div className="flex justify-between items-start">
      <div className="flex-1">
        <button onClick={() => onEnter(folder)} className="block w-full text-left">
          <div className="flex items-center mb-3">
            <div className="p-2 bg-primary-100 text-primary-600 rounded-lg mr-3">
              <FiFolder className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-semibold text-neutral-800 line-clamp-1">{folder.title}</h3>
          </div>
          <p className="text-sm text-neutral-500">Created on {folder.date}</p>
        </button>
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
const getCertificiates = async () => {
  console.log("called");
  try {
    const token = localStorage.getItem("jwt_token_student");

    const result = await axios.get(`${SERVER_URL}/student/certificate`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    if(result.data.length > 0){
      
    }
    console.log(result.data.length);
  } catch (err) {
    console.error(err);
  }
};

const StudentHome = () => {
  const [showCreateModal, setShowCreateModal] = useState(false)
  const [showUploadModal, setShowUploadModal] = useState(false)
  const [folders, setFolders] = useState([])
  const [currentPath, setCurrentPath] = useState([])

  useEffect(() => {
    getCertificiates();
  }, [])

  const handleCreateFolder = (folderData) => {
    const newFolder = {
      id: Date.now().toString(),
      title: folderData.title,
      date: new Date().toISOString().split('T')[0],
      path: [...currentPath]
    }
    setFolders([newFolder, ...folders])
    setShowCreateModal(false)
  }

  const handleUploadCertificate = async ({ title, tag, file }) => {
    const reader = new FileReader()
    reader.onloadend = async () => {
      const base64Data = reader.result.split(',')[1]

      const payload = {
        title,
        tag,
        date: new Date().toISOString().split('T')[0],
        path: `/${currentPath.join('/')}`,
        Data: base64Data
      }

      try {
        const token = localStorage.getItem("jwt_token_student");
        await axios.post(`${SERVER_URL}/student/uploadCertificate`, payload, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        })
        alert('Certificate uploaded successfully!')
        setShowUploadModal(false)
      } catch (error) {
        console.error('Upload failed:', error)
        alert('Failed to upload certificate.')
      }
    }

    if (file) {
      reader.readAsDataURL(file)
    }
  }

  const handleEditFolder = (folder) => {
    console.log('Edit folder:', folder)
  }

  const handleDeleteFolder = (folderId) => {
    if (window.confirm('Are you sure you want to delete this folder?')) {
      setFolders(folders.filter(folder => folder.id !== folderId))
    }
  }

  const handleEnterFolder = (folder) => {
    setCurrentPath([...currentPath, folder.title])
  }

  const handleBack = () => {
    if (currentPath.length === 0) return
    const newPath = [...currentPath]
    newPath.pop()
    setCurrentPath(newPath)
  }

  const currentFolders = folders.filter(folder => {
    if (folder.path.length !== currentPath.length) return false
    return folder.path.every((val, i) => val === currentPath[i])
  })

  return (
    <div className="min-h-screen flex flex-col bg-neutral-50">
      <Navbar />

      <main className="flex-grow">
        <div className="section-container">
          <div className="flex justify-between items-center mb-8">
            <div>
              <h1 className="text-3xl font-bold text-neutral-800 mb-2">Your Certificates</h1>
              <p className="text-neutral-600">Path: <span className="font-mono">/{currentPath.join('/')}</span></p>
            </div>

            <div className="flex gap-3">
              <button onClick={() => setShowUploadModal(true)} className="btn-outline">
                <FiUpload className="mr-2" /> Upload Certificate
              </button>
              <button onClick={() => setShowCreateModal(true)} className="btn-primary">
                <FiPlus className="mr-2" /> Create Folder
              </button>
            </div>
          </div>

          {currentPath.length > 0 && (
            <div className="mb-4">
              <button onClick={handleBack} className="btn-outline">← Back</button>
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {currentFolders.length > 0 ? (
              currentFolders.map(folder => (
                <FolderCard
                  key={folder.id}
                  folder={folder}
                  onEdit={handleEditFolder}
                  onDelete={handleDeleteFolder}
                  onEnter={handleEnterFolder}
                />
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
        {showUploadModal && (
          <UploadCertificateModal
            onClose={() => setShowUploadModal(false)}
            onSubmit={handleUploadCertificate}
          />
        )}
      </AnimatePresence>
    </div>
  )
}

export default StudentHome