// import { useState, useEffect } from 'react';
// import { useParams, useNavigate } from 'react-router-dom';
// import { FiPlus, FiEdit2, FiTrash2, FiSave, FiX, FiCheckCircle } from 'react-icons/fi';

// const QuestionsManagement = () => {
//   const { examId } = useParams();
//   const navigate = useNavigate();
  
//   // حالت‌های کامپوننت
//   const [questions, setQuestions] = useState([]);
//   const [isLoading, setIsLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [isEditing, setIsEditing] = useState(false);
//   const [currentQuestion, setCurrentQuestion] = useState(null);
//   const [showForm, setShowForm] = useState(false);

//   // دریافت سوالات از سرور
//   useEffect(() => {
//     const fetchQuestions = async () => {
//       try {
//         setIsLoading(true);
//         // در حالت واقعی:
//         // const response = await fetch(`/api/exams/${examId}/questions`);
//         // const data = await response.json();
        
//         // داده‌های نمونه
//         const mockData = [
//           {
//             id: 1,
//             exam_id: examId,
//             question_text: 'کدام گزینه درباره React صحیح است؟',
//             options: [
//               { id: 1, text: 'یک کتابخانه جاوااسکریپت است', is_correct: true },
//               { id: 2, text: 'یک فریمورک PHP است', is_correct: false },
//               { id: 3, text: 'یک زبان برنامه نویسی است', is_correct: false },
//               { id: 4, text: 'یک سیستم مدیریت پایگاه داده است', is_correct: false }
//             ],
//             points: 2
//           },
//           {
//             id: 2,
//             exam_id: examId,
//             question_text: 'کدام روش برای ایجاد کامپوننت در React استفاده نمی‌شود؟',
//             options: [
//               { id: 5, text: 'کلاس‌های ES6', is_correct: false },
//               { id: 6, text: 'توابع arrow', is_correct: false },
//               { id: 7, text: 'توابع عادی', is_correct: true },
//               { id: 8, text: 'توابع با حالت', is_correct: false }
//             ],
//             points: 3
//           }
//         ];
        
//         setQuestions(mockData);
//         setIsLoading(false);
//       } catch (err) {
//         setError('خطا در دریافت سوالات');
//         setIsLoading(false);
//         console.error('Error fetching questions:', err);
//       }
//     };
    
//     fetchQuestions();
//   }, [examId]);

//   // توابع CRUD
//   const handleCreate = () => {
//     setCurrentQuestion({
//       question_text: '',
//       options: [
//         { id: Date.now() + 1, text: '', is_correct: false },
//         { id: Date.now() + 2, text: '', is_correct: false },
//         { id: Date.now() + 3, text: '', is_correct: false },
//         { id: Date.now() + 4, text: '', is_correct: false }
//       ],
//       points: 1
//     });
//     setIsEditing(false);
//     setShowForm(true);
//   };

//   const handleEdit = (question) => {
//     setCurrentQuestion(question);
//     setIsEditing(true);
//     setShowForm(true);
//   };

//   const handleDelete = async (id) => {
//     if (window.confirm('آیا از حذف این سوال اطمینان دارید؟')) {
//       try {
//         // در حالت واقعی:
//         // await fetch(`/api/questions/${id}`, { method: 'DELETE' });
//         setQuestions(questions.filter(q => q.id !== id));
//       } catch (err) {
//         setError('خطا در حذف سوال');
//         console.error('Error deleting question:', err);
//       }
//     }
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     const formData = new FormData(e.target);
//     const questionData = {
//       question_text: formData.get('question_text'),
//       points: parseInt(formData.get('points')),
//       options: currentQuestion.options
//     };

//     try {
//       if (isEditing) {
//         // در حالت واقعی:
//         // const response = await fetch(`/api/questions/${currentQuestion.id}`, {
//         //   method: 'PUT',
//         //   headers: { 'Content-Type': 'application/json' },
//         //   body: JSON.stringify(questionData)
//         // });
//         // const updatedQuestion = await response.json();
        
//         setQuestions(questions.map(q => 
//           q.id === currentQuestion.id ? { ...q, ...questionData } : q
//         ));
//       } else {
//         // در حالت واقعی:
//         // const response = await fetch(`/api/exams/${examId}/questions`, {
//         //   method: 'POST',
//         //   headers: { 'Content-Type': 'application/json' },
//         //   body: JSON.stringify(questionData)
//         // });
//         // const newQuestion = await response.json();
        
//         const newQuestion = {
//           ...questionData,
//           id: Math.max(...questions.map(q => q.id), 0) + 1,
//           exam_id: examId
//         };
        
//         setQuestions([...questions, newQuestion]);
//       }
      
//       setShowForm(false);
//     } catch (err) {
//       setError(`خطا در ${isEditing ? 'ویرایش' : 'ایجاد'} سوال`);
//       console.error(`Error ${isEditing ? 'updating' : 'creating'} question:`, err);
//     }
//   };

//   // مدیریت گزینه‌ها
//   const handleOptionChange = (optionId, field, value) => {
//     setCurrentQuestion(prev => ({
//       ...prev,
//       options: prev.options.map(opt => 
//         opt.id === optionId ? { ...opt, [field]: field === 'is_correct' ? value === 'true' : value } : opt
//       )
//     }));
//   };

//   const selectCorrectOption = (optionId) => {
//     setCurrentQuestion(prev => ({
//       ...prev,
//       options: prev.options.map(opt => ({
//         ...opt,
//         is_correct: opt.id === optionId
//       }))
//     }));
//   };

//   if (isLoading) {
//     return (
//       <div className="flex justify-center items-center h-64">
//         <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
//       </div>
//     );
//   }

//   if (error) {
//     return (
//       <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-6">
//         <div className="flex">
//           <div className="flex-shrink-0">
//             <svg className="h-5 w-5 text-red-500" viewBox="0 0 20 20" fill="currentColor">
//               <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
//             </svg>
//           </div>
//           <div className="ml-3">
//             <p className="text-sm text-red-700">{error}</p>
//           </div>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="container mx-auto px-4 py-8">
//       <div className="flex justify-between items-center mb-8">
//         <h1 className="text-2xl font-bold text-gray-800">مدیریت سوالات چهار گزینه‌ای</h1>
//         <button
//           onClick={handleCreate}
//           className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg flex items-center"
//         >
//           <FiPlus className="ml-1" />
//           افزودن سوال جدید
//         </button>
//       </div>

//       {/* فرم ایجاد/ویرایش سوال */}
//       {showForm && (
//         <div className="bg-white rounded-lg shadow-md p-6 mb-8">
//           <h2 className="text-xl font-bold mb-4">
//             {isEditing ? 'ویرایش سوال' : 'ایجاد سوال جدید'}
//           </h2>
//           <form onSubmit={handleSubmit}>
//             <div className="mb-6">
//               <label className="block text-gray-700 mb-2">متن سوال*</label>
//               <textarea
//                 name="question_text"
//                 value={currentQuestion?.question_text || ''}
//                 onChange={(e) => setCurrentQuestion({...currentQuestion, question_text: e.target.value})}
//                 className="w-full px-3 py-2 border border-gray-300 rounded-lg"
//                 rows="3"
//                 required
//               />
//             </div>

//             <div className="mb-6">
//               <label className="block text-gray-700 mb-2">گزینه‌ها*</label>
//               <div className="space-y-3">
//                 {currentQuestion?.options?.map((option, index) => (
//                   <div key={option.id} className="flex items-center gap-3">
//                     <button
//                       type="button"
//                       onClick={() => selectCorrectOption(option.id)}
//                       className={`flex-shrink-0 w-6 h-6 rounded-full border-2 flex items-center justify-center ${option.is_correct ? 'border-green-500 bg-green-100' : 'border-gray-300'}`}
//                     >
//                       {option.is_correct && <FiCheckCircle className="text-green-500" />}
//                     </button>
//                     <input
//                       type="text"
//                       value={option.text}
//                       onChange={(e) => handleOptionChange(option.id, 'text', e.target.value)}
//                       className="flex-grow px-3 py-2 border border-gray-300 rounded-lg"
//                       placeholder={`گزینه ${index + 1}`}
//                       required
//                     />
//                   </div>
//                 ))}
//               </div>
//               <p className="text-sm text-gray-500 mt-2">برای انتخاب پاسخ صحیح روی دایره مقابل هر گزینه کلیک کنید</p>
//             </div>

//             <div className="mb-6">
//               <label className="block text-gray-700 mb-2">نمره سوال*</label>
//               <input
//                 type="number"
//                 name="points"
//                 min="1"
//                 value={currentQuestion?.points || 1}
//                 onChange={(e) => setCurrentQuestion({...currentQuestion, points: parseInt(e.target.value)})}
//                 className="w-full px-3 py-2 border border-gray-300 rounded-lg"
//                 required
//               />
//             </div>

//             <div className="flex justify-end space-x-3">
//               <button
//                 type="button"
//                 onClick={() => setShowForm(false)}
//                 className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded-lg flex items-center"
//               >
//                 <FiX className="ml-1" />
//                 انصراف
//               </button>
//               <button
//                 type="submit"
//                 className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg flex items-center"
//               >
//                 <FiSave className="ml-1" />
//                 {isEditing ? 'ذخیره تغییرات' : 'ایجاد سوال'}
//               </button>
//             </div>
//           </form>
//         </div>
//       )}

//       {/* لیست سوالات */}
//       <div className="bg-white rounded-lg shadow-md overflow-hidden">
//         {questions.length === 0 ? (
//           <div className="text-center py-12">
//             <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
//             </svg>
//             <h3 className="mt-2 text-lg font-medium text-gray-900">سوالی یافت نشد</h3>
//             <p className="mt-1 text-sm text-gray-500">برای شروع یک سوال جدید ایجاد کنید.</p>
//             <div className="mt-6">
//               <button
//                 onClick={handleCreate}
//                 className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
//               >
//                 <FiPlus className="-mr-1 ml-2 h-5 w-5" />
//                 افزودن سوال جدید
//               </button>
//             </div>
//           </div>
//         ) : (
//           <ul className="divide-y divide-gray-200">
//             {questions.map((question, index) => (
//               <li key={question.id} className="hover:bg-gray-50">
//                 <div className="px-4 py-4 sm:px-6">
//                   <div className="flex items-center justify-between">
//                     <div>
//                       <h3 className="text-lg font-medium">
//                         <span className="text-gray-500">سوال {index + 1}:</span> {question.question_text}
//                       </h3>
//                       <div className="mt-2 grid grid-cols-1 md:grid-cols-2 gap-2">
//                         {question.options.map((option, optIndex) => (
//                           <div key={option.id} className="flex items-center">
//                             <span className={`inline-flex items-center justify-center w-6 h-6 rounded-full mr-2 ${option.is_correct ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}`}>
//                               {String.fromCharCode(97 + optIndex).toUpperCase()}
//                             </span>
//                             <span className={option.is_correct ? 'font-medium text-green-700' : ''}>
//                               {option.text}
//                             </span>
//                           </div>
//                         ))}
//                       </div>
//                     </div>
//                     <div className="flex items-center space-x-2">
//                       <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded">
//                         {question.points} نمره
//                       </span>
//                     </div>
//                   </div>
//                   <div className="mt-4 flex justify-end space-x-2">
//                     <button
//                       onClick={() => handleEdit(question)}
//                       className="text-indigo-600 hover:text-indigo-900 flex items-center"
//                     >
//                       <FiEdit2 className="ml-1" />
//                       ویرایش
//                     </button>
//                     <button
//                       onClick={() => handleDelete(question.id)}
//                       className="text-red-600 hover:text-red-900 flex items-center"
//                     >
//                       <FiTrash2 className="ml-1" />
//                       حذف
//                     </button>
//                   </div>
//                 </div>
//               </li>
//             ))}
//           </ul>
//         )}
//       </div>
//     </div>
//   );
// };

// export default QuestionsManagement;


// import { useState, useEffect } from 'react';
// import { useParams, useNavigate } from 'react-router-dom';
// import { FiPlus, FiEdit2, FiTrash2, FiSave, FiX, FiCheckCircle } from 'react-icons/fi';
// import axios from 'axios';

// const QuestionsManagement = () => {
//   const { examId } = useParams();
//   const navigate = useNavigate();
  
//   // حالت‌های کامپوننت
//   const [questions, setQuestions] = useState([]);
//   const [isLoading, setIsLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [isEditing, setIsEditing] = useState(false);
//   const [currentQuestion, setCurrentQuestion] = useState(null);
//   const [showForm, setShowForm] = useState(false);

//   // دریافت سوالات از API
//   useEffect(() => {
//     const fetchQuestions = async () => {
//       try {
//         setIsLoading(true);
//         setError(null);
        
//         const response = await axios.get(`https://localhost:7136/AllSampleQuestionDTO`);
//         setQuestions(response.data || []);
//       } catch (err) {
//         setError('خطا در دریافت سوالات');
//         console.error('Error fetching questions:', err.response?.data || err.message);
//       } finally {
//         setIsLoading(false);
//       }
//     };
    
//     fetchQuestions();
//   }, []);
// console.log(questions)
//   // ایجاد سوال جدید
//   const handleCreate = () => {
//     setCurrentQuestion({
//       question_text: '',
//       options: [
//         { id: Date.now() + 1, text: '', is_correct: false },
//         { id: Date.now() + 2, text: '', is_correct: false },
//         { id: Date.now() + 3, text: '', is_correct: false },
//         { id: Date.now() + 4, text: '', is_correct: false }
//       ],
//       points: 1,
//       exam_id: parseInt(examId)
//     });
//     setIsEditing(false);
//     setShowForm(true);
//     setError(null);
//   };

//   // ویرایش سوال
//   const handleEdit = (question) => {
//     if (!question) {
//       setError('سوال انتخاب شده نامعتبر است');
//       return;
//     }
    
//     setCurrentQuestion({ ...question });
//     setIsEditing(true);
//     setShowForm(true);
//     setError(null);
//   };

//   // حذف سوال
//   const handleDelete = async (id) => {
//     if (!id) {
//       setError('شناسه سوال نامعتبر است');
//       return;
//     }

//     if (!window.confirm('آیا از حذف این سوال اطمینان دارید؟')) return;

//     try {
//       await axios.delete(`https://localhost:7136/api/Questions/${id}`);
//       setQuestions(prev => prev.filter(q => q.id !== id));
//       setError(null);
//     } catch (err) {
//       setError('خطا در حذف سوال');
//       console.error('Error deleting question:', err.response?.data || err.message);
//     }
//   };

//   // ارسال فرم
//   const handleSubmit = async (e) => {
//     e.preventDefault();
    
//     // اعتبارسنجی حداقل یک گزینه صحیح
//     const hasCorrectAnswer = currentQuestion.options.some(opt => opt.is_correct);
//     if (!hasCorrectAnswer) {
//       setError('حداقل یک گزینه باید به عنوان پاسخ صحیح انتخاب شود');
//       return;
//     }

//     // اعتبارسنجی متن گزینه‌ها
//     const hasEmptyOptions = currentQuestion.options.some(opt => !opt.text.trim());
//     if (hasEmptyOptions) {
//       setError('متن تمام گزینه‌ها باید تکمیل شود');
//       return;
//     }

//     const questionData = {
//       exam_id: parseInt(examId),
//       question_text: currentQuestion.question_text.trim(),
//       points: currentQuestion.points || 1,
//       options: currentQuestion.options.map(opt => ({
//         text: opt.text.trim(),
//         is_correct: opt.is_correct
//       }))
//     };

//     try {
//       if (isEditing) {
//         // ویرایش سوال موجود
//         const response = await axios.put(
//           `https://localhost:7136/api/Questions/${currentQuestion.id}`,
//           questionData
//         );
//         setQuestions(prev => 
//           prev.map(q => q.id === currentQuestion.id ? response.data : q)
//         );
//       } else {
//         // ایجاد سوال جدید
//         const response = await axios.post(
//           'https://localhost:7136/api/Questions',
//           questionData
//         );
//         setQuestions(prev => [...prev, response.data]);
//       }
      
//       setShowForm(false);
//       setError(null);
//     } catch (err) {
//       const errorMessage = err.response?.data?.message || 
//                          err.response?.data?.title || 
//                          `خطا در ${isEditing ? 'ویرایش' : 'ایجاد'} سوال`;
//       setError(errorMessage);
//       console.error(`Error ${isEditing ? 'updating' : 'creating'} question:`, err);
//     }
//   };

//   // مدیریت گزینه‌ها
//   const handleOptionChange = (optionId, field, value) => {
//     setCurrentQuestion(prev => ({
//       ...prev,
//       options: prev.options.map(opt => 
//         opt.id === optionId ? { 
//           ...opt, 
//           [field]: field === 'is_correct' ? value === 'true' : value 
//         } : opt
//       )
//     }));
//   };

//   const selectCorrectOption = (optionId) => {
//     setCurrentQuestion(prev => ({
//       ...prev,
//       options: prev.options.map(opt => ({
//         ...opt,
//         is_correct: opt.id === optionId
//       }))
//     }));
//   };

//   // نمایش وضعیت بارگذاری
//   if (isLoading) {
//     return (
//       <div className="flex justify-center items-center h-64">
//         <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
//       </div>
//     );
//   }

//   return (
//     <div className="container mx-auto px-4 py-8">
//       <div className="flex justify-between items-center mb-8">
//         <h1 className="text-2xl font-bold text-gray-800">مدیریت سوالات چهار گزینه‌ای</h1>
//         <button
//           onClick={handleCreate}
//           className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg flex items-center transition-colors"
//         >
//           <FiPlus className="ml-1" />
//           افزودن سوال جدید
//         </button>
//       </div>

//       {/* نمایش خطا */}
//       {error && (
//         <div className="bg-red-100 border-l-4 border-red-500 p-4 mb-6">
//           <div className="flex items-center">
//             <div className="flex-shrink-0">
//               <svg className="h-5 w-5 text-red-500" viewBox="0 0 20 20" fill="currentColor">
//                 <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
//               </svg>
//             </div>
//             <div className="ml-3">
//               <p className="text-sm text-red-700">{error}</p>
//             </div>
//           </div>
//         </div>
//       )}

//       {/* فرم ایجاد/ویرایش سوال */}
//       {showForm && (
//         <div className="bg-white rounded-lg shadow-md p-6 mb-8">
//           <h2 className="text-xl font-bold mb-4">
//             {isEditing ? 'ویرایش سوال' : 'ایجاد سوال جدید'}
//           </h2>
//           <form onSubmit={handleSubmit}>
//             <div className="mb-6">
//               <label className="block text-gray-700 mb-2">متن سوال*</label>
//               <textarea
//                 name="question_text"
//                 value={currentQuestion?.question_text || ''}
//                 onChange={(e) => setCurrentQuestion({
//                   ...currentQuestion, 
//                   question_text: e.target.value
//                 })}
//                 className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-200 focus:border-indigo-500"
//                 rows="3"
//                 required
//                 maxLength={500}
//               />
//             </div>

//             <div className="mb-6">
//               <label className="block text-gray-700 mb-2">گزینه‌ها*</label>
//               <div className="space-y-3">
//                 {currentQuestion?.options?.map((option, index) => (
//                   <div key={option.id} className="flex items-center gap-3">
//                     <button
//                       type="button"
//                       onClick={() => selectCorrectOption(option.id)}
//                       className={`flex-shrink-0 w-6 h-6 rounded-full border-2 flex items-center justify-center transition-colors ${
//                         option.is_correct ? 'border-green-500 bg-green-100' : 'border-gray-300 hover:border-gray-400'
//                       }`}
//                     >
//                       {option.is_correct && <FiCheckCircle className="text-green-500" />}
//                     </button>
//                     <input
//                       type="text"
//                       value={option.text}
//                       onChange={(e) => handleOptionChange(option.id, 'text', e.target.value)}
//                       className="flex-grow px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-200 focus:border-indigo-500"
//                       placeholder={`گزینه ${index + 1}`}
//                       required
//                       maxLength={200}
//                     />
//                   </div>
//                 ))}
//               </div>
//               <p className="text-sm text-gray-500 mt-2">
//                 برای انتخاب پاسخ صحیح روی دایره مقابل هر گزینه کلیک کنید
//               </p>
//             </div>

//             <div className="mb-6">
//               <label className="block text-gray-700 mb-2">نمره سوال*</label>
//               <input
//                 type="number"
//                 name="points"
//                 min="1"
//                 max="10"
//                 value={currentQuestion?.points || 1}
//                 onChange={(e) => setCurrentQuestion({
//                   ...currentQuestion, 
//                   points: parseInt(e.target.value) || 1
//                 })}
//                 className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-200 focus:border-indigo-500"
//                 required
//               />
//             </div>

//             <div className="flex justify-end space-x-3">
//               <button
//                 type="button"
//                 onClick={() => setShowForm(false)}
//                 className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded-lg flex items-center transition-colors"
//               >
//                 <FiX className="ml-1" />
//                 انصراف
//               </button>
//               <button
//                 type="submit"
//                 className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg flex items-center transition-colors"
//               >
//                 <FiSave className="ml-1" />
//                 {isEditing ? 'ذخیره تغییرات' : 'ایجاد سوال'}
//               </button>
//             </div>
//           </form>
//         </div>
//       )}

//       {/* لیست سوالات */}
//       <div className="bg-white rounded-lg shadow-md overflow-hidden">
//         {questions.length === 0 ? (
//           <div className="text-center py-12">
//             <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
//             </svg>
//             <h3 className="mt-2 text-lg font-medium text-gray-900">سوالی یافت نشد</h3>
//             <p className="mt-1 text-sm text-gray-500">برای شروع یک سوال جدید ایجاد کنید.</p>
//             <div className="mt-6">
//               <button
//                 onClick={handleCreate}
//                 className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors"
//               >
//                 <FiPlus className="-mr-1 ml-2 h-5 w-5" />
//                 افزودن سوال جدید
//               </button>
//             </div>
//           </div>
//         ) : (
//           <ul className="divide-y divide-gray-200">
//             {questions.map((question) => (
//               <li key={question.sampleQuestionId} className="hover:bg-gray-50 transition-colors">
//                 <div className="px-4 py-4 sm:px-6">
//                   <div className="flex items-center justify-between">
//                     <div>
//                       <h3 className="text-lg font-medium">
//                         <span className="text-gray-500">سوال {question.sampleQuestionId}:</span> {question.questionText}
//                       </h3>
//                       <div className="mt-2 grid grid-cols-1 md:grid-cols-2 gap-2">
//                         {question.options.map((option, optIndex) => (
//                           <div key={option.id} className="flex items-center">
//                             <span className={`inline-flex items-center justify-center w-6 h-6 rounded-full mr-2 transition-colors ${
//                               option.is_correct ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
//                             }`}>
//                               {String.fromCharCode(97 + optIndex).toUpperCase()}
//                             </span>
//                             <span className={option.is_correct ? 'font-medium text-green-700' : ''}>
//                               {option.text}
//                             </span>
//                           </div>
//                         ))}
//                       </div>
//                     </div>
//                     <div className="flex items-center space-x-2">
//                       <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded">
//                         {question.courseSubcategoryId} کد زیر دوره مربوطه
//                       </span>
//                     </div>
//                   </div>
//                   <div className="mt-4 flex justify-end space-x-2">
//                     <button
//                       onClick={() => handleEdit(question)}
//                       className="text-indigo-600 hover:text-indigo-900 flex items-center transition-colors"
//                     >
//                       <FiEdit2 className="ml-1" />
//                       ویرایش
//                     </button>
//                     <button
//                       onClick={() => handleDelete(question.sampleQuestionId)}
//                       className="text-red-600 hover:text-red-900 flex items-center transition-colors"
//                     >
//                       <FiTrash2 className="ml-1" />
//                       حذف
//                     </button>
//                   </div>
//                 </div>
//               </li>
//             ))}
//           </ul>
//         )}
//       </div>
//     </div>
//   );
// };


// export default QuestionsManagement;


//==================================


import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { FiPlus, FiEdit2, FiTrash2, FiSave, FiX, FiCheckCircle } from 'react-icons/fi';
import axios from 'axios';

const QuestionsManagement = () => {
  const { examId } = useParams();
  const navigate = useNavigate();
  
  // حالت‌های کامپوننت
  const [questions, setQuestions] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(null);
  const [showForm, setShowForm] = useState(false);

  // دریافت سوالات از API
  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        setIsLoading(true);
        setError(null);
        
        const response = await axios.get(`https://examui.jamejampc.ir/api/SampleQuestion/AllSampleQuestionDTO`);
        setQuestions(response.data || []);
      } catch (err) {
        setError('خطا در دریافت سوالات');
        console.error('Error fetching questions:', err.response?.data || err.message);
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchQuestions();
  }, []);
// console.log(questions)
  // ایجاد سوال جدید
  const handleCreate = () => {
    setCurrentQuestion({
      questionText: '',
      answer:'',
      option1: '',
      option2: '',
      option3: '',
      option4: '',
      correctOptionIndex: 0,
      courseSubcategoryId: null,
      
    });
    setIsEditing(false);
    setShowForm(true);
    setError(null);
  };

  // ویرایش سوال
  const handleEdit = (question) => {
    if (!question) {
      setError('سوال انتخاب شده نامعتبر است');
      return;
    }
    
    setCurrentQuestion({ ...question });
    setIsEditing(true);
    setShowForm(true);
    setError(null);
  };

  // حذف سوال
  const handleDelete = async (id) => {
    if (!id) {
      setError('شناسه سوال نامعتبر است');
      return;
    }

    if (!window.confirm('آیا از حذف این سوال اطمینان دارید؟')) return;

    try {
      await axios.delete(`https://examui.jamejampc.ir/api/SampleQuestion/Delete/${id}`);
      setQuestions(prev => prev.filter(q => q.sampleQuestionId !== id));
      setError(null);
    } catch (err) {
      setError('خطا در حذف سوال');
      console.error('Error deleting question:', err.response?.data || err.message);
    }
  };

  // ارسال فرم
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // اعتبارسنجی
    if (!currentQuestion.questionText?.trim()) {
      setError('متن سوال الزامی است');
      return;
    }

    if (!currentQuestion.option1?.trim() || 
        !currentQuestion.option2?.trim() || 
        !currentQuestion.option3?.trim() || 
        !currentQuestion.option4?.trim()) {
      setError('تمام گزینه‌ها باید تکمیل شوند');
      return;
    }

    if (currentQuestion.correctOptionIndex === null || currentQuestion.correctOptionIndex === undefined) {
      setError('پاسخ صحیح باید انتخاب شود');
      return;
    }

    const questionData = {
     sampleQuestionId:currentQuestion.sampleQuestionId,
      questionText: currentQuestion.questionText.trim(),
      answer: currentQuestion.answer.trim(),
      option1: currentQuestion.option1.trim(),
      option2: currentQuestion.option2.trim(),
      option3: currentQuestion.option3.trim(),
      option4: currentQuestion.option4.trim(),
      correctOptionIndex: currentQuestion.correctOptionIndex,
      courseSubcategoryId: currentQuestion.courseSubcategoryId,
      
    };

    try {
      if (isEditing) {
        // ویرایش سوال موجود
        const response = await axios.put(
          'https://examui.jamejampc.ir/api/SampleQuestion/Update',
          questionData
        );
        setQuestions(prev => 
          prev.map(q => q.sampleQuestionId === currentQuestion.sampleQuestionId ? response.data : q)
        );
      } else {
        // ایجاد سوال جدید
        const response = await axios.post(
          'https://examui.jamejampc.ir/api/SampleQuestion/Add',
          questionData
        );
        setQuestions(prev => [...prev, response.data]);
      }
      
      setShowForm(false);
      setError(null);
    } catch (err) {
      const errorMessage = err.response?.data?.message || 
                         err.response?.data?.title || 
                         `خطا در ${isEditing ? 'ویرایش' : 'ایجاد'} سوال`;
      setError(errorMessage);
      console.error(`Error ${isEditing ? 'updating' : 'creating'} question:`, err);
    }
  };

  // تغییر گزینه صحیح
  const handleCorrectOptionChange = (index) => {
    setCurrentQuestion(prev => ({
      ...prev,
      correctOptionIndex: index
    }));
  };

  // نمایش وضعیت بارگذاری
  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold text-gray-800">مدیریت سوالات چهار گزینه‌ای</h1>
        <button
          onClick={handleCreate}
          className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg flex items-center transition-colors"
        >
          <FiPlus className="ml-1" />
          افزودن سوال جدید
        </button>
      </div>

      {/* نمایش خطا */}
      {error && (
        <div className="bg-red-100 border-l-4 border-red-500 p-4 mb-6">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <svg className="h-5 w-5 text-red-500" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
              </svg>
            </div>
            <div className="ml-3">
              <p className="text-sm text-red-700">{error}</p>
            </div>
          </div>
        </div>
      )}

      {/* فرم ایجاد/ویرایش سوال */}
      {showForm && (
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <h2 className="text-xl font-bold mb-4">
            {isEditing ? 'ویرایش سوال' : 'ایجاد سوال جدید'}
          </h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-6">
              <label className="block text-gray-700 mb-2">متن سوال*</label>
              <textarea
                value={currentQuestion?.questionText || ''}
                onChange={(e) => setCurrentQuestion({
                  ...currentQuestion, 
                  questionText: e.target.value
                })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-200 focus:border-indigo-500"
                rows="3"
                required
                maxLength={700}
              />
            </div>

            <div className="mb-6">
              <label className="block text-gray-700 mb-2">گزینه‌ها*</label>
              <div className="space-y-3">
                {[1, 2, 3, 4].map((optionNum) => (
                  <div key={optionNum} className="flex items-center gap-3">
                    <button
                      type="button"
                      onClick={() => handleCorrectOptionChange(optionNum )}
                      className={`flex-shrink-0 w-6 h-6 rounded-full border-2 flex items-center justify-center transition-colors ${
                        currentQuestion?.correctOptionIndex === optionNum  
                          ? 'border-green-500 bg-green-100' 
                          : 'border-gray-300 hover:border-gray-400'
                      }`}
                    >
                      {currentQuestion?.correctOptionIndex === optionNum  && (
                        <FiCheckCircle className="text-green-500" />
                      )}
                    </button>
                    <input
                      type="text"
                      value={currentQuestion?.[`option${optionNum}`] || ''}
                      onChange={(e) => setCurrentQuestion({
                        ...currentQuestion,
                        [`option${optionNum}`]: e.target.value
                      })}
                      className="flex-grow px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-200 focus:border-indigo-500"
                      placeholder={`گزینه ${optionNum}`}
                      required
                      maxLength={200}
                    />
                  </div>
                ))}
              </div>
              <p className="text-sm text-gray-500 mt-2">
                برای انتخاب پاسخ صحیح روی دایره مقابل هر گزینه کلیک کنید
              </p>
            </div>
                {/* =============== */}

                 <div className="mb-6">
              <label className="block text-gray-700 mb-2">دسته‌بندی فرعی*</label>
              <input
                type="text"
                value={currentQuestion?.answer }
                onChange={(e) => setCurrentQuestion({
                  ...currentQuestion, 
                  answer: e.target.value ? e.target.value : null
                })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-200 focus:border-indigo-500"
                placeholder="جواب"
                required
              />
            </div>

            <div className="mb-6">
              <label className="block text-gray-700 mb-2">دسته‌بندی فرعی*</label>
              <input
                type="number"
                value={currentQuestion?.courseSubcategoryId || ''}
                onChange={(e) => setCurrentQuestion({
                  ...currentQuestion, 
                  courseSubcategoryId: e.target.value ? parseInt(e.target.value) : null
                })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-200 focus:border-indigo-500"
                placeholder="شناسه دسته‌بندی فرعی "
                required
              />
            </div>

            <div className="flex justify-end space-x-3">
              <button
                type="button"
                onClick={() => setShowForm(false)}
                className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded-lg flex items-center transition-colors"
              >
                <FiX className="ml-1" />
                انصراف
              </button>
              <button
                type="submit"
                className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg flex items-center transition-colors"
              >
                <FiSave className="ml-1" />
                {isEditing ? 'ذخیره تغییرات' : 'ایجاد سوال'}
              </button>
            </div>
          </form>
        </div>
      )}

      {/* لیست سوالات */}
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        {questions.length === 0 ? (
          <div className="text-center py-12">
            <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <h3 className="mt-2 text-lg font-medium text-gray-900">سوالی یافت نشد</h3>
            <p className="mt-1 text-sm text-gray-500">برای شروع یک سوال جدید ایجاد کنید.</p>
            <div className="mt-6">
              <button
                onClick={handleCreate}
                className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors"
              >
                <FiPlus className="-mr-1 ml-2 h-5 w-5" />
                افزودن سوال جدید
              </button>
            </div>
          </div>
        ) : (
          <ul className="divide-y divide-gray-200">
            {questions.map((question) => (
              <li key={question.sampleQuestionId} className="hover:bg-gray-50 transition-colors">
                <div className="px-4 py-4 sm:px-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-lg font-medium">
                        <span className="text-gray-500">سوال {question.sampleQuestionId}:</span> {question.questionText}
                      </h3>
                      <div className="mt-2 grid grid-cols-1 md:grid-cols-2 gap-2">
                        {[1, 2, 3, 4].map((optNum) => (
                          <div key={optNum} className="flex items-center">
                            <span className={`inline-flex items-center justify-center w-6 h-6 rounded-full mr-2 transition-colors ${
                              question.correctOptionIndex === optNum - 1 
                                ? 'bg-green-100 text-green-800' 
                                : 'bg-gray-100 text-gray-800'
                            }`}>
                              {String.fromCharCode(96 + optNum).toUpperCase()}
                            </span>
                            <span className={question.correctOptionIndex === optNum ? 'font-medium text-green-700' : ''}>
                              {question[`option${optNum}`]}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      {question.courseSubcategoryId && (
                        <span className="bg-purple-100 text-purple-800 text-xs font-medium px-2.5 py-0.5 rounded">
                          دسته‌بندی: {question.courseSubcategoryId}
                        </span>
                      )}
                    </div>
                  </div>
                  <div className="mt-4 flex justify-end space-x-2">
                    <button
                      onClick={() => handleEdit(question)}
                      className="text-indigo-600 hover:text-indigo-900 flex items-center transition-colors"
                    >
                      <FiEdit2 className="ml-1" />
                      ویرایش
                    </button>
                    <button
                      onClick={() => handleDelete(question.sampleQuestionId)}
                      className="text-red-600 hover:text-red-900 flex items-center transition-colors"
                    >
                      <FiTrash2 className="ml-1" />
                      حذف
                    </button>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default QuestionsManagement;