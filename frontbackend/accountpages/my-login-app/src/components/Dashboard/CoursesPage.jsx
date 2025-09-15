import { useState, useEffect } from 'react';
import axios from 'axios';

const CoursesPage = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [currentCourse, setCurrentCourse] = useState(null);
  const [showForm, setShowForm] = useState(false);

  // دریافت لیست دوره‌ها
  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await axios.get('https://examui.jamejampc.ir/api/Courses/GetAll');
        setCourses(response.data);
      } catch (err) {
        setError('خطا در دریافت لیست دوره‌ها');
        console.error('Error details:', err.response?.data || err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchCourses();
  }, []);

  // حذف دوره
  const handleDelete = async (courseId) => {
    try {
      await axios.delete(`https://examui.jamejampc.ir/api/Courses/${courseId}`);
      setError('حذف با موفقیت انجام شد');
      setCourses(courses.filter(course => course.courseId !== courseId));
    } catch (err) {
      setError('خطا در حذف دوره');
      console.error('Error deleting course:', err);
    }
  };

  // ویرایش دوره
  const handleEdit = (course) => {
    setCurrentCourse(course);
    setIsEditing(true);
    setShowForm(true);
  };

  // ارسال فرم
  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const courseData = {
      courseId: currentCourse?.courseId,
  
      courseName: formData.get('courseName'),
      courseDescription: formData.get('courseDescription')
    };

    try {
      if (isEditing) {
        // ویرایش دوره موجود
        const response = await axios.put(
          `https://examui.jamejampc.ir/api/Courses/Update`,
          courseData
        );
        setCourses(courses.map(course => 
          course.courseId === courseData.courseId ? response.data : course
        ));
      } else {
        // ایجاد دوره جدید
        const response = await axios.post(
          'https://examui.jamejampc.ir/api/Courses',
          courseData
        );
        setCourses([...courses, response.data]);
      }
      
      setShowForm(false);
      setError(null);
    } catch (err) {
      console.error('Error saving course:', err.response?.data || err.message);
      setError(err.response?.data?.message || 'خطا در ذخیره تغییرات');
    }
  };

  if (loading) return <div>در حال بارگذاری...</div>;
  if (error) return <div className="text-red-500">{error}</div>;

  return (
    <main className="flex-1 p-4 md:p-8 text-right">
      <section className="mb-8 md:mb-12">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl md:text-3xl font-bold">مدیریت دوره‌های آموزشی</h2>
          <button 
            onClick={() => {
              setCurrentCourse(null);
              setIsEditing(false);
              setShowForm(true);
            }}
            className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg"
          >
            افزودن دوره جدید
          </button>
        </div>
      </section>

      {/* فرم اضافه/ویرایش دوره */}
      {showForm && (
        <section className="bg-white rounded-lg shadow-md p-6 mb-8">
          <h3 className="text-xl font-bold mb-4">{isEditing ? 'ویرایش دوره' : 'افزودن دوره جدید'}</h3>
          <form onSubmit={handleSubmit}>
            {isEditing && (
              <input 
                type="hidden" 
                name="courseId" 
                value={currentCourse?.courseId || ''} 
              />
            )}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div>
                <label className="block text-gray-700 mb-2">عنوان دوره</label>
                <input
                  type="text"
                  name="courseName"
                  defaultValue={currentCourse?.courseName || ''}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                  required
                />
              </div>
              <div className="md:col-span-2">
                <label className="block text-gray-700 mb-2">توضیحات دوره</label>
                <textarea
                  name="courseDescription"
                  defaultValue={currentCourse?.courseDescription || ''}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                  rows="4"
                  required
                />
              </div>
            </div>
            <div className="flex justify-end space-x-3">
              <button
                type="button"
                onClick={() => setShowForm(false)}
                className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded-lg"
              >
                انصراف
              </button>
              <button
                type="submit"
                className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg"
              >
                {isEditing ? 'ذخیره تغییرات' : 'افزودن دوره'}
              </button>
            </div>
          </form>
        </section>
      )}

      {/* لیست دوره‌ها */}
      <section>
        <h3 className="text-xl md:text-2xl font-bold mb-4">لیست دوره‌های موجود</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {courses.map(course => (
            <div key={course.courseId} className="bg-white rounded-lg shadow-md overflow-hidden border border-gray-200">
              <div className="p-4">
                <h4 className="text-lg font-bold mb-2">{course.courseName}</h4>
                <p className="text-gray-600 text-sm mb-3">{course.courseDescription}</p>
                <div className="flex justify-end space-x-2">
                  <button
                    onClick={() => handleEdit(course)}
                    className="bg-blue-100 hover:bg-blue-200 text-blue-600 px-3 py-1 rounded-lg text-sm"
                  >
                    ویرایش
                  </button>
                  <button
                    onClick={() => handleDelete(course.courseId)}
                    className="bg-red-100 hover:bg-red-200 text-red-600 px-3 py-1 rounded-lg text-sm"
                  >
                    حذف
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
      {/* لیست دوره‌ها */}
{/* <section>
  <h3 className="text-xl md:text-2xl font-bold mb-4">لیست دوره‌های موجود</h3>
  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
    {(courses || []).map(course => {
      // ایجاد key منحصر به فرد حتی اگر courseId وجود نداشته باشد
      const uniqueKey = course.courseId 
        ? course.courseId 
        : `course-${course.courseName}-${Math.random().toString(36).substr(2, 9)}`;
      
      return (
        <div 
          key={uniqueKey}
          className="bg-white rounded-lg shadow-md overflow-hidden border border-gray-200"
        >
          <div className="p-4">
            <h4 className="text-lg font-bold mb-2">{course.courseName}</h4>
            <p className="text-gray-600 text-sm mb-3">{course.courseDescription}</p>
            <div className="flex justify-end space-x-2">
              <button
                onClick={() => handleEdit(course)}
                className="bg-blue-100 hover:bg-blue-200 text-blue-600 px-3 py-1 rounded-lg text-sm"
              >
                ویرایش
              </button>
              <button
                onClick={() => handleDelete(course.courseId)}
                className="bg-red-100 hover:bg-red-200 text-red-600 px-3 py-1 rounded-lg text-sm"
              >
                حذف
              </button>
            </div>
          </div>
        </div>
      );
    })}
  </div>
</section> */}
    </main>
  );
};

export default CoursesPage;