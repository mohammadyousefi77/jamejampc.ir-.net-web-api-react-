import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
const CourseDetails = () => {
  const { id } = useParams();
  const [subcourses, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
   const { course } = location.state || {};
  const navigate = useNavigate();
  useEffect(() => {
    const fetchCourse = async () => {
      try {
        const response = await axios.get(`https://examui.jamejampc.ir/api/SubCourses/GetSubCoursesByCourse/${id}`);
        setCourse(response.data);
        
      } catch (err) {
        setError('خطا در دریافت اطلاعات دوره');
      } finally {
        setLoading(false);
      }
    };

    fetchCourse();
  }, [id]);


// const handleExamClick = () => {
//   navigate(`/exam-rules/${course.tiltle}`
// //     , { state: { 
// //     course

// //    } }
// );
// };




  if (loading) return <p className="text-center">در حال بارگذاری...</p>;
  if (error) return <p className="text-center text-red-500">{error}</p>;
  if (!subcourses) return <p>دوره‌ای پیدا نشد.</p>;

  return (
    <div className="p-4">
      
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {subcourses.map((course) => (
          <div key={course.courseSubcategoryId} className="bg-white shadow-md rounded-2xl p-4 hover:shadow-xl transition">
            <h3 className="text-xl font-semibold mb-2">{course.title}</h3>
            <p className="text-gray-600">{course.description}</p>
           
            <button
  onClick={() => navigate(`/exam-rules/${course.title}`, { state: { course: course.courseSubcategoryId } } )}
  
  className="w-full mt-4 bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded-lg"
>
  ثبت نام در آزمون
</button> <br />
                <button 
            onClick={() => navigate(-1)}
            className="px-6 py-3 mt-5 border border-gray-300 rounded-lg text-blue-900 hover:bg-gray-100 transition w-full sm:w-auto"
          >
            بازگشت
          </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CourseDetails;
