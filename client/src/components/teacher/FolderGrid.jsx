import { useState, useEffect } from 'react';
import { FiFolder, FiFileText, FiUser, FiBriefcase } from 'react-icons/fi';
import { Link } from 'react-router-dom';

const FolderGrid = ({ selectedCategory }) => {
  const [folders, setFolders] = useState([]);
  const [isLoading, setIsLoading] = useState(true);



  // Fetch folders when connected with api call later 
  const fetchFolders = async () => {
    // try {
    //   const response = await fetch('/api/folders');
    //   if (!response.ok) throw new Error('Failed to fetch folders');
    //   const data = await response.json();
    //   setFolders(data);
    // } catch (error) {
    //   console.error('Error:', error);
    // } finally {
    //   setIsLoading(false);
    // }
  };

  useEffect(() => {
    fetchFolders();
  }, []);


  
  // Filter folders if category is selected
  const filteredFolders = selectedCategory
    ? folders.filter((folder) => folder.category === selectedCategory)
    : folders;

  if (isLoading) {
    return (
      <div className="text-center py-8 text-gray-500">Loading folders...</div>
    );
  }

  if (folders.length === 0) {
    return (
      <div className="text-center py-12 text-gray-600">
        <FiFolder className="w-12 h-12 mx-auto text-gray-400 mb-2" />
        <p>No folders found</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
      {filteredFolders.map((folder) => (
        <Link key={folder.id} to={`/teacher/certificates/${folder.id}`}>
          <div className="bg-white shadow p-5 rounded-lg hover:shadow-lg transition">
            <div className="flex items-start">
              <div className="p-3 rounded-md mr-4 bg-blue-100 text-blue-600">
                <FiFolder className="w-8 h-8" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-800">{folder.name}</h3>
                <div className="mt-2 text-sm text-gray-600 space-y-1">
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
                    <span>{folder.certificateCount} Certificate{folder.certificateCount !== 1 ? 's' : ''}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default FolderGrid;
