import axios from "axios";

const api = axios.create({
  baseURL: "https://examui.jamejampc.ir/api/SampleQuestion/GetSubCoursesByCourse", // آدرس سرور خود را قرار دهید
});

export const getExamQuestions = async (courseId) => {
  const response = await api.get(`${courseId}`);
  return response.data;
};
