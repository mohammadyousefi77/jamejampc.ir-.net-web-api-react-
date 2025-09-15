using ExamPr.Models;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace ExamPr.DTOs
{
    public class ExamAttemptDTO
    {
     
        public int ExamAttemptId { get; set; }
        public string UserId { get; set; }
        public int CourseSubcategoryId { get; set; }
        public DateTime AttemptDate { get; set; }
        // مبلغ پرداخت شده برای این آزمون خاص (اگر هر آزمون نیاز به پرداخت جداگانه داشته باشد)
        public string AmountPaid { get; set; }
    }
}
