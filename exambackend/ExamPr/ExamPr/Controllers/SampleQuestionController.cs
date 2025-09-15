using ExamPr.Core.Interfaces;
using ExamPr.DTOs;
using ExamPr.Models;
using ExamPr.Services;
using Microsoft.AspNetCore.Mvc;

namespace ExamPr.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class SampleQuestionController : Controller
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly ISampleQuestionServices _sampleQuestionServices;

        public SampleQuestionController(IUnitOfWork unitOfWork, ISampleQuestionServices sampleQuestionServices)
        {
            _unitOfWork = unitOfWork;
            _sampleQuestionServices = sampleQuestionServices;
        }



        [HttpGet("GetSubCoursesByCourse/{CourseSubcategoryId}")]
        public async Task<ActionResult<List<SampleQuestionDto>>> GetSubcategoriesByCourseIdAsync(int CourseSubcategoryId)
        {
            var result = await _unitOfWork.SampleQuestions.FindAsync(n => n.CourseSubcategoryId == CourseSubcategoryId);

            if (!result.Any())
                return NotFound();

            var resultt = result.Select(s => new SampleQuestionDto
            {
               SampleQuestionId = s.SampleQuestionId,
               QuestionText = s.QuestionText,
               Option1=s.Option1,
               Option2 = s.Option2,
               Option3 = s.Option3,
               Option4 = s.Option4,
               Answer=s.Answer,
               CorrectOptionIndex=s.CorrectOptionIndex

            }).ToList();

            return Ok(result);
        }


        [HttpGet("AllSampleQuestionDTO")]
        public async Task<ActionResult<IEnumerable<SampleQuestionDto>>> GetSampleQuestion()
        {
            var result = await _sampleQuestionServices.GetAllSampleQuestion();

            if (!result.Any())
                return NotFound();

          

            return result.ToList();
        }

        [HttpGet("GetById{id}")]
        public async Task<IActionResult> GetById(int id)
        {
            var course = await _sampleQuestionServices.GetSampleQuestionById(id);
            return Ok(course);
        }

        [HttpPost("Add")]
        public async Task<IActionResult> Create([FromBody] SampleQuestionDto course)
        {
            await _sampleQuestionServices.AddSampleQuestion(course);
            return CreatedAtAction(nameof(GetById), new { id = course.SampleQuestionId }, course);

        }
        [HttpPut("Update")]
        public async Task<IActionResult> Update(SampleQuestionDto course)
        {





            await _sampleQuestionServices.UpdateSampleQuestionAsync(course);
            return Ok();
        }

        [HttpDelete("Delete/{id}")]
        public async Task<IActionResult> Delete(int id)
        {

            await _sampleQuestionServices.DeleteSampleQuestion(id);
            return Ok();
        }



    }
}
