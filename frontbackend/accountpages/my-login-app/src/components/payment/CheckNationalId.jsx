import React, { useState } from 'react';
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';

const CheckNationalId = () => {
  const [nationalCode, setNationalId] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const location = useLocation();
  const navigate = useNavigate();
  const { course  } = location.state || {};
const sharedData = location.state?.course;
const id=location.state.id;

  const handleSubmit = async (e) => {
    // console.log(sharedData)
    e.preventDefault();
    
    // اعتبارسنجی اولیه
    if (!/^\d{10}$/.test(nationalCode)) {
      setError('کد ملی باید 10 رقم عددی باشد');
      return;
    }

    // setLoading(true);
    setError('');
    setMessage('');

    try {
      const response = await axios.post(
        'https://examui.jamejampc.ir/api/Auth/login',
        { nationalCode}, // استفاده از نام فیلد مورد انتظار سرور
        {
          headers: {
            'Content-Type': 'application/json',
          }
        }
      );

      
  setMessage('کاربر یافت شد. در حال انتقال...');
  navigate('/payment', { state: { course:sharedData,id, nationalCode } });

  } catch (err) {
      console.error('Error details:', err.response?.data);
      
      if (err.response?.status === 400) {
        setError('فرمت کد ملی نامعتبر است');
      } else if (err.response?.status === 404) {
        // setError('کاربر یافت نشد');
        setMessage('کاربر یافت نشد. در حال انتقال به صفحه ثبت نام...');
  setTimeout(() => {
    navigate('/Register', {  // توجه: حروف کوچک/بزرگ مهم است
      state: { 
        redirectTo: '/payment',
        course,
        nationalCode 
      } 
    });
  }, 900);

      } else {
        setError('خطا در ارتباط با سرور. لطفاً مجدداً تلاش کنید');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md mt-10">
      <h2 className="text-xl font-bold text-center mb-6">لطفا کد ملی خود را وارد کنید</h2>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="nationalCode" className="block mb-2 text-sm font-medium">
            کد ملی
          </label>
          <input
            type="text"
            id="nationalCode"
            value={nationalCode}
            onChange={(e) => {
              const value = e.target.value;
              if (/^\d*$/.test(value) && value.length <= 10) {
                setNationalId(value);
                setError('');
              }
            }}
            className={`w-full p-3 border rounded-lg ${
              error ? 'border-red-500' : 'border-gray-300'
            }`}
            placeholder="مثال: 1234567890"
            required
            maxLength="10"
          />
        </div>

        {error && <p className="text-red-500 text-sm">{error}</p>}
        {message && (
          <p className={`text-sm ${
            message.includes('یافت شد') ? 'text-green-600' : 'text-yellow-600'
          }`}>
            {message}
          </p>
        )}

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 disabled:bg-blue-300 transition flex justify-center items-center"
        >
          {loading ? (
            <>
              <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              در حال بررسی...
            </>
          ) : 'تایید و ادامه'}
        </button>
      </form>
    </div>
  );
};

export default CheckNationalId;