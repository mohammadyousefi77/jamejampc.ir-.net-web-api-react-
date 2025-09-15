using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace ExamPr.Models
{
    public class CourseSubcategory
    {


        // شناسه منحصر به فرد برای زیرمجموعه دوره
        [Key]
        public int CourseSubcategoryId { get; set; }

        // عنوان زیرمجموعه
        [Required]
        [MaxLength(200)]
        public string Title { get; set; }

        // توضیحات زیرمجموعه
        [MaxLength(1500)]
        public string Description { get; set; }

        // کلید خارجی برای ارتباط با جدول Course
        [ForeignKey("Course")] // مشخص می‌کند که این فیلد یک کلید خارجی است
        public int CourseId { get; set; }

        // Navigation Property برای رابطه یک به چند با Course
        // هر زیرمجموعه به یک دوره خاص تعلق دارد
        public Course Course { get; set; }

        // Navigation Property برای رابطه یک به چند با SampleQuestion
        // یک زیرمجموعه می‌تواند شامل چندین نمونه سوال باشد
        public ICollection<SampleQuestion> SampleQuestions { get; set; } = new List<SampleQuestion>();

        public  ICollection<ExamAttempt> ExamAttempts { get; set; } = new List<ExamAttempt>();
    }
}
