using AutoMapper;
using ExamPr.Core.Interfaces;
using ExamPr.Data;
using ExamPr.Models;
using ExamPr.Repositories;
using ExamPr.Services;
using Microsoft.AspNetCore.Authentication.BearerToken;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using Microsoft.OpenApi.Models;
using System.Security.Claims;
using System.Text;
using System.Text.Json.Serialization;



var builder = WebApplication.CreateBuilder(args);

//builder.Services.AddControllers()
//                .AddJsonOptions(options =>
//                {
//                    // این تنظیم برای حل مشکل Cyclic Reference در هنگام سریالایز کردن آبجکت‌های شامل Navigation Propertyها است.
//                    // به عنوان مثال، وقتی یک Course را با Subcategories آن برمی‌گردانید،
//                    // اگر Subcategory هم یک ارجاع به Course داشته باشد، یک حلقه ایجاد می‌شود.
//                    options.JsonSerializerOptions.ReferenceHandler = ReferenceHandler.Preserve;
//                });


builder.Services.AddDbContext<AppDbContext>(options =>
    options.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection")));

//builder.Services.AddIdentity<ApplicationUser, IdentityRole>()
//    .AddEntityFrameworkStores<AppDbContext>();



builder.Services.AddScoped<IUserRepository, UserRepository>();
builder.Services.AddScoped<IUnitOfWork, UnitOfWork>();
builder.Services.AddScoped<IAuthService, AuthService>();
builder.Services.AddScoped(typeof(IRepository<>), typeof(Repository<>));
builder.Services.AddScoped<ICourseService, CourseService>();
builder.Services.AddScoped<ICourseSubcategoryServices, CourseSubcategoryServices>();
builder.Services.AddScoped<ISampleQuestionServices, SampleQuestionServices>();
builder.Services.AddScoped<IExamAttemptServices, ExamAttemptServices>();
builder.Services.AddScoped<IUserServices, UserServices>();
// Add services to the container.

//builder.Services.AddCors(options =>
//{
//    options.AddPolicy("AllowAll", builder =>
//    {
//        builder
//         //.WithOrigins("https://jamejampc.ir")// add server online front addrrss
//            .AllowAnyOrigin()
//            .AllowAnyHeader()
//            .AllowAnyMethod();
//    });
//});


//اضافه کردن سرویس CORS
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowSpecificOrigins",
       policy =>
        {
            policy

             //.WithOrigins(
             //        "https://jamejampc.ir", // دامین اصلی
             //        "https://www.jamejampc.ir", // نسخه با www
             //        "https://examui.jamejampc.ir" // ساب دامین
             //    )
             .AllowAnyOrigin()
                .AllowAnyHeader()
                .AllowAnyMethod();
                //.AllowCredentials(); // اگر از cookie یا authentication استفاده می‌کنید
        });
});


//builder.Services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
//    .AddJwtBearer(opt =>
//    {
//        opt.TokenValidationParameters = new TokenValidationParameters
//        {
//            ValidateIssuer = true,
//            ValidateAudience = true,
//            ValidateLifetime = true,
//            ValidateIssuerSigningKey = true,
//            ValidIssuer = builder.Configuration["Jwt:Issuer"],
//            ValidAudience = builder.Configuration["Jwt:Audience"],
//            IssuerSigningKey = new SymmetricSecurityKey(
//                Encoding.UTF8.GetBytes(builder.Configuration["Jwt:Key"]!))
//        };
//    });

//==========



builder.Services.AddAuthentication();
builder.Services.AddAuthorization();

builder.Services.AddIdentityApiEndpoints<IdentityUser>().AddEntityFrameworkStores<AppDbContext>();

builder.Services.AddControllers();


// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
//builder.Services.AddSwaggerGen(
//    c =>
//    {
//        c.SwaggerDoc("v1", new Microsoft.OpenApi.Models.OpenApiInfo { Title = "Authorize", Version = "v1" });

//        // تعریف احراز هویت JWT در Swagger
//        c.AddSecurityDefinition("Bearer", new Microsoft.OpenApi.Models.OpenApiSecurityScheme
//        {
//            Description = "insert token in this format: Bearer {token}",
//            Name = "Authorization",
//            In = Microsoft.OpenApi.Models.ParameterLocation.Header,
//            Type = Microsoft.OpenApi.Models.SecuritySchemeType.Http,
//            BearerFormat="JWT",
//            Scheme = "Bearer"
//        });

//        // اضافه کردن نیازمندی امنیت به کل عملیات‌ها
//        c.AddSecurityRequirement(new Microsoft.OpenApi.Models.OpenApiSecurityRequirement()
//    {
//        {
//            new OpenApiSecurityScheme
//            {
//                Reference = new OpenApiReference
//                {
//                    Type = ReferenceType.SecurityScheme,
//                    Id = "Bearer"
//                },
//                //Scheme = "oauth2",
//                //Name = "Bearer",
//                //In = ParameterLocation.Header
//            },
//            []
//        }
//    });
//    }
//    );

//=======================

builder.Services.AddSwaggerGen(
    
//    c =>
//{
//    c.SwaggerDoc("v1", new Microsoft.OpenApi.Models.OpenApiInfo()
//    {
//        Title = "Auth Demo",
//        Version = "v1"

//    });
//    c.AddSecurityDefinition("Bearer", new Microsoft.OpenApi.Models.OpenApiSecurityScheme()
//    {
//        Description = @"JWT Authorization header using the Bearer scheme. \r\n\r\n 
//                      Enter 'Bearer' [space] and then your token in the text input below.
//                      \r\n\r\nExample: 'Bearer 12345abcdef'",
//        Name = "Authorization",
//        In = Microsoft.OpenApi.Models.ParameterLocation.Header,
//        Type = Microsoft.OpenApi.Models.SecuritySchemeType.Http,
//        BearerFormat = "JWT",
//        Scheme = "Bearer"
//    });


//    c.AddSecurityRequirement(new Microsoft.OpenApi.Models.OpenApiSecurityRequirement()
//      {
//    {
//        new OpenApiSecurityScheme
//        {
//            Reference = new OpenApiReference
//            {
//                Type = ReferenceType.SecurityScheme,
//                Id = "Bearer"
//            },
//            //Scheme = "oauth2",
//            //Name = "Bearer",
//            //In = ParameterLocation.Header,

//        },
//        []
//    }
//          });

//}

);



var app = builder.Build();
//app.MapIdentityApi<IdentityUser>();






// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}


// استفاده از CORS - باید قبل از سایر middlewareها باشد
app.UseCors("AllowSpecificOrigins");

app.UseHttpsRedirection();


//app.UseCors("AllowAll");
app.UseAuthentication();
app.UseAuthorization();

app.MapControllers();

app.Run();
