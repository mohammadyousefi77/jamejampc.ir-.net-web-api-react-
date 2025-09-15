using ExamPr.DTOs;
using ExamPr.Models;

namespace ExamPr.Core.Interfaces
{
    public interface IAuthService
    {
        Task<string?> LoginAsync(LoginDto dto);
        Task<bool> RegisterAsync(RegisterDto dto);
    }
}
