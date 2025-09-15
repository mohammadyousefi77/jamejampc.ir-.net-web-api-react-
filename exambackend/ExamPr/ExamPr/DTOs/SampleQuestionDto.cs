using System.ComponentModel.DataAnnotations;

namespace ExamPr.DTOs
{
    public class SampleQuestionDto
    {
        public int SampleQuestionId { get; set; }


        public string QuestionText { get; set; }


        public string Option1 { get; set; }


        public string Option2 { get; set; }

        public string Option3 { get; set; }

        public string Option4 { get; set; }


        public string Answer { get; set; }

        public int CorrectOptionIndex { get; set; }

        public int CourseSubcategoryId { get; set; }

    }
}
