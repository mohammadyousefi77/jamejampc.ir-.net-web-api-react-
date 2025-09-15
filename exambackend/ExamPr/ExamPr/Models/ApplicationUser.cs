using Microsoft.AspNetCore.Identity;

namespace ExamPr.Models
{
    public class ApplicationUser: IdentityUser
    {
        
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string NationalCode { get; set; }


        public ICollection<ExamAttempt> ExamAttempts { get; set; } = new List<ExamAttempt>();


        //public ICollection<CourseSubcategory> CourseSubcategory { get; set; } = new List<CourseSubcategory>();
        //Navigation Properties برای دسترسی به آزمون‌ها و پرداخت‌های کاربر
        //public ICollection<ExamAttempt> ExamAttempts { get; set; } = new List<ExamAttempt>();
        //public ICollection<Payment> Payments { get; set; } = new List<Payment>();
        //public ICollection<UserRegistration> Registrations { get; set; }
    }
}
