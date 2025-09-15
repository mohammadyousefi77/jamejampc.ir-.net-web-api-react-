using ExamPr.Core.Interfaces;
using ExamPr.Data;
using ExamPr.DTOs;
using ExamPr.Models;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;

namespace ExamPr.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    [EnableCors("AllowSpecificOrigins")] // استفاده از policy تعریف شده
    public class CoursesController : Controller
    {
        private readonly ICourseService _courseService;
        private readonly IUnitOfWork _unitOfWork;
        public CoursesController(ICourseService courseService, IUnitOfWork unitOfWork)
        {
            _courseService = courseService;
            _unitOfWork = unitOfWork;
        }


        [HttpGet("{id}")]
        public async Task<IActionResult> GetById(int id)
        {
            var course = await _courseService.GetCourseById(id);
            return Ok(course);
        }

        [HttpGet("GetAll")]
        public async Task<IActionResult> GetAll()
        {
            var courses = await _courseService.GetAllCourses();
            return Ok(courses);
        }

        [HttpPost]
        public async Task<IActionResult> Create( [FromBody]CourseDTO course)
        {
            await _courseService.AddCourse(course);
            return CreatedAtAction(nameof(GetById), new { id = course.CourseId }, course);
           
        }
        [HttpPut("Update")]
        public async Task<IActionResult> Update( CourseDTO course)
        {



        

         await  _courseService.UpdateCourseAsync(course);
            return Ok();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            
            await _courseService.DeleteCourse(id);
            return Ok();
        }


        [HttpGet("GetCoursesDTOByCourse/{courseId}")]
        public async Task<ActionResult<CourseDTO>> GetCourseDTOByIdAsync(int courseId)
        {
            //var result = await _unitOfWork.Courses.FindAsync(n => n.CourseId == courseId);

            //if (!result.Any())
            //    return NotFound();

            //var resultt = result.Select(s => new CourseDTO
            //{
            //    CourseId = s.CourseId,
            //    CourseName = s.CourseName,
            //    CourseDescription = s.CourseDescription
            //}).ToList();

            //return resultt;

            var result = await _courseService.GetAllCoursesDTO(courseId);
            return  Ok(result);

        }
    }
}
