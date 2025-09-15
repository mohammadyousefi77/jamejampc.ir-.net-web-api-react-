// import React from 'react';
// import { useLocation } from 'react-router-dom';

// const ExamResults = () => {
//   const { state } = useLocation();
// //   const location=useLocation();

// //   const result=location.state.answers
// //   console.log(result)
//   return (
//     <div style={{ padding: '20px', textAlign: 'center' }}>
//       <h2>نتایج آزمون</h2>
//       <p>پاسخ‌های شما با موفقیت ثبت شدند</p>
//       <pre>{JSON.stringify(state?.answers, null, 2)}</pre>
      
//     </div>
//   );
// };

// export default ExamResults;
//===========

// import React from 'react';
// import { useLocation } from 'react-router-dom';

// const ExamResults = () => {
//   const location = useLocation();
//   const { answers } = location.state || {};
//   const result=location.state.data;
  
 
//   // این داده‌ها باید از API دریافت شوند یا از طریق location.state پاس داده شوند
//   // برای مثال فرضی، اینجا یک داده نمونه ایجاد می‌کنیم
//   const examData = {
//     totalQuestions: 40,
//     correctAnswers: {
//       1: 3, // سوال 1 گزینه صحیح 3
//       2: 1, // سوال 2 گزینه صحیح 1
//       // ... بقیه سوالات
//     },
//     questions: {
//       1: {
//         text: "سوال نمونه اول؟",
//         options: {
//           1: "گزینه الف",
//           2: "گزینه ب",
//           3: "گزینه ج (صحیح)",
//           4: "گزینه د"
//         }
//       },
//       2: {
//         text: "سوال نمونه دوم؟",
//         options: {
//           1: "گزینه الف (صحیح)",
//           2: "گزینه ب",
//           3: "گزینه ج",
//           4: "گزینه د"
//         }
//       },
//       // ... بقیه سوالات
//     }
//   };

//   // محاسبه نتایج
//   const calculateResults = () => {
//     let correct = 0;
//     let wrong = 0;
//     const results = [];

//     for (let i = 1; i <= examData.totalQuestions; i++) {
//       const userAnswer = answers?.[i];
//       const correctAnswer = examData.correctAnswers[i];
//       const isCorrect = userAnswer === correctAnswer;

//       if (isCorrect) {
//         correct++;
//       } else if (userAnswer !== undefined) {
//         wrong++;
//       }

//       results.push({
//         questionId: i,
//         questionText: examData.questions[i]?.text || `سوال ${i}`,
//         userAnswer,
//         correctAnswer,
//         isCorrect,
//         options: examData.questions[i]?.options || {}
//       });
//     }

//     return {
//       correct,
//       wrong,
//       unanswered: examData.totalQuestions - correct - wrong,
//       score: Math.round((correct / examData.totalQuestions) * 100),
//       results
//     };
//   };

//   const { correct, wrong, unanswered, score, results } = calculateResults();

//   return (
//     <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
//       <div className="max-w-4xl mx-auto">
//         {/* هدر نتایج */}
//         <div className="text-center mb-10">
//           <h1 className="text-3xl font-bold text-gray-800 mb-2">نتایج آزمون</h1>
//           <p className="text-gray-600">کاربر گرامی، نتیجه آزمون شما به شرح زیر است</p>
//         </div>

//         {/* کارت خلاصه نتایج */}
//         <div className="bg-white rounded-xl shadow-md overflow-hidden mb-8">
//           <div className="p-6 grid grid-cols-1 md:grid-cols-4 gap-4">
//             {/* امتیاز کلی */}
//             <div className="bg-blue-50 p-4 rounded-lg text-center">
//               <div className="text-4xl font-bold text-blue-600 mb-2">{score}%</div>
//               <div className="text-gray-700">امتیاز کلی</div>
//             </div>

//             {/* پاسخ‌های صحیح */}
//             <div className="bg-green-50 p-4 rounded-lg text-center">
//               <div className="text-4xl font-bold text-green-600 mb-2">{correct}</div>
//               <div className="text-gray-700">پاسخ صحیح</div>
//             </div>

//             {/* پاسخ‌های غلط */}
//             <div className="bg-red-50 p-4 rounded-lg text-center">
//               <div className="text-4xl font-bold text-red-600 mb-2">{wrong}</div>
//               <div className="text-gray-700">پاسخ غلط</div>
//             </div>

//             {/* پاسخ داده نشده */}
//             <div className="bg-yellow-50 p-4 rounded-lg text-center">
//               <div className="text-4xl font-bold text-yellow-600 mb-2">{unanswered}</div>
//               <div className="text-gray-700">پاسخ داده نشده</div>
//             </div>
//           </div>
//         </div>

//         {/* نمودار پیشرفت */}
//         <div className="bg-white rounded-xl shadow-md p-6 mb-8">
//           <h2 className="text-xl font-semibold text-gray-800 mb-4">نمودار عملکرد</h2>
//           <div className="h-4 bg-gray-200 rounded-full overflow-hidden">
//             <div 
//               className="h-full bg-gradient-to-r from-green-500 to-blue-500" 
//               style={{ width: `${score}%` }}
//             ></div>
//           </div>
//           <div className="flex justify-between text-sm text-gray-600 mt-2">
//             <span>0%</span>
//             <span>50%</span>
//             <span>100%</span>
//           </div>
//         </div>

//         {/* لیست سوالات با پاسخ‌ها */}
//         <div className="bg-white rounded-xl shadow-md overflow-hidden">
//           <div className="p-6">
//             <h2 className="text-xl font-semibold text-gray-800 mb-4">جزئیات پاسخ‌ها</h2>
            
//             <div className="space-y-6">
//               {results.map((item) => (
//                 <div 
//                   key={item.questionId}
//                   className={`border rounded-lg p-4 ${
//                     item.isCorrect 
//                       ? 'border-green-200 bg-green-50' 
//                       : item.userAnswer 
//                         ? 'border-red-200 bg-red-50' 
//                         : 'border-gray-200 bg-gray-50'
//                   }`}
//                 >
//                   <h3 className="font-medium text-gray-800 mb-3">
//                     سوال {item.questionId}: {item.questionText}
//                   </h3>
                  
//                   <div className="space-y-2">
//                     {Object.entries(item.options).map(([key, value]) => (
//                       <div 
//                         key={key}
//                         className={`p-3 rounded-md ${
//                           parseInt(key) === item.correctAnswer
//                             ? 'bg-green-100 border border-green-300'
//                             : parseInt(key) === item.userAnswer && !item.isCorrect
//                               ? 'bg-red-100 border border-red-300'
//                               : 'bg-gray-100'
//                         }`}
//                       >
//                         <div className="flex items-center">
//                           <span className="font-medium ml-2">{['الف', 'ب', 'ج', 'د'][parseInt(key)-1]}:</span>
//                           <span>{value}</span>
//                           {parseInt(key) === item.correctAnswer && (
//                             <span className="mr-auto text-green-600 font-medium">(پاسخ صحیح)</span>
//                           )}
//                           {parseInt(key) === item.userAnswer && !item.isCorrect && (
//                             <span className="mr-auto text-red-600 font-medium">(پاسخ شما)</span>
//                           )}
//                         </div>
//                       </div>
//                     ))}
//                   </div>
//                 </div>
//               ))}
//             </div>
//           </div>
//         </div>

//         {/* دکمه بازگشت */}
//         <div className="mt-8 text-center">
//           <button
//             onClick={() => window.location.href = '/'}
//             className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition duration-200"
//           >
//             بازگشت به صفحه اصلی
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ExamResults;

//=====================

// import React from 'react';
// import { useLocation, useNavigate } from 'react-router-dom';

// const ExamResults = () => {
//   const location = useLocation();
//   const navigate = useNavigate();
//   const result = location.state?.data || {};
//    console.log(result)
//   // تحلیل نتایج و محاسبه امتیاز
//   const analyzeResults = () => {
//     if (!result ) {
//       return {
//         score: 0,
//         correctAnswers: 0,
//         wrongAnswers: 0,
//         unanswered: 0,
//         results: []
//       };
//     }

//     let correctAnswers = 0;
//     let wrongAnswers = 0;
//     let unanswered = 0;
//     const detailedResults = [];

//     result.forEach((question) => {
//       const userAnswer = result[question.sampleQuestionId];
//       const isCorrect = userAnswer === question.correctOptionIndex;
//       const isAnswered = userAnswer !== undefined;

//       if (isCorrect) {
//         correctAnswers++;
//       } else if (isAnswered) {
//         wrongAnswers++;
//       } else {
//         unanswered++;
//       }

//       detailedResults.push({
//         questionId: question.sampleQuestionId,
//         questionText: question.questionText,
//         options: [
//           { id: 1, text: question.option1 },
//           { id: 2, text: question.option2 },
//           { id: 3, text: question.option3 },
//           { id: 4, text: question.option4 }
//         ],
//         userAnswer,
//         correctAnswer: question.correctOptionIndex,
//         isCorrect,
//         isAnswered
//       });
//     });

//     const totalQuestions = result.length;
//     const score = Math.round((correctAnswers / totalQuestions) * 100);

//     return {
//       score,
//       correctAnswers,
//       wrongAnswers,
//       unanswered,
//       totalQuestions,
//       detailedResults
//     };
//   };

//   const {
//     score,
//     correctAnswers,
//     wrongAnswers,
//     unanswered,
//     totalQuestions,
//     detailedResults
//   } = analyzeResults();

//   // تابع تبدیل عدد گزینه به حرف فارسی
//   const optionToPersian = (option) => {
//     const optionsMap = { 1: 'الف', 2: 'ب', 3: 'ج', 4: 'د' };
//     return optionsMap[option] || '';
//   };

//   return (
//     <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
//       <div className="max-w-4xl mx-auto">
//         {/* هدر نتایج */}
//         <div className="text-center mb-10">
//           <h1 className="text-3xl font-bold text-gray-800 mb-2">نتایج آزمون</h1>
//           <p className="text-gray-600">کاربر گرامی، نتیجه آزمون شما به شرح زیر است</p>
//         </div>

//         {/* خلاصه نتایج */}
//         <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
//           <div className="bg-blue-50 p-4 rounded-lg text-center border border-blue-100">
//             <div className="text-4xl font-bold text-blue-600 mb-2">{score}%</div>
//             <div className="text-gray-700">میانگین نمره</div>
//           </div>
          
//           <div className="bg-green-50 p-4 rounded-lg text-center border border-green-100">
//             <div className="text-4xl font-bold text-green-600 mb-2">{correctAnswers}</div>
//             <div className="text-gray-700">پاسخ صحیح</div>
//           </div>
          
//           <div className="bg-red-50 p-4 rounded-lg text-center border border-red-100">
//             <div className="text-4xl font-bold text-red-600 mb-2">{wrongAnswers}</div>
//             <div className="text-gray-700">پاسخ غلط</div>
//           </div>
          
//           <div className="bg-yellow-50 p-4 rounded-lg text-center border border-yellow-100">
//             <div className="text-4xl font-bold text-yellow-600 mb-2">{unanswered}</div>
//             <div className="text-gray-700">بی‌پاسخ</div>
//           </div>
//         </div>

//         {/* نمودار پیشرفت */}
//         <div className="bg-white rounded-lg shadow-sm p-6 mb-8 border border-gray-200">
//           <h2 className="text-xl font-semibold text-gray-800 mb-4">نمودار عملکرد</h2>
//           <div className="flex items-center">
//             <div className="w-full bg-gray-200 rounded-full h-4">
//               <div 
//                 className="bg-gradient-to-r from-green-400 to-blue-500 h-4 rounded-full" 
//                 style={{ width: `${score}%` }}
//               ></div>
//             </div>
//             <span className="text-sm font-medium text-gray-600 mr-3 w-16 text-left">{score}%</span>
//           </div>
//           <div className="flex justify-between text-xs text-gray-500 mt-2">
//             <span>0%</span>
//             <span>50%</span>
//             <span>100%</span>
//           </div>
//         </div>

//         {/* جزئیات سوالات */}
//         <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
//           <h2 className="text-xl font-semibold text-gray-800 mb-4">جزئیات سوالات</h2>
          
//           <div className="space-y-6">
//             {detailedResults.map((item) => (
//               <div 
//                 key={item.questionId}
//                 className={`border rounded-lg p-4 ${
//                   item.isCorrect 
//                     ? 'border-green-200 bg-green-50' 
//                     : item.isAnswered 
//                       ? 'border-red-200 bg-red-50' 
//                       : 'border-gray-200 bg-gray-50'
//                 }`}
//               >
//                 <h3 className="font-medium text-gray-800 mb-3">
//                   سوال {item.questionId}: {item.questionText}
//                 </h3>
                
//                 <div className="space-y-2">
//                   {item.options.map((option) => (
//                     <div 
//                       key={option.id}
//                       className={`p-3 rounded-md ${
//                         option.id === item.correctAnswer
//                           ? 'bg-green-100 border border-green-300'
//                           : option.id === item.userAnswer && !item.isCorrect
//                             ? 'bg-red-100 border border-red-300'
//                             : 'bg-gray-100'
//                       }`}
//                     >
//                       <div className="flex items-center">
//                         <span className="font-medium ml-2">{optionToPersian(option.id)}:</span>
//                         <span>{option.text}</span>
                        
//                         {option.id === item.correctAnswer && (
//                           <span className="mr-auto text-green-600 font-medium text-sm">(پاسخ صحیح)</span>
//                         )}
                        
//                         {option.id === item.userAnswer && !item.isCorrect && (
//                           <span className="mr-auto text-red-600 font-medium text-sm">(پاسخ شما)</span>
//                         )}
//                       </div>
//                     </div>
//                   ))}
//                 </div>
                
//                 {!item.isAnswered && (
//                   <div className="mt-2 text-yellow-700 text-sm">
//                     شما به این سوال پاسخ نداده‌اید
//                   </div>
//                 )}
//               </div>
//             ))}
//           </div>
//         </div>

//         {/* دکمه‌های پایین صفحه */}
//         <div className="mt-8 flex flex-col sm:flex-row justify-center gap-4">
//           <button
//             onClick={() => navigate('/')}
//             className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition duration-200"
//           >
//             بازگشت به صفحه اصلی
//           </button>
          
//           <button
//             onClick={() => window.print()}
//             className="px-6 py-3 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition duration-200"
//           >
//             چاپ نتایج
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ExamResults;

//==============================

// import React from 'react';
// import { useLocation, useNavigate } from 'react-router-dom';

// const ExamResults = () => {
//   const location = useLocation();
//   const navigate = useNavigate();
  
//   // دریافت داده‌ها با ساختار صحیح

// const answers=location.state.answers
// const questions=location.state.data
//   console.log(location.state)
//   // تابع تبدیل عدد گزینه به حرف فارسی
//   const optionToPersian = (option) => {
//     const optionsMap = { 1: 'الف', 2: 'ب', 3: 'ج', 4: 'د' };
//     return optionsMap[option] || '';
//   };

//   // تحلیل نتایج
//   const analyzeResults = () => {
//     let correct = 0;
//     let wrong = 0;
//     let unanswered = 0;
//     const detailedResults = [];

//     questions.forEach((question) => {
//       const userAnswer = answers[question.sampleQuestionId];
//       const isCorrect = userAnswer === question.correctOptionIndex;
//       const isAnswered = userAnswer !== undefined;

//       if (isCorrect) {
//         correct++;
//       } else if (isAnswered) {
//         wrong++;
//       } else {
//         unanswered++;
//       }

//       detailedResults.push({
//         questionId: question.sampleQuestionId,
//         questionText: question.questionText,
//         options: [
//           { id: 1, text: question.option1 },
//           { id: 2, text: question.option2 },
//           { id: 3, text: question.option3 },
//           { id: 4, text: question.option4 }
//         ],
//         userAnswer,
//         correctAnswer: question.correctOptionIndex,
//         isCorrect,
//         isAnswered
//       });
//     });

//     const totalQuestions = questions.length;
//     const score = totalQuestions > 0 ? Math.round((correct / totalQuestions) * 100) : 0;

//     return {
//       score,
//       correct,
//       wrong,
//       unanswered,
//       totalQuestions,
//       detailedResults
//     };
//   };

//   const {
//     score,
//     correct,
//     wrong,
//     unanswered,
//     totalQuestions,
//     detailedResults
//   } = analyzeResults();

//   // اگر داده‌ای وجود ندارد
//   if (questions.length === 0) {
//     return (
//       <div className="min-h-screen bg-gray-50 flex items-center justify-center">
//         <div className="bg-white p-8 rounded-lg shadow-md max-w-md text-center">
//           <h2 className="text-2xl font-bold text-red-600 mb-4">خطا در نمایش نتایج</h2>
//           <p className="text-gray-700 mb-6">داده‌ای برای نمایش وجود ندارد.</p>
//           <button
//             onClick={() => navigate('/')}
//             className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
//           >
//             بازگشت به صفحه اصلی
//           </button>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
//       <div className="max-w-4xl mx-auto">
//         {/* هدر نتایج */}
//         <div className="text-center mb-10">
//           <h1 className="text-3xl font-bold text-gray-800 mb-2">نتایج آزمون</h1>
//           <p className="text-gray-600">کاربر گرامی، نتیجه آزمون شما به شرح زیر است</p>
//         </div>

//         {/* کارت‌های خلاصه نتایج */}
//         <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
//           <div className="bg-white p-4 rounded-lg shadow-sm border border-blue-100">
//             <div className="text-3xl font-bold text-blue-600 mb-1">{score}%</div>
//             <div className="text-gray-600 text-sm">میانگین نمره</div>
//           </div>
          
//           <div className="bg-white p-4 rounded-lg shadow-sm border border-green-100">
//             <div className="text-3xl font-bold text-green-600 mb-1">{correct}/{totalQuestions}</div>
//             <div className="text-gray-600 text-sm">پاسخ صحیح</div>
//           </div>
          
//           <div className="bg-white p-4 rounded-lg shadow-sm border border-red-100">
//             <div className="text-3xl font-bold text-red-600 mb-1">{wrong}</div>
//             <div className="text-gray-600 text-sm">پاسخ غلط</div>
//           </div>
          
//           <div className="bg-white p-4 rounded-lg shadow-sm border border-yellow-100">
//             <div className="text-3xl font-bold text-yellow-600 mb-1">{unanswered}</div>
//             <div className="text-gray-600 text-sm">بی‌پاسخ</div>
//           </div>
//         </div>

//         {/* نمودار پیشرفت */}
//         <div className="bg-white p-6 rounded-lg shadow-sm mb-8 border border-gray-200">
//           <div className="flex justify-between items-center mb-3">
//             <h2 className="text-lg font-semibold text-gray-800">پیشرفت آزمون</h2>
//             <span className="text-sm font-medium text-gray-600">{score}%</span>
//           </div>
//           <div className="w-full bg-gray-200 rounded-full h-2.5">
//             <div 
//               className="bg-gradient-to-r from-green-400 to-blue-500 h-2.5 rounded-full" 
//               style={{ width: `${score}%` }}
//             ></div>
//           </div>
//         </div>

//         {/* جزئیات سوالات */}
//         <div className="bg-white rounded-lg shadow-sm overflow-hidden mb-8 border border-gray-200">
//           <div className="p-4 bg-gray-50 border-b border-gray-200">
//             <h2 className="text-lg font-semibold text-gray-800">جزئیات پاسخ‌ها</h2>
//           </div>
          
//           <div className="divide-y divide-gray-200">
//             {detailedResults.map((item) => (
//               <div 
//                 key={item.questionId}
//                 className="p-4"
//               >
//                 <div className="flex items-start mb-3">
//                   <span className={`inline-flex items-center justify-center w-6 h-6 rounded-full text-sm font-medium mr-2 ${
//                     item.isCorrect ? 'bg-green-100 text-green-800' : 
//                     item.isAnswered ? 'bg-red-100 text-red-800' : 'bg-gray-100 text-gray-800'
//                   }`}>
//                     {item.questionId}
//                   </span>
//                   <h3 className="font-medium text-gray-800">{item.questionText}</h3>
//                 </div>
                
//                 <div className="space-y-2 ml-8">
//                   {item.options.map((option) => (
//                     <div 
//                       key={option.id}
//                       className={`p-2 rounded ${
//                         option.id === item.correctAnswer
//                           ? 'bg-green-50 border border-green-200'
//                           : option.id === item.userAnswer && !item.isCorrect
//                             ? 'bg-red-50 border border-red-200'
//                             : 'bg-gray-50'
//                       }`}
//                     >
//                       <div className="flex items-center">
//                         <span className="font-medium text-gray-600 ml-2">{optionToPersian(option.id)}.</span>
//                         <span className="text-gray-800">{option.text}</span>
                        
//                         {option.id === item.correctAnswer && (
//                           <span className="mr-auto text-xs font-medium text-green-600 bg-green-100 px-2 py-1 rounded">
//                             پاسخ صحیح
//                           </span>
//                         )}
                        
//                         {option.id === item.userAnswer && !item.isCorrect && (
//                           <span className="mr-auto text-xs font-medium text-red-600 bg-red-100 px-2 py-1 rounded">
//                             پاسخ شما
//                           </span>
//                         )}
//                       </div>
//                     </div>
//                   ))}
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>

//         {/* دکمه‌های اقدام */}
//         <div className="flex flex-col sm:flex-row justify-center gap-3">
//           <button
//             onClick={() => navigate('/')}
//             className="px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition duration-200"
//           >
//             بازگشت به صفحه اصلی
//           </button>
//           <button
//             onClick={() => window.print()}
//             className="px-5 py-2.5 bg-white border border-gray-300 hover:bg-gray-50 text-gray-700 rounded-lg transition duration-200"
//           >
//             چاپ نتایج
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ExamResults;

// import React, { useState } from 'react';
// import { useLocation, useNavigate } from 'react-router-dom';

// const ExamResults = () => {
//   const location = useLocation();
//   const navigate = useNavigate();
// //   // دریافت داده‌ها با ساختار صحیح

// const answers=location.state.answers
// const questions=location.state.data
  
//   // حالت برای مرتب‌سازی
//   const [sortBy, setSortBy] = useState('default'); // default, correct, wrong, unanswered
//   const [sortOrder, setSortOrder] = useState('asc'); // asc, desc

//   // تابع تبدیل عدد گزینه به حرف فارسی
//   const optionToPersian = (option) => {
//     const optionsMap = { 1: 'الف', 2: 'ب', 3: 'ج', 4: 'د' };
//     return optionsMap[option] || '';
//   };

//   // تحلیل نتایج
//   const analyzeResults = () => {
//     let correct = 0;
//     let wrong = 0;
//     let unanswered = 0;
//     const detailedResults = [];

//     questions.forEach((question) => {
//       const userAnswer = answers[question.sampleQuestionId];
//       const isCorrect = userAnswer === question.correctOptionIndex;
//       const isAnswered = userAnswer !== undefined;

//       if (isCorrect) {
//         correct++;
//       } else if (isAnswered) {
//         wrong++;
//       } else {
//         unanswered++;
//       }

//       detailedResults.push({
//         questionId: question.sampleQuestionId,
//         questionText: question.questionText,
//         options: [
//           { id: 1, text: question.option1 },
//           { id: 2, text: question.option2 },
//           { id: 3, text: question.option3 },
//           { id: 4, text: question.option4 }
//         ],
//         userAnswer,
//         correctAnswer: question.correctOptionIndex,
//         isCorrect,
//         isAnswered,
//         isUnanswered: !isAnswered
//       });
//     });

//     const totalQuestions = questions.length;
//     const score = totalQuestions > 0 ? Math.round((correct / totalQuestions) * 100) : 0;

//     return {
//       score,
//       correct,
//       wrong,
//       unanswered,
//       totalQuestions,
//       detailedResults
//     };
//   };

//   // مرتب‌سازی نتایج
//   const sortResults = (results) => {
//     const sorted = [...results];
    
//     switch(sortBy) {
//       case 'correct':
//         sorted.sort((a, b) => {
//           if (sortOrder === 'asc') return Number(a.isCorrect) - Number(b.isCorrect);
//           return Number(b.isCorrect) - Number(a.isCorrect);
//         });
//         break;
      
//       case 'wrong':
//         sorted.sort((a, b) => {
//           if (sortOrder === 'asc') return Number(!a.isCorrect && a.isAnswered) - Number(!b.isCorrect && b.isAnswered);
//           return Number(!b.isCorrect && b.isAnswered) - Number(!a.isCorrect && a.isAnswered);
//         });
//         break;
      
//       case 'unanswered':
//         sorted.sort((a, b) => {
//           if (sortOrder === 'asc') return Number(a.isUnanswered) - Number(b.isUnanswered);
//           return Number(b.isUnanswered) - Number(a.isUnanswered);
//         });
//         break;
      
//       case 'number':
//       default:
//         sorted.sort((a, b) => {
//           if (sortOrder === 'asc') return a.questionId - b.questionId;
//           return b.questionId - a.questionId;
//         });
//     }
    
//     return sorted;
//   };

//   const {
//     score,
//     correct,
//     wrong,
//     unanswered,
//     totalQuestions,
//     detailedResults
//   } = analyzeResults();

//   // اعمال مرتب‌سازی
//   const sortedResults = sortResults(detailedResults);

//   // اگر داده‌ای وجود ندارد
//   if (questions.length === 0) {
//     return (
//       <div className="min-h-screen bg-gray-50 flex items-center justify-center">
//         <div className="bg-white p-8 rounded-lg shadow-md max-w-md text-center">
//           <h2 className="text-2xl font-bold text-red-600 mb-4">خطا در نمایش نتایج</h2>
//           <p className="text-gray-700 mb-6">داده‌ای برای نمایش وجود ندارد.</p>
//           <button
//             onClick={() => navigate('/')}
//             className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
//           >
//             بازگشت به صفحه اصلی
//           </button>
//         </div>
//       </div>
//     );
//   }

//   // تابع تغییر مرتب‌سازی
//   const handleSortChange = (type) => {
//     if (sortBy === type) {
//       setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
//     } else {
//       setSortBy(type);
//       setSortOrder('asc');
//     }
//   };

//   // آیکون جهت مرتب‌سازی
//   const SortIcon = ({ type }) => (
//     <span className="ml-1">
//       {sortBy === type ? (
//         sortOrder === 'asc' ? '↑' : '↓'
//       ) : null}
//     </span>
//   );

//   return (
//     <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
//       <div className="max-w-4xl mx-auto">
//         {/* هدر نتایج */}
//         <div className="text-center mb-10">
//           <h1 className="text-3xl font-bold text-gray-800 mb-2">نتایج آزمون</h1>
//           <p className="text-gray-600">کاربر گرامی، نتیجه آزمون شما به شرح زیر است</p>
//         </div>

//         {/* کارت‌های خلاصه نتایج */}
//         <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
//           <div className="bg-white p-4 rounded-lg shadow-sm border border-blue-100">
//             <div className="text-3xl font-bold text-blue-600 mb-1">{score}%</div>
//             <div className="text-gray-600 text-sm">میانگین نمره</div>
//           </div>
          
//           <div className="bg-white p-4 rounded-lg shadow-sm border border-green-100">
//             <div className="text-3xl font-bold text-green-600 mb-1">{correct}/{totalQuestions}</div>
//             <div className="text-gray-600 text-sm">پاسخ صحیح</div>
//           </div>
          
//           <div className="bg-white p-4 rounded-lg shadow-sm border border-red-100">
//             <div className="text-3xl font-bold text-red-600 mb-1">{wrong}</div>
//             <div className="text-gray-600 text-sm">پاسخ غلط</div>
//           </div>
          
//           <div className="bg-white p-4 rounded-lg shadow-sm border border-yellow-100">
//             <div className="text-3xl font-bold text-yellow-600 mb-1">{unanswered}</div>
//             <div className="text-gray-600 text-sm">بی‌پاسخ</div>
//           </div>
//         </div>

//         {/* کنترل‌های مرتب‌سازی */}
//         <div className="bg-white p-4 rounded-lg shadow-sm mb-6 border border-gray-200">
//           <div className="flex flex-wrap gap-3 items-center">
//             <span className="text-gray-700">مرتب‌سازی بر اساس:</span>
            
//             <button
//               onClick={() => handleSortChange('number')}
//               className={`px-3 py-1 rounded-md text-sm ${
//                 sortBy === 'number' 
//                   ? 'bg-blue-100 text-blue-700' 
//                   : 'bg-gray-100 text-gray-700'
//               }`}
//             >
//               شماره سوال <SortIcon type="number" />
//             </button>
            
//             <button
//               onClick={() => handleSortChange('correct')}
//               className={`px-3 py-1 rounded-md text-sm ${
//                 sortBy === 'correct' 
//                   ? 'bg-green-100 text-green-700' 
//                   : 'bg-gray-100 text-gray-700'
//               }`}
//             >
//               پاسخ‌های صحیح <SortIcon type="correct" />
//             </button>
            
//             <button
//               onClick={() => handleSortChange('wrong')}
//               className={`px-3 py-1 rounded-md text-sm ${
//                 sortBy === 'wrong' 
//                   ? 'bg-red-100 text-red-700' 
//                   : 'bg-gray-100 text-gray-700'
//               }`}
//             >
//               پاسخ‌های غلط <SortIcon type="wrong" />
//             </button>
            
//             <button
//               onClick={() => handleSortChange('unanswered')}
//               className={`px-3 py-1 rounded-md text-sm ${
//                 sortBy === 'unanswered' 
//                   ? 'bg-yellow-100 text-yellow-700' 
//                   : 'bg-gray-100 text-gray-700'
//               }`}
//             >
//               بی‌پاسخ‌ها <SortIcon type="unanswered" />
//             </button>
//           </div>
//         </div>

//         {/* جزئیات سوالات */}
//         <div className="bg-white rounded-lg shadow-sm overflow-hidden mb-8 border border-gray-200">
//           <div className="p-4 bg-gray-50 border-b border-gray-200">
//             <h2 className="text-lg font-semibold text-gray-800">جزئیات پاسخ‌ها</h2>
//           </div>
          
//           <div className="divide-y divide-gray-200  ">
//             {sortedResults.map((item) => (
//               <div 
//                 key={item.questionId}
//                 className="p-4 "
//               >
//                 <div className="flex items-start mb-3">
//                   <span className={`inline-flex items-center justify-center w-6 h-6 rounded-full text-sm font-medium mr-2 ${
//                     item.isCorrect ? 'bg-green-100 text-green-800' : 
//                     item.isAnswered ? 'bg-red-100 text-red-800' : 'bg-gray-100 text-gray-800'
//                   }`}>
//                     {item.questionId}
//                   </span>
//                   <h3 className="font-medium text-gray-800">{item.questionText}</h3>
//                 </div>
                
//                 <div className="space-y-2 ml-8 ">
//                   {item.options.map((option) => (
//                     <div 
//                       key={option.id}
//                       className={`p-2 rounded ${
//                         option.id === item.correctAnswer
//                           ? 'bg-green-50 border border-green-200'
//                           : option.id === item.userAnswer && !item.isCorrect
//                             ? 'bg-red-50 border border-red-200'
//                             : 'bg-gray-50'
//                       }`}
//                     >
//                       <div className="flex items-center">
//                         <span className="font-medium text-gray-600 ml-2">{optionToPersian(option.id)}.</span>
//                         <span className="text-gray-800">{option.text}</span>
                        
//                         {option.id === item.correctAnswer && (
//                           <span className="mr-auto text-xs font-medium text-green-600 bg-green-100 px-2 py-1 rounded">
//                             پاسخ صحیح
//                           </span>
//                         )}
                        
//                         {option.id === item.userAnswer && !item.isCorrect && (
//                           <span className="mr-auto text-xs font-medium text-red-600 bg-red-100 px-2 py-1 rounded">
//                             پاسخ شما
//                           </span>
//                         )}
//                       </div>
//                     </div>
//                   ))}
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>

//         {/* دکمه‌های اقدام */}
//         <div className="flex flex-col sm:flex-row justify-center gap-3">
//           <button
//             onClick={() => navigate('/')}
//             className="px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition duration-200"
//           >
//             بازگشت به صفحه اصلی
//           </button>
//           <button
//             onClick={() => window.print()}
//             className="px-5 py-2.5 bg-white border border-gray-300 hover:bg-gray-50 text-gray-700 rounded-lg transition duration-200"
//           >
//             چاپ نتایج
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ExamResults;

import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const ExamResults = () => {
  const location = useLocation();
  const navigate = useNavigate();
 const answers=location.state.answers
const questions=location.state.data
//   console.log(location.state)
  
  // حالت‌های مرتب‌سازی و نمایش توضیحات
  const [sortBy, setSortBy] = useState('default');
  const [sortOrder, setSortOrder] = useState('asc');
  const [expandedQuestions, setExpandedQuestions] = useState({});

  // تابع تبدیل عدد گزینه به حرف فارسی
  const optionToPersian = (option) => {
    const optionsMap = { 1: 'الف', 2: 'ب', 3: 'ج', 4: 'د' };
    return optionsMap[option] || '';
  };

  // تابع نمایش/مخفی کردن توضیحات سوال
  const toggleQuestionExplanation = (questionId) => {
    setExpandedQuestions(prev => ({
      ...prev,
      [questionId]: !prev[questionId]
    }));
  };

  // تحلیل نتایج
  const analyzeResults = () => {
    let correct = 0;
    let wrong = 0;
    let unanswered = 0;
    const detailedResults = [];

    questions.forEach((question) => {
      const userAnswer = answers[question.sampleQuestionId];
      const isCorrect = userAnswer === question.correctOptionIndex;
      const isAnswered = userAnswer !== undefined;

      if (isCorrect) {
        correct++;
      } else if (isAnswered) {
        wrong++;
      } else {
        unanswered++;
      }

      detailedResults.push({
        questionId: question.sampleQuestionId,
        questionText: question.questionText,
        questionExplanation: question.answer, // توضیحات سوال
        options: [
          { id: 1, text: question.option1 },
          { id: 2, text: question.option2 },
          { id: 3, text: question.option3 },
          { id: 4, text: question.option4 }
        ],
        userAnswer,
        correctAnswer: question.correctOptionIndex,
        isCorrect,
        isAnswered,
        isUnanswered: !isAnswered
      });
    });

    const totalQuestions = questions.length;
    const score = totalQuestions > 0 ? Math.round((correct / totalQuestions) * 100) : 0;

    return {
      score,
      correct,
      wrong,
      unanswered,
      totalQuestions,
      detailedResults
    };
  };

  // تابع مرتب‌سازی نتایج
  const sortResults = (results) => {
    const sorted = [...results];
    
    switch(sortBy) {
      case 'correct':
        sorted.sort((a, b) => {
          if (sortOrder === 'asc') return Number(a.isCorrect) - Number(b.isCorrect);
          return Number(b.isCorrect) - Number(a.isCorrect);
        });
        break;
      
      case 'wrong':
        sorted.sort((a, b) => {
          if (sortOrder === 'asc') return Number(!a.isCorrect && a.isAnswered) - Number(!b.isCorrect && b.isAnswered);
          return Number(!b.isCorrect && b.isAnswered) - Number(!a.isCorrect && a.isAnswered);
        });
        break;
      
      case 'unanswered':
        sorted.sort((a, b) => {
          if (sortOrder === 'asc') return Number(a.isUnanswered) - Number(b.isUnanswered);
          return Number(b.isUnanswered) - Number(a.isUnanswered);
        });
        break;
      
      case 'number':
      default:
        sorted.sort((a, b) => {
          if (sortOrder === 'asc') return a.questionId - b.questionId;
          return b.questionId - a.questionId;
        });
    }
    
    return sorted;
  };

  const {
    score,
    correct,
    wrong,
    unanswered,
    totalQuestions,
    detailedResults
  } = analyzeResults();

  // اعمال مرتب‌سازی
  const sortedResults = sortResults(detailedResults);

  // تابع تغییر مرتب‌سازی
  const handleSortChange = (type) => {
    if (sortBy === type) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(type);
      setSortOrder('asc');
    }
  };

  // کامپوننت آیکون مرتب‌سازی
  const SortIcon = ({ type }) => (
    <span className="ml-1">
      {sortBy === type ? (
        sortOrder === 'asc' ? '↑' : '↓'
      ) : null}
    </span>
  );

  // اگر داده‌ای وجود ندارد
  if (questions.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="bg-white p-8 rounded-lg shadow-md max-w-md text-center">
          <h2 className="text-2xl font-bold text-red-600 mb-4">خطا در نمایش نتایج</h2>
          <p className="text-gray-700 mb-6">داده‌ای برای نمایش وجود ندارد.</p>
          <button
            onClick={() => navigate('/')}
            className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            بازگشت به صفحه اصلی
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* هدر نتایج */}
        <div className="text-center mb-10">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">نتایج آزمون</h1>
          <p className="text-gray-600">کاربر گرامی، نتیجه آزمون شما به شرح زیر است</p>
        </div>

        {/* کارت‌های خلاصه نتایج */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-white p-4 rounded-lg shadow-sm border border-blue-100">
            <div className="text-3xl font-bold text-blue-600 mb-1">{score}%</div>
            <div className="text-gray-600 text-sm">میانگین نمره</div>
          </div>
          
          <div className="bg-white p-4 rounded-lg shadow-sm border border-green-100">
            <div className="text-3xl font-bold text-green-600 mb-1">{correct}/{totalQuestions}</div>
            <div className="text-gray-600 text-sm">پاسخ صحیح</div>
          </div>
          
          <div className="bg-white p-4 rounded-lg shadow-sm border border-red-100">
            <div className="text-3xl font-bold text-red-600 mb-1">{wrong}</div>
            <div className="text-gray-600 text-sm">پاسخ غلط</div>
          </div>
          
          <div className="bg-white p-4 rounded-lg shadow-sm border border-yellow-100">
            <div className="text-3xl font-bold text-yellow-600 mb-1">{unanswered}</div>
            <div className="text-gray-600 text-sm">بی‌پاسخ</div>
          </div>
        </div>

        {/* کنترل‌های مرتب‌سازی */}
        <div className="bg-white p-4 rounded-lg shadow-sm mb-6 border border-gray-200">
          <div className="flex flex-wrap gap-3 items-center">
            <span className="text-gray-700">مرتب‌سازی بر اساس:</span>
            
            <button
              onClick={() => handleSortChange('number')}
              className={`px-3 py-1 rounded-md text-sm ${
                sortBy === 'number' 
                  ? 'bg-blue-100 text-blue-700' 
                  : 'bg-gray-100 text-gray-700'
              }`}
            >
              شماره سوال <SortIcon type="number" />
            </button>
            
            <button
              onClick={() => handleSortChange('correct')}
              className={`px-3 py-1 rounded-md text-sm ${
                sortBy === 'correct' 
                  ? 'bg-green-100 text-green-700' 
                  : 'bg-gray-100 text-gray-700'
              }`}
            >
              پاسخ‌های صحیح <SortIcon type="correct" />
            </button>
            
            <button
              onClick={() => handleSortChange('wrong')}
              className={`px-3 py-1 rounded-md text-sm ${
                sortBy === 'wrong' 
                  ? 'bg-red-100 text-red-700' 
                  : 'bg-gray-100 text-gray-700'
              }`}
            >
              پاسخ‌های غلط <SortIcon type="wrong" />
            </button>
            
            <button
              onClick={() => handleSortChange('unanswered')}
              className={`px-3 py-1 rounded-md text-sm ${
                sortBy === 'unanswered' 
                  ? 'bg-yellow-100 text-yellow-700' 
                  : 'bg-gray-100 text-gray-700'
              }`}
            >
              بی‌پاسخ‌ها <SortIcon type="unanswered" />
            </button>
          </div>
        </div>

        {/* جزئیات سوالات */}
        <div className="bg-white rounded-lg shadow-sm overflow-hidden mb-8 border border-gray-200">
          <div className="p-4 bg-gray-50 border-b border-gray-200">
            <h2 className="text-lg font-semibold text-gray-800">جزئیات پاسخ‌ها</h2>
          </div>
          
          <div className="divide-y divide-gray-200">
            {sortedResults.map((item) => (
              <div key={item.questionId} className="p-4">
                <div className="flex items-start mb-3">
                  <span className={`inline-flex items-center justify-center w-6 h-6 rounded-full text-sm font-medium mr-2 ${
                    item.isCorrect ? 'bg-green-100 text-green-800' : 
                    item.isAnswered ? 'bg-red-100 text-red-800' : 'bg-gray-100 text-gray-800'
                  }`}>
                    {item.questionId}
                  </span>
                  <div className="flex-1">
                    <h3 className="font-medium text-gray-800">{item.questionText}</h3>
                    
                    {/* دکمه نمایش توضیحات سوال */}
                    {item.questionExplanation && (
                      <button
                        onClick={() => toggleQuestionExplanation(item.questionId)}
                        className="mt-2 text-sm text-blue-600 hover:text-blue-800 flex items-center"
                      >
                        {expandedQuestions[item.questionId] ? (
                          <>
                            <span>مخفی کردن توضیحات</span>
                            <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
                            </svg>
                          </>
                        ) : (
                          <>
                            <span>نمایش توضیحات سوال</span>
                            <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                            </svg>
                          </>
                        )}
                      </button>
                    )}
                  </div>
                </div>

                {/* نمایش توضیحات سوال */}
                {expandedQuestions[item.questionId] && item.questionExplanation && (
                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 mb-3 text-sm text-gray-700">
                    <h4 className="font-medium text-blue-800 mb-1">توضیحات سوال:</h4>
                    <p>{item.questionExplanation}</p>
                  </div>
                )}

                {/* گزینه‌های پاسخ */}
                <div className="space-y-2 ml-8">
                  {item.options.map((option) => (
                    <div 
                      key={option.id}
                      className={`p-2 rounded ${
                        option.id === item.correctAnswer
                          ? 'bg-green-50 border border-green-200'
                          : option.id === item.userAnswer && !item.isCorrect
                            ? 'bg-red-50 border border-red-200'
                            : 'bg-gray-50'
                      }`}
                    >
                      <div className="flex items-center">
                        <span className="font-medium text-gray-600 ml-2">{optionToPersian(option.id)}.</span>
                        <span className="text-gray-800">{option.text}</span>
                        
                        {option.id === item.correctAnswer && (
                          <span className="mr-auto text-xs font-medium text-green-600 bg-green-100 px-2 py-1 rounded">
                            پاسخ صحیح
                          </span>
                        )}
                        
                        {option.id === item.userAnswer && !item.isCorrect && (
                          <span className="mr-auto text-xs font-medium text-red-600 bg-red-100 px-2 py-1 rounded">
                            پاسخ شما
                          </span>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* دکمه‌های اقدام */}
        <div className="flex flex-col sm:flex-row justify-center gap-3">
          <button
            onClick={() => navigate('/')}
            className="px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition duration-200"
          >
            بازگشت به صفحه اصلی
          </button>
          <button
            onClick={() => window.print()}
            className="px-5 py-2.5 bg-white border border-gray-300 hover:bg-gray-50 text-gray-700 rounded-lg transition duration-200"
          >
            چاپ نتایج
          </button>
        </div>
      </div>
    </div>
  );
};

export default ExamResults;