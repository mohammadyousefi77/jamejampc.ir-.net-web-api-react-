using ExamPr.Core.Interfaces;
using ExamPr.Data;
using ExamPr.DTOs;
using ExamPr.Models;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using System.Linq.Expressions;

namespace ExamPr.Repositories
{
    public class UserRepository : IUserRepository
    {
        //private readonly AppDbContext _context;
        //public UserRepository(AppDbContext context)
        //{
        //    _context = context;
        //}

        private readonly IUnitOfWork _unitOfWork;

        public UserRepository(IUnitOfWork unitOfWork)
        {
            _unitOfWork = unitOfWork;
        }

        public async Task AddAsync(ApplicationUser user)
        {
           await _unitOfWork.Users.AddAsync(user);
        }

        public async Task<ApplicationUser?> GetByNationalCodeAsync(string nationalCode)
        {
            return await _unitOfWork.Users.FindOneAsync(n=> n.NationalCode==nationalCode);
        }


        //public async Task AddAsync(ApplicationUser user)
        //{
        //    await _context.Users.AddAsync(user);
        //}

        //public async Task<ApplicationUser?> GetByNationalCodeAsync(string nationalCode)
        //{
        //    return await _context.Users.FirstAsync();
        //}

    }
}
