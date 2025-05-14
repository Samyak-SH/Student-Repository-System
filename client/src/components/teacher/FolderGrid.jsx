// src/components/teacher/FolderGrid.jsx
import { useNavigate } from 'react-router-dom';
import { FiFolder, FiUser, FiBriefcase, FiMail } from 'react-icons/fi';
import { motion } from 'framer-motion';

const FolderGrid = ({ students, isLoading, searchQuery }) => {
  const navigate = useNavigate();

  // Filter students based on search query
  const filteredStudents = students.filter(student => 
    searchQuery 
      ? student.USN.toLowerCase().includes(searchQuery.toLowerCase()) ||
        student.firstName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        student.lastName.toLowerCase().includes(searchQuery.toLowerCase())
      : true
  );

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  if (filteredStudents.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="bg-neutral-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
          <FiFolder className="w-8 h-8 text-neutral-400" />
        </div>
        <h3 className="text-xl font-medium text-neutral-700 mb-2">No Students Found</h3>
        <p className="text-neutral-500">
          {searchQuery ? 'No students match your search' : 'No students have been added yet'}
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {filteredStudents.map((student) => (
        <motion.div
          key={student._id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-lg shadow-md hover:shadow-lg transition-all cursor-pointer"
          onClick={() => navigate(`/student/home/${student.USN}`)}
        >
          <div className="p-6">
            <div className="flex items-start">
              <div className="p-3 rounded-md mr-4 bg-blue-100 text-blue-600">
                <FiFolder className="w-8 h-8" />
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-gray-800 mb-2">
                  {student.firstName} {student.lastName}
                </h3>
                <div className="space-y-2 text-sm text-gray-600">
                  <div className="flex items-center">
                    <FiUser className="w-4 h-4 mr-2 text-blue-500" />
                    <span>USN: {student.USN}</span>
                  </div>
                  <div className="flex items-center">
                    <FiBriefcase className="w-4 h-4 mr-2 text-blue-500" />
                    <span>{student.department}</span>
                  </div>
                  <div className="flex items-center">
                    <FiMail className="w-4 h-4 mr-2 text-blue-500" />
                    <span>{student.email}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );
};

export default FolderGrid;