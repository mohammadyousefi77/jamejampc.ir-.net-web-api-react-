using ExamPr.Models;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace ExamPr.Data
{
    public class AppDbContext : IdentityDbContext<ApplicationUser>
    {
        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) { }


        public DbSet<Course> Courses { get; set; }
        public DbSet<CourseSubcategory> CourseSubcategories { get; set; }
        public DbSet<SampleQuestion> SampleQuestions { get; set; }


        public DbSet<ExamAttempt> ExamAttempts { get; set; }

        // DbSet های جدید
        //public DbSet<ApplicationUser> Users { get; set; }
        //public DbSet<ExamAttempt> ExamAttempts { get; set; }
        //public DbSet<Payment> Payments { get; set; }

        //public DbSet<UserRegistration> UserRegistration { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            // پیکربندی رابطه یک به چند بین Course و CourseSubcategory
            modelBuilder.Entity<Course>()
                .HasMany(c => c.Subcategories)
                .WithOne(cs => cs.Course)
                .HasForeignKey(cs => cs.CourseId)
                .OnDelete(DeleteBehavior.Cascade);

            // پیکربندی رابطه یک به چند بین CourseSubcategory و SampleQuestion
            modelBuilder.Entity<CourseSubcategory>()
                .HasMany(cs => cs.SampleQuestions)
                .WithOne(sq => sq.CourseSubcategory)
                .HasForeignKey(sq => sq.CourseSubcategoryId)
                .OnDelete(DeleteBehavior.Cascade);

            // پیکربندی رابطه یک به چند بین User و ExamAttempt
            //modelBuilder.Entity<ApplicationUser>()
            //    .HasMany(u => u.ExamAttempts)
            //    .WithOne(ea => ea.User)
            //    .HasForeignKey(ea => ea.UserId)
            //    .OnDelete(DeleteBehavior.Cascade); // اگر کاربر حذف شود، تلاش‌های آزمون او نیز حذف می‌شوند

            // پیکربندی رابطه یک به چند بین User و Payment
            //modelBuilder.Entity<ApplicationUser>()
            //    .HasMany(u => u.Payments)
            //    .WithOne(p => p.User)
            //    .HasForeignKey(p => p.UserId)
            //    .OnDelete(DeleteBehavior.Cascade); // اگر کاربر حذف شود، پرداخت‌های او نیز حذف می‌شوند

            // پیکربندی رابطه یک به یک/صفر یا یک بین ExamAttempt و Payment (اختیاری)
            //modelBuilder.Entity<Payment>()
            //    .HasOne(p => p.ExamAttempt)
            //    .WithMany() // یک ExamAttempt می‌تواند چندین Payment داشته باشد (اگر Payment برای یک آزمون خاص باشد)
            //    .HasForeignKey(p => p.ExamAttemptId)
            //    .IsRequired(false) // ExamAttemptId می‌تواند null باشد (اگر پرداخت مربوط به یک آزمون خاص نباشد)
            //    .OnDelete(DeleteBehavior.Restrict); // از حذف آبشاری جلوگیری می‌کند

            // می‌توانید تنظیمات اضافی برای روابط را اینجا اضافه کنید
            //     modelBuilder.Entity<ExamAttempt>(b =>
            //     {
            //         b.HasOne(e => e.User)                // ExamAttempt has one User
            //.WithMany(u => u.ExamAttempts)      // User has many ExamAttempts
            //.HasForeignKey(e => e.UserId)       // Foreign key property
            //.OnDelete(DeleteBehavior.Cascade); // یا DeleteBehavior.Cascade بسته به نیاز شما
            //         b.Navigation(t => t.User);
            //     });


       
            modelBuilder.Entity<ExamAttempt>(b =>
            {
                // رابطه با ApplicationUser
                b.HasOne(e => e.User) // نام باید همین باشد
                      .WithMany(u => u.ExamAttempts)
                      .HasForeignKey(e => e.UserId)
                      .OnDelete(DeleteBehavior.Cascade);


                // Configure CourseSubcategory relationship
                b.HasOne(e => e.CourseSubcategory)
                 .WithMany(c => c.ExamAttempts)
                 .HasForeignKey(e => e.CourseSubcategoryId)
                 .OnDelete(DeleteBehavior.Restrict);



                // Navigation property configurations
              
            });




            // اطمینان از منحصر به فرد بودن کد ملی
            modelBuilder.Entity<ApplicationUser>()
                .HasIndex(u => u.NationalCode)
                .IsUnique();

            base.OnModelCreating(modelBuilder);
        }


    }
}
