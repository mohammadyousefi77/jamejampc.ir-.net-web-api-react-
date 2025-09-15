using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace ExamPr.Models
{
    public class ExamAttempt
    {
        [Key]
        public int ExamAttemptId { get; set; }

        // کلید خارجی برای کاربر
        [ForeignKey("User")]
        public string UserId { get; set; }
        // Navigation property
        public  ApplicationUser User { get; set; }



        // کلید خارجی برای زیرمجموعه دوره (آزمون مربوطه)
        [ForeignKey("CourseSubcategory")]
        public int CourseSubcategoryId { get; set; }
        public  CourseSubcategory CourseSubcategory { get; set; }

        // تاریخ و زمان شرکت در آزمون
        public DateTime AttemptDate { get; set; }

        


        // مبلغ پرداخت شده برای این آزمون خاص (اگر هر آزمون نیاز به پرداخت جداگانه داشته باشد)
        public string AmountPaid { get; set; }
    }
}



// جزئیات پاسخ‌ها به صورت JSON (برای 40 سوال، این روش معمولاً مناسب است)
// اگر تعداد سوالات خیلی زیاد باشد، بهتر است این را به یک جدول جداگانه منتقل کنید.
//[MaxLength(4000)] // طول مناسب برای ذخیره JSON، در صورت نیاز افزایش دهید
//public string DetailedResultsJson { get; set; } // سریالایز شده از List<AnswerValidationResult>

// نتایج امتیازدهی
//public int Score { get; set; }
//public double ScorePercentage { get; set; }
//public int CorrectAnswersCount { get; set; }
//public int IncorrectAnswersCount { get; set; }
//public int UnansweredQuestionsCount { get; set; }