using ExamPr.Core.Interfaces;
using ExamPr.DTOs;
using ExamPr.Models;
using ExamPr.Services;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace ExamPr.Controllers
{

    [ApiController]
    [Route("api/[controller]")]
    public class SubCoursesController : Controller
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly ICourseSubcategoryServices _courseSubcategoryServices;


        public SubCoursesController(IUnitOfWork unitOfWork, ICourseSubcategoryServices courseSubcategoryServices)
        {
            _unitOfWork = unitOfWork;
            _courseSubcategoryServices = courseSubcategoryServices;
        }



        [HttpGet("GetSubCoursesByCourse/{courseId}")]
        public async Task<ActionResult<List<SubCourseDto>>> GetSubcategoriesByCourseIdAsync(int courseId)
        {
             var result= await  _unitOfWork.CourseSubcategories.FindAsync(n=>n.CourseId == courseId);

            if (!result.Any())
                return NotFound();

            var resultt = result.Select(s => new SubCourseDto
            {
                CourseSubcategoryId=s.CourseSubcategoryId,
                Title = s.Title,
                Description = s.Description
            }).ToList();

            return resultt;
        }

        [HttpGet("GetSubCoursesByCoursejson/{courseId}")]
        public async Task<JsonResult> GetSubcategories(int courseId)
        {
            var subcategories = await _unitOfWork.CourseSubcategories.FindAsync(n => n.CourseId == courseId);

            if (subcategories == null || !subcategories.Any())
            {
                return new JsonResult(new
                {
                    success = false,
                    message = "No subcategories found for this course."
                })
                {
                    StatusCode = StatusCodes.Status404NotFound
                };
            }

            return new JsonResult(new
            {
                success = true,
                data = subcategories
            });
        }


        [HttpGet("CourseSubcategoryDTO")]
        public async Task<ActionResult<IEnumerable<CourseSubcategoryDTO>>> GetSubcategories()
        {
            var result = await _unitOfWork.CourseSubcategories.GetAllAsync();

            if (!result.Any())
                return NotFound();

          var resultt =  await _courseSubcategoryServices.GetAllSubCourses();

            return  resultt.ToList();
        }

        [HttpGet("GetById{id}")]
        public async Task<IActionResult> GetById(int id)
        {
            var course = await _courseSubcategoryServices.GetSubCourseById(id);
            return Ok(course);
        }

        [HttpPost]
        public async Task<IActionResult> Create([FromBody] CourseSubcategoryDTO course)
        {
            await _courseSubcategoryServices.AddSubCourse(course);
            return CreatedAtAction(nameof(GetById), new { id = course.CourseSubcategoryId }, course);

        }
        [HttpPut("Update")]
        public async Task<IActionResult> Update(CourseSubcategoryDTO course)
        {





            await _courseSubcategoryServices.UpdateSubCourseAsync(course);
            return Ok();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {

            await _courseSubcategoryServices.DeleteSubCourse(id);
            return Ok();
        }


     



    }
}
