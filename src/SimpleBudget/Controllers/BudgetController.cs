using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using SimpleBudget.Models.Budget;

namespace SimpleBudget.Controllers
{
    [Route("api/budget")]
    [ApiController]
    public class BudgetController : ControllerBase
    {
        [HttpGet()]
        public async Task<ActionResult<BudgetItemsResponse>> GetBudgetItems()
        {
            var items = await Task.FromResult(new BudgetItemsResponse
            {
                BudgetItems = new []
                {
                    new BudgetItemDto { Id = 1, Amount = 2000, DayOfMonth = 1, IsTransacted = true, MonthBudgetId = 1, Name = "Mortgage", Notes = null, TransactionType = Data.TransactionType.Debit },
                    new BudgetItemDto { Id = 2, Amount = 150, DayOfMonth = 2, IsTransacted = true, MonthBudgetId = 1, Name = "Electric", Notes = null, TransactionType = Data.TransactionType.Debit },
                    new BudgetItemDto { Id = 3, Amount = 80, DayOfMonth = 3, IsTransacted = false, MonthBudgetId = 1, Name = "Internet", Notes = null, TransactionType = Data.TransactionType.Debit },
                    new BudgetItemDto { Id = 4, Amount = 30, DayOfMonth = 5, IsTransacted = false, MonthBudgetId = 1, Name = "Phone", Notes = null, TransactionType = Data.TransactionType.Debit },
                    new BudgetItemDto { Id = 5, Amount = 40, DayOfMonth = 10, IsTransacted = false, MonthBudgetId = 1, Name = "Water", Notes = null, TransactionType = Data.TransactionType.Debit },
                    new BudgetItemDto { Id = 6, Amount = 800, DayOfMonth = 12, IsTransacted = false, MonthBudgetId = 1, Name = "Grocery", Notes = null, TransactionType = Data.TransactionType.Debit },
                    new BudgetItemDto { Id = 7, Amount = 200, DayOfMonth = 21, IsTransacted = false, MonthBudgetId = 1, Name = "Restaurant", Notes = null, TransactionType = Data.TransactionType.Debit },
                    new BudgetItemDto { Id = 8, Amount = 300, DayOfMonth = 28, IsTransacted = false, MonthBudgetId = 1, Name = "Entertainment", Notes = null, TransactionType = Data.TransactionType.Debit },
                    new BudgetItemDto { Id = 9, Amount = 2000, DayOfMonth = 1, IsTransacted = true, MonthBudgetId = 1, Name = "Wages", Notes = null, TransactionType = Data.TransactionType.Credit },
                    new BudgetItemDto { Id = 10, Amount = 2000, DayOfMonth = 15, IsTransacted = false, MonthBudgetId = 1, Name = "Wages", Notes = null, TransactionType = Data.TransactionType.Credit },
                }
            });

            return Ok(items);
        }

        [HttpPost()]
        public async Task<ActionResult<BudgetTemplateResponse>> CreateBudgetTemplate([FromBody] BudgetTemplateCreateRequest request)
        {
            return Ok();
        }
    }
}
