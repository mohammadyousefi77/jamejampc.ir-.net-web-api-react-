using ExamPr.Core.Interfaces;
using ExamPr.Data;
using ExamPr.DTOs;
using ExamPr.Models;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace ExamPr.Services
{
    //public class JwtService : IJwtService
    //{
    //    //private readonly IConfiguration _config;
    //    //private readonly IUnitOfWork _unitOfWork;
    //    //public JwtService(IConfiguration config, IUnitOfWork unitOfWork)
    //    //{
    //    //    _config = config;
    //    //    _unitOfWork = unitOfWork;
    //    //}

     
    //    //public string GenerateToken(LoginDto dto)
    //    //{
    //    //    var user =  _unitOfWork.Users.GetByNationalCodeAsync(dto.NationalCode);
    //    //    if (user == null) return null;
    //    //    var claims = new[]
    //    //   {
    //    //    new Claim(ClaimTypes.NameIdentifier, user.Id),
    //    //    new Claim(ClaimTypes.Name, user.NationalCode)
    //    //};

    //    //    var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_config["Jwt:Key"]!));
    //    //    var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);
    //    //    var token = new JwtSecurityToken(claims: claims, expires: DateTime.Now.AddDays(1), signingCredentials: creds);

    //    //    return new JwtSecurityTokenHandler().WriteToken(token);
    //    //}
    //}
}
