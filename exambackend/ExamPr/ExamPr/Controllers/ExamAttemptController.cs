using ExamPr.Core.Interfaces;
using ExamPr.DTOs;
using ExamPr.Models;
using ExamPr.Services;
using Microsoft.AspNetCore.Mvc;

namespace ExamPr.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ExamAttemptController : Controller
    {
        private readonly IExamAttemptServices _examAttemptServices;
        public ExamAttemptController(IExamAttemptServices examAttemptServices)
        
        {
       _examAttemptServices = examAttemptServices;
        }

        [HttpGet("GetAllExamAttamp")]
        public async Task<IActionResult> GetAll()
        {
            var courses = await _examAttemptServices.GetAllCourses();
            return Ok(courses);
        }

        [HttpGet("GetExamAttamp/{id}")]
        public async Task<IActionResult> GetById(int id)
        {
            var course = await _examAttemptServices.GetCourseById(id);
            return Ok(course);
        }

        [HttpPost("Add ExamAttamp")]
        public async Task<IActionResult> Create([FromBody] ExamAttemptDTO course)
        {
            await _examAttemptServices.AddCourse(course);
            return CreatedAtAction(nameof(GetById), new { id = course.ExamAttemptId }, course);

        }
        [HttpDelete("Delete ExampAttampbyId/{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            await _examAttemptServices.DeleteCourse(id);
            return Ok("حذف  با مووفقیت انجام شد");
        }

    }
}
