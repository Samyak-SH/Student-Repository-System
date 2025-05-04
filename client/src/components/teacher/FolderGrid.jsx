import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FiFolder, FiFileText, FiUser, FiBriefcase } from 'react-icons/fi';
import { Link } from 'react-router-dom';

const FolderGrid = ({ selectedCategory }) => {
  const [folders, setFolders] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // Function to fetch folders later from backend 
  const fetchFolders = async () => {
    try {

      // replace it with api call later
      const response = await fetch('/api/folders');
      if (!response.ok) throw new Error('Failed to fetch folders');
      const data = await response.json();
      setFolders(data);
    } catch (error) {
      console.error('Error fetching folders:', error);
    } finally {
      setIsLoading(false);
    }
  };



  // Fetching all folders 
  useEffect(() => {
    fetchFolders();
  }, []);


  // Filter folders according to category
  const filteredFolders = selectedCategory
    ? folders.filter((folder) => folder.category === selectedCategory)
    : folders;


  // Handling Loading state
  if (isLoading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {[...Array(6)].map((_, index) => (
          <div key={index} className="bg-white rounded-lg shadow-card p-6 animate-pulse">
            <div className="flex items-start space-x-4">
              <div className="w-12 h-12 bg-neutral-200 rounded-md"></div>
              <div className="flex-1">
                <div className="h-5 bg-neutral-200 rounded w-2/3 mb-3"></div>
                <div className="h-4 bg-neutral-200 rounded w-1/2 mb-2"></div>
                <div className="h-4 bg-neutral-200 rounded w-3/4"></div>
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  }


  // Handling empty state when no folder why fetching
  if (folders.length === 0) {
    return (
      <div className="text-center py-12">
        <FiFolder className="w-16 h-16 mx-auto text-neutral-300 mb-4" />
        <h3 className="text-xl font-medium text-neutral-700">No folders found</h3>
        <p className="text-neutral-500 mt-2">Try changing your filters or search query</p>
      </div>
    );
  }


  // animation of folder cards
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };
  

  // category styles
  const categoryStyles = {
    'Hackathon': 'bg-purple-100 text-purple-600',
    'Game Development': 'bg-red-100 text-red-600',
    'Web Development': 'bg-blue-100 text-blue-600',
    'AI/ML': 'bg-green-100 text-green-600',
    'Cybersecurity': 'bg-yellow-100 text-yellow-600',
    'Data Science': 'bg-indigo-100 text-indigo-600',
    'Mobile Development': 'bg-pink-100 text-pink-600',
    'default': 'bg-teal-100 text-teal-600',
  };

  return (
    <motion.div
      className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {filteredFolders.map((folder) => {
        const categoryClass = categoryStyles[folder.category] || categoryStyles['default'];

        return (
          <motion.div
            key={folder.id}
            variants={itemVariants}
            className="relative"
          >
            <Link to={`/teacher/certificates/${folder.id}`} className="block h-full">
              <motion.div
                className="bg-white rounded-lg shadow-card p-6 h-full transition-all duration-200"
                whileHover={{
                  y: -5,
                  boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
                }}
              >
                <div className="flex items-start">
                  <div className={`p-3 rounded-md mr-4 ${categoryClass}`}>
                    <FiFolder className="w-8 h-8" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-neutral-800 line-clamp-2">
                      {folder.name}
                    </h3>

                    <div className="mt-3 space-y-2 text-sm text-neutral-600">
                      <div className="flex items-center">
                        <FiUser className="w-4 h-4 mr-2" />
                        <span>{folder.studentName}</span>
                      </div>
                      <div className="flex items-center">
                        <FiBriefcase className="w-4 h-4 mr-2" />
                        <span>{folder.studentDepartment}</span>
                      </div>
                      <div className="flex items-center">
                        <FiFileText className="w-4 h-4 mr-2" />
                        <span>
                          {folder.certificateCount} Certificate
                          {folder.certificateCount !== 1 ? 's' : ''}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </Link>
          </motion.div>
        );
      })}
    </motion.div>
  );
};

export default FolderGrid;
