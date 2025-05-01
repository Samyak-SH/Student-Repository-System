import { useState } from 'react'
import { FiSearch } from 'react-icons/fi'
import { motion } from 'framer-motion'

const SearchBar = ({ onSearch }) => {
  const [query, setQuery] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    onSearch(query)
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
      className="w-full"
    >
      <form onSubmit={handleSubmit} className="relative">
        <input
          type="text"
          placeholder="Search by student name or USN..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="input-field pl-12 py-3 w-full"
        />
        <button 
          type="submit"
          className="absolute left-0 top-0 h-full flex items-center justify-center px-4"
        >
          <FiSearch className="w-5 h-5 text-neutral-500" />
        </button>
      </form>
    </motion.div>
  )
}

export default SearchBar