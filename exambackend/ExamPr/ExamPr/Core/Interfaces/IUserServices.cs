using ExamPr.DTOs;
using ExamPr.Models;

namespace ExamPr.Core.Interfaces
{
    public interface IUserServices
    {
       Task <IEnumerable<User>> GetAllUser();

        Task<User> GetUserByNcode(string ncode);
        Task DeletUserByNCode(string ncode);

        Task UpdateUserAsync(User user);



    }
}
