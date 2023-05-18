using SimpleBudget.Shared;

namespace SimpleBudget.DTOs
{
    public class AuthResponseDto
    {
        public string AuthToken { get; set; } = null!;
        public string RefreshToken { get; set; } = null!;
        public AuthProvider Provider { get; set; }
        public Guid UserId { get; set; }
        public string Username { get; set; } = null!;
        public string Email { get; set; } = null!;
        public string AvatarUrl { get; set; } = null!;
    }
}
