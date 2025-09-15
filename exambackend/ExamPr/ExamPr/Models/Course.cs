using System.ComponentModel.DataAnnotations;

namespace ExamPr.Models
{
    public class Course
    {

        public int CourseId { get; set; }
        [Required]
        [MaxLength(150)]
        
        public string CourseName { get; set; }
        [Required]
        [MaxLength(600)]
        public string CourseDescription { get; set; }

        // Navigation Property برای رابطه یک به چند با CourseSubcategory
        // یک دوره می‌تواند شامل چندین زیرمجموعه باشد
        public ICollection<CourseSubcategory> Subcategories { get; set; } = new List<CourseSubcategory>();
    }
}
