// Generated MockData for Now 

// categories used for filtering
export const categories = [
    'Hackathon', 
    'Game Development', 
    'Web Development', 
    'AI/ML', 
    'Cybersecurity',
    'Data Science',
    'Mobile Development',
    'Cloud Computing'
  ]
  
  // Department names for filtering 
  export const departments = [
    'Computer Science',
    'Information Technology',
    'Electronics & Communication',
    'Electrical Engineering',
    'Mechanical Engineering',
    'Civil Engineering',
    'Biotechnology',
    'Chemical Engineering'
  ]

  // Usinf Mock folders for certificates of student for now 
export const generateMockFolders = (studentId) => {
  const folders = []
  

  const numFolders = Math.floor(Math.random() * 3) + 1
  
  for (let i = 0; i < numFolders; i++) {
    const categoryIndex = Math.floor(Math.random() * categories.length)
    
    folders.push({
      id: `folder-${studentId}-${i}`,
      studentId,
      name: `${categories[categoryIndex]} Project ${i + 1}`,
      category: categories[categoryIndex],
      createdAt: new Date(Date.now() - Math.random() * 10000000000).toISOString(),
      certificateCount: Math.floor(Math.random() * 5) + 1
    })
  }
  
  return folders
}

// Mock certificates for  folder of students
export const generateMockCertificates = (folderId) => {
  const certificates = []
  const folderIdParts = folderId.split('-')
  const studentId = folderIdParts[1]
  const folderIndex = folderIdParts[2]
  

  const numCertificates = Math.floor(Math.random() * 5) + 1
  
  for (let i = 0; i < numCertificates; i++) {
    certificates.push({
      id: `cert-${studentId}-${folderIndex}-${i}`,
      folderId,
      name: `Certificate ${i + 1}`,
      issuer: ['Coursera', 'Udemy', 'Kaggle', 'HackerRank', 'MIT OpenCourseWare'][Math.floor(Math.random() * 5)],
      issueDate: new Date(Date.now() - Math.random() * 10000000000).toISOString().split('T')[0],
      // Using Pexels for sample certificate images
      imageUrl: `https://images.pexels.com/photos/5428826/pexels-photo-5428826.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2`,
    })
  }
  
  return certificates
}

// Get all folders of student in teacher dashboard
export const getAllFolders = () => {
  // In a real , this  come from the backend call
  let allFolders = []
  
  //get all students folders
  const users = JSON.parse(localStorage.getItem('users') || '[]')
  const students = users.filter(user => user.role === 'student')
  
  //folders up,oaded by eah student 
  students.forEach(student => {
    const studentFolders = generateMockFolders(student.id)
    allFolders = [...allFolders, ...studentFolders.map(folder => ({
      ...folder,
      studentName: `${student.firstName} ${student.lastName}`,
      studentDepartment: student.department
    }))]
  })
  
  return allFolders
}

// get certificates 
export const getCertificatesForFolder = (folderId) => {
  return generateMockCertificates(folderId)
}