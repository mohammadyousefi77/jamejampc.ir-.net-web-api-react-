using ExamPr.Core.Interfaces;
using ExamPr.DTOs;
using ExamPr.Models;

namespace ExamPr.Services
{
    public class CourseSubcategoryServices : ICourseSubcategoryServices
    {
        private readonly IUnitOfWork _unitOfWork;

        public CourseSubcategoryServices(IUnitOfWork unitOfWork)
        {
            _unitOfWork = unitOfWork;
        }

      
        public async Task AddSubCourse(CourseSubcategoryDTO course)
        {
            await _unitOfWork.CourseSubcategories.AddAsync(new CourseSubcategory { 
            //CourseSubcategoryId=course.CourseSubcategoryId,
            Title= course.Title,
            Description= course.Description,
            CourseId=course.CourseId,
            
            });
            await _unitOfWork.CompleteAsync();
        }

        public async Task DeleteSubCourse(int id)
        {
            var result= await _unitOfWork.CourseSubcategories.GetByIdAsync(id);
            _unitOfWork.CourseSubcategories.Delete(result);
            await _unitOfWork.CompleteAsync();
        }

        public async Task<IEnumerable<CourseSubcategoryDTO>> GetAllSubCourses()
        {
            var result = await _unitOfWork.CourseSubcategories.GetAllAsync();
            var corsedto = result.Select(c => new CourseSubcategoryDTO
            {
                // Map properties here
              CourseSubcategoryId=c.CourseSubcategoryId,
              Title=c.Title,
              Description=c.Description,
              CourseId =c.CourseId

                // ... other properties
            });

            return corsedto.ToList();
        }

        public Task<CourseSubcategoryDTO> GetAllSubCoursesDTO(int id)
        {
            throw new NotImplementedException();
        }

        public async Task<CourseSubcategory> GetSubCourseById(int id)
        {
            var result = await _unitOfWork.CourseSubcategories.GetByIdAsync(id);

            return result;
        }

        public async Task UpdateSubCourseAsync(CourseSubcategoryDTO course)
        {
            // 1. یافتن دوره موجود در دیتابیس
            var existingCourse = await _unitOfWork.CourseSubcategories.GetByIdAsync(course.CourseSubcategoryId);
            if (existingCourse == null)
                throw new KeyNotFoundException("دوره مورد نظر یافت نشد");

            // 2. به‌روزرسانی مقادیر
            existingCourse.CourseSubcategoryId = course.CourseSubcategoryId;
            existingCourse.Title = course.Title;
            existingCourse.Description = course.Description;
            existingCourse.CourseId = course.CourseId;
            // سایر فیلدها...

            // 3. ذخیره تغییرات
            _unitOfWork.CourseSubcategories.Update(existingCourse);
            await _unitOfWork.CompleteAsync();

        }
    }
}
