using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace ExamPr.Models
{
    public class SampleQuestion
    {
        // شناسه منحصر به فرد برای نمونه سوال
        [Key]
        public int SampleQuestionId { get; set; }

        // متن سوال
        [Required]
        [MaxLength(2000)] // حداکثر طول 2000 کاراکتر برای سوال
        public string QuestionText { get; set; }

        [Required]
        [MaxLength(1500)]
        public string Option1 { get; set; }

        [Required]
        [MaxLength(1500)]
        public string Option2 { get; set; }

        [Required]
        [MaxLength(1500)]
        public string Option3 { get; set; }

        [Required]
        [MaxLength(1500)]
        public string Option4 { get; set; }

        // پاسخ سوال
        [Required]
        [MaxLength(2000)] // حداکثر طول 2000 کاراکتر برای پاسخ
        public string Answer { get; set; }

        // فیلد برای نگهداری شماره گزینه صحیح (1، 2، 3 یا 4)
        [Required]
        [Range(1, 4, ErrorMessage = "CorrectOptionIndex must be between 1 and 4.")]
        public int CorrectOptionIndex { get; set; }

        // کلید خارجی برای ارتباط با جدول CourseSubcategory
        [ForeignKey("CourseSubcategory")]
        public int CourseSubcategoryId { get; set; }

        // Navigation Property برای رابطه یک به چند با CourseSubcategory
        // هر نمونه سوال به یک زیرمجموعه خاص تعلق دارد
        public CourseSubcategory CourseSubcategory { get; set; }

        // فیلدهای مستقیم برای گزینه‌های سوال (دنرمال‌شده)
      

      
    }
}
