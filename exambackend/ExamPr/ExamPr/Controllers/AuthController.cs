using ExamPr.Core.Interfaces;
using ExamPr.DTOs;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;
using System.IdentityModel.Tokens.Jwt;
using Microsoft.AspNetCore.Identity;
using ExamPr.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Cors;
namespace ExamPr.Controllers
{

    [ApiController]
    [Route("api/[controller]")]
    [EnableCors("AllowSpecificOrigins")] // استفاده از policy تعریف شده
    public class AuthController : Controller
    {
        //    private readonly IUnitOfWork _uow;
        //    private readonly IAuthService _authService;
        //    //private readonly UserManager<ApplicationUser> _userManager;
        //    public AuthController(IAuthService authService, IUnitOfWork uow )
        //    {
        //        _authService = authService;
        //        _uow = uow;

        //    }
        //    // در Controller خود (مثلا AccountController)
        //    //[Authorize]
        //    //[HttpGet("userinfo")]
        //    //public async Task<IActionResult> GetUserInfo()
        //    //{
        //    //    var NCode = User.FindFirstValue(ClaimTypes.Name);
        //    //    //var nationalCode = User.FindFirst(NCode);
        //    //    if (string.IsNullOrEmpty(NCode))
        //    //        return Unauthorized();

        //    //    var user = await _uow.Users.GetByNationalCodeAsync(NCode);

        //    //    if (user == null)
        //    //    {
        //    //        return NotFound();
        //    //    }

        //    //    return Ok(new
        //    //    {
        //    //        user.FirstName,
        //    //        user.LastName,

        //    //        // سایر اطلاعات مورد نیاز
        //    //    });
        //    //}


        //    //=================

        //    [HttpGet("{nationalcod}")]
        //    public async Task<IActionResult> GetProfile(string nationalcod)
        //    {
        //        var nationalCode = User.FindFirst(nationalcod);
        //        if (string.IsNullOrEmpty(nationalcod))
        //            return Unauthorized();

        //        var user = await _uow.Users.FindAsync(nationalcod);
        //        if (user == null)
        //            return NotFound("User not found");

        //        return Ok(user);
        //    }


        //    [HttpPost("register")]
        //    public async Task<IActionResult> Register(RegisterDto dto)
        //    {
        //        var result = await _authService.RegisterAsync(dto);
        //        if (!result) return BadRequest("کاربر با این کد ملی وجود دارد");
        //        return Ok("ثبت‌نام موفق بود");
        //    }

        //    [HttpPost("login")]
        //    public async Task<IActionResult> Login(LoginDto dto)
        //    {
        //        var token = await _authService.LoginAsync(dto);
        //        if (token == null) return Unauthorized("کاربری با این کد ملی پیدا نشد");
        //        return Ok(new { token });
        //    }



        //==================================================================================

        
        private readonly IUserRepository _userRepository;
        private readonly IAuthService _authService;
        private readonly IUnitOfWork _unitOfWork;
        public AuthController( IUserRepository userRepository,IAuthService authService,IUnitOfWork unitOfWork)
        {
           
            _userRepository = userRepository;
            _authService = authService;
            _unitOfWork = unitOfWork;
        }

        [HttpGet("{nationalcod}")]
        public async Task<IActionResult> GetProfile(string nationalcod)
        {
            var nationalCode = User.FindFirst(nationalcod);
            if (string.IsNullOrEmpty(nationalcod))
                return Unauthorized();

            var user = await _userRepository.GetByNationalCodeAsync(nationalcod);
            if (user == null)
                return NotFound("User not found");

            return Ok(user);
        }

        [HttpPost("register")]
        public async Task<IActionResult> Register(RegisterDto dto)
        {
            var result = await _authService.RegisterAsync(dto);
            if (!result) return BadRequest("کاربر با این کد ملی وجود دارد");
            return Ok("ثبت‌نام موفق بود");
        }

        [HttpPost("login")]
        public async Task<IActionResult> Login(LoginDto dto)
        {
           
            var token = await _authService.LoginAsync(dto);
            
            if (token == null) return NotFound("کاربری با این کد ملی پیدا نشد");
            return Ok(token);
        }


        //=========================

        // GET: api/Courses
        // دریافت تمام دوره‌ها، شامل زیرمجموعه‌ها و نمونه سوالات آنها (با گزینه‌های دنرمال‌شده)
        //[HttpGet]
        //public async Task<ActionResult<IEnumerable<Course>>> GetCourses()
        //{
        //    // استفاده از Include از GenericRepository
        //    var courses = await _unitOfWork.Courses
        //                                   .Include(c => c.Subcategories)
        //                                   .ThenInclude(cs => cs.SampleQuestions)
        //                                   .ToListAsync(); // ToListAsync باید روی IQueryable فراخوانی شود

        //    return Ok(courses);
        //}

        //    // GET: api/Courses/5
        //    // دریافت یک دوره خاص با شناسه، شامل زیرمجموعه‌ها و نمونه سوالات آنها (با گزینه‌های دنرمال‌شده)
        //    [HttpGet("{id}")]
        //    public async Task<ActionResult<Course>> GetCourse(int id)
        //    {
        //        var course = await _unitOfWork.Courses
        //                                      .Include(c => c.Subcategories)
        //                                      .ThenInclude(cs => cs.SampleQuestions)
        //                                      .FirstOrDefaultAsync(c => c.CourseId == id); // FirstOrDefaultAsync روی IQueryable

        //        if (course == null)
        //        {
        //            return NotFound();
        //        }

        //        return Ok(course);
        //    }

        //    // POST: api/Courses
        //    // ایجاد یک دوره جدید
        //    [HttpPost]
        //    public async Task<ActionResult<Course>> PostCourse(Course course)
        //    {
        //        await _unitOfWork.Courses.AddAsync(course);
        //        await _unitOfWork.CompleteAsync(); // ذخیره تغییرات

        //        return CreatedAtAction(nameof(GetCourse), new { id = course.CourseId }, course);
        //    }

        //    // PUT: api/Courses/5
        //    // به‌روزرسانی یک دوره موجود
        //    [HttpPut("{id}")]
        //    public async Task<IActionResult> PutCourse(int id, Course course)
        //    {
        //        if (id != course.CourseId)
        //        {
        //            return BadRequest();
        //        }

        //        // بررسی وجود دوره قبل از به‌روزرسانی
        //        var existingCourse = await _unitOfWork.Courses.GetByIdAsync(id);
        //        if (existingCourse == null)
        //        {
        //            return NotFound();
        //        }

        //        // به‌روزرسانی موجودیت موجود
        //        existingCourse.Title = course.Title;
        //        existingCourse.Description = course.Description;
        //        _unitOfWork.Courses.Update(existingCourse); // Update موجودیت ردیابی شده

        //        try
        //        {
        //            await _unitOfWork.CompleteAsync(); // ذخیره تغییرات
        //        }
        //        catch (DbUpdateConcurrencyException) // این خطا باید در لایه بالاتر مدیریت شود یا نیاز به GetByIdAsync قبل از Update دارد
        //        {
        //            if (!await CourseExists(id))
        //            {
        //                return NotFound();
        //            }
        //            else
        //            {
        //                throw;
        //            }
        //        }

        //        return NoContent();
        //    }

        //    // DELETE: api/Courses/5
        //    // حذف یک دوره
        //    [HttpDelete("{id}")]
        //    public async Task<IActionResult> DeleteCourse(int id)
        //    {
        //        var course = await _unitOfWork.Courses.GetByIdAsync(id);
        //        if (course == null)
        //        {
        //            return NotFound();
        //        }

        //        _unitOfWork.Courses.Remove(course);
        //        await _unitOfWork.CompleteAsync(); // ذخیره تغییرات

        //        return NoContent();
        //    }

        //    // متد کمکی برای بررسی وجود دوره
        //    private async Task<bool> CourseExists(int id)
        //    {
        //        var course = await _unitOfWork.Courses.GetByIdAsync(id);
        //        return course != null;
        //    }
    }
}
