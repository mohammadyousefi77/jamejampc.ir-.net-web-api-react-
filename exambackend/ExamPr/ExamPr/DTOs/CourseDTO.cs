using System.ComponentModel.DataAnnotations;

namespace ExamPr.DTOs
{
    public class CourseDTO
    {

        public int CourseId { get; set; }
        [Required]
        [MaxLength(300)]

        public string CourseName { get; set; }
        [Required]
        [MaxLength(1500)]
        public string CourseDescription { get; set; }
    }
}
