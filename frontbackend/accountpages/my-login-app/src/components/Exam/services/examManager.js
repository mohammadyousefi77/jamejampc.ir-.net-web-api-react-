export const ExamManager = {
  startExam: (examId) => {
    sessionStorage.setItem('examInProgress', examId);
  },

  isExamInProgress: () => {
    return !!sessionStorage.getItem('examInProgress');
  },

  getCurrentExam: () => {
    return sessionStorage.getItem('examInProgress');
  },

  endExam: () => {
    sessionStorage.removeItem('examInProgress');
  }
};