// // import { useEffect, useState } from "react";
// // import axios from "axios";

// // function Home() {
// // //   const [user, setUser] = useState(null);

// // // const token = localStorage.getItem("data");
// // // console.log(token);
// // //     if (!token) return;

// //   // useEffect(() => {
// //   //   const data = localStorage.getItem("data");
// //   //   if (!data) return;

// //   //   axios.get("https://localhost:7136/api/Auth/profile/${data}", {
      
// //   //     //  headers: { Authorization: `Bearer ${token}` },
       
// //   //   })
// //   //   .then((res) => setUser(res.data))
// //   //   .catch(() => setUser(null));
// //   // }, []);

// //   // if (!user) return <p>در حال بارگذاری اطلاعات...</p>;

// //   return (
// //     <div style={{ padding: "1rem" }}>
// //       {/* <h2>خوش آمدید {user.firstName} {user.lastName} عزیز</h2> */}
// //       <h2>خوش آمدید  </h2>
// //     </div>
// //   );
// // }

// // export default Home;
// //======================================
// import { useEffect, useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { Menu } from 'lucide-react';
// import Register from './Register';
// import CoursesCardList from './CoursesCardList';

// function Home() {
//    const navigate = useNavigate();
//   const [menuOpen, setMenuOpen] = useState(false);
// // const navItems = [
// //   { text: "مقالات", href: "/articles" },
// //   { text: "دوره‌های آموزشگاه", href: "/courses" },
// //   { text: "دوره‌های آموزشگاه", href: "/courses" },
// //   {text:"مشاهده نتیجه آزمون فنی و حرفه‌ای",href:"fani"},
// //   {text:"ثبت نام / ورود",href:"/Registet"},
// //   // ...
// // ];
// // {navItems.map(item => (
// //   <Link key={item.text} href={item.href} className="text-gray-700 hover:text-blue-500">
// //     {item.text}
// //   </Link>
// // ))}

//   // useEffect(() => {
//   //   const token = localStorage.getItem('token');
//   //   if (!token) {
//   //     navigate('/login');
//   //   }
//   // }, [navigate]);

//   const handleLogout = () => {
//     // localStorage.removeItem('token');
//     navigate('/Register');
//   };

//   return (
//     <div className="flex flex-col min-h-screen bg-gray-100 ">
//       {/* Header */}
//      <header className="bg-white shadow p-4 flex justify-between items-center text-right">
//         <div className="flex items-center gap-4">
//           <h1 className="text-2xl font-bold">آموزشگاه جام جم</h1>
//         </div>
//         <div className="flex items-center gap-4">
//           <nav
//             className={`flex-col  md:flex-col gap-2 md:gap-4 items-center ${
//               menuOpen ? 'flex' : 'hidden'
//             } md:flex`}
//           >
//             <div className="flex  gap-4">
//               <button className="text-gray-700 hover:text-blue-500">مقالات</button>
//               <button className="text-gray-700 hover:text-blue-500">دوره‌های آموزشگاه</button>
//               <button className="text-gray-700 hover:text-blue-500">مشاهده نتیجه آزمون فنی و حرفه‌ای</button>
//               <button onClick={handleLogout} className="text-gray-700 hover:text-blue-500">ثبت‌نام / ورود</button>
//            </div>
//           </nav>
//           <button className="md:hidden" onClick={() => setMenuOpen(!menuOpen)}>
//             <Menu className="w-6 h-6 text-gray-700" />
//           </button>

//         </div>
               
       
//       </header>

//       {/* Main Content */}
//       <main className="flex-1 p-4 md:p-8 text-right">
//         <section className="mb-8">
//           <h2 className="text-3xl font-bold mb-4">درباره آموزشگاه</h2>
//           <p className="text-gray-700">
//             آموزشگاه جام جم با هدف ارتقاء مهارت‌های فنی و حرفه‌ای در زمینه‌های مختلف، دوره‌های آموزشی تخصصی و کاربردی را ارائه می‌دهد. هدف ما کمک به توسعه مهارت‌های شغلی و ورود موفق به بازار کار است.
//           </p>
//         </section>

//         {/* <section>
//           <h2 className="text-2xl font-bold mb-4">دوره‌های آموزشگاه</h2>
//           <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
//             <div className="bg-white p-4 rounded shadow text-center hover:shadow-lg transition">
//               <h3 className="text-xl font-bold mb-2">دوره برنامه‌نویسی وب  </h3>
//               <p className="text-gray-600">آموزش کامل HTML, CSS, JavaScript و فریم‌ورک‌ها</p>
//             </div>
//             <div className="bg-white p-4 rounded shadow text-center hover:shadow-lg transition">
//               <h3 className="text-xl font-bold mb-2">دوره طراحی گرافیک</h3>
//               <p className="text-gray-600">آموزش فتوشاپ، ایلاستریتور و اصول طراحی</p>
//             </div>
//             <div className="bg-white p-4 rounded shadow text-center hover:shadow-lg transition">
//               <h3 className="text-xl font-bold mb-2">دوره حسابداری</h3>
//               <p className="text-gray-600">آموزش حسابداری کاربردی و نرم‌افزارهای مالی</p>
//             </div>
//             <div className="bg-white p-4 rounded shadow text-center hover:shadow-lg transition">
//               <h3 className="text-xl font-bold mb-2">دوره برق صنعتی</h3>
//               <p className="text-gray-600">آموزش عملی برق صنعتی و تابلو برق</p>
//             </div>
//           </div>
//         </section> */}
//               <section >
//                     <h2 className="text-2xl font-bold mb-4">لیست دوره‌ها</h2>
//                           <CoursesCardList />
//                 </section>
      
//       </main>

//       {/* Footer */}
//       <footer className="bg-white shadow p-4 text-center text-gray-600">
//         <p>© 2025 آموزشگاه جام جم | تمامی حقوق محفوظ است.</p>
//       </footer>
//     </div>
//   );
// }

// export default Home;


import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import Register from './Register';
import CoursesCardList from './CoursesCardList';

function Home() {
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
      if (window.innerWidth >= 768) {
        setMenuOpen(false);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleLogout = () => {
    navigate('/Register');
  };

  

  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      {/* Header */}
      <header className="bg-white shadow p-4 flex justify-between items-center text-right">
        <div className="flex items-center gap-2 md:gap-4">
          <h1 className="text-xl md:text-2xl font-bold">آموزشگاه جام جم</h1>
        </div>
        
        {/* Desktop Navigation */}
        <nav className="hidden md:flex gap-4">
          <button className="text-gray-700 hover:text-blue-500 text-sm md:text-base">مقالات</button>
          <button className="text-gray-700 hover:text-blue-500 text-sm md:text-base">دوره‌های آموزشگاه</button>
          <button className="text-gray-700 hover:text-blue-500 text-sm md:text-base" ><a href="https://azmoon.portaltvto.com/result/result/index/1/80"  target="_blank">مشاهده نتیجه آزمون فنی و حرفه‌ای</a></button>
          <button onClick={handleLogout} className="text-gray-700 hover:text-blue-500 text-sm md:text-base">
            ثبت‌نام / ورود
          </button>
        </nav>

        {/* Mobile Menu Button */}
        <button 
          className="md:hidden p-2" 
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="منو"
        >
          {menuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </header>

      {/* Mobile Menu */}
      {menuOpen && isMobile && (
        <div className="bg-white shadow-lg md:hidden">
          <nav className="flex flex-col p-4 gap-3">
            <button className="text-right py-2 text-gray-700 hover:text-blue-500">مقالات</button>
            <button className="text-right py-2 text-gray-700 hover:text-blue-500">دوره‌های آموزشگاه</button>
            <button className="text-right py-2 text-gray-700 hover:text-blue-500">مشاهده نتیجه آزمون فنی و حرفه‌ای</button>
            <button 
              onClick={handleLogout} 
              className="text-right py-2 text-gray-700 hover:text-blue-500"
            >
              ثبت‌نام / ورود
            </button>
          </nav>
        </div>
      )}

      {/* Main Content */}
      <main className="flex-1 p-4 md:p-8 text-right">
        <section className="mb-8 md:mb-12">
          <h2 className="text-2xl md:text-3xl font-bold mb-3 md:mb-4">درباره آموزشگاه</h2>
          <p className="text-gray-700 text-sm md:text-base leading-relaxed">
            آموزشگاه جام جم با هدف ارتقاء مهارت‌های فنی و حرفه‌ای در زمینه‌های مختلف، دوره‌های آموزشی تخصصی و کاربردی را ارائه می‌دهد. هدف ما کمک به توسعه مهارت‌های شغلی و ورود موفق به بازار کار است.
          </p>
        </section>

        <section>
          <h2 className="text-xl md:text-2xl font-bold mb-3 md:mb-4">لیست دوره‌ها</h2>
          <CoursesCardList />
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-white shadow p-4 text-center text-gray-600 text-sm md:text-base">
        <p>© {new Date().getFullYear()} آموزشگاه جام جم | تمامی حقوق محفوظ است.</p>
      </footer>
    </div>
  );
}

export default Home;