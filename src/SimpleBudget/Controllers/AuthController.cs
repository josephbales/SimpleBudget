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

        [Route("external-login")]
        [HttpPost]
        public async Task<ActionResult<AuthResponseDto>> ExternalLogin([FromBody] ExternalAuthDto dto)
        {
            var tokenIsValid = await ValidateGoogleToken(dto.IdToken ?? "");
            return Ok(new AuthResponseDto
            {
                Token = tokenIsValid ? dto.IdToken : null,
                IsAuthSuccessful = tokenIsValid,
                Provider = dto.Provider,
                ErrorMessage = !tokenIsValid ? $"{dto.Provider} doesn't like your token." : null
            });
        }

        private async Task<bool> ValidateGoogleToken(string token)
        {
            try
            {
                var settings = new GoogleJsonWebSignature.ValidationSettings
                {
                    Audience = new[] { _configuration.GetValue<string>("Authentication:Google:ClientId") },
                    IssuedAtClockTolerance = TimeSpan.FromMinutes(5),
                    ExpirationTimeClockTolerance = TimeSpan.FromMinutes(5),
                };
                var payload = await GoogleJsonWebSignature.ValidateAsync(token, settings);
                return true;
            }
            catch (InvalidJwtException)
            {
                return false;
            }
        }
    }
}
