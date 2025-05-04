import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import Navbar from '../components/common/Navbar'
import Footer from '../components/common/Footer'
import { motion, AnimatePresence } from 'framer-motion'
import { FiArrowLeft, FiUpload, FiDownload, FiEdit2, FiTrash2, FiX } from 'react-icons/fi'

const UploadCertificateModal = ({ onClose, onSubmit }) => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    date: new Date().toISOString().split('T')[0],
    file: null
  })

  const handleSubmit = (e) => {
    e.preventDefault()
    onSubmit(formData) // 🔁 Backend: This data will be sent to backend later
  }

  const handleFileChange = (e) => {
    const file = e.target.files[0]
    if (file && (file.type === 'application/pdf' || file.type.startsWith('image/'))) {
      setFormData({ ...formData, file })
    } else {
      alert('Please upload a PDF or image file')
    }
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
            <label className="block text-sm font-medium text-neutral-700 mb-1">Description</label>
            <textarea
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              className="input-field min-h-[100px]"
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

          <div className="mb-6">
            <label className="block text-sm font-medium text-neutral-700 mb-1">Certificate File (PDF or Image)</label>
            <input
              type="file"
              onChange={handleFileChange}
              accept=".pdf,image/*"
              className="input-field"
              required
            />
          </div>

          <div className="flex justify-end space-x-3">
            <button type="button" onClick={onClose} className="btn-outline">Cancel</button>
            <button type="submit" className="btn-primary">Upload Certificate</button>
          </div>
        </form>
      </motion.div>
    </div>
  )
}

const CertificateCard = ({ certificate, onEdit, onDelete }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-lg shadow-card p-6"
    >
      <div className="flex justify-between items-start mb-4">
        <h3 className="text-lg font-semibold text-neutral-800">{certificate.title}</h3>
        <div className="flex space-x-2">
          <button onClick={() => onEdit(certificate)} className="p-2 text-neutral-600 hover:text-primary-600 hover:bg-primary-50 rounded-full transition-colors">
            <FiEdit2 className="w-4 h-4" />
          </button>
          <button onClick={() => onDelete(certificate.id)} className="p-2 text-neutral-600 hover:text-red-600 hover:bg-red-50 rounded-full transition-colors">
            <FiTrash2 className="w-4 h-4" />
          </button>
        </div>
      </div>
      <p className="text-neutral-600 mb-4">{certificate.description}</p>
      <div className="flex justify-between items-center text-sm text-neutral-500">
        <span>Uploaded on {certificate.date}</span>
        <button onClick={() => window.open(certificate.fileUrl, '_blank')} className="btn-outline py-1 px-3">
          <FiDownload className="w-4 h-4 mr-1" />
          Download
        </button>
      </div>
    </motion.div>
  )
}

const StudentFolderPage = () => {
  const { folderId } = useParams()
  const [showUploadModal, setShowUploadModal] = useState(false)
  const [certificates, setCertificates] = useState([])
  const [folder, setFolder] = useState({
    title: '',
    description: ''
  })

  useEffect(() => {
    fetchFolderData(folderId)         // 🔁 Backend: Load folder data from server
    fetchCertificates(folderId)       // 🔁 Backend: Load certificates list from server
  }, [folderId])

  const fetchFolderData = async (id) => {
    // 🔁 Backend: Replace with actual API call to fetch folder info
    setFolder({
      title: `Folder ${id}`,
      description: 'This is a folder loaded from backend'
    })
  }

  const fetchCertificates = async (folderId) => {
    // 🔁 Backend: Replace with actual API call to fetch certificates for this folder
    setCertificates([])
  }

  const handleUploadCertificate = async (data) => {
    const newCert = {
      id: Date.now().toString(), // 🔁 Backend: Replace with real ID from server response
      ...data,
      fileUrl: URL.createObjectURL(data.file) // 🔁 Backend: Should be file URL returned after uploading
    }

    // 🔁 Backend: Send certificate data and file to server (use FormData)
    setCertificates([newCert, ...certificates])
    setShowUploadModal(false)
  }

  const handleEditCertificate = async (certificate) => {
    // 🔁 Backend: Update certificate details (PUT/PATCH request)
    console.log('Edit certificate:', certificate)
  }

  const handleDeleteCertificate = async (certificateId) => {
    if (window.confirm('Are you sure you want to delete this certificate?')) {
      // 🔁 Backend: Call API to delete certificate from database
      setCertificates(certificates.filter(cert => cert.id !== certificateId))
    }
  }

  return (
    <div className="min-h-screen flex flex-col bg-neutral-50">
      <Navbar />

      <main className="flex-grow">
        <div className="section-container">
          <div className="mb-8">
            <Link to="/student/home" className="inline-flex items-center text-neutral-600 hover:text-neutral-800 mb-4">
              <FiArrowLeft className="w-5 h-5 mr-2" />
              Back to Folders
            </Link>

            <div className="flex justify-between items-center">
              <div>
                <h1 className="text-3xl font-bold text-neutral-800 mb-2">{folder.title}</h1>
                <p className="text-neutral-600">{folder.description}</p>
              </div>
              <button onClick={() => setShowUploadModal(true)} className="btn-primary">
                <FiUpload className="mr-2" />
                Upload Certificate
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {certificates.map(certificate => (
              <CertificateCard
                key={certificate.id}
                certificate={certificate}
                onEdit={handleEditCertificate}
                onDelete={handleDeleteCertificate}
              />
            ))}

            {certificates.length === 0 && (
              <div className="col-span-full text-center py-12">
                <div className="bg-neutral-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                  <FiUpload className="w-8 h-8 text-neutral-400" />
                </div>
                <h3 className="text-xl font-medium text-neutral-700 mb-2">
                  No certificates yet
                </h3>
                <p className="text-neutral-500">Upload your first certificate to get started</p>
              </div>
            )}
          </div>
        </div>
      </main>

      <Footer />

      <AnimatePresence>
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

export default StudentFolderPage
