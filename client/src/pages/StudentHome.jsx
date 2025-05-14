import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import Navbar from '../components/common/Navbar'
import Footer from '../components/common/Footer'
import SearchBar from '../components/common/SearchBar'
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
            <label className="block text-sm font-medium text-neutral-700 mb-1">Category</label>
            <div className="flex flex-wrap gap-2">
              {tags.map((tag) => (
                <button
                  key={tag}
                  type="button"
                  onClick={() => setFormData({ ...formData, tag })}
                  className={`px-3 py-1.5 rounded-full text-sm font-medium transition-colors ${
                    formData.tag === tag
                      ? 'bg-primary-100 text-primary-700 border border-primary-300'
                      : 'bg-neutral-100 text-neutral-600 border border-neutral-200 hover:bg-neutral-200'
                  }`}
                >
                  {tag}
                </button>
              ))}
            </div>
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

// ... all imports stay unchanged

// (CreateFolderModal, UploadCertificateModal, FolderCard stay unchanged)

const StudentHome = () => {
  const [showCreateModal, setShowCreateModal] = useState(false)
  const [showUploadModal, setShowUploadModal] = useState(false)
  const [folders, setFolders] = useState([])
  const [currentPath, setCurrentPath] = useState([])
  const [categories, setCategories] = useState(['course', 'workshop', 'internship', 'hackathon', 'skill', 'NSS', 'sports'])
  const [selectedCategory, setSelectedCategory] = useState('')
  const [certificates, setCertificates] = useState([])
  const [loading, setLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState('')

  const fetchCertificates = async () => {
    try {
      const token = localStorage.getItem("jwt_token_student");
      const response = await axios.get(`${SERVER_URL}/student/certificates`, {
        headers: { Authorization: `Bearer ${token}` }
      });

      if (response.data.certificates) {
        setCertificates(response.data.certificates);
      } else if (Array.isArray(response.data)) {
        setCertificates(response.data);
      } else {
        console.error("Unexpected response format:", response.data);
      }
    } catch (error) {
      console.error("Fetch error:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCertificates();
  }, []);

  const handleCategoryChange = (category) => {
    const newCategory = category === selectedCategory ? '' : category
    setSelectedCategory(newCategory)
  }

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
        fetchCertificates();
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

  const handleSearch = (query) => {
    setSearchQuery(query);
  };

  const filteredCertificates = certificates.filter(cert => {
    const matchesCategory = selectedCategory ? cert.Tag === selectedCategory : true;
    const matchesSearch = searchQuery
      ? cert.Title.toLowerCase().includes(searchQuery.toLowerCase())
      : true;
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="min-h-screen flex flex-col bg-neutral-50">
      <Navbar />

      <main className="flex-grow">
        <div className="section-container">
          <div className="flex justify-between items-center mb-8">
            <div>
              <h1 className="text-3xl font-bold text-neutral-800 mb-2">Your Certificates</h1>
              <p className="text-neutral-600"><span className="font-mono">{currentPath.join('/')}</span></p>
            </div>

            <div className="flex gap-3">
              <button onClick={() => setShowUploadModal(true)} className="btn-outline">
                <FiUpload className="mr-2" /> Upload Certificate
              </button>
            </div>
          </div>

          <div className="mb-6">
            <SearchBar onSearch={handleSearch} />
          </div>

          <div className="flex gap-6">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="w-64 shrink-0"
            >
              <div className="bg-white rounded-lg shadow-card p-5 sticky top-4">
                <h3 className="text-lg font-semibold mb-3">Filter by Category</h3>
                <div className="flex flex-wrap gap-2">
                  {categories.map((category) => (
                    <button
                      key={category}
                      onClick={() => handleCategoryChange(category)}
                      className={`px-3 py-1.5 rounded-full text-sm font-medium transition-colors ${
                        selectedCategory === category
                          ? 'bg-primary-100 text-primary-700 border border-primary-300'
                          : 'bg-neutral-100 text-neutral-600 border border-neutral-200 hover:bg-neutral-200'
                      }`}
                    >
                      {category}
                    </button>
                  ))}
                </div>

                {/* ✅ CERTIFICATE COUNT DISPLAYED HERE */}
                {selectedCategory && (
                  <p className="mt-4 text-sm text-neutral-500">
                    {filteredCertificates.length} certificate{filteredCertificates.length !== 1 && 's'} found
                  </p>
                )}
              </div>
            </motion.div>

            <div className="flex-1">
              {loading ? (
                <div className="flex justify-center items-center h-64">
                  <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
                  {filteredCertificates.length > 0 ? (
                    filteredCertificates.map((certificate) => (
                      <motion.div
                        key={certificate._id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="bg-white rounded-lg shadow-card p-6 hover:shadow-hover transition-shadow"
                      >
                        <div className="flex justify-between items-start">
                          <div className="flex-1">
                            <div className="flex items-center mb-3">
                              <div className="p-2 bg-primary-100 text-primary-600 rounded-lg mr-3">
                                <FiFolder className="w-6 h-6" />
                              </div>
                              <h3 className="text-lg font-semibold text-neutral-800 line-clamp-1">
                                {certificate.Title}
                              </h3>
                            </div>
                            <p className="text-sm text-neutral-500 mb-2">Category: {certificate.Tag}</p>
                            <p className="text-sm text-neutral-500">Uploaded on {new Date(certificate.Date).toLocaleDateString()}</p>
                          </div>

                          <div className="flex space-x-2 ml-4">
                            <button 
                              onClick={() => {
                                const byteCharacters = atob(certificate.Data);
                                const byteNumbers = new Array(byteCharacters.length);
                                for (let i = 0; i < byteCharacters.length; i++) {
                                  byteNumbers[i] = byteCharacters.charCodeAt(i);
                                }
                                const byteArray = new Uint8Array(byteNumbers);
                                const blob = new Blob([byteArray], { type: 'application/pdf' });
                                const url = URL.createObjectURL(blob);
                                window.open(url, '_blank');
                              }}
                              className="p-2 hover:bg-primary-50 hover:text-primary-600 rounded-full"
                            >
                              View
                            </button>
                          </div>
                        </div>
                      </motion.div>
                    ))
                  ) : (
                    <div className="col-span-full text-center py-12">
                      <div className="bg-neutral-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                        <FiFolder className="w-8 h-8 text-neutral-400" />
                      </div>
                      <h3 className="text-xl font-medium text-neutral-700 mb-2">No Certificates Found</h3>
                      <p className="text-neutral-500">
                        {selectedCategory 
                          ? `No certificates found in the ${selectedCategory} category`
                          : 'Upload your first certificate to get started'}
                      </p>
                    </div>
                  )}
                </div>
              )}
            </div>
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
