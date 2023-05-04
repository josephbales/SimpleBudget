using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using SimpleBudget.Data.Context;
using SimpleBudget.Data.Entities;

namespace SimpleBudget.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {
        private readonly SimpleBudgetContext _context;

        public UserController(SimpleBudgetContext context)
        {
            _context = context;
        }

        [Authorize]
        [HttpGet]
        public async Task<IActionResult> GetUser()
        {
            var authorizedUserEmail = User.Claims
                .FirstOrDefault(x => x.Type == System.Security.Claims.ClaimTypes.Email);

            if (authorizedUserEmail == null) { return Unauthorized(); }

            var user = await _context.Users
                .FirstOrDefaultAsync(x => x.Email == authorizedUserEmail.Value);

            if (user == null) { return NotFound(); }

            var templates = await _context.BudgetTemplates
                .Where(t => t.UserId == user.Id)
                .ToListAsync();

            //user.BudgetTemplates = templates;

            return Ok(new { user.Id, Email = "hurrdurr", user.FirstName, user.LastName });
        }
    }
}
