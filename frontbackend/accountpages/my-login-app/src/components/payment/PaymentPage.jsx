// import React from 'react';
// import { useLocation } from 'react-router-dom';

// const PaymentPage = () => {
//   const location = useLocation();
//   const { course } = location.state || {};

//   return (
//     <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md mt-10">
//       <h2 className="text-xl font-bold mb-4">پرداخت هزینه دوره</h2>
//       {/* فرم پرداخت */}
//     </div>
//   );
// };

// export default PaymentPage;

import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';

const PaymentPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
const {course} = location.state || {};
  const [paymentLoading, setPaymentLoading] = useState(false);
  const [paymentError, setPaymentError] = useState('');
  const [paymentSuccess, setPaymentSuccess] = useState(false);
  const sharedData=location.state.course;
const id=location.state.id;


  // اطلاعات دوره و کاربر
  const [paymentInfo, setPaymentInfo] = useState({
    courseName: sharedData || 'دوره ناشناخته',
    price: sharedData?.price || 7000,
    discount: 0,
    finalPrice: sharedData?.price || 7000,
    userNationalId: location.state.nationalCode ||''
  });

//   useEffect(() => {
//     if (!course || !nationalCode) {
//       navigate('/'); // اگر اطلاعات لازم نباشند به خانه برگردان
//     }
//   }, [course, nationalCode, navigate]);

  const handlePayment = async () => {
    setPaymentLoading(true);
    setPaymentError('');

    try {
       
      // شبیه سازی پرداخت - در عمل باید به درگاه بانکی متصل شود
    //   const response = await axios.post('https://zarinp.al/enigma98', {
       
    //     nationalCode,
    //     amount: paymentInfo.finalPrice
    //   });

    //   if (response.data) {
    //     setPaymentSuccess(true);
    //     setTimeout(() => {
    //       navigate('/payment-confirmation', { 
    //         state: { 
    //           course,
    //           paymentId: response.data.paymentId 
    //         }
    //       });
    //     }, 2000);
    //   }

    setPaymentSuccess(true);
        setTimeout(() => {
          navigate('/payment-confirmation',
             { 
            state: { 
            course:sharedData,
            id
            //   paymentId: response.data.paymentId 
            }
          }
        
        );
        }, 2000);
    } 
    catch (error) {
      setPaymentError('خطا در پردازش پرداخت. لطفاً مجدداً تلاش کنید.');
      console.error('Payment error:', error);
    } finally {
      setPaymentLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md mt-10">
      <h2 className="text-2xl font-bold text-center mb-6">درگاه پرداخت </h2>
      
      <div className="mb-6">
        <h3 className="text-xl font-semibold mb-2">{paymentInfo.courseName}</h3>
        
        <div className="bg-gray-50 p-4 rounded-lg mb-4">
          <div className="flex justify-between mb-2">
            <span>مبلغ دوره:</span>
            <span>{paymentInfo.price.toLocaleString()} تومان</span>
          </div>
          <div className="flex justify-between mb-2">
            <span>تخفیف:</span>
            <span className="text-green-600">{paymentInfo.discount.toLocaleString()} تومان</span>
          </div>
          <div className="flex justify-between border-t pt-2 font-bold">
            <span>مبلغ قابل پرداخت:</span>
            <span className="text-blue-600">{paymentInfo.finalPrice.toLocaleString()} تومان</span>
          </div>
        </div>

        <div className="mb-4">
          <label className="block mb-2">کد ملی:</label>
          <input
            type="text"
            value={paymentInfo.userNationalId}
            readOnly
            className="w-full p-2 border rounded bg-gray-100"
          />
        </div>
      </div>

      {paymentError && (
        <div className="bg-red-50 border border-red-200 text-red-700 p-3 rounded mb-4">
          {paymentError}
        </div>
      )}

      {paymentSuccess ? (
        <div className="bg-green-50 border border-green-200 text-green-700 p-3 rounded mb-4">
          پرداخت با موفقیت انجام شد. در حال انتقال...
        </div>
      ) : (
        <button
          onClick={handlePayment}
          disabled={paymentLoading}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg transition disabled:opacity-50"
        >
          {paymentLoading ? (
            <span className="flex items-center justify-center">
              <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              در حال اتصال به درگاه پرداخت...
            </span>
          ) : (
            'پرداخت'
          )}
        </button>
      )}

      <button
        onClick={() => navigate(-1)}
        className="w-full mt-4 border border-gray-300 text-gray-700 py-2 rounded-lg hover:bg-gray-50 transition"
      >
        بازگشت
      </button>
    </div>
  );
};

export default PaymentPage;