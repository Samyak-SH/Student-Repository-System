import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import Navbar from '../components/common/Navbar'
import Footer from '../components/common/Footer'
import { motion } from 'framer-motion'
import { FiArrowLeft, FiDownload, FiEye, FiCalendar, FiAward } from 'react-icons/fi'
import { getCertificatesForFolder } from '../utils/mockData'

const CertificatePage = () => {
  const { folderId } = useParams()
  const [certificates, setCertificates] = useState([])
  const [selectedCertificate, setSelectedCertificate] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  
  useEffect(() => {

    // Fetching certificates for folder
    const fetchCertificates = async () => {
      setIsLoading(true)

      try {

        // In a real api Call, the mockdata is replace by real api cal from backend 


        const data = getCertificatesForFolder(folderId)       // Using Mockdata for Now
        setCertificates(data)
        
        if (data.length > 0) {
          setSelectedCertificate(data[0])
        }
      } catch (error) {
        console.error('Error fetching certificates:', error)
      } finally {
        setIsLoading(false)
      }
    }
    
    fetchCertificates()
  }, [folderId])
  

  const handleDownload = (certificate) => {
    
    // in real call , this trigger file download 
    console.log('Downloading certificate:', certificate.name)
    alert(`Downloading ${certificate.name}`)
  }
  
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { 
        delayChildren: 0.2,
        staggerChildren: 0.1
      }
    }
  }
  
  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1 }
  }
  
  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-col bg-neutral-50">
        <Navbar />
        <main className="flex-grow flex items-center justify-center">
          <div className="text-center">
            <div className="w-16 h-16 border-4 border-primary-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-neutral-600">Loading certificates...</p>
          </div>
        </main>
        <Footer />
      </div>
    )
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
            <div className="flex items-center">
              <Link 
                to="/teacher/home"
                className="mr-4 p-2 rounded-full bg-white shadow-sm text-neutral-700 hover:bg-neutral-100 transition-colors"
              >
                <FiArrowLeft className="w-5 h-5" />
              </Link>
              <div>
                <h1 className="text-3xl font-bold text-neutral-800 mb-1">Certificates</h1>
                <p className="text-neutral-600">
                  View and download student certificates
                </p>
              </div>
            </div>
          </motion.div>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-1">
              <motion.div
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                className="bg-white rounded-lg shadow-card p-5"
              >
                <h3 className="text-lg font-semibold mb-6">Certificate List</h3>
                
                {certificates.length === 0 ? (
                  <div className="text-center py-8">
                    <p className="text-neutral-500">No certificates found</p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {certificates.map((certificate) => (
                      <motion.div
                        key={certificate.id}
                        variants={itemVariants}
                        className={`p-4 rounded-md cursor-pointer transition-colors ${
                          selectedCertificate?.id === certificate.id
                            ? 'bg-primary-50 border border-primary-200'
                            : 'hover:bg-neutral-50 border border-neutral-100'
                        }`}
                        onClick={() => setSelectedCertificate(certificate)}
                      >
                        <div className="flex items-center justify-between">
                          <div>
                            <h4 className="font-medium text-neutral-800">{certificate.name}</h4>
                            <div className="flex items-center mt-1 text-sm text-neutral-500">
                              <FiAward className="w-4 h-4 mr-1" />
                              <span>{certificate.issuer}</span>
                            </div>
                            <div className="flex items-center mt-1 text-sm text-neutral-500">
                              <FiCalendar className="w-4 h-4 mr-1" />
                              <span>{certificate.issueDate}</span>
                            </div>
                          </div>
                          <div className="flex">
                            <button
                              onClick={(e) => {
                                e.stopPropagation()
                                setSelectedCertificate(certificate)
                              }}
                              className="p-2 text-primary-600 hover:bg-primary-50 rounded-full mr-1"
                              title="View"
                            >
                              <FiEye className="w-4 h-4" />
                            </button>
                            <button
                              onClick={(e) => {
                                e.stopPropagation()
                                handleDownload(certificate)
                              }}
                              className="p-2 text-primary-600 hover:bg-primary-50 rounded-full"
                              title="Download"
                            >
                              <FiDownload className="w-4 h-4" />
                            </button>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                )}
              </motion.div>
            </div>
            
            <div className="lg:col-span-2">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="bg-white rounded-lg shadow-card p-8"
              >
                {selectedCertificate ? (
                  <div>
                    <div className="flex justify-between items-center mb-6">
                      <div>
                        <h2 className="text-2xl font-semibold text-neutral-800 mb-1">
                          {selectedCertificate.name}
                        </h2>
                        <div className="flex items-center text-neutral-600">
                          <FiAward className="mr-2" />
                          <span>Issued by {selectedCertificate.issuer} on {selectedCertificate.issueDate}</span>
                        </div>
                      </div>
                      <button
                        onClick={() => handleDownload(selectedCertificate)}
                        className="btn-primary"
                      >
                        <FiDownload className="mr-2" />
                        <span>Download</span>
                      </button>
                    </div>
                    
                    <div className="border border-neutral-200 rounded-lg overflow-hidden">
                      <img
                        src={selectedCertificate.imageUrl}
                        alt={`${selectedCertificate.name} Certificate`}
                        className="w-full h-auto object-contain"
                      />
                    </div>
                  </div>
                ) : (
                  <div className="text-center py-16">
                    <p className="text-neutral-500">Select a certificate to view</p>
                  </div>
                )}
              </motion.div>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  )
}

export default CertificatePage
