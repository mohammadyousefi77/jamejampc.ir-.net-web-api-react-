using ExamPr.Core.Interfaces;
using ExamPr.Models;

namespace ExamPr.Services
{
    public class UserServices : IUserServices
    {
        private readonly IUnitOfWork _unitOfWork;
        public UserServices(IUnitOfWork unitOfWork)
        {
            _unitOfWork = unitOfWork;
        }

        public async Task DeletUserByNCode(string ncode)
        {
            var result = await _unitOfWork.Users.FindOneAsync(n=>n.NationalCode==ncode);
            if (result == null)
                throw new KeyNotFoundException("شخص مورد نظر با کد ملی وارد شده پیدا نشد");

            _unitOfWork.Users.Delete(result);
            await _unitOfWork.CompleteAsync();


        }

        public async Task<IEnumerable<User>> GetAllUser()
        {
            var result= await _unitOfWork.Users.GetAllAsync();

            var users =  result.Select(m=>new User { 
            Id=m.Id,
            FirstName=m.FirstName,
            LastName=m.LastName,
            NationalCode=m.NationalCode,
            PhoneNumber  = m.PhoneNumber
            });

            return users.ToList();

        }

        public async Task<User> GetUserByNcode(string ncode)
        {
            var result = await _unitOfWork.Users.FindOneAsync(n => n.NationalCode == ncode);
            if (result == null)
                throw new KeyNotFoundException("شخص مورد نظر با کد ملی وارد شده پیدا نشد");

            var Getuser = new User
            {
                Id = result.Id,
                FirstName = result.FirstName,
                LastName = result.LastName,
                NationalCode = result.NationalCode,
                PhoneNumber = result.PhoneNumber,
            };
            return Getuser;
        }

        public async Task UpdateUserAsync(User user)
        {
            var result = await _unitOfWork.Users.FindOneAsync(n=> n.Id==user.Id);
            if (result == null)
                throw new KeyNotFoundException("شخص مورد نظر با کد ملی وارد شده پیدا نشد");

            result.FirstName = user.FirstName;
            result.LastName = user.LastName;
            result.NationalCode = user.NationalCode;
            result.PhoneNumber = user.PhoneNumber;

            await _unitOfWork.CompleteAsync();

        }
    }
}
