using SimpleBudget.Shared;

namespace SimpleBudget.DTOs
{
    public record AuthRequestDto
    {
        public AuthProvider Provider { get; set; }
        public string IdToken { get; set; } = null!;
    }
}
