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
            var authorizedUser = User.Identity.Name;
            var user = await _context.Users
                .FirstOrDefaultAsync();

            if (user == null) { return NotFound(); }

            var templates = await _context.BudgetTemplates
                .Where(t => t.UserId == user.Id)
                .ToListAsync();

            //user.BudgetTemplates = templates;

            return Ok(user);
        }
    }
}
