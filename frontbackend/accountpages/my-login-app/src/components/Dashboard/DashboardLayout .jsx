import { useState } from 'react';
import { Outlet, Link, useNavigate, useLocation } from 'react-router-dom';
import CoursesCardList from '../CoursesCardList';
const DashboardLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const navigate = useNavigate();
  const location = useLocation();

  const menuItems = [
  
    { path: '/coursespage', icon: '📚', title: 'دوره‌ها' },
    { path: '/subcoursespage', icon: '📖', title: 'زیردوره‌ها' },
      { path: '/QuestionsManagement', icon: '🏠', title: 'سوالات' },
    { path: '/StudentsManagement', icon: '👥', title: 'دانشجویان' },
  ];

  const handleLogout = () => {
    localStorage.removeItem('isAdmin');
    navigate('/login');
  };

  return (
    <div className="flex h-screen bg-gray-100 font-sans">
      {/* سایدبار */}
      <div className={`${sidebarOpen ? 'w-64' : 'w-20'} bg-indigo-800 text-white transition-all duration-300 flex flex-col`}>
        <div className="p-4 flex items-center justify-between border-b border-indigo-700">
          {sidebarOpen && <h1 className="text-xl font-bold">داشبورد مدیریت</h1>}
          <button 
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="p-1 rounded-lg hover:bg-indigo-700"
          >
            {sidebarOpen ? '«' : '»'}
          </button>
        </div>

        <nav className="flex-1 overflow-y-auto mt-4">
          <ul className="space-y-2 px-2">
            {menuItems.map((item) => (
              <li key={item.path}>
                <Link
                  to={item.path}
                  className={`flex items-center p-3 rounded-lg ${
                    location.pathname === item.path ? 'bg-indigo-700' : 'hover:bg-indigo-700'
                  } transition-colors`}
                >
                  <span className="text-xl ml-3">{item.icon}</span>
                  {sidebarOpen && <span>{item.title}</span>}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        

        <div className="p-4 border-t border-indigo-700">
          <button 
            onClick={handleLogout}
            className="flex items-center w-full p-2 rounded-lg hover:bg-indigo-700 transition-colors"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" viewBox="0 0 20 20" fill="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
            </svg>
            {sidebarOpen && <span>خروج از سیستم</span>}
          </button>
        </div>
      </div>

      {/* محتوای اصلی */}
      <div className="flex-1 flex flex-col overflow-hidden">
        <header className="bg-white shadow-sm">
          <div className="flex items-center justify-between px-6 py-4">
            <h2 className="text-lg font-semibold text-gray-800">
              {menuItems.find(item => location.pathname === item.path)?.title || 'پیشخوان'}
            </h2>
            <div className="flex items-center">
              <div className="w-8 h-8 rounded-full bg-indigo-500 flex items-center justify-center text-white font-bold">
                {localStorage.getItem('isAdmin') ? 'A' : 'U'}
              </div>
              {sidebarOpen && <span className="mr-2 text-sm font-medium">مدیر سیستم</span>}
            </div>
          </div>
        </header>
 
         
        {/* محتوای صفحه */}


        <Outlet />
      </div>
    </div>
  );
};

export default DashboardLayout;

