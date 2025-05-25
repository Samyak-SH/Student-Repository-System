import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'

const semesters = ['1', '2', '3', '4', '5', '6', '7', '8']  

const FilterSection = ({ onFilterChange }) => {
  const [categories, setCategories] = useState([])         
  const [departments, setDepartments] = useState([])       
  const [selectedCategory, setSelectedCategory] = useState('')
  const [selectedDepartment, setSelectedDepartment] = useState('')
  const [selectedSemester, setSelectedSemester] = useState('')

  // Fetch categories and departments data  using api from backend
  useEffect(() => {
    const fetchFiltersData = async () => {
      try {
        const categoriesResponse = await fetch('/api/categories')      
        const departmentsResponse = await fetch('/api/departments')   
        
        if (categoriesResponse.ok && departmentsResponse.ok) {
          const categoriesData = await categoriesResponse.json()
          const departmentsData = await departmentsResponse.json()
          
          setCategories(categoriesData)              
          setDepartments(departmentsData)             
        } else {
          // fallback mock data if API fails
          setDepartments(['Computer Science', 'Data Science', 'Information Technology','Chemical Engineering','BioTech Engineering','Mechanical Engineering', 'ECE', 'Aeronautics'])
        }
      } catch (error) {
        console.error('Error fetching filter data:', error)
        setDepartments(['Computer Science', 'Electronics & Communication','Chemical Engineering','BioTech Engineering','Mechanical Engineering', 'Information Technology', 'Aeronautics'])
      }
    }
    fetchFiltersData()
  }, [])

  
  const handleCategoryChange = (category) => {
    const newCategory = category === selectedCategory ? '' : category
    setSelectedCategory(newCategory)
    onFilterChange({
      category: newCategory,
      department: selectedDepartment,
      semester: selectedSemester,
    })
  }

  // Handle department change
  const handleDepartmentChange = (department) => {
    const newDepartment = department === selectedDepartment ? '' : department
    setSelectedDepartment(newDepartment)
    onFilterChange({
      category: selectedCategory,
      department: newDepartment,
      semester: selectedSemester,
    })
  }

  // Handle semester change
  const handleSemesterChange = (semester) => {
    const newSemester = semester === selectedSemester ? '' : semester
    setSelectedSemester(newSemester)
    onFilterChange({
      category: selectedCategory,
      department: selectedDepartment,
      semester: newSemester,
    })
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: { opacity: 1, x: 0 }
  }

  return (
    <div className="bg-white rounded-lg shadow-card p-5">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Category Filter */}
        {categories.length > 0 && (
          <motion.div variants={itemVariants}>
            <h3 className="text-lg font-semibold mb-3">Filter by Category</h3>
            <div className="flex flex-wrap gap-2 mb-6">
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
          </motion.div>
        )}

        {/* Department Filter */}
        {departments.length > 0 && (
          <motion.div variants={itemVariants}>
            <h3 className="text-lg font-semibold mb-3">Filter by Department</h3>
            <div className="flex flex-wrap gap-2 mb-6">
              {departments.map((department) => (
                <button
                  key={department}
                  onClick={() => handleDepartmentChange(department)}
                  className={`px-3 py-1.5 rounded-full text-sm font-medium transition-colors ${
                    selectedDepartment === department
                      ? 'bg-secondary-100 text-secondary-700 border border-secondary-300'
                      : 'bg-neutral-100 text-neutral-600 border border-neutral-200 hover:bg-neutral-200'
                  }`}
                >
                  {department}
                </button>
              ))}
            </div>
          </motion.div>
        )}

        {/* Semester Filter */}
        <motion.div variants={itemVariants}>
          <h3 className="text-lg font-semibold mb-3">Filter by Semester</h3>
          <div className="flex flex-wrap gap-2">
            {semesters.map((semester) => (
              <button
                key={semester}
                onClick={() => handleSemesterChange(semester)}
                className={`px-3 py-1.5 rounded-full text-sm font-medium transition-colors ${
                  selectedSemester === semester
                    ? 'bg-green-100 text-green-700 border border-green-300'
                    : 'bg-neutral-100 text-neutral-600 border border-neutral-200 hover:bg-neutral-200'
                }`}
              >
                {semester}
              </button>
            ))}
          </div>
        </motion.div>
      </motion.div>
    </div>
  )
}

export default FilterSection
