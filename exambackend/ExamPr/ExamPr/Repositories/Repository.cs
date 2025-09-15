using ExamPr.Core.Interfaces;
using ExamPr.Data;
using Microsoft.EntityFrameworkCore;
using System.Linq.Expressions;

namespace ExamPr.Repositories
{
    public class Repository<T> : IRepository<T> where T : class
    {
        protected readonly AppDbContext _context;
        private readonly DbSet<T> _entities;
        public Repository(AppDbContext context)
        {
            _context = context;
            _entities = context.Set<T>();
        }
        public async Task AddAsync(T entity)
        {
          await _entities.AddAsync(entity);
        }

        public void Delete(T entity)
        {
            _entities.Remove(entity);
        }


        public async Task<bool> Exists(int id) {
            
            return await _entities.FindAsync(id) != null;
        }


        public async  Task<IEnumerable<T>> GetAllAsync()
        {
            return await _entities.ToListAsync();
            
        }

        public async Task<T> GetByIdAsync(int id) => await _entities.FindAsync(id);


        //public void Update(T entity)
        //{
        //   _entities.Update(entity);
        //}

        public void Update(T entity)
        {
            _entities.Attach(entity); // اگر موجودیت از قبل توسط EF ردیابی نشده باشد، آن را Attach می‌کند
            _context.Entry(entity).State = EntityState.Modified; // وضعیت موجودیت را به Modified تغییر می‌دهد
        }
        // متد برای Include کردن Navigation Properties
        public IQueryable<T> Include(params Expression<Func<T, object>>[] includes)
        {
            IQueryable<T> query = _entities;
            foreach (var include in includes)
            {
                query = query.Include(include);
            }
            return query;
        }
       
        public async Task<IEnumerable<T>> FindAsync(Expression<Func<T, bool>> expression)
        {
            return await _entities.Where(expression).ToListAsync(); IQueryable<T> query = _entities;
           
        }

        public async Task<T?> FindOneAsync(Expression<Func<T, bool>> expression)
        {
            return await _entities.FirstOrDefaultAsync(expression);
        }
    }
}
