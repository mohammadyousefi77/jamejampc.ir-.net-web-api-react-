using ExamPr.Core.Interfaces;
using ExamPr.Models;
using Microsoft.AspNetCore.Mvc;

namespace ExamPr.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class UserController : Controller
    {
        private readonly IUserServices _userServices;
        public UserController(IUserServices userServices)
        {
          _userServices = userServices;
        }

        [HttpGet("GetAllUsers")]
        public async Task<IActionResult> AllUsers()
        {
            var result =  await _userServices.GetAllUser();
            
            return Ok(result);
        }

        [HttpPut("Updateuser")]

        public async Task<IActionResult> Updateuser(User user)
        {
          await  _userServices.UpdateUserAsync(user);

            return Ok("ویرایش با مووفقیت انجام شد");
        }

        [HttpDelete("Deleteuser/{ncode}")]

        public async Task<IActionResult> Deleteuser(string ncode)
        {
            await _userServices.DeletUserByNCode(ncode);

            return Ok(" حذف با مووفقیت انجام شد");
        }
    }
}
