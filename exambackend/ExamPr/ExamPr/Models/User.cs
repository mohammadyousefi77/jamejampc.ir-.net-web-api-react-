namespace ExamPr.Models
{
    public class User
    {
        public string Id { get; set; }
        public string NationalCode { get; set; } = string.Empty;
        public string FirstName { get; set; } = string.Empty;
        public string LastName { get; set; } = string.Empty;
        public string PhoneNumber { get; set; } = string.Empty;

        //public string Role { get; set; } = "Admin"; // یا "Admin"

    }
}
