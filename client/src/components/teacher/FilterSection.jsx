import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'

const FilterSection = ({ onFilterChange }) => {
  const [categories, setCategories] = useState([])          // Categories state
  const [departments, setDepartments] = useState([])       // Departments state
  const [selectedCategory, setSelectedCategory] = useState('')
  const [selectedDepartment, setSelectedDepartment] = useState('')



  // Fetch categories and departments data  using api from backend
  useEffect(() => {
    const fetchFiltersData = async () => {
      try {
        const categoriesResponse = await fetch('/api/categories')       // Replace it with  backend API
        const departmentsResponse = await fetch('/api/departments')           // Replace it with  backend API
        
        if (categoriesResponse.ok && departmentsResponse.ok) {
          const categoriesData = await categoriesResponse.json()
          const departmentsData = await departmentsResponse.json()
          

          setCategories(categoriesData)               // Setting  categories from  API response
          setDepartments(departmentsData)       // Set departments from API response
        } else {



          // if api fail , use mock data
          // setCategories(['Sports', 'Hackathons', 'TreasureHunt', 'Cpa', 'Design'])
          setDepartments(['Computer Science', 'Data Science ', 'Mechanical Engineering', 'ECE', 'Aeronautics'])
        }
      } catch (error) {
        console.error('Error fetching filter data:', error)
        

        //  If fetching of api  fails use mockdata
          //  setCategories(['Sports', 'Hackathons', 'TreasureHunt', 'Cpa', 'Design'])
   
          setDepartments(['Computer Science', 'Electronics & Communication ', 'Mechanical Engineering', 'Information Technology', 'Aeronautics'])
      }
    }

    fetchFiltersData()
  }, [])



  // Handle  changes based on category
  const handleCategoryChange = (category) => {
    const newCategory = category === selectedCategory ? '' : category
    setSelectedCategory(newCategory)
    onFilterChange({
      category: newCategory,
      department: selectedDepartment
    })
  }



  // handle chnages based on department
  const handleDepartmentChange = (department) => {
    const newDepartment = department === selectedDepartment ? '' : department
    setSelectedDepartment(newDepartment)
    onFilterChange({
      category: selectedCategory,
      department: newDepartment
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

        {departments.length > 0 && (
          <motion.div variants={itemVariants}>
            <h3 className="text-lg font-semibold mb-3">Filter by Department</h3>
            <div className="flex flex-wrap gap-2">
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
      </motion.div>
    </div>
  )
}

export default FilterSection
