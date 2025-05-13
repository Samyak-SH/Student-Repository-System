import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { FiArrowRight, FiCheckCircle } from 'react-icons/fi'

const LandingPage = () => {
  return (
    <div className="min-h-screen flex flex-col">

      <section className="relative flex-grow min-h-screen  flex items-center">
       
       
        {/* Background image */}
        <div className="absolute inset-0 z-0">
          <div 
            className="absolute inset-0 bg-cover   bg-center"
            style={{ backgroundImage: "url('https://images.pexels.com/photos/3184339/pexels-photo-3184339.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2')" }}
          ></div>
          <div className="absolute inset-0 bg-neutral-900 bg-opacity-70"></div>
        </div>
        
        <div className="container mx-auto  px-6 py-24 relative z-10">
          <div className="max-w-3xl ">

            {/* using motion div for better  animation */}
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="mb-6 "
            >
              <span className="px-4 py-2 bg-primary-500 bg-opacity-90 text-white rounded-full text-sm font-medium">
               Student  Certificate Repository
              </span>
            </motion.div>
            
            <motion.h1
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1 }}
              className="text-5xl  md:text-6xl font-bold text-white mb-6 leading-tight"
            >
              Secure and Accessible Student Certificate Management
            </motion.h1>
            
            <motion.p
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-xl text-neutral-200 mb-10"
            >
              A centralized platform for students to upload certificates and teachers to manage, review, and verify student achievements with ease.
            </motion.p>
          </div>
        </div>
      </section>
      


      {/* Some feature about platform */}
      <section className="bg-white py-20">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-neutral-800 mb-4">
              Streamlined Certificate Repository
            </h2>
            <p className="text-xl text-neutral-600 max-w-3xl mx-auto">
              Our platform provides a comprehensive solution for managing student certificates and achievements.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="bg-neutral-50 p-8 rounded-xl shadow-sm"
            >
              <div className="p-4 bg-primary-100 rounded-2xl inline-block text-primary-600 mb-6">
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-neutral-800 mb-3">Organized Certificate Storage</h3>
              <p className="text-neutral-600">
                Store all certificates in a structured, categorized system that makes finding and managing documents effortless.
              </p>
              <ul className="mt-4 space-y-2">
                <li className="flex items-center text-neutral-700">
                  <FiCheckCircle className="text-primary-500 mr-2" />
                  <span>Category-based organization</span>
                </li>
                <li className="flex items-center text-neutral-700">
                  <FiCheckCircle className="text-primary-500 mr-2" />
                  <span>Easy search and filtering</span>
                </li>
              </ul>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
              className="bg-neutral-50 p-8 rounded-xl shadow-sm"
            >
              <div className="p-4 bg-secondary-100 rounded-2xl inline-block text-secondary-600 mb-6">
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-neutral-800 mb-3">Secure Access Control</h3>
              <p className="text-neutral-600">
                Separate user flows for teachers and students with appropriate access permissions and data security.
              </p>
              <ul className="mt-4 space-y-2">
                <li className="flex items-center text-neutral-700">
                  <FiCheckCircle className="text-secondary-500 mr-2" />
                  <span>Role-based permissions</span>
                </li>
                <li className="flex items-center text-neutral-700">
                  <FiCheckCircle className="text-secondary-500 mr-2" />
                  <span>Secure credential management</span>
                </li>
              </ul>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              viewport={{ once: true }}
              className="bg-neutral-50 p-8 rounded-xl shadow-sm"
            >
              <div className="p-4 bg-green-100 rounded-2xl inline-block text-green-600 mb-6">
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-neutral-800 mb-3">Easy Viewing & Sharing</h3>
              <p className="text-neutral-600">
                View, download, and share certificates with intuitive controls and high-quality previews.
              </p>
              <ul className="mt-4 space-y-2">
                <li className="flex items-center text-neutral-700">
                  <FiCheckCircle className="text-green-500 mr-2" />
                  <span>High-quality document preview</span>
                </li>
                <li className="flex items-center text-neutral-700">
                  <FiCheckCircle className="text-green-500 mr-2" />
                  <span>Quick download functionality</span>
                </li>
              </ul>
            </motion.div>
          </div>
        </div>
      </section>
      
      {/* Signup Buttons  */}
      <section className="bg-primary-50 py-16">
        <div className="container mx-auto px-6 text-center">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-3xl md:text-4xl font-bold text-primary-800 mb-4"
          >
            Ready to get started?
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            viewport={{ once: true }}
            className="text-xl text-primary-700 max-w-2xl mx-auto mb-8"
          >
            Join thousands of educational institutions already using our platform.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4"
          >
          <Link 
  to="/teacher/login"
  className="border border-blue-600 text-blue-600 py-3 px-8 text-lg rounded-md transition duration-300 ease-in-out hover:bg-blue-600 hover:text-white hover:scale-105"
>
  Login as Teacher
</Link>

<Link 
  to="/student/login"
  className="border border-blue-600 text-blue-600 py-3 px-8 text-lg rounded-md transition duration-300 ease-in-out hover:bg-blue-600 hover:text-white hover:scale-105"
>
  Login as Student
</Link>

          </motion.div>
        </div>
      </section>
      
      {/* Footer */}
      <footer className="bg-neutral-800 text-white py-8">
        <div className="container mx-auto px-6 text-center">
          <p>© {new Date().getFullYear()} CertifyHub. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}

export default LandingPage