// import { useState, useEffect } from 'react';
// import { useParams, useNavigate } from 'react-router-dom';
// import { FiPlus, FiEdit2, FiTrash2, FiSave, FiX, FiChevronDown, FiChevronUp } from 'react-icons/fi';

// const SubCoursesManagement = () => {
//   const { courseId } = useParams();
//   const navigate = useNavigate();
  
//   // حالت‌های کامپوننت
//   const [subCourses, setSubCourses] = useState([]);
//   const [isLoading, setIsLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [isEditing, setIsEditing] = useState(false);
//   const [currentSubCourse, setCurrentSubCourse] = useState(null);
//   const [showForm, setShowForm] = useState(false);
//   const [expandedSubCourse, setExpandedSubCourse] = useState(null);

//   // داده‌های نمونه (در حالت واقعی از API دریافت می‌شود)
//   useEffect(() => {
//     const fetchSubCourses = async () => {
//       try {
//         setIsLoading(true);
//         // در حالت واقعی اینجا باید API را فراخوانی کنید
//         // const response = await fetch(`/api/courses/${courseId}/sub-courses`);
//         // const data = await response.json();
        
//         // داده‌های نمونه برای نمایش
//         const mockData = [
//           {
//             id: 1,
//             title: 'مبانی برنامه نویسی',
//             description: 'آشنایی با مفاهیم پایه برنامه نویسی',
//             duration: 8,
//             order: 1,
//             lessons: [
//               { id: 1, title: 'متغیرها و انواع داده', duration: 45 },
//               { id: 2, title: 'ساختارهای کنترلی', duration: 60 }
//             ]
//           },
//           {
//             id: 2,
//             title: 'برنامه نویسی شیءگرا',
//             description: 'آموزش مفاهیم OOP',
//             duration: 12,
//             order: 2,
//             lessons: [
//               { id: 3, title: 'کلاس‌ها و اشیاء', duration: 50 },
//               { id: 4, title: 'وراثت و چندریختی', duration: 70 }
//             ]
//           }
//         ];
        
//         setSubCourses(mockData);
//         setIsLoading(false);
//       } catch (err) {
//         setError('خطا در دریافت زیردوره‌ها');
//         setIsLoading(false);
//         console.error('Error fetching sub-courses:', err);
//       }
//     };
    
//     fetchSubCourses();
//   }, [courseId]);

//   // توابع CRUD
//   const handleCreate = () => {
//     setCurrentSubCourse({
//       title: '',
//       description: '',
//       duration: 0,
//       order: subCourses.length + 1,
//       lessons: []
//     });
//     setIsEditing(false);
//     setShowForm(true);
//   };

//   const handleEdit = (subCourse) => {
//     setCurrentSubCourse(subCourse);
//     setIsEditing(true);
//     setShowForm(true);
//   };

//   const handleDelete = async (id) => {
//     if (window.confirm('آیا از حذف این زیردوره اطمینان دارید؟')) {
//       try {
//         // در حالت واقعی اینجا باید API را فراخوانی کنید
//         // await fetch(`/api/sub-courses/${id}`, { method: 'DELETE' });
//         setSubCourses(subCourses.filter(sc => sc.id !== id));
//       } catch (err) {
//         setError('خطا در حذف زیردوره');
//         console.error('Error deleting sub-course:', err);
//       }
//     }
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     const formData = new FormData(e.target);
//     const subCourseData = {
//       title: formData.get('title'),
//       description: formData.get('description'),
//       duration: parseInt(formData.get('duration')),
//       order: parseInt(formData.get('order')),
//       lessons: currentSubCourse.lessons || []
//     };

//     try {
//       if (isEditing) {
//         // در حالت واقعی اینجا باید API را فراخوانی کنید
//         // const response = await fetch(`/api/sub-courses/${currentSubCourse.id}`, {
//         //   method: 'PUT',
//         //   headers: { 'Content-Type': 'application/json' },
//         //   body: JSON.stringify(subCourseData)
//         // });
//         // const updatedSubCourse = await response.json();
        
//         setSubCourses(subCourses.map(sc => 
//           sc.id === currentSubCourse.id ? { ...sc, ...subCourseData } : sc
//         ));
//       } else {
//         // در حالت واقعی اینجا باید API را فراخوانی کنید
//         // const response = await fetch(`/api/courses/${courseId}/sub-courses`, {
//         //   method: 'POST',
//         //   headers: { 'Content-Type': 'application/json' },
//         //   body: JSON.stringify(subCourseData)
//         // });
//         // const newSubCourse = await response.json();
        
//         const newSubCourse = {
//           ...subCourseData,
//           id: Math.max(...subCourses.map(sc => sc.id), 0) + 1,
//           lessons: []
//         };
        
//         setSubCourses([...subCourses, newSubCourse]);
//       }
      
//       setShowForm(false);
//     } catch (err) {
//       setError(`خطا در ${isEditing ? 'ویرایش' : 'ایجاد'} زیردوره`);
//       console.error(`Error ${isEditing ? 'updating' : 'creating'} sub-course:`, err);
//     }
//   };

//   // مدیریت دروس هر زیردوره
//   const handleAddLesson = (subCourseId) => {
//     setSubCourses(subCourses.map(sc => {
//       if (sc.id === subCourseId) {
//         return {
//           ...sc,
//           lessons: [
//             ...sc.lessons,
//             { id: Math.max(...sc.lessons.map(l => l.id), 0) + 1, title: '', duration: 0 }
//           ]
//         };
//       }
//       return sc;
//     }));
//   };

//   const handleRemoveLesson = (subCourseId, lessonId) => {
//     setSubCourses(subCourses.map(sc => {
//       if (sc.id === subCourseId) {
//         return {
//           ...sc,
//           lessons: sc.lessons.filter(l => l.id !== lessonId)
//         };
//       }
//       return sc;
//     }));
//   };

//   const handleLessonChange = (subCourseId, lessonId, field, value) => {
//     setSubCourses(subCourses.map(sc => {
//       if (sc.id === subCourseId) {
//         return {
//           ...sc,
//           lessons: sc.lessons.map(l => 
//             l.id === lessonId ? { ...l, [field]: value } : l
//           )
//         };
//       }
//       return sc;
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
//         <h1 className="text-2xl font-bold text-gray-800">مدیریت زیردوره‌ها</h1>
//         <button
//           onClick={handleCreate}
//           className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg flex items-center"
//         >
//           <FiPlus className="ml-1" />
//           افزودن زیردوره جدید
//         </button>
//       </div>

//       {/* فرم ایجاد/ویرایش زیردوره */}
//       {showForm && (
//         <div className="bg-white rounded-lg shadow-md p-6 mb-8">
//           <h2 className="text-xl font-bold mb-4">
//             {isEditing ? 'ویرایش زیردوره' : 'ایجاد زیردوره جدید'}
//           </h2>
//           <form onSubmit={handleSubmit}>
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
//               <div>
//                 <label className="block text-gray-700 mb-2">عنوان زیردوره*</label>
//                 <input
//                   type="text"
//                   name="title"
//                   defaultValue={currentSubCourse?.title || ''}
//                   className="w-full px-3 py-2 border border-gray-300 rounded-lg"
//                   required
//                 />
//               </div>
//               <div>
//                 <label className="block text-gray-700 mb-2">ترتیب نمایش*</label>
//                 <input
//                   type="number"
//                   name="order"
//                   min="1"
//                   defaultValue={currentSubCourse?.order || subCourses.length + 1}
//                   className="w-full px-3 py-2 border border-gray-300 rounded-lg"
//                   required
//                 />
//               </div>
//               <div className="md:col-span-2">
//                 <label className="block text-gray-700 mb-2">توضیحات</label>
//                 <textarea
//                   name="description"
//                   defaultValue={currentSubCourse?.description || ''}
//                   className="w-full px-3 py-2 border border-gray-300 rounded-lg"
//                   rows="3"
//                 />
//               </div>
//               <div>
//                 <label className="block text-gray-700 mb-2">مدت زمان کل (ساعت)*</label>
//                 <input
//                   type="number"
//                   name="duration"
//                   min="0"
//                   step="0.5"
//                   defaultValue={currentSubCourse?.duration || 0}
//                   className="w-full px-3 py-2 border border-gray-300 rounded-lg"
//                   required
//                 />
//               </div>
//             </div>

//             {/* مدیریت دروس */}
//             <div className="mb-6">
//               <h3 className="text-lg font-semibold mb-3">مدیریت دروس</h3>
//               <div className="space-y-4">
//                 {currentSubCourse?.lessons?.map((lesson, index) => (
//                   <div key={lesson.id} className="bg-gray-50 p-4 rounded-lg">
//                     <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-3">
//                       <div>
//                         <label className="block text-gray-700 text-sm mb-1">عنوان درس {index + 1}*</label>
//                         <input
//                           type="text"
//                           value={lesson.title}
//                           onChange={(e) => handleLessonChange(currentSubCourse.id, lesson.id, 'title', e.target.value)}
//                           className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
//                           required
//                         />
//                       </div>
//                       <div>
//                         <label className="block text-gray-700 text-sm mb-1">مدت زمان (دقیقه)*</label>
//                         <input
//                           type="number"
//                           min="1"
//                           value={lesson.duration}
//                           onChange={(e) => handleLessonChange(currentSubCourse.id, lesson.id, 'duration', parseInt(e.target.value))}
//                           className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
//                           required
//                         />
//                       </div>
//                       <div className="flex items-end">
//                         <button
//                           type="button"
//                           onClick={() => handleRemoveLesson(currentSubCourse.id, lesson.id)}
//                           className="bg-red-100 hover:bg-red-200 text-red-600 px-3 py-2 rounded-lg text-sm"
//                         >
//                           <FiTrash2 className="inline ml-1" />
//                           حذف درس
//                         </button>
//                       </div>
//                     </div>
//                   </div>
//                 ))}
//                 <button
//                   type="button"
//                   onClick={() => handleAddLesson(currentSubCourse.id)}
//                   className="bg-gray-100 hover:bg-gray-200 text-gray-700 px-4 py-2 rounded-lg text-sm"
//                 >
//                   <FiPlus className="inline ml-1" />
//                   افزودن درس جدید
//                 </button>
//               </div>
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
//                 {isEditing ? 'ذخیره تغییرات' : 'ایجاد زیردوره'}
//               </button>
//             </div>
//           </form>
//         </div>
//       )}

//       {/* لیست زیردوره‌ها */}
//       <div className="bg-white rounded-lg shadow-md overflow-hidden">
//         {subCourses.length === 0 ? (
//           <div className="text-center py-12">
//             <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
//             </svg>
//             <h3 className="mt-2 text-lg font-medium text-gray-900">زیردوره‌ای یافت نشد</h3>
//             <p className="mt-1 text-sm text-gray-500">برای شروع یک زیردوره جدید ایجاد کنید.</p>
//             <div className="mt-6">
//               <button
//                 onClick={handleCreate}
//                 className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
//               >
//                 <FiPlus className="-mr-1 ml-2 h-5 w-5" />
//                 افزودن زیردوره جدید
//               </button>
//             </div>
//           </div>
//         ) : (
//           <ul className="divide-y divide-gray-200">
//             {subCourses.sort((a, b) => a.order - b.order).map(subCourse => (
//               <li key={subCourse.id} className="hover:bg-gray-50">
//                 <div className="px-4 py-4 sm:px-6">
//                   <div className="flex items-center justify-between">
//                     <div>
//                       <h3 className="text-lg font-medium text-indigo-600">{subCourse.title}</h3>
//                       <p className="text-sm text-gray-500 mt-1">{subCourse.description}</p>
//                     </div>
//                     <div className="flex items-center space-x-2">
//                       <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded">
//                         {subCourse.duration} ساعت
//                       </span>
//                       <span className="bg-green-100 text-green-800 text-xs font-medium px-2.5 py-0.5 rounded">
//                         {subCourse.lessons.length} درس
//                       </span>
//                       <button
//                         onClick={() => setExpandedSubCourse(expandedSubCourse === subCourse.id ? null : subCourse.id)}
//                         className="text-gray-500 hover:text-gray-700"
//                       >
//                         {expandedSubCourse === subCourse.id ? <FiChevronUp /> : <FiChevronDown />}
//                       </button>
//                     </div>
//                   </div>
//                   <div className="mt-2 flex justify-end space-x-2">
//                     <button
//                       onClick={() => handleEdit(subCourse)}
//                       className="text-indigo-600 hover:text-indigo-900"
//                     >
//                       <FiEdit2 className="inline ml-1" />
//                       ویرایش
//                     </button>
//                     <button
//                       onClick={() => handleDelete(subCourse.id)}
//                       className="text-red-600 hover:text-red-900"
//                     >
//                       <FiTrash2 className="inline ml-1" />
//                       حذف
//                     </button>
//                   </div>
                  
//                   {expandedSubCourse === subCourse.id && (
//                     <div className="mt-4 border-t border-gray-200 pt-4">
//                       <h4 className="font-medium text-gray-900 mb-2">دروس این زیردوره:</h4>
//                       <ul className="space-y-2">
//                         {subCourse.lessons.map(lesson => (
//                           <li key={lesson.id} className="flex justify-between items-center bg-gray-50 p-2 rounded">
//                             <span>{lesson.title}</span>
//                             <span className="text-sm text-gray-500">{lesson.duration} دقیقه</span>
//                           </li>
//                         ))}
//                       </ul>
//                     </div>
//                   )}
//                 </div>
//               </li>
//             ))}
//           </ul>
//         )}
//       </div>
//     </div>
//   );
// };

// export default SubCoursesManagement;

import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { FiPlus, FiEdit2, FiTrash2, FiSave, FiX, FiChevronDown, FiChevronUp } from 'react-icons/fi';
import axios from 'axios';

const SubCoursesManagement = () => {
//   const { courseId } = useParams();
  const navigate = useNavigate();
  
  // حالت‌های کامپوننت
  const [subCourses, setSubCourses] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [currentSubCourse, setCurrentSubCourse] = useState(null);
  const [showForm, setShowForm] = useState(false);
//   const [expandedSubCourse, setExpandedSubCourse] = useState(null);

  // دریافت زیردوره‌ها از API
  useEffect(() => {
    const fetchSubCourses = async () => {
      try {
        setIsLoading(true);
        setError(null);
        
        const response = await axios.get(`https://examui.jamejampc.ir/api/SubCourses/CourseSubcategoryDTO`);
        setSubCourses(response.data || []);
      } catch (err) {
        setError('خطا در دریافت زیردوره‌ها');
        console.error('Error fetching sub-courses:', err.response?.data || err.message);
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchSubCourses();
  }, []);
// console.log(subCourses)
  // ایجاد زیردوره جدید
  const handleCreate = () => {
    setCurrentSubCourse({
      title: '',
      description: '',
     courseId:''
    });
    setIsEditing(false);
    setShowForm(true);
    setError(null);
  };

  // ویرایش زیردوره
  const handleEdit = (subCourse) => {
    if (!subCourse) {
      setError('دوره انتخاب شده نامعتبر است');
      return;
    }
    
    setCurrentSubCourse({ ...subCourse });
    setIsEditing(true);
    setShowForm(true);
    setError(null);
  };

  // حذف زیردوره
  const handleDelete = async (id) => {
    if (!id) {
      setError('شناسه دوره نامعتبر است');
      return;
    }

    if (!window.confirm('آیا از حذف این زیردوره اطمینان دارید؟')) return;

    try {
      await axios.delete(`https://examui.jamejampc.ir/api/SubCourses/${id}`);
      setSubCourses(prev => prev.filter(sc => sc.id !== id));
      setError(null);
    } catch (err) {
      setError('خطا در حذف زیردوره');
      console.error('Error deleting sub-course:', err.response?.data || err.message);
    }
  };

  // ارسال فرم
  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
   
    const subCourseData = {
        courseSubcategoryId:currentSubCourse.courseSubcategoryId,
      courseId:  parseInt(formData.get('courseId')?.trim()),
      title: formData.get('title')?.trim(),
      description: formData.get('description')?.trim(),
     
    };
console.log(subCourseData)
    // اعتبارسنجی
    if (!subCourseData.title) {
      setError('عنوان زیردوره الزامی است');
      return;
    }
      if (!subCourseData.description) {
      setError('توضیحات زیردوره الزامی است');
      return;
    }
     if (!subCourseData.courseId) {
      setError('کددوره زیردوره الزامی است');
      return;
    }

    try {
      if (isEditing) {
        // ویرایش زیردوره موجود
        const response = await axios.put(
          `https://examui.jamejampc.ir/api/SubCourses/Update`,
          subCourseData
        );
        setSubCourses(prev => 
          prev.map(sc => sc.courseSubcategoryId === currentSubCourse.courseSubcategoryId ? response.data : sc)
        );
      } else {
        // ایجاد زیردوره جدید
        const response = await axios.post(
          'https://examui.jamejampc.ir/api/SubCourses',
          subCourseData
        );
        setSubCourses(prev => [...prev, response.data]);
      }
      
      setShowForm(false);
      setError(null);
    } catch (err) {
      const errorMessage = err.response?.data?.message || 
                         err.response?.data?.title || 
                         `خطا در ${isEditing ? 'ویرایش' : 'ایجاد'} زیردوره`;
      setError(errorMessage);
      console.error(`Error ${isEditing ? 'updating' : 'creating'} sub-course:`, err);
    }
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
        <h1 className="text-2xl font-bold text-gray-800">مدیریت زیردوره‌ها</h1>
        <button
          onClick={handleCreate}
          className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg flex items-center transition-colors"
        >
          <FiPlus className="ml-1" />
          افزودن زیردوره جدید
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

      {/* فرم ایجاد/ویرایش زیردوره */}
      {showForm && (
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <h2 className="text-xl font-bold mb-4">
            {isEditing ? 'ویرایش زیردوره' : 'ایجاد زیردوره جدید'}
          </h2>
          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div>
                <label className="block text-gray-700 mb-2">عنوان زیردوره*</label>
                <input
                  type="text"
                  name="title"
                  defaultValue={currentSubCourse?.title || ''}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-200 focus:border-indigo-500"
                  required
                  maxLength={500}
                />
              </div>
              {/* ========================================= */}
            
              <div className="md:col-span-2">
                <label className="block text-gray-700 mb-2">توضیحات*</label>
                <textarea
                  name="description"
                  defaultValue={currentSubCourse?.description || ''}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-200 focus:border-indigo-500"
                  rows="3"
                  maxLength={1500}
                  required
                />
              </div>
              <div>
                <label className="block text-gray-700 mb-2">کد دوره مربوطه*</label>
                <input
                  type="text"
                  name="courseId"
                  min="0"
                  step="0.5"
                  defaultValue={currentSubCourse?.courseId }
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-200 focus:border-indigo-500"
                  required
                />
              </div>
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
                {isEditing ? 'ذخیره تغییرات' : 'ایجاد زیردوره'}
              </button>
            </div>
          </form>
        </div>
      )}

      {/* لیست زیردوره‌ها */}
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        {subCourses.length === 0 ? (
          <div className="text-center py-12">
            <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <h3 className="mt-2 text-lg font-medium text-gray-900">زیردوره‌ای یافت نشد</h3>
            <p className="mt-1 text-sm text-gray-500">برای شروع یک زیردوره جدید ایجاد کنید.</p>
            <div className="mt-6">
              <button
                onClick={handleCreate}
                className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors"
              >
                <FiPlus className="-mr-1 ml-2 h-5 w-5" />
                افزودن زیردوره جدید
              </button>
            </div>
          </div>
        ) : (
          <ul className="divide-y divide-gray-200">
            {[...subCourses].sort((a, b) => a.order - b.order).map(subCourse => (
              <li key={subCourse.courseSubcategoryId} className="hover:bg-gray-50 transition-colors">
                <div className="px-4 py-4 sm:px-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-lg font-medium text-indigo-600">{subCourse.title}</h3>
                      <p className="text-sm text-gray-500 mt-1 line-clamp-2">{subCourse.description}</p>
                    </div>
                    {/* <div className="flex items-center space-x-2">
                      <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded">
                        {subCourse.courseId}  کد دوره
                      </span>
                      
                      <button
                        onClick={() => setExpandedSubCourse(expandedSubCourse === subCourse.courseSubcategoryId ? null : subCourse.courseSubcategoryId)}
                        className="text-gray-500 hover:text-gray-700 transition-colors"
                      >
                        {expandedSubCourse === subCourse.courseSubcategoryId ? <FiChevronUp /> : <FiChevronDown />}
                      </button>
                    </div> */}
                  </div>
                  <div className="mt-2 flex justify-end space-x-2">
                    <button
                      onClick={() => handleEdit(subCourse)}
                      className="text-indigo-600 hover:text-indigo-900 flex items-center transition-colors"
                    >
                      <FiEdit2 className="inline ml-1" />
                      ویرایش
                    </button>
                    <button
                      onClick={() => handleDelete(subCourse.courseSubcategoryId)}
                      className="text-red-600 hover:text-red-900 flex items-center transition-colors"
                    >
                      <FiTrash2 className="inline ml-1" />
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

export default SubCoursesManagement;