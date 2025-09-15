using ExamPr.DTOs;
using ExamPr.Models;

namespace ExamPr.Core.Interfaces
{
    public interface ISampleQuestionServices
    {
        Task<SampleQuestionDto> GetSampleQuestionById(int id);
        Task AddSampleQuestion(SampleQuestionDto course);
        Task UpdateSampleQuestionAsync(SampleQuestionDto course);
        Task DeleteSampleQuestion(int id);
        Task<IEnumerable<SampleQuestionDto>> GetAllSampleQuestion();
    }
}
