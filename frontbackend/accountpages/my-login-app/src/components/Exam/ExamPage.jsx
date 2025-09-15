// // import { useEffect, useState } from 'react';
// // import { getExamQuestions } from './services/examService';
// // import { useLocation, useParams } from 'react-router-dom';

// // const ExamPage = () => {
// //   const [questions, setQuestions] = useState([]);
// //   const [loading, setLoading] = useState(true);
// //    const [selectedOptions, setSelectedOptions] = useState({});
   
// // const location=useLocation();
// // const id=location.state.id;

// //   useEffect(() => {
// //     const fetchQuestions = async () => {
// //       try {
// //         const data = await getExamQuestions(id); // ID دوره را جایگزین کنید
      
// //         setQuestions(data);
// //         console.log(data)
// //       } catch (error) {
// //         console.error('خطا در دریافت سوالات:', error);
// //       } finally {
// //         setLoading(false);
// //       }
// //     };

// //     fetchQuestions();
// //   }, []);

// //   if (loading) return <p>در حال دریافت سوالات...</p>;
  


// // const handleOptionChange = (questionId, optionId) => {
// //     setSelectedOptions(prev => ({
// //       ...prev,
// //       [questionId]: optionId
// //     }));
// //   };

// // return (
// //     <div style={{
// //       maxWidth: '800px',
// //       margin: '0 auto',
// //       padding: '20px',
// //       fontFamily: 'Vazir, Arial',
// //       direction: 'rtl'
// //     }}>
// //       <h2 style={{ textAlign: 'center' }}>آزمون آنلاین</h2>
      
// //       {questions.map((question) => (
// //         <div key={question.sampleQuestionId} style={{
// //           background: 'white',
// //           borderRadius: '8px',
// //           padding: '20px',
// //           marginBottom: '25px',
// //           boxShadow: '0 2px 5px rgba(0,0,0,0.1)'
// //         }}>
// //           <h3 style={{ marginBottom: '15px' }}>
// //             سوال {question.sampleQuestionId}: {question.questionText}
// //           </h3>
          
// //           <div style={{ marginTop: '10px' }}>
// //             {[1, 2, 3, 4].map((optionNum) => (
// //               <div key={optionNum} style={{
// //                 display: 'flex',
// //                 alignItems: 'center',
// //                 padding: '12px 15px',
// //                 margin: '8px 0',
// //                 background: selectedOptions[question.sampleQuestionId] === optionNum
// //                   ? '#e3f2fd'
// //                   : '#f9f9f9',
// //                 borderRadius: '6px',
// //                 border: selectedOptions[question.sampleQuestionId] === optionNum
// //                   ? '1px solid #2196f3'
// //                   : '1px solid #ddd',
// //                 cursor: 'pointer'
// //               }} onClick={() => handleOptionChange(question.sampleQuestionId, optionNum)}>
                
// //                 <input
// //                   type="checkbox"
// //                   checked={selectedOptions[question.sampleQuestionId] === optionNum}
// //                   onChange={() => handleOptionChange(question.sampleQuestionId, optionNum)}
// //                   style={{
// //                     marginLeft: '10px',
// //                     width: '18px',
// //                     height: '18px',
// //                     cursor: 'pointer'
// //                   }}
// //                 />
                
// //                 <span style={{
// //                   fontWeight: 'bold',
// //                   marginLeft: '8px',
// //                   color: '#2196f3',
// //                   minWidth: '25px'
// //                 }}>
// //                   {['الف', 'ب', 'ج', 'د'][optionNum - 1]}.
// //                 </span>
                
// //                 <span>{question[`option${optionNum}`]}</span>
// //               </div>
// //             ))}
// //           </div>
// //         </div>
// //       ))}

// //       <button 
// //         style={{
// //           display: 'block',
// //           width: '100%',
// //           padding: '12px',
// //           background: '#4caf50',
// //           color: 'white',
// //           border: 'none',
// //           borderRadius: '5px',
// //           fontSize: '16px',
// //           cursor: 'pointer',
// //           marginTop: '20px'
// //         }}
// //         onClick={() => {
// //           console.log('پاسخ‌های انتخاب شده:', selectedOptions);
// //           alert('پاسخ‌ها با موفقیت ثبت شدند');
// //         }}
// //       >
// //         ثبت پاسخ‌ها
// //       </button>
// //     </div>
// //   );
// // };
// // export default ExamPage;


// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import { useNavigate , useLocation} from 'react-router-dom';
// import { getExamQuestions } from './services/examService';
// // import { ExamStateManager } from './services/ExamStateManager';
// import { ExamManager } from './services/examManager';
// const ExamPage = () => {
//   const navigate = useNavigate();
//   const [questions, setQuestions] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [selectedOptions, setSelectedOptions] = useState({});
//   const [timeLeft, setTimeLeft] = useState(60 * 60); // 60 دقیقه به ثانیه
//   const [quizFinished, setQuizFinished] = useState(false);

//   const location=useLocation();
// const id=location.state.id;

// //  useEffect(() => {
// //     // بررسی اگر کاربر قبلاً در حال آزمون بوده
// //     const examData = ExamStateManager.getExamData();
    
// //     if (examData) {
// //       setQuestions(examData.questions);
// //       setLoading(false);
// //     } else {
// //       fetchQuestions();
// //     }

// //     // شروع آزمون
// //     ExamStateManager.startExam();

// //     // مدیریت بستن صفحه
// //     const handleBeforeUnload = (e) => {
// //       e.preventDefault();
// //       e.returnValue = '';
// //       ExamStateManager.endExam();
// //     };

// //     window.addEventListener('beforeunload', handleBeforeUnload);

// //     return () => {
// //       window.removeEventListener('beforeunload', handleBeforeUnload);
// //     };
// //   }, []);

  
// //   const fetchQuestions = async () => {
// //     try {
// //        const response = await getExamQuestions(id); // ID دوره را جایگزین کنید
// //       const data =  response;
      
// //       if (data && Array.isArray(data)) {
// //         setQuestions(data);
// //         ExamStateManager.saveExamData({ questions: data });
// //       }
// //     } catch (error) {
// //       console.error('Error:', error);
// //       navigate('/');
// //     } finally {
// //       setLoading(false);
// //     }
// //   };

// //     const handleFinishExam = () => {
// //     ExamStateManager.endExam();
// //     ExamStateManager.clearExamData();
// //     // navigate('/results');
// //       navigate('/results', { state: { answers: selectedOptions } });
// //   };

// //   دریافت سوالات از سرور
//   useEffect(() => {
//     const fetchQuestions = async () => {
//       try {
//          const response = await getExamQuestions(id); // ID دوره را جایگزین کنید
//         setQuestions(response);

      
//         setLoading(false);


//       } catch (err) {
//         setError('خطا در دریافت سوالات از سرور');
//         setLoading(false);
//             navigate('/');
//       }
//     };

//     fetchQuestions();
//   }, []);

//   // تایمر
//   useEffect(() => {
//     if (timeLeft <= 0 || quizFinished) {
//       finishQuiz();
//       return;
//     }

//     const timer = setInterval(() => {
//       setTimeLeft(prev => prev - 1);
//     }, 1000);

//     return () => clearInterval(timer);
//   }, [timeLeft, quizFinished]);

//   const handleOptionChange = (questionId, optionId) => {
//     setSelectedOptions(prev => ({
//       ...prev,
//       [questionId]: optionId
//     }));
//   };

// //  =====



// //=====
//     useEffect(() => {
//     // بررسی وضعیت آزمون هنگام لود اولیه
//     if (!ExamManager.isExamInProgress() || ExamManager.getCurrentExam() !== id) {
//     //   navigate('/');

//    setLoading(false)
    
//       return  
//     }



//     // ذخیره وضعیت فعلی برای تشخیص رفرش
//     window.__PREVENT_REFRESH_REDIRECT__ = true;

//       const fetchQuestions = async () => {
//       try {
//          const response = await getExamQuestions(id); // ID دوره را جایگزین کنید
//         setQuestions(response);

      
//         setLoading(false);

        
//       } catch (err) {
//         setError('خطا در دریافت سوالات از سرور');
//         setLoading(false);
//             navigate('/');
//       }
//     };

//     fetchQuestions();

//     // مدیریت رویداد رفرش
//     const handleBeforeUnload = (e) => {
//       if (!window.__PREVENT_REFRESH_REDIRECT__) {
//         ExamManager.endExam();
//       }
//     };

//     window.addEventListener('beforeunload', handleBeforeUnload);

//     return () => {
//       window.removeEventListener('beforeunload', handleBeforeUnload);
//       window.__PREVENT_REFRESH_REDIRECT__ = false;
//     };
//   }, [id, navigate]);
  
//  // شروع آزمون
//   useEffect(() => {
//     ExamManager.startExam(id);
//   }, [id]);

//   // تشخیص رفرش با استفاده از Performance Navigation API
//   useEffect(() => {
//     const handlePageShow = (event) => {
//       if (event.persisted || performance.navigation.type === 1) {
//         if (!window.__PREVENT_REFRESH_REDIRECT__) {
//           ExamManager.endExam();
//           navigate('/');
//         }
//       }
//     };

//     window.addEventListener('pageshow', handlePageShow);

//     return () => {
//       window.removeEventListener('pageshow', handlePageShow);
//     };
//   }, [navigate]);
//   const finishQuiz = () => {
//     // ارسال پاسخ‌ها به سرور
// //     axios.post(
        
// //         'https://your-api-endpoint.com/submit', 
        
// //         {
// //       answers: selectedOptions,
// //       timeSpent: 60 * 60 - timeLeft
// //     }

// // )
// //     .then(() => {
// //       navigate('/results', { state: { answers: selectedOptions } });
// //     })
// //     .catch(err => {
// //       console.error('خطا در ارسال پاسخ‌ها:', err);
// //     });

// //++++++++++++++

// //++++++++++++++
// ExamManager.endExam();
//   navigate('/results', { state: { answers: selectedOptions } });
//   };

//   const formatTime = (seconds) => {
//     const mins = Math.floor(seconds / 60);
//     const secs = seconds % 60;
//     return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
//   };

//   if (loading) return (
//     <div style={{ textAlign: 'center', padding: '40px' }}>
//       <div className="loader"></div>
//       <p>در حال دریافت سوالات...</p>
//     </div>
//   );

//   if (error) return (
//     <div style={{ color: 'red', textAlign: 'center', padding: '40px' }}>
//       <p>{error}</p>
//       <button 
//         onClick={() => window.location.reload()}
//         style={{
//           padding: '8px 16px',
//           background: '#2196f3',
//           color: 'white',
//           border: 'none',
//           borderRadius: '4px',
//           cursor: 'pointer'
//         }}
//       >
//         تلاش مجدد
//       </button>
//     </div>
//   );


//   return (
//     <div style={{
//       maxWidth: '800px',
//       margin: '0 auto',
//       padding: '20px',
//       fontFamily: 'Vazir, Arial',
//       direction: 'rtl'
//     }}>
//       {/* هدر آزمون با تایمر */}
//       <div style={{
//         display: 'flex',
//         justifyContent: 'space-between',
//         alignItems: 'center',
//         marginBottom: '20px',
//         padding: '15px',
//         background: '#f5f5f5',
//         borderRadius: '8px'
//       }}>
//         <h2 style={{ margin: 0 }}>آزمون آنلاین</h2>
//         <div style={{
//           background: timeLeft < 300 ? '#ff5722' : '#4caf50',
//           color: 'white',
//           padding: '8px 15px',
//           borderRadius: '20px',
//           fontWeight: 'bold',
//           fontSize: '18px'
//         }}>
//           زمان باقی‌مانده: {formatTime(timeLeft)}
//         </div>
//       </div>

//       {/* سوالات */}
//       {questions.map((question) => (
//         <div key={question.sampleQuestionId} style={{
//           background: 'white',
//           borderRadius: '8px',
//           padding: '20px',
//           marginBottom: '25px',
//           boxShadow: '0 2px 5px rgba(0,0,0,0.1)'
//         }}>
//           <h3 style={{ marginBottom: '15px' }}>
//             سوال {question.sampleQuestionId}: {question.questionText}
//           </h3>
          
//           <div style={{ marginTop: '10px' }}>
//             {[1, 2, 3, 4].map((optionNum) => (
//               <div 
//                 key={optionNum}
//                 style={{
//                   display: 'flex',
//                   alignItems: 'center',
//                   padding: '12px 15px',
//                   margin: '8px 0',
//                   background: selectedOptions[question.sampleQuestionId] === optionNum
//                     ? '#e3f2fd'
//                     : '#f9f9f9',
//                   borderRadius: '6px',
//                   border: selectedOptions[question.sampleQuestionId] === optionNum
//                     ? '1px solid #2196f3'
//                     : '1px solid #ddd',
//                   cursor: 'pointer'
//                 }}
//                 onClick={() => handleOptionChange(question.sampleQuestionId, optionNum)}
//               >
//                 <input
//                   type="radio"
//                   name={`question-${question.sampleQuestionId}`}
//                   checked={selectedOptions[question.sampleQuestionId] === optionNum}
//                   onChange={() => {}}
//                   style={{
//                     marginLeft: '10px',
//                     width: '18px',
//                     height: '18px',
//                     cursor: 'pointer'
//                   }}
//                 />
                
//                 <span style={{
//                   fontWeight: 'bold',
//                   marginLeft: '8px',
//                   color: '#2196f3',
//                   minWidth: '25px'
//                 }}>
//                   {['الف', 'ب', 'ج', 'د'][optionNum - 1]}.
//                 </span>
                
//                 <span>{question[`option${optionNum}`]}</span>
//               </div>
//             ))}
//           </div>
//         </div>
//       ))}

//       {/* دکمه‌های پایانی */}
//       <div style={{
//         display: 'flex',
//         justifyContent: 'space-between',
//         marginTop: '30px'
//       }}>
//         <button
//           style={{
//             padding: '12px 25px',
//             background: '#f44336',
//             color: 'white',
//             border: 'none',
//             borderRadius: '5px',
//             fontSize: '16px',
//             cursor: 'pointer'
//           }}
//           onClick={() => {
//             if (window.confirm('آیا مطمئن هستید می‌خواهید آزمون را زودتر تمام کنید؟')) {
//               setQuizFinished(true);
            
//             }
//           }}
//         >
//           اتمام آزمون
//         </button>
        
//         <div style={{ color: timeLeft < 300 ? '#f44336' : '#666' }}>
//           {timeLeft < 300 && 'زمان کمی باقی است!'}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ExamPage;

import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { getExamQuestions } from './services/examService';
import { ExamManager } from './services/examManager';

const ExamPage = () => {
  const navigate = useNavigate();
  const [allQuestions, setAllQuestions] = useState([]);
  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedOptions, setSelectedOptions] = useState({});
  const [timeLeft, setTimeLeft] = useState(60 * 60);
  const [quizFinished, setQuizFinished] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const location = useLocation();
  const id = location.state.id;

  // دریافت سوالات و انتخاب تصادفی 40 سوال
  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const response = await getExamQuestions(id);
        const shuffled = [...response].sort(() => 0.5 - Math.random());
        const selectedQuestions = shuffled.slice(0, 40);
        
        setAllQuestions(response);
        setQuestions(selectedQuestions);
        setLoading(false);

      } catch (err) {
        setError('خطا در دریافت سوالات از سرور');
        setLoading(false);
        navigate('/');
      }
    };

    fetchQuestions();
  }, [id, navigate]);

  // مدیریت وضعیت آزمون
//   useEffect(() => {
//     if (!ExamManager.isExamInProgress() || ExamManager.getCurrentExam() !== id) {
//       setLoading(false);
//       return;
//     }

//     window.__PREVENT_REFRESH_REDIRECT__ = true;

//     const handleBeforeUnload = (e) => {
//       if (!window.__PREVENT_REFRESH_REDIRECT__) {
//         ExamManager.endExam();
//       }
//     };

//     window.addEventListener('beforeunload', handleBeforeUnload);

//     return () => {
//       window.removeEventListener('beforeunload', handleBeforeUnload);
//       window.__PREVENT_REFRESH_REDIRECT__ = false;
//     };
//   }, [id, navigate]);

  // شروع آزمون
  useEffect(() => {
    ExamManager.startExam(id);
  }, [id]);

  // تایمر
  useEffect(() => {
    if (timeLeft <= 0 || quizFinished) {
      finishQuiz();
      return;
    }

    const timer = setInterval(() => {
      setTimeLeft(prev => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft, quizFinished]);

  const handleOptionChange = (questionId, optionId) => {
    setSelectedOptions(prev => ({
      ...prev,
      [questionId]: optionId
    }));
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    }
  };

  const handlePrevQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };

  const goToQuestion = (index) => {
    setCurrentQuestionIndex(index);
  };

  const finishQuiz = async () => {
    setIsSubmitting(true);
    try {
      await ExamManager.endExam();
      navigate('/results', { state: { answers: selectedOptions ,data:questions} });
    
    } catch (err) {
      console.error('خطا در ارسال پاسخ‌ها:', err);
    } finally {
      setIsSubmitting(false);
    }
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };


  //================================
   
  // بررسی وضعیت آزمون هنگام لود اولیه
 useEffect(() => {
    if (!ExamManager.isExamInProgress() || ExamManager.getCurrentExam() !== id) {
      setLoading(false);
      return;
    }

    window.__PREVENT_REFRESH_REDIRECT__ = true;

    const handleBeforeUnload = (e) => {
      if (!window.__PREVENT_REFRESH_REDIRECT__) {
        ExamManager.endExam();
      }
    };

    window.addEventListener('beforeunload', handleBeforeUnload);

    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
      window.__PREVENT_REFRESH_REDIRECT__ = false;
    };
  }, [id, navigate]);
  // تشخیص رفرش با استفاده از Performance Navigation API
  useEffect(() => {
    const handlePageShow = (event) => {
      if (event.persisted || performance.navigation.type === 1) {
        if (!window.__PREVENT_REFRESH_REDIRECT__) {
          ExamManager.endExam();
          navigate('/', { replace: true });
        }
      }
    };

    window.addEventListener('pageshow', handlePageShow);

    return () => {
      window.removeEventListener('pageshow', handlePageShow);
    };
  }, [navigate]);
  //================================
  if (loading) return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50">
      <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
      <p className="mt-4 text-lg text-gray-700">در حال دریافت سوالات...</p>
    </div>
  );

  if (error) return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 p-6">
      <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg max-w-md w-full">
        <p className="text-center">{error}</p>
        <button 
          onClick={() => window.location.reload()}
          className="mt-4 w-full bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-lg transition duration-200"
        >
          تلاش مجدد
        </button>
      </div>
    </div>
  );

  if (questions.length === 0) return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50">
      <p className="text-gray-700 text-lg">سوالی برای نمایش وجود ندارد</p>
    </div>
  );

  const currentQuestion = questions[currentQuestionIndex];
  const progressPercentage = ((currentQuestionIndex + 1) / questions.length) * 100;

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        {/* هدر آزمون */}
        <div className="bg-white rounded-xl shadow-md p-6 mb-6 flex flex-col sm:flex-row justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold text-gray-800">آزمون آنلاین</h1>
            <p className="text-gray-600 mt-1">سوال {currentQuestionIndex + 1} از {questions.length}</p>
          </div>
          
          <div className={`mt-4 sm:mt-0 px-4 py-2 rounded-full font-bold text-white ${
            timeLeft < 300 ? 'bg-red-500' : 'bg-green-500'
          }`}>
            زمان باقی‌مانده: {formatTime(timeLeft)}
          </div>
        </div>

        {/* نوار پیشرفت */}
        <div className="mb-6">
          <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
            <div 
              className="h-full bg-blue-500 transition-all duration-300" 
              style={{ width: `${progressPercentage}%` }}
            ></div>
          </div>
          <div className="flex justify-between text-sm text-gray-600 mt-1">
            <span>پیشرفت آزمون</span>
            <span>{Math.round(progressPercentage)}%</span>
          </div>
        </div>

        {/* کارت سوال */}
        <div className="bg-white rounded-xl shadow-md overflow-hidden mb-6">
          <div className="p-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">
              <span className="text-blue-500">سوال {currentQuestionIndex + 1}:</span> {currentQuestion.questionText}
            </h2>
            
            <div className="space-y-3">
              {[1, 2, 3, 4].map((optionNum) => (
                <div
                  key={optionNum}
                  onClick={() => handleOptionChange(currentQuestion.sampleQuestionId, optionNum)}
                  className={`p-4 rounded-lg border cursor-pointer transition-all duration-200 ${
                    selectedOptions[currentQuestion.sampleQuestionId] === optionNum
                      ? 'border-blue-500 bg-blue-50'
                      : 'border-gray-200 hover:border-blue-300'
                  }`}
                >
                  <div className="flex items-center">
                    <div className={`w-6 h-6 rounded-full flex items-center justify-center mr-3 ${
                      selectedOptions[currentQuestion.sampleQuestionId] === optionNum
                        ? 'bg-blue-500 text-white'
                        : 'bg-gray-100 text-gray-600'
                    }`}>
                      {['الف', 'ب', 'ج', 'د'][optionNum - 1]}
                    </div>
                    <span>{currentQuestion[`option${optionNum}`]}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ناوبری سوالات */}
        <div className="flex justify-between mb-8">
          <button
            onClick={handlePrevQuestion}
            disabled={currentQuestionIndex === 0}
            className={`px-6 py-2 rounded-lg font-medium ${
              currentQuestionIndex === 0
                ? 'bg-gray-200 text-gray-500 cursor-not-allowed'
                : 'bg-blue-500 text-white hover:bg-blue-600'
            } transition duration-200`}
          >
            قبلی
          </button>
          
          <button
            onClick={handleNextQuestion}
            disabled={currentQuestionIndex === questions.length - 1}
            className={`px-6 py-2 rounded-lg font-medium ${
              currentQuestionIndex === questions.length - 1
                ? 'bg-gray-200 text-gray-500 cursor-not-allowed'
                : 'bg-blue-500 text-white hover:bg-blue-600'
            } transition duration-200`}
          >
            بعدی
          </button>
        </div>

        {/* دکمه‌های وضعیت سوالات */}
        <div className="mb-8">
          <h3 className="text-lg font-medium text-gray-700 mb-3">وضعیت سوالات:</h3>
          <div className="flex flex-wrap gap-2">
            {questions.map((q, index) => (
              <button
                key={q.sampleQuestionId}
                onClick={() => goToQuestion(index)}
                className={`w-10 h-10 rounded-full flex items-center justify-center ${
                  index === currentQuestionIndex
                    ? 'bg-blue-500 text-white'
                    : selectedOptions[q.sampleQuestionId]
                      ? 'bg-green-100 text-green-700 border border-green-300'
                      : 'bg-gray-100 text-gray-700 border border-gray-300'
                } transition duration-200`}
              >
                {index + 1}
              </button>
            ))}
          </div>
        </div>

        {/* دکمه اتمام آزمون */}
        <div className="text-center">
          {timeLeft < 300 && (
            <div className="bg-red-50 text-red-600 p-3 rounded-lg mb-4">
              زمان کمی باقی مانده! لطفا پاسخ‌های خود را بررسی کنید.
            </div>
          )}
          
          <button
            onClick={() => {
              if (window.confirm('آیا مطمئن هستید می‌خواهید آزمون را تمام کنید؟')) {
                setQuizFinished(true);
                
              }
            }}
            disabled={isSubmitting}
            className={`px-8 py-3 rounded-lg font-medium text-white ${
              isSubmitting ? 'bg-blue-400' : 'bg-red-500 hover:bg-red-600'
            } transition duration-200 flex items-center justify-center mx-auto`}
          >
            {isSubmitting ? (
              <>
                <svg className="animate-spin -ml-1 mr-2 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                در حال ارسال...
              </>
            ) : (
              'اتمام آزمون و ثبت پاسخ‌ها'
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ExamPage;