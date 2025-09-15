// import { useState } from "react";
//  import { useNavigate } from "react-router-dom";
// import axios from "axios";

// function Login() {
//   const [nationalCode, setNationalCode] = useState("");
//   const [error, setError] = useState("");
  
//   const [message, setMessage] = useState("");
//     const navigate = useNavigate();


//   const [isRegistered, setIsRegistered] = useState(false);  // فرض کن از سرور گرفتی
  

//   // const handleClick = () => {
//   //   if(isRegistered){
//   //     navigate("/Home")
//   //   }
//   //   else{
//   //     navigate("/")
//   //   }
//   // }
//   //=====
//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     // setError("");
// setMessage("");
// // بررسی کد ملی خاص
//     if (nationalCode === "4200123456") {
      
//       navigate("/dashboard");
//       return;
//     }

//     try {

//    const response = await axios.post("https://localhost:7136/api/Auth/login", {
//         nationalCode,
//       });
     
       
//       // ذخیره توکن در localStorage
//       //  localStorage.setItem("data", nationalCode);

//       // هدایت به داشبورد
//       //  navigate("/Home");

      
//       // ذخیره توکن در localStorage
//      setMessage(" ورود موفق بود! در حال انتقال به صفحه اصلی");
//       navigate("/");
      
   


//     } catch (err) {
      
      
   
      
    
//       // setError("کد ملی یا اطلاعات وارد شده اشتباه است.");
//       setMessage(" کد ملی یا اطلاعات وارد شده اشتباه است.  ابتدا ثبت نام کنید");
//      setTimeout(() => navigate("/Register"), 3000);
//     }
//   };

//   return (
      

//     <div style={{ maxWidth: "400px", margin: "auto", padding: "1rem" }}>
//       <h2>ورود با کد ملی</h2>
//       <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
//         <input
         
//           class="text-black border rounded"
//           type="text"
//           placeholder="کد ملی"
//           value={nationalCode}
//           onChange={(e) => setNationalCode(e.target.value)}
//           required
//           style={{ padding: "0.5rem", fontSize: "1rem" }}
//         />
//         <button type="submit" style={{ padding: "0.5rem", fontSize: "1rem" }}>
//            ورود</button>
        
//       </form>
//       {message && <p style={{ color: "red", marginTop: "1rem" }}>{message} </p>}
      
//     </div>

    
//   );
// }

// export default Login;

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function Login() {
  const [nationalCode, setNationalCode] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");

    // ولیدیشن ساده برای کد ملی
    if (!/^\d{10}$/.test(nationalCode)) {
      setMessage("کد ملی باید ۱۰ رقم عددی باشد.");
      return;
    }

    setLoading(true);

    // تست کد ملی خاص
    if (nationalCode === "4200123456") {
      navigate("/dashboard");
      return;
    }

    try {

      await axios.post("https://examui.jamejampc.ir/api/Auth/login"
      // await axios.post("https://localhost:7136/api/Auth/login"
        , { nationalCode });

      setMessage("✅ ورود موفق بود! در حال انتقال...");
      setTimeout(() => navigate("/"), 2000);
    } catch (err) {
      setMessage("❌ کد ملی اشتباه است یا ثبت‌نام نکرده‌اید. به صفحه ثبت نام هدایت میشوید");
      setTimeout(() => navigate("/Register"), 3000);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 px-4">
      <div className="w-full max-w-md bg-white shadow-lg rounded-2xl p-6">
        <h2 className="text-2xl font-bold text-center mb-6">ورود با کد ملی</h2>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input
          maxLength={10}
            type="text"
            placeholder="کد ملی"
            value={nationalCode}
            onChange={(e) => setNationalCode(e.target.value)}
            required
            className="border rounded-lg p-3 text-black focus:ring-2 focus:ring-blue-400 outline-none"
          />

          <button
            type="submit"
            disabled={loading}
            className={`w-full py-3 rounded-lg text-white font-semibold transition ${
              loading
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-blue-500 hover:bg-blue-600"
            }`}
          >
            {loading ? "لطفا صبر کنید..." : "ورود"}
          </button>
        </form>

        {message && (
          <p
            className={`mt-4 text-center font-medium ${
              message.includes("✅") ? "text-green-600" : "text-red-600"
            }`}
          >
            {message}
          </p>
        )}
      </div>
    </div>
  );
}

export default Login;
