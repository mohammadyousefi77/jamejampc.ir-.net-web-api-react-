using ExamPr.Core.Interfaces;
using ExamPr.DTOs;
using ExamPr.Models;
using System.Security.Claims;
using System.Text;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
namespace ExamPr.Services
{
    public class AuthService : IAuthService
    {
        private readonly IUnitOfWork _unitOfWork;
       private readonly IUserRepository _userRepository;

        public AuthService(IUnitOfWork unitOfWork,IUserRepository userRepository)
        {
            _unitOfWork = unitOfWork;
            _userRepository = userRepository;
        }


        //public async Task<string?> LoginAsync(LoginDto dto)
        //{
        //    var user = await _unitOfWork.Users.GetByNationalCodeAsync(dto.NationalCode);
        //    if (user == null) return null;

        //    var claims = new[]
        //    {
        //    new Claim(ClaimTypes.NameIdentifier, user.Id),
        //    new Claim(ClaimTypes.Name, user.NationalCode),

        //};

        //    var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_config["Jwt:Key"]!));
        //    var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);
        //    var token = new JwtSecurityToken(claims: claims, expires: DateTime.Now.AddDays(1), signingCredentials: creds);

        //    var result= new JwtSecurityTokenHandler().WriteToken(token);
        //    return result;
        //}

        public async Task<string?> LoginAsync(LoginDto dto)
        {
            //var user = await _unitOfWork.Users.FindOneAsync(dto.NationalCode);
            
            var user=await _userRepository.GetByNationalCodeAsync(dto.NationalCode);
            if (user == null) return null;

            //        var claims = new[]
            //        {
            //    new Claim(ClaimTypes.NameIdentifier, user.Id.ToString()),
            //    new Claim(ClaimTypes.Name, user.NationalCode),
            //    new Claim(JwtRegisteredClaimNames.Sub, user.Id.ToString()),
            //    new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString())
            //};

            //        var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_config["Jwt:Key"]!));
            //        var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);

            //        var token = new JwtSecurityToken(
            //            issuer: _config["Jwt:Issuer"],
            //            audience: _config["Jwt:Audience"],
            //            claims: claims,
            //            expires: DateTime.UtcNow.AddDays(1),
            //            signingCredentials: creds);

            //        var result = new JwtSecurityTokenHandler().WriteToken(token);
            //return result;

            return user.ToString();
        }


        public async Task<bool> RegisterAsync(RegisterDto dto)
        {
            var existing = await _userRepository.GetByNationalCodeAsync(dto.NationalCode);
            if (existing != null) return false;

            var user = new ApplicationUser
            {
                UserName = dto.NationalCode,
                FirstName = dto.FirstName,
                LastName = dto.LastName,
                NationalCode = dto.NationalCode,
                PhoneNumber = dto.PhoneNumber
            };

            await _userRepository.AddAsync(user);
            await _unitOfWork.CompleteAsync();

            return true;
        }
    }
}
