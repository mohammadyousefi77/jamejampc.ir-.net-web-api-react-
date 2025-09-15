import React from 'react';
import { useLocation, useNavigate,useParams } from 'react-router-dom';

const ExamRulesAndPayment = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { course } = location.state || {};
  const { data } = useParams();

  const result=location.state.course;
 
 const handlePayment = () => {
  navigate('/check-national-id ', { state: { course:data,id:result } });

};

  return (
    <div className="max-w-4xl mx-auto p-6 bg-gray-50 min-h-screen">
      <div className="bg-white rounded-lg shadow-md p-6 mb-6">
        <h1 className="text-2xl font-bold text-gray-800 mb-4 text-center">
          شرایط و قوانین شرکت در آزمون {data}
        </h1>
        
        <div className="border-b pb-4 mb-6">
          <h2 className="text-xl font-semibold text-gray-700 mb-3">📝 قوانین عمومی:</h2>
          <ul className="list-disc pr-5 space-y-2 text-gray-600">
            <li>شرکت کنندگان باید حداقل 18 سال سن داشته باشند</li>
            <li>پرداخت هزینه آزمون به منزله پذیرش تمامی شرایط است</li>
            <li>هرگونه تقلب منجر به محرومیت دائمی خواهد شد</li>
            <li>زمان آزمون قابل تغییر نیست</li>
          </ul>
        </div>

        <div className="border-b pb-4 mb-6">
          <h2 className="text-xl font-semibold text-gray-700 mb-3">⏳ روند آزمون:</h2>
          <ol className="list-decimal pr-5 space-y-2 text-gray-600">
            <li>ثبت نام و پرداخت هزینه</li>
            <li>دریافت لینک آزمون 24 ساعت قبل از شروع</li>
            <li>شرکت در آزمون در زمان مقرر (60 دقیقه)</li>
            <li>اعلام نتایج بلافاصله پس از آزمون</li>
          </ol>
        </div>

        <div className="border-b pb-4 mb-6">
          <h2 className="text-xl font-semibold text-gray-700 mb-3">🏆 سیستم امتیازدهی:</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-gray-600">
            <div className="bg-blue-50 p-3 rounded-lg">
              <h3 className="font-medium text-blue-700">سوالات تستی:</h3>
              <p>هر پاسخ صحیح:5 /2 امتیاز | پاسخ غلط: بدون امتیاز</p>
            </div>
            <div className="bg-green-50 p-3 rounded-lg">
              <h3 className="font-medium text-green-700">سوالات تشریحی:</h3>
              <p>حداکثر 5 امتیاز برای هر سوال (براساس کیفیت پاسخ)</p>
            </div>
          </div>
        </div>

        <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-6">
          <h3 className="font-bold text-yellow-700">⚠️ توجه:</h3>
          <p className="text-yellow-700">
            پس از پرداخت، امکان انصراف و بازگشت هزینه فقط تا 48 ساعت قبل از آزمون وجود دارد.
          </p>
        </div>

        <div className="bg-white border rounded-lg p-4 mb-6 shadow-sm">
          <h2 className="text-xl font-semibold text-gray-700 mb-3">💵 هزینه آزمون:</h2>
          <div className="flex justify-between items-center">
            <span className="text-gray-600">هزینه اصلی:</span>
            <span className="text-lg font-bold">7,000 تومان</span>
          </div>
          <div className="flex justify-between items-center mt-2">
            <span className="text-gray-600">تخفیف:</span>
            <span className="text-green-600">0% (7,000 تومان)</span>
          </div>
          <div className="border-t mt-3 pt-3 flex justify-between items-center">
            <span className="font-semibold">مبلغ قابل پرداخت:</span>
            <span className="text-xl font-bold text-blue-600">7,000 تومان</span>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mt-8">
         <button 
            onClick={() => navigate(-1)}
            className="px-6 py-3 border border-gray-300 rounded-lg text-blue-900 hover:bg-gray-100 transition w-full sm:w-auto"
          >
            بازگشت
          </button>
          <button 
            onClick={handlePayment}
            className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition w-full sm:w-auto"
          >
            پرداخت و ثبت نام
          </button>
        </div>
      </div>
    </div>
  );
};

export default ExamRulesAndPayment;