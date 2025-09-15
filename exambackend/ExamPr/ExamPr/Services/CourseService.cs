using ExamPr.Core.Interfaces;
using ExamPr.DTOs;
using ExamPr.Models;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.Mvc;

namespace ExamPr.Services
{
    public class CourseService : ICourseService

    {
        private readonly IUnitOfWork _unitOfWork;

        public CourseService(IUnitOfWork unitOfWork)
        {
            _unitOfWork = unitOfWork;
        }

        public async  Task AddCourse(CourseDTO course)
        {
            var result = new Course {
                 CourseName=course.CourseName,
                 CourseDescription=course.CourseDescription
                
            
            };

            await _unitOfWork.Courses.AddAsync(result);
            await _unitOfWork.CompleteAsync();
        }

        public async Task DeleteCourse(int id)
        {
         
           var result= await _unitOfWork.Courses.GetByIdAsync(id);
            _unitOfWork.Courses.Delete(result);
            await _unitOfWork.CompleteAsync();
        }

        public async Task<IEnumerable<CourseDTO>> GetAllCourses()
        {
            var result= await _unitOfWork.Courses.GetAllAsync();
            var corsedto = result.Select(c => new CourseDTO
            {
                // Map properties here
                CourseId = c.CourseId,
                CourseName = c.CourseName,
                CourseDescription = c.CourseDescription,
                // ... other properties
            });

            return corsedto.ToList();
        }

        public async Task<CourseDTO> GetAllCoursesDTO(int id)
        {

            var result = await _unitOfWork.Courses.FindOneAsync( n=> n.CourseId==id);

            if (result==null)
                return null;

            var corsedto=  new CourseDTO
            {
                // Map properties here
                CourseId = result.CourseId,
                CourseName = result.CourseName,
                CourseDescription = result.CourseDescription,
                // ... other properties
            };

            return corsedto;

        }

        public  async Task<Course> GetCourseById(int id)
        {
            var result= await _unitOfWork.Courses.GetByIdAsync(id);

            return result;
        }

        public async Task UpdateCourseAsync( CourseDTO courseDto)
        {
            // 1. یافتن دوره موجود در دیتابیس
            var existingCourse = await _unitOfWork.Courses.GetByIdAsync( courseDto.CourseId);
            if (existingCourse == null)
                throw new KeyNotFoundException("دوره مورد نظر یافت نشد");

            // 2. به‌روزرسانی مقادیر
            existingCourse.CourseId = courseDto.CourseId;
            existingCourse.CourseName = courseDto.CourseName;
            existingCourse.CourseDescription = courseDto.CourseDescription;
            // سایر فیلدها...

            // 3. ذخیره تغییرات
            _unitOfWork.Courses.Update(existingCourse);
            await _unitOfWork.CompleteAsync();

            // 4. بازگرداندن DTO به‌روزرسانی شده
            //return new CourseDTO
            //{
            //    CourseId = existingCourse.CourseId,
            //    CourseName = existingCourse.CourseName,
            //    CourseDescription = existingCourse.CourseDescription
            //    // سایر فیلدها...
            //};
        }
    }
}
