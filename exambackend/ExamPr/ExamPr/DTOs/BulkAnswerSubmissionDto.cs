using System.ComponentModel.DataAnnotations;

namespace ExamPr.DTOs
{
    public class BulkAnswerSubmissionDto
    {
        // کد ملی کاربر برای شناسایی یا ایجاد کاربر
        [Required]
        [MaxLength(10)]
        public string NationalId { get; set; }

        // نام کامل کاربر (اختیاری، برای ایجاد کاربر جدید در صورت نیاز)
        [MaxLength(200)]
        public string Name { get; set; }
        [MaxLength(200)]
        public string LastName { get; set; }

        // مبلغ پرداخت شده در این تراکنش (اختیاری، اگر پرداخت با هر آزمون انجام شود)
        public decimal? PaymentAmount { get; set; }

        // توضیحات پرداخت (اختیاری)
        [MaxLength(500)]
        public string PaymentDescription { get; set; }

        // لیستی از پاسخ‌های ارسالی برای سوالات مختلف
        public List<AnswerSubmissionDto> Answers { get; set; } = new List<AnswerSubmissionDto>();
    }

    // Models/AnswerSubmissionDto.cs (بدون تغییر)
    public class AnswerSubmissionDto
    {
        [Required]
        public int SampleQuestionId { get; set; }

        [Required]
        [Range(1, 4, ErrorMessage = "SubmittedOptionIndex must be between 1 and 4.")]
        public int SubmittedOptionIndex { get; set; }
    }

    // کلاس کمکی برای بازگرداندن نتیجه اعتبارسنجی پاسخ (برای هر سوال) (بدون تغییر)
    public class AnswerValidationResult
    {
        public int SampleQuestionId { get; set; }
        public bool IsCorrect { get; set; }
        public int CorrectOptionIndex { get; set; }
        public string CorrectOptionText { get; set; }
        public string SubmittedOptionText { get; set; }
    }

    // کلاس برای بازگرداندن خلاصه نتایج کلی (برای همه سوالات) (با اضافه شدن ExamAttemptId و PaymentId)
    public class BulkAnswerValidationSummary
    {
        public int TotalQuestions { get; set; }
        public int CorrectAnswersCount { get; set; }
        public int IncorrectAnswersCount { get; set; }
        public int UnansweredQuestionsCount { get; set; }
        public int Score { get; set; }
        public double ScorePercentage { get; set; }

        public int? ExamAttemptId { get; set; } // شناسه رکورد تلاش آزمون ذخیره شده
        public int? PaymentId { get; set; } // شناسه رکورد پرداخت ذخیره شده (اگر انجام شده باشد)

        public List<AnswerValidationResult> Results { get; set; }
    }
}
