using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace ExamPr.Models
{
    public class Payment
    {
        [Key]
        public int PaymentId { get; set; }

        // کلید خارجی برای کاربر
        [ForeignKey("User")]
        public int UserId { get; set; }
        public ApplicationUser User { get; set; }

        // تاریخ پرداخت
        public DateTime PaymentDate { get; set; }

        // مبلغ پرداخت
        [Required]
        public decimal Amount { get; set; }

        // توضیحات پرداخت (مثلاً "خرید اشتراک یک ماهه", "پرداخت برای آزمون شیمی")
        [MaxLength(500)]
        public string Description { get; set; }

        // اختیاری: لینک به یک آزمون خاص اگر پرداخت مستقیماً برای آن آزمون باشد
        //[ForeignKey("ExamAttempt")]
        //public int? ExamAttemptId { get; set; }
        //public ExamAttempt ExamAttempt { get; set; }
    }
}
