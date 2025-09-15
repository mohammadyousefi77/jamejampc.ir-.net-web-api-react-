// import { useState, useEffect } from 'react';
// import axios from 'axios';
// import { toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';


// const UserManagement = () => {
//   const [users, setUsers] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [searchTerm, setSearchTerm] = useState('');

//   // دریافت کاربران از API
//   const fetchUsers = async () => {
//     try {
//       setLoading(true);
//       const response = await axios.get('https://localhost:7136/api/User/GetAllUsers');
//       setUsers(response.data);
//       toast.success('اطلاعات کاربران با موفقیت دریافت شد');
//     } catch (err) {
//       setError('خطا در دریافت اطلاعات کاربران');
//       toast.error('خطا در دریافت اطلاعات کاربران');
//       console.error('Error fetching users:', err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchUsers();
//   }, []);

//   // فیلتر کاربران بر اساس جستجو
//   const filteredUsers = users.filter(user => {
//     const searchLower = searchTerm.toLowerCase();
//     return (
//       user.firstName.toLowerCase().includes(searchLower) ||
//       user.lastName.toLowerCase().includes(searchLower) ||
//       user.nationalCode.includes(searchTerm) ||
//       user.phoneNumber.includes(searchTerm)
//     );
//   });

// const handleEdit = async (userId) => {
//   try {
//     // دریافت اطلاعات کاربر برای ویرایش
//     const response = await axios.get(`https://localhost:7136/api/User/GetUser/${userId}`);
//     const userData = response.data;
//     //
//     // نمایش فرم ویرایش (می‌توانید از مودال استفاده کنید)
//     toast.info(`در حال ویرایش کاربر ${userData.firstName} ${userData.lastName}`);
//   } catch (err) {
//     toast.error('خطا در دریافت اطلاعات کاربر');
//     console.error('Error fetching user:', err);
//   }
// };

// const handleDelete = async (NationalCode) => {
//   if (window.confirm('آیا از حذف این کاربر اطمینان دارید؟')) {
//     try {
//       await axios.delete(`https://localhost:7136/api/User/Deleteuser/${NationalCode}`);
//       toast.success('کاربر با موفقیت حذف شد');
//       fetchUsers(); // بارگذاری مجدد لیست کاربران
//     } catch (err) {
//       toast.error('خطا در حذف کاربر');
//       console.error('Error deleting user:', err);
//     }
//   }
// };


//   if (loading) {
//     return <div className="text-center py-8">در حال دریافت اطلاعات...</div>;
//   }

//   if (error) {
//     return <div className="text-red-500 text-center py-8">{error}</div>;
//   }

//   return (
//     <div className="container mx-auto px-4 py-8">
//       <h1 className="text-2xl font-bold mb-6">مدیریت کاربران</h1>
      
//       {/* جستجو */}
//       <div className="mb-6">
//         <input
//           type="text"
//           placeholder="جستجو بر اساس نام، نام خانوادگی، کد ملی یا شماره تلفن..."
//           value={searchTerm}
//           onChange={(e) => setSearchTerm(e.target.value)}
//           className="w-full p-2 border border-gray-300 rounded"
//         />
//       </div>

//       {/* جدول کاربران */}
//       <div className="overflow-x-auto">
//         <table className="min-w-full bg-white border border-gray-200">
//           <thead>
//             <tr className="bg-gray-100">
//               <th className="py-2 px-4 border">نام</th>
//               <th className="py-2 px-4 border">نام خانوادگی</th>
//               <th className="py-2 px-4 border">کد ملی</th>
//               <th className="py-2 px-4 border">شماره تلفن</th>
//               <th className="py-2 px-4 border">عملیات</th>
//             </tr>
//           </thead>
//           <tbody>
//             {filteredUsers.length > 0 ? (
//               filteredUsers.map(user => (
//                 <tr key={user.id} className="hover:bg-gray-50">
//                   <td className="py-2 px-4 border text-center">{user.firstName}</td>
//                   <td className="py-2 px-4 border text-center">{user.lastName}</td>
//                   <td className="py-2 px-4 border text-center">{user.nationalCode}</td>
//                   <td className="py-2 px-4 border text-center">{user.phoneNumber}</td>
//                   <td className="py-2 px-4 border text-center">
//                     <button 
//                       className="text-blue-500 hover:text-blue-700 mx-1"
//                       onClick={() => handleEdit(user.id)}
//                     >
//                       ویرایش
//                     </button>
//                     <button 
//                       className="text-red-500 hover:text-red-700 mx-1"
//                       onClick={() => handleDelete(user.nationalCode)}
//                     >
//                       حذف
//                     </button>
//                   </td>
//                 </tr>
//               ))
//             ) : (
//               <tr>
//                 <td colSpan="5" className="py-4 text-center">کاربری یافت نشد</td>
//               </tr>
//             )}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// };

// export default UserManagement;

/////=======================================

import { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const UsersManagement = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingId, setEditingId] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');
  const [editForm, setEditForm] = useState({
    firstName: '',
    lastName: '',
    nationalCode: '',
    phoneNumber: ''
  });
  const [errors, setErrors] = useState({});

    // دریافت کاربران از API
  const fetchUsers = async () => {
    try {
      setLoading(true);
      const response = await axios.get('https://examui.jamejampc.ir/api/User/GetAllUsers');
      setUsers(response.data);
      toast.success('اطلاعات کاربران با موفقیت دریافت شد');
    } catch (err) {
      setError('خطا در دریافت اطلاعات کاربران');
      toast.error('خطا در دریافت اطلاعات کاربران');
      console.error('Error fetching users:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

//    فیلتر کاربران بر اساس جستجو
  const filteredUsers = users.filter(user => {
    const searchLower = searchTerm.toLowerCase();
    return (
      user.firstName.toLowerCase().includes(searchLower) ||
      user.lastName.toLowerCase().includes(searchLower) ||
      user.nationalCode.includes(searchTerm) ||
      user.phoneNumber.includes(searchTerm)
    );
  });

  // اعتبارسنجی فرم
  const validateForm = () => {
    const newErrors = {};
    
    if (!editForm.firstName.trim()) {
      newErrors.firstName = 'نام الزامی است';
    }
    
    if (!editForm.lastName.trim()) {
      newErrors.lastName = 'نام خانوادگی الزامی است';
    }
    
    if (!/^\d{10}$/.test(editForm.nationalCode)) {
      newErrors.nationalCode = 'کد ملی باید 10 رقم باشد';
    }
    
    if (!/^09\d{9}$/.test(editForm.phoneNumber)) {
      newErrors.phoneNumber = 'شماره موبایل باید با 09 شروع شده و 11 رقم باشد';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // شروع ویرایش
  const startEditing = (user) => {
    setEditingId(user.id);
    setEditForm({
        Id:user.id,
      firstName: user.firstName,
      lastName: user.lastName,
      nationalCode: user.nationalCode,
      phoneNumber: user.phoneNumber
    });
    setErrors({});
  };

  // ذخیره تغییرات
  const saveChanges = async (userId) => {
    if (!validateForm()) return;

    try {
      const response = await axios.put(
        'https://examui.jamejampc.ir/api/User/Updateuser',
        editForm
      );

      fetchUsers(); // بارگذاری مجدد لیست کاربران
    //   setUsers(users.map(user => 
    //     user.id === userId ? response.data : user
    //   ));
      setEditingId(null);
      toast.success('اطلاعات کاربر با موفقیت به‌روزرسانی شد');
      fetchUsers(); // بارگذاری مجدد لیست کاربران

    } catch (err) {
      toast.error('خطا در به‌روزرسانی اطلاعات کاربر');
      console.error('Error updating user:', err);
    }
  };

  // لغو ویرایش
  const cancelEditing = () => {
    setEditingId(null);
    setErrors({});
  };

const handleDelete = async (NationalCode) => {
  if (window.confirm('آیا از حذف این کاربر اطمینان دارید؟')) {
    try {
      await axios.delete(`https://examui.jamejampc.ir/api/User/Deleteuser/${NationalCode}`);
      toast.success('کاربر با موفقیت حذف شد');
      fetchUsers(); // بارگذاری مجدد لیست کاربران
    } catch (err) {
      toast.error('خطا در حذف کاربر');
      console.error('Error deleting user:', err);
    }
  }
};


  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6">مدیریت کاربران</h1>
         {/* جستجو */}
          <div className="mb-6">
         <input
          type="text"
          placeholder="جستجو بر اساس نام، نام خانوادگی، کد ملی یا شماره تلفن..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded"
        />
      </div>
      
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-200">
          <thead className="bg-gray-100">
            <tr>
              <th className="py-3 px-4 border">نام</th>
              <th className="py-3 px-4 border">نام خانوادگی</th>
              <th className="py-3 px-4 border">کد ملی</th>
              <th className="py-3 px-4 border">شماره تلفن</th>
              <th className="py-3 px-4 border">عملیات</th>
            </tr>
          </thead>
              <tbody>
            {filteredUsers.length > 0 ? (
              filteredUsers.map(user => (
                <tr key={user.id} className="hover:bg-gray-50">
                  <td className="py-3 px-4 border">
                    {editingId === user.id ? (
                      <div>
                        <input
                          type="text"
                          value={editForm.firstName}
                          onChange={(e) => setEditForm({...editForm, firstName: e.target.value})}
                          className={`w-full p-2 border rounded ${errors.firstName ? 'border-red-500' : 'border-gray-300'}`}
                        />
                        {errors.firstName && <p className="text-red-500 text-xs mt-1">{errors.firstName}</p>}
                      </div>
                    ) : (
                      user.firstName
                    )}
                  </td>
                  <td className="py-3 px-4 border">
                    {editingId === user.id ? (
                      <div>
                        <input
                          type="text"
                          value={editForm.lastName}
                          onChange={(e) => setEditForm({...editForm, lastName: e.target.value})}
                          className={`w-full p-2 border rounded ${errors.lastName ? 'border-red-500' : 'border-gray-300'}`}
                        />
                        {errors.lastName && <p className="text-red-500 text-xs mt-1">{errors.lastName}</p>}
                      </div>
                    ) : (
                      user.lastName
                    )}
                  </td>
                  <td className="py-3 px-4 border">
                    {editingId === user.id ? (
                      <div>
                        <input
                          type="text"
                          readOnly
                          value={editForm.nationalCode}
                          className="w-full p-2 border border-gray-300 rounded bg-gray-100"
                          maxLength="10"
                        />
                      </div>
                    ) : (
                      user.nationalCode
                    )}
                  </td>
                  <td className="py-3 px-4 border">
                    {editingId === user.id ? (
                      <div>
                        <input
                          type="tel"
                          maxLength={11}
                          value={editForm.phoneNumber}
                          onChange={(e) => setEditForm({...editForm, phoneNumber: e.target.value})}
                          className={`w-full p-2 border rounded ${errors.phoneNumber ? 'border-red-500' : 'border-gray-300'}`}
                        />
                        {errors.phoneNumber && <p className="text-red-500 text-xs mt-1">{errors.phoneNumber}</p>}
                      </div>
                    ) : (
                      user.phoneNumber
                    )}
                  </td>
                  <td className="py-3 px-4 border">
                    {editingId === user.id ? (
                      <div className="flex space-x-2">
                        <button
                          onClick={() => saveChanges(user.id)}
                          className="bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded text-sm"
                        >
                          ذخیره
                        </button>
                        <button
                          onClick={cancelEditing}
                          className="bg-gray-500 hover:bg-gray-600 text-white px-3 py-1 rounded text-sm"
                        >
                          انصراف
                        </button>
                      </div>
                    ) : (
                      <div className="flex space-x-2">
                        <button
                          onClick={() => startEditing(user)}
                          className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded text-sm"
                        >
                          ویرایش
                        </button>
                        <button
                          onClick={() => handleDelete(user.nationalCode)}
                          className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded text-sm"
                        >
                          حذف
                        </button>
                      </div>
                    )}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="py-4 text-center">کاربری با این فیلترها یافت نشد</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UsersManagement;