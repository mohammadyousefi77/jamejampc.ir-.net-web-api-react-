import { useState } from "react";
import axios from "axios";
  import {useLocation, useNavigate } from "react-router-dom";

function Register() {
 const location = useLocation();
  
  const { redirectTo, course, nationalId } = location.state || {};
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    nationalCode: "",
    phoneNumber: "",
 
  });

  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    try {
await axios.post("https://examui.jamejampc.ir/api/Auth/register", formData

      // await axios.post("https://localhost:7136/api/Auth/register", formData
       
      );

        
      // ذخیره توکن در localStorage
      // localStorage.setItem('token', response.data.token);
      
      // ریدایرکت به صفحه مورد نظر یا صفحه اصلی
      if (redirectTo && course) {
        navigate(redirectTo, { state: { course } });
      } else {
        navigate('/');
      }
      // setMessage("ثبت‌نام موفق بود! در حال انتقال به ورود...");
      
      //   setTimeout(() => navigate("/Login"), 2000);
    } catch (err) {
      setMessage("ثبت‌نام ناموفق! لطفا اطلاعات را بررسی کنید.");
    }
  };

  return (
    <div className="max-w-md mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">ثبت‌ نام جدید</h2>
      <form onSubmit={handleSubmit} className="flex flex-col gap-3">
        <input name="firstName" placeholder="نام" onChange={handleChange} className="border p-2 rounded" required/>
        <input name="lastName" placeholder="نام خانوادگی" onChange={handleChange} className="border p-2 rounded" required/>
        <input name="nationalCode" placeholder="کد ملی" onChange={handleChange} className="border p-2 rounded" required/>
        <input name="phoneNumber" placeholder="شماره تماس" onChange={handleChange} className="border p-2 rounded" required/>
        
        <button type="submit" className="bg-sky-300 text-blue-950 py-2 rounded" >
          ثبت‌نام
        </button>
      </form>
      {message && <p className="mt-2">{message}</p>}
      <button onClick={()=>{navigate("/Login")}} className="text-blue-800 mt-2 underline">
        بازگشت به ورود
       
      </button>
    </div>
  );
}

export default Register;
