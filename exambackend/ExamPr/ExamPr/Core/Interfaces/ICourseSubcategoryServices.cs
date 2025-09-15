using ExamPr.DTOs;
using ExamPr.Models;

namespace ExamPr.Core.Interfaces
{
    public interface ICourseSubcategoryServices
    {

        Task<CourseSubcategory> GetSubCourseById(int id);
        Task<IEnumerable<CourseSubcategoryDTO>> GetAllSubCourses();
        Task AddSubCourse(CourseSubcategoryDTO course);
        Task UpdateSubCourseAsync(CourseSubcategoryDTO course);
        Task DeleteSubCourse(int id);

        Task<CourseSubcategoryDTO> GetAllSubCoursesDTO(int id);
    }
}
