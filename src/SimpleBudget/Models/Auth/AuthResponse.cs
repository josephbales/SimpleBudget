namespace SimpleBudget.Models.Auth
{
    public class AuthResponse
    {
        public bool IsAuthSuccessful { get; set; }
        public string? ErrorMessage { get; set; }
        public string? Token { get; set; }
        public string? Provider { get; set; }
    }
}
