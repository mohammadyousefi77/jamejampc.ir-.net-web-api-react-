import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import { useNavigate } from 'react-router-dom';
const CoursesCardList = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await axios.get('https://examui.jamejampc.ir/api/Courses/GetAll');
        // const response = await axios.get('https://localhost:7136/api/Courses/GetAll');
        setCourses(response.data);
      } catch (err) {
        setError('خطا در دریافت لیست دوره‌ها');
      } finally {
        setLoading(false);
      }
    };

    fetchCourses();
  }, []);

  if (loading) return <p className="text-center text-gray-500">در حال بارگذاری...</p>;
  if (error) return <p className="text-center text-red-500">{error}</p>;

 
   
  return (
   <div className="p-4">
      
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {courses.map((course) => (
          <div key={course.courseId} className="bg-white shadow-md rounded-2xl p-4 hover:shadow-xl transition">
            <h3 className="text-xl font-semibold mb-2">{course.courseName}</h3>
            <p className="text-gray-600">{course.courseDescription}</p>
            {/* <button className="mt-4 bg-blue-500 text-blue-800 px-4 py-2 rounded-lg hover:bg-blue-600 transition">
              مشاهده جزئیات
            </button> */}
            <button
                onClick={() => navigate(`/courses/${course.courseId}`) }
                  className="mt-4 bg-blue-500 text-gray-50 px-4 py-2 rounded-lg hover:bg-blue-600 transition"
                >
                  مشاهده جزئیات
                </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CoursesCardList;
