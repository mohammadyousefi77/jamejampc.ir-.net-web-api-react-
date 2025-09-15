using ExamPr.DTOs;
using ExamPr.Models;

namespace ExamPr.Core.Interfaces
{
    public interface IUnitOfWork : IDisposable
    {
        IRepository<ApplicationUser> Users { get; }
        
        IRepository<Course> Courses { get; }
        IRepository<CourseSubcategory> CourseSubcategories { get; }
        IRepository<SampleQuestion> SampleQuestions { get; }
        IRepository<ExamAttempt> ExamAttempts { get; }
        //IRepository<Payment> Payments { get; }

        // متد برای ذخیره تمام تغییرات در یک تراکنش
        Task<int> CompleteAsync();
    }
}
