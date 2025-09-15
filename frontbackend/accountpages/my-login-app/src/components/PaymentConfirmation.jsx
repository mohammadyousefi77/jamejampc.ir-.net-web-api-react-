import React from 'react';
import { useLocation, useNavigate ,useParams} from 'react-router-dom';
import { CheckCircle } from 'lucide-react';

const PaymentConfirmation = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { course } = location.state || {};
 

const sharedData = location.state.course;
const id=location.state.id;
  return (
    <div className="max-w-2xl mx-auto p-6 bg-gray-50 min-h-screen flex items-center justify-center">
      <div className="bg-white rounded-lg shadow-md p-8 text-center">
        <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
        <h1 className="text-2xl font-bold text-gray-800 mb-2">پرداخت با موفقیت انجام شد!</h1>
        <p className="text-gray-600 mb-6">شما با موفقیت در آزمون {sharedData} ثبت نام کردید.</p>
        
        <div className="bg-blue-50 p-4 rounded-lg mb-6 text-right">
          <h2 className="font-semibold text-blue-700 mb-2">📌 اطلاعات مهم:</h2>
          <ul className="space-y-2 text-gray-600 text-sm">
            <li>• لینک آزمون 24 ساعت قبل از شروع به ایمیل و پیامک ارسال می‌شود</li>
            <li>• کارت ملی و کارت پرداخت را همراه داشته باشید</li>
            <li>• آزمون در تاریخ 1402/05/15 ساعت 10:00 برگزار می‌شود</li>
          </ul>
        </div>

        <div className="flex justify-center gap-4">
          <button 
            onClick={() => navigate('/')}
            className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition"
          >
            بازگشت به صفحه اصلی
          </button>
          <button 
            onClick={() => navigate('/exampage', { state: { id: id } })}
            className="px-6 py-2 border border-blue-600 text-blue-600 hover:bg-blue-50 rounded-lg transition"
          >
           َشرکت در ازمون
          </button>
        </div>
      </div>
    </div>
  );
};

export default PaymentConfirmation;