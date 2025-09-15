using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace ExamPr.Migrations
{
    /// <inheritdoc />
    public partial class addmodels : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Courses",
                columns: table => new
                {
                    CourseId = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    CourseName = table.Column<string>(type: "nvarchar(150)", maxLength: 150, nullable: false),
                    CourseDescription = table.Column<string>(type: "nvarchar(600)", maxLength: 600, nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Courses", x => x.CourseId);
                });

            migrationBuilder.CreateTable(
                name: "CourseSubcategories",
                columns: table => new
                {
                    CourseSubcategoryId = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Title = table.Column<string>(type: "nvarchar(200)", maxLength: 200, nullable: false),
                    Description = table.Column<string>(type: "nvarchar(1500)", maxLength: 1500, nullable: false),
                    CourseId = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_CourseSubcategories", x => x.CourseSubcategoryId);
                    table.ForeignKey(
                        name: "FK_CourseSubcategories_Courses_CourseId",
                        column: x => x.CourseId,
                        principalTable: "Courses",
                        principalColumn: "CourseId",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "SampleQuestions",
                columns: table => new
                {
                    SampleQuestionId = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    QuestionText = table.Column<string>(type: "nvarchar(2000)", maxLength: 2000, nullable: false),
                    Option1 = table.Column<string>(type: "nvarchar(1500)", maxLength: 1500, nullable: false),
                    Option2 = table.Column<string>(type: "nvarchar(1500)", maxLength: 1500, nullable: false),
                    Option3 = table.Column<string>(type: "nvarchar(1500)", maxLength: 1500, nullable: false),
                    Option4 = table.Column<string>(type: "nvarchar(1500)", maxLength: 1500, nullable: false),
                    Answer = table.Column<string>(type: "nvarchar(2000)", maxLength: 2000, nullable: false),
                    CorrectOptionIndex = table.Column<int>(type: "int", nullable: false),
                    CourseSubcategoryId = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_SampleQuestions", x => x.SampleQuestionId);
                    table.ForeignKey(
                        name: "FK_SampleQuestions_CourseSubcategories_CourseSubcategoryId",
                        column: x => x.CourseSubcategoryId,
                        principalTable: "CourseSubcategories",
                        principalColumn: "CourseSubcategoryId",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_CourseSubcategories_CourseId",
                table: "CourseSubcategories",
                column: "CourseId");

            migrationBuilder.CreateIndex(
                name: "IX_SampleQuestions_CourseSubcategoryId",
                table: "SampleQuestions",
                column: "CourseSubcategoryId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "SampleQuestions");

            migrationBuilder.DropTable(
                name: "CourseSubcategories");

            migrationBuilder.DropTable(
                name: "Courses");
        }
    }
}
