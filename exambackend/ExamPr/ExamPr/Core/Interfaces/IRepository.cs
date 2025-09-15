using System.Linq.Expressions;

namespace ExamPr.Core.Interfaces
{
    public interface IRepository<T> where T : class
    {
        Task<T> GetByIdAsync(int id);
        Task<T?> FindOneAsync(Expression<Func<T, bool>> expression);
        Task<IEnumerable<T>> GetAllAsync();
        Task AddAsync(T entity);
        void Update(T entity);
        void Delete(T entity);
        Task<bool> Exists(int id);

        Task<IEnumerable<T>> FindAsync(Expression<Func<T, bool>> expression); // یافتن موجودیت‌ها بر اساس شرط

      
        // متدهای اضافی برای Include کردن Navigation Properties
        IQueryable<T> Include(params Expression<Func<T, object>>[] includes);
    }
}
