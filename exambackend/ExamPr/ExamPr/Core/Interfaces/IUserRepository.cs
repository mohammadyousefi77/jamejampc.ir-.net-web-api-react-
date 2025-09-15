using ExamPr.Models;

namespace ExamPr.Core.Interfaces
{
    public interface IUserRepository
    {
        Task<ApplicationUser?> GetByNationalCodeAsync(string nationalCode);
        Task AddAsync(ApplicationUser user);
    }
}
