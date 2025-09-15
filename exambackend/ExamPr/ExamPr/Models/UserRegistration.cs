using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace ExamPr.Models
{
    public class UserRegistration
    {

        [Key]
        public int RegistrationId { get; set; }

        [ForeignKey("User")]
        public int UserId { get; set; }
        public ApplicationUser User { get; set; }

        [ForeignKey("Subcategory")]
        public int SubcategoryId { get; set; }
        public CourseSubcategory CourseSubcategory { get; set; }

        public bool IsPaid { get; set; }
        public DateTime RegisteredAt { get; set; }
    }
}
