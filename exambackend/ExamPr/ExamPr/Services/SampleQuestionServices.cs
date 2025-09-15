using ExamPr.Core.Interfaces;
using ExamPr.DTOs;
using ExamPr.Models;

namespace ExamPr.Services
{
    public class SampleQuestionServices : ISampleQuestionServices
    {
        private readonly IUnitOfWork _unitOfWork;
        public SampleQuestionServices(IUnitOfWork unitOfWork)
        {
            _unitOfWork = unitOfWork;
        }
        public async Task AddSampleQuestion(SampleQuestionDto course)
        {
            await _unitOfWork.SampleQuestions.AddAsync(new SampleQuestion
            {
                QuestionText = course.QuestionText,
                Option1 = course.Option1,
                Option2 = course.Option2,
                Option3 = course.Option3,
                Option4 = course.Option4,
                Answer = course.Answer,
                CorrectOptionIndex = course.CorrectOptionIndex,
                CourseSubcategoryId = course.CourseSubcategoryId

            });
             
            await _unitOfWork.CompleteAsync();



        }

        public async Task DeleteSampleQuestion(int id)
        {
            var result = await _unitOfWork.SampleQuestions.GetByIdAsync(id);
            _unitOfWork.SampleQuestions.Delete(result);
            await _unitOfWork.CompleteAsync();

        }

        public async Task<IEnumerable<SampleQuestionDto>> GetAllSampleQuestion()
        {
            var result = await _unitOfWork.SampleQuestions.GetAllAsync();
            var corsedto =  result.Select(c => new SampleQuestionDto
            {
                // Map properties here
                SampleQuestionId   = c.SampleQuestionId,
                QuestionText = c.QuestionText,
                Option1 = c.Option1,
                Option2 = c.Option2,
                Option3 = c.Option3,
                Option4 = c.Option4,
                Answer= c.Answer,
                CorrectOptionIndex= c.CorrectOptionIndex,
                CourseSubcategoryId= c.CourseSubcategoryId

                // ... other properties
            });

            return corsedto.ToList();
        }

        public async Task<SampleQuestionDto> GetSampleQuestionById(int id)
        {
           var result= await _unitOfWork.SampleQuestions.GetByIdAsync(id);

            return  new SampleQuestionDto { 
           SampleQuestionId = id,
                QuestionText = result.QuestionText,
                Option1 = result.Option1,
           Option2 = result.Option2,
           Option3 = result.Option3,
           Option4 = result.Option4,
           Answer = result.Answer,
           CorrectOptionIndex= result.CorrectOptionIndex,
           CourseSubcategoryId= result.CourseSubcategoryId,
            
            };


        }

        public async Task UpdateSampleQuestionAsync(SampleQuestionDto course)
        {
            var existingCourse = await _unitOfWork.SampleQuestions.GetByIdAsync(course.SampleQuestionId);
            if (existingCourse == null)
                throw new KeyNotFoundException("دوره مورد نظر یافت نشد");

            // 2. به‌روزرسانی مقادیر
            existingCourse.SampleQuestionId = course.SampleQuestionId;
            existingCourse.QuestionText = course.QuestionText;
           existingCourse.Option1 = course.Option1;
            existingCourse.Option2 = course.Option2;
            existingCourse.Option3 = course.Option3;
            existingCourse.Option4 = course.Option4;
            existingCourse.Answer = course.Answer;
            existingCourse.CorrectOptionIndex = course.CorrectOptionIndex;
            existingCourse.CourseSubcategoryId= course.CourseSubcategoryId;
            // سایر فیلدها...

            // 3. ذخیره تغییرات
            _unitOfWork.SampleQuestions.Update(existingCourse);
            await _unitOfWork.CompleteAsync();
        }


    }
}
