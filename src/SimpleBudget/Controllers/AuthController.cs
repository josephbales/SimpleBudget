using Google.Apis.Auth;
using Microsoft.AspNetCore.Mvc;
using SimpleBudget.Data.Context;
using SimpleBudget.DTOs;

namespace SimpleBudget.Controllers
{
    [Route("api/auth")]
    public class AuthController : ControllerBase
    {
        private readonly SimpleBudgetContext _context;
        private readonly IConfiguration _configuration;

        public AuthController(SimpleBudgetContext context, IConfiguration configuration)
        {
            _context = context;
            _configuration = configuration;
        }

        [Route("login")]
        [HttpPost]
        public async Task<ActionResult<AuthResponseDto>> Login([FromBody] AuthRequestDto dto)
        {
            try
            {
                var response = await ValidateGoogleToken(dto);
                return Ok(response);
            }
            catch (InvalidJwtException)
            {
                return Unauthorized();
            }
        }

        private async Task<AuthResponseDto> ValidateGoogleToken(AuthRequestDto dto)
        {
            var settings = new GoogleJsonWebSignature.ValidationSettings
            {
                Audience = new[] { _configuration.GetValue<string>("Authentication:Google:ClientId") },
                IssuedAtClockTolerance = TimeSpan.FromMinutes(5),
                ExpirationTimeClockTolerance = TimeSpan.FromMinutes(5),
            };
            var payload = await GoogleJsonWebSignature.ValidateAsync(dto.IdToken, settings);

            return new AuthResponseDto
            {
                Username = payload.Email,
                UserId = Guid.NewGuid(),
                Email = payload.Email,
                Provider = dto.Provider,
                AvatarUrl = payload.Picture,
                AuthToken = dto.IdToken, // generate an app token here
                RefreshToken = dto.IdToken, // generate a refresh token here
            };
        }
    }
}
