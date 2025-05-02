import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom'; // Make sure this line is here
// import LandingPage from './pages/LandingPage'
// import TeacherSignup from './pages/TeacherSignup'
// import TeacherLogin from './pages/TeacherLogin'
import TeacherHome from './pages/TeacherHome'
const App = () => {
  return (
    <Router>
      {/* <LandingPage /> */}
      {/* <TeacherSignup/>
<TeacherLogin/> */}
<TeacherHome/>
    </Router>
  );
}

export default App;
