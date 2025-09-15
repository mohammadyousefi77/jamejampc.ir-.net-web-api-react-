using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace ExamPr.DTOs
{
    public class CourseSubcategoryDTO
    {

  
        public int CourseSubcategoryId { get; set; }

        // عنوان زیرمجموعه
        [Required]
        [MaxLength(200)]
        public string Title { get; set; }

        // توضیحات زیرمجموعه
        [MaxLength(1500)]
        public string Description { get; set; }

       
        public int CourseId { get; set; }
    }
}
