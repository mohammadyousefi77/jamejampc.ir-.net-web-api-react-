using ExamPr.Core.Interfaces;
using ExamPr.Models;
using ExamPr.Repositories;

namespace ExamPr.Data
{
    public class UnitOfWork : IUnitOfWork
    {

        //public IUserRepository Users { get; }

        //public IRepository<Course> Courses {  get; }

        private readonly AppDbContext _context;

        // پراپرتی‌های Repositoryها
        private IRepository<Course> _courses;
        private IRepository<CourseSubcategory> _courseSubcategories;
        private IRepository<SampleQuestion> _sampleQuestions;
        //private IRepository<User> _users;
        public IRepository<ApplicationUser> _users;
        private IRepository<ExamAttempt> _examAttempts;
        //private IRepository<Payment> _payments;

        public UnitOfWork(AppDbContext context)
        {
            _context = context;
        
            //Courses=new Repository<Course>(context);
        }

        // پیاده‌سازی Lazy Loading برای Repositoryها
        public IRepository<Course> Courses => _courses ??= new Repository<Course>(_context);
        public IRepository<CourseSubcategory> CourseSubcategories => _courseSubcategories ??= new Repository<CourseSubcategory>(_context);
        public IRepository<SampleQuestion> SampleQuestions => _sampleQuestions ??= new Repository<SampleQuestion>(_context);
        public IRepository<ApplicationUser> Users => _users ??= new Repository<ApplicationUser>(_context);
        //public IRepository<ApplicationUser> User => _user ??= new UserRepository(_context);
        public IRepository<ExamAttempt> ExamAttempts => _examAttempts ??= new Repository<ExamAttempt>(_context);
        
        public async Task<int> CompleteAsync() => await _context.SaveChangesAsync();

        public void Dispose() => _context.Dispose();
    }
}
