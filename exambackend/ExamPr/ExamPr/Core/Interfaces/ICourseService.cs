using ExamPr.DTOs;
using ExamPr.Models;

namespace ExamPr.Core.Interfaces
{
    public interface ICourseService
    {
        Task<Course> GetCourseById(int id);
        Task<IEnumerable<CourseDTO>> GetAllCourses();
        Task AddCourse(CourseDTO course);
        Task UpdateCourseAsync(CourseDTO course);
        Task DeleteCourse(int id);

        Task<CourseDTO> GetAllCoursesDTO(int id);
    }
}
