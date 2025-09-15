using ExamPr.Core.Interfaces;
using ExamPr.DTOs;
using ExamPr.Models;
using Microsoft.AspNetCore.Http.HttpResults;

namespace ExamPr.Services
{
    public class ExamAttemptServices : IExamAttemptServices
    {
        private readonly IUnitOfWork _unitOfWork;
        public ExamAttemptServices(IUnitOfWork unitOfWork)
        {
            _unitOfWork = unitOfWork;
        }
        public async Task AddCourse(ExamAttemptDTO course)
        {
           

            var exists = await _unitOfWork.CourseSubcategories
                   .FindOneAsync(c => c.CourseSubcategoryId == course.CourseSubcategoryId);


            if (exists==null)
            {
                throw new KeyNotFoundException("زیردسته مورد نظر یافت نشد");
            }
            var result = new ExamAttempt
            {

                UserId = course.UserId,
                CourseSubcategoryId = course.CourseSubcategoryId,
                AmountPaid = course.AmountPaid,
                AttemptDate = course.AttemptDate



            };

            await _unitOfWork.ExamAttempts.AddAsync(result);

            await _unitOfWork.CompleteAsync();
        }

        public async Task DeleteCourse(int id)
        {
            var result = await _unitOfWork.ExamAttempts.GetByIdAsync(id);
             _unitOfWork.ExamAttempts.Delete(result);

            await _unitOfWork.CompleteAsync();
        }

        public async Task<IEnumerable<ExamAttemptDTO>> GetAllCourses()
        {
          
          var result=  await  _unitOfWork.ExamAttempts.GetAllAsync();

            var exam =  result.Select(n => new ExamAttemptDTO
            {
                ExamAttemptId = n.ExamAttemptId,
                UserId = n.UserId,
                CourseSubcategoryId = n.CourseSubcategoryId,
                AmountPaid = n.AmountPaid,
                AttemptDate = n.AttemptDate,

            });

            return  exam.ToList();
        }

        public async Task<ExamAttemptDTO> GetCourseById(int id)
        {
            var result = await _unitOfWork.ExamAttempts.FindOneAsync(n => n.ExamAttemptId == id);
            if (result == null)
                return null;
            var exam =  new ExamAttemptDTO
            {
                ExamAttemptId = result.ExamAttemptId,
                UserId = result.UserId,
                CourseSubcategoryId = result.CourseSubcategoryId,
                AmountPaid = result.AmountPaid,
                AttemptDate = result.AttemptDate,

            };
            return exam;
        }

      
    }
}
