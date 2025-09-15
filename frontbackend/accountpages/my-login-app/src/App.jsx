

import Register from "./components/Register";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./components/Login";
import Home from "./components/Home";
import CourseDetails from './components/CourseDetails';
import ExamRulesAndPayment from "./components/ExamRulesAndPayment";
import PaymentConfirmation from "./components/PaymentConfirmation";
import CheckNationalId from "./components/payment/CheckNationalId";
import PaymentPage from "./components/payment/PaymentPage";
import ExamPage from "./components/Exam/ExamPage";
import ExamResults from "./components/Exam/ExamResults";

import DashboardLayout from "./components/Dashboard/DashboardLayout ";
import CoursesPage from "./components/Dashboard/CoursesPage";
import SubCourseDashboard from   "./components/Dashboard/Sub-Cource"
import QuestionsManagement from "./components/Dashboard/Question"
import StudentsManagement from "./components/Dashboard/students"


import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
function App() {
  

  return (
  
//  <Register />
  
   <div>
   <Router>
      <Routes>
       <Route path="/" element={<Home />} />
        <Route path="/Register" element={<Register />} />
        <Route path="/Login" element={<Login />} />
         <Route path="/courses/:id" element={<CourseDetails />} />
          <Route path="/exam-rules/:data" element={<ExamRulesAndPayment />} />
        <Route path="/payment-confirmation" element={<PaymentConfirmation />} />
         <Route path="/check-national-id" element={<CheckNationalId />} />
           <Route path="/payment" element={<PaymentPage />} />
           <Route path="/exampage" element={<ExamPage />} />
         <Route path="/results" element={<ExamResults />} />
         <Route path="/dashboard" element={<DashboardLayout />} />
         <Route path="/coursespage" element={<CoursesPage />} />

             <Route path="/subcoursespage" element={<SubCourseDashboard />} />
       <Route path="/QuestionsManagement" element={<QuestionsManagement />} />


   <Route path="/StudentsManagement" element={<StudentsManagement />} />
   
      </Routes>
    </Router>

      {/* سایر کامپوننت‌ها */}
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={true} // برای راست‌چین کردن در برنامه‌های فارسی
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </div>

  )
}

export default App
