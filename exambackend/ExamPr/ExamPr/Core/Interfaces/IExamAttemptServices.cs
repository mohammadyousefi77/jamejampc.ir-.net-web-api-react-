using ExamPr.DTOs;
using ExamPr.Models;

namespace ExamPr.Core.Interfaces
{
    public interface IExamAttemptServices
    {

        Task<ExamAttemptDTO> GetCourseById(int id);
        Task<IEnumerable<ExamAttemptDTO>> GetAllCourses();
        Task AddCourse(ExamAttemptDTO course);
        //Task UpdateCourseAsync(CourseDTO course);
        Task DeleteCourse(int id);

        //Task<CourseDTO> GetAllCoursesDTO(int id);
    }
}
